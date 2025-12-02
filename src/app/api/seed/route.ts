import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { roomTypes, rooms } from "@/lib/db/schema";

export async function GET() {
    try {
        // 1. Clear existing data (optional, but good for idempotency if we had cascade delete, but let's just insert if empty)
        // Actually, let's just check if data exists.
        const existing = await db.query.roomTypes.findFirst();
        if (existing) {
            return NextResponse.json({ message: "Database already seeded" });
        }

        // 2. Insert Room Types
        const insertedRoomTypes = await db.insert(roomTypes).values([
            {
                name: "Ocean Front Villa",
                description: "Experience the ultimate luxury with direct beach access, a private infinity pool, and panoramic ocean views. Perfect for a romantic getaway or a lavish retreat.",
                basePrice: 25000, // $250.00
                capacity: 2,
                amenities: ["Private Pool", "Ocean View", "King Bed", "Butler Service", "Free Wi-Fi", "Smart TV"],
                images: [
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1571896349842-6e53ce41e887?auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80"
                ]
            },
            {
                name: "Tropical Garden Suite",
                description: "Surrounded by lush flora, this suite offers privacy and a serene outdoor rain shower. Reconnect with nature in style.",
                basePrice: 18000, // $180.00
                capacity: 3,
                amenities: ["Garden View", "Rain Shower", "Queen Bed", "Private Terrace", "Free Wi-Fi"],
                images: [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80"
                ]
            },
            {
                name: "Deluxe Ocean Room",
                description: "A spacious room featuring a private balcony with stunning sea views. Modern amenities meet coastal charm.",
                basePrice: 12000, // $120.00
                capacity: 2,
                amenities: ["Ocean View", "Balcony", "King Bed", "Mini Bar", "Free Wi-Fi"],
                images: [
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
                ]
            }
        ]).returning();

        // 3. Insert Rooms for each Type
        const villa = insertedRoomTypes.find(rt => rt.name === "Ocean Front Villa");
        const garden = insertedRoomTypes.find(rt => rt.name === "Tropical Garden Suite");
        const deluxe = insertedRoomTypes.find(rt => rt.name === "Deluxe Ocean Room");

        if (villa) {
            await db.insert(rooms).values([
                { roomTypeId: villa.id, roomNumber: "V101" },
                { roomTypeId: villa.id, roomNumber: "V102" }
            ]);
        }

        if (garden) {
            await db.insert(rooms).values([
                { roomTypeId: garden.id, roomNumber: "G201" },
                { roomTypeId: garden.id, roomNumber: "G202" },
                { roomTypeId: garden.id, roomNumber: "G203" }
            ]);
        }

        if (deluxe) {
            await db.insert(rooms).values([
                { roomTypeId: deluxe.id, roomNumber: "D301" },
                { roomTypeId: deluxe.id, roomNumber: "D302" },
                { roomTypeId: deluxe.id, roomNumber: "D303" },
                { roomTypeId: deluxe.id, roomNumber: "D304" }
            ]);
        }

        return NextResponse.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
