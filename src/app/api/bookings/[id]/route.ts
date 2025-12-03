import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, rooms, roomTypes } from "@/lib/db/schema";
import { eq, and, lte, gte, not, ne } from "drizzle-orm";
import { verifyAccessToken } from "@/lib/auth/jwt";
import dayjs from "dayjs";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // 1. Auth Check
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        const payload = await verifyAccessToken(token);
        if (!payload) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

        // 2. Fetch existing booking
        const existingBooking = await db.query.bookings.findFirst({
            where: and(eq(bookings.id, id), eq(bookings.userId, payload.userId)),
            with: {
                room: {
                    with: {
                        roomType: true
                    }
                }
            }
        });

        if (!existingBooking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        // 3. Handle Cancellation
        if (body.status === "CANCELLED") {
            const updatedBooking = await db.update(bookings)
                .set({ status: "CANCELLED" })
                .where(eq(bookings.id, id))
                .returning();

            return NextResponse.json({ success: true, booking: updatedBooking[0] });
        }

        // 4. Handle Date Change
        if (body.startDate && body.endDate) {
            const startDate = body.startDate;
            const endDate = body.endDate;

            // Check availability (excluding current booking)
            const overlaps = await db.query.bookings.findFirst({
                where: and(
                    eq(bookings.roomId, existingBooking.roomId),
                    not(eq(bookings.status, "CANCELLED")),
                    ne(bookings.id, id), // Exclude current booking
                    lte(bookings.startDate, endDate),
                    gte(bookings.endDate, startDate)
                )
            });

            if (overlaps) {
                return NextResponse.json({ error: "Selected dates are not available" }, { status: 409 });
            }

            // Calculate new price
            const start = dayjs(startDate);
            const end = dayjs(endDate);
            const days = end.diff(start, 'day');

            if (days <= 0) {
                return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
            }

            const basePrice = existingBooking.room.roomType.basePrice; // in cents
            const totalBase = basePrice * days;
            const serviceFee = Math.round(totalBase * 0.1); // 10% service fee
            const newTotalPrice = totalBase + serviceFee;

            const updatedBooking = await db.update(bookings)
                .set({
                    startDate,
                    endDate,
                    totalPrice: newTotalPrice,
                    status: "PENDING_PAYMENT" // Revert to pending approval
                })
                .where(eq(bookings.id, id))
                .returning();

            return NextResponse.json({ success: true, booking: updatedBooking[0] });
        }

        return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    } catch (error) {
        console.error("Booking update failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
