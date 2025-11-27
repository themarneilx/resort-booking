"use server";

import { db } from "@/lib/db";
import { bookings, rooms } from "@/lib/db/schema";
import { sql, eq, and, or } from "drizzle-orm";
import { z } from "zod";
import { cookies } from "next/headers";
import { verifyRefreshToken } from "@/lib/auth/jwt";

const createBookingSchema = z.object({
  roomId: z.number(),
  startDate: z.string(), // YYYY-MM-DD
  endDate: z.string(),   // YYYY-MM-DD
  totalPrice: z.number().int().positive(),
});

export async function createBooking(data: z.infer<typeof createBookingSchema>) {
    // 1. Auth Check
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) return { success: false, message: "Unauthorized" };
    
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) return { success: false, message: "Unauthorized" };
    const userId = payload.userId;

    const parsed = createBookingSchema.safeParse(data);
    if (!parsed.success) return { success: false, message: "Invalid data" };
    const { roomId, startDate, endDate, totalPrice } = parsed.data;

    try {
        return await db.transaction(async (tx) => {
            // 2. Lock Room
            // Note: Drizzle .for("update") ensures locking
            const room = await tx.select().from(rooms).where(eq(rooms.id, roomId)).for("update");
            if (room.length === 0) throw new Error("Room not found");

            // 3. Check Availability
            const conflicts = await tx.select({ id: bookings.id }).from(bookings)
                .where(and(
                    eq(bookings.roomId, roomId),
                    or(eq(bookings.status, "CONFIRMED"), eq(bookings.status, "PENDING_PAYMENT")),
                    sql`${bookings.startDate} < ${endDate}`,
                    sql`${bookings.endDate} > ${startDate}`
                ));
            
            if (conflicts.length > 0) {
                return { success: false, message: "Room is unavailable for the selected dates" };
            }

            // 4. Create Booking
            const [newBooking] = await tx.insert(bookings).values({
                userId,
                roomId,
                startDate,
                endDate,
                totalPrice,
                status: "PENDING_PAYMENT",
                expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }).returning();

            return { success: true, booking: newBooking };
        });
    } catch (error) {
        console.error("Booking Error:", error);
        return { success: false, message: "Failed to create booking" };
    }
}
