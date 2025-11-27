"use server";

import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq, and, or, gte, sql } from "drizzle-orm";

export async function getRoomUnavailableDates(roomId: number) {
  // Ensure roomId is valid
  if (!roomId) return [];

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const unavailableBookings = await db.query.bookings.findMany({
        where: and(
          eq(bookings.roomId, roomId),
          or(eq(bookings.status, "CONFIRMED"), eq(bookings.status, "PENDING_PAYMENT")),
          gte(bookings.endDate, today)
        ),
        columns: {
          startDate: true,
          endDate: true,
        }
      });

      return unavailableBookings.map(b => ({
        from: new Date(b.startDate),
        to: new Date(b.endDate)
      }));
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
    return [];
  }
}

export async function checkRoomAvailability(roomId: number, startDate: Date, endDate: Date, excludeBookingId?: string) {
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    // Logic: (requested_start < existing_end AND requested_end > existing_start)
    // In SQL: start_date < endStr AND end_date > startStr

    const conditions = [
        eq(bookings.roomId, roomId),
        or(eq(bookings.status, "CONFIRMED"), eq(bookings.status, "PENDING_PAYMENT")),
        sql`${bookings.startDate} < ${endStr}`,
        sql`${bookings.endDate} > ${startStr}`
    ];

    if (excludeBookingId) {
        conditions.push(sql`${bookings.id} != ${excludeBookingId}`);
    }

    const conflicts = await db.select({ id: bookings.id }).from(bookings)
        .where(and(...conditions));

    return conflicts.length === 0;
}
