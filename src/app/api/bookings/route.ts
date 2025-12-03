import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, rooms } from "@/lib/db/schema";
import { eq, and, lte, gte, not } from "drizzle-orm";
import { verifyAccessToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
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

        const body = await req.json();
        const { roomTypeId, startDate, endDate, guests, totalPrice } = body;

        if (!roomTypeId || !startDate || !endDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 2. Find available room
        // Get all rooms of this type
        const candidateRooms = await db.select().from(rooms).where(eq(rooms.roomTypeId, roomTypeId));

        if (candidateRooms.length === 0) {
            return NextResponse.json({ error: "No rooms found for this category" }, { status: 404 });
        }

        let availableRoomId = null;

        for (const room of candidateRooms) {
            // Check for overlap
            // Overlap condition: Existing Start <= New End AND Existing End >= New Start
            const overlaps = await db.query.bookings.findFirst({
                where: and(
                    eq(bookings.roomId, room.id),
                    not(eq(bookings.status, "CANCELLED")),
                    lte(bookings.startDate, endDate),
                    gte(bookings.endDate, startDate)
                )
            });

            if (!overlaps) {
                availableRoomId = room.id;
                break;
            }
        }

        if (!availableRoomId) {
            return NextResponse.json({ error: "No rooms available for selected dates" }, { status: 409 });
        }

        // 3. Create Booking
        const newBooking = await db.insert(bookings).values({
            userId: payload.userId,
            roomId: availableRoomId,
            startDate,
            endDate,
            totalPrice,
            status: "PENDING_PAYMENT"
        }).returning();

        return NextResponse.json({ success: true, booking: newBooking[0] });

    } catch (error) {
        console.error("Booking failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
