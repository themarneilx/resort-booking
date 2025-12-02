import { db } from "@/lib/db";
import { roomTypes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingWidget from "./BookingWidget";
import { PiCheck, PiUsers, PiBed, PiWifiHigh, PiTelevision, PiSwimmingPool, PiDrop, PiArrowLeft } from "react-icons/pi";

// Helper to map amenity string to icon
const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("Wi-Fi")) return <PiWifiHigh />;
    if (amenity.includes("TV")) return <PiTelevision />;
    if (amenity.includes("Pool")) return <PiSwimmingPool />;
    if (amenity.includes("Shower") || amenity.includes("Bath")) return <PiDrop />;
    return <PiCheck />;
};

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) notFound();

    const room = await db.query.roomTypes.findFirst({
        where: eq(roomTypes.id, id)
    });

    if (!room) notFound();

    return (
        <main className="bg-sand-50 min-h-screen pb-20">
            {/* Hero Image */}
            <div className="h-[60vh] relative">
                <img src={(room.images && room.images[0]) || "https://via.placeholder.com/1200"} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent h-32"></div>

                {/* Back Button */}
                <div className="absolute top-24 left-6 md:left-12 z-10">
                    <Link href="/rooms" className="flex items-center gap-2 !bg-white !text-slate-900 hover:!bg-slate-100 px-5 py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl font-bold text-sm">
                        <PiArrowLeft className="text-lg" /> Back to Rooms
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white fade-up">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{room.name}</h1>
                        <div className="flex gap-6 text-sm md:text-base font-medium">
                            <span className="flex items-center gap-2"><PiUsers className="text-xl" /> {room.capacity} Guests</span>
                            <span className="flex items-center gap-2"><PiBed className="text-xl" /> {(room.amenities || []).find((a: string) => a.includes("Bed")) || "King Bed"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">About this space</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">{room.description}</p>
                    </section>

                    {/* Amenities */}
                    <section className="border-t border-slate-200 pt-12">
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">What this place offers</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {(room.amenities || []).map((amenity: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 text-slate-700">
                                    <span className="text-2xl text-slate-400">{getAmenityIcon(amenity)}</span>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Sidebar */}
                <div className="relative">
                    <BookingWidget room={room} />
                </div>
            </div>
        </main>
    );
}
