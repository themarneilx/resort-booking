import { db } from "@/lib/db";
import { roomTypes } from "@/lib/db/schema";
import RoomsListClient from "./RoomsListClient";

export const dynamic = 'force-dynamic';

export default async function ViewRoomPage() {
    const rooms = await db.select().from(roomTypes);

    return (
        <>
            {/* Header Section */}
            <header className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent h-32"></div>

                <div className="relative z-10 max-w-7xl mx-auto text-center fade-up">
                    <p className="text-brand-400 uppercase tracking-widest text-xs font-bold mb-3">Sanctuary for the Senses</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Find Your Perfect Stay</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto font-light">
                        From oceanfront villas to secluded garden suites, discover the perfect backdrop for your island escape.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                <RoomsListClient initialRooms={rooms} />
            </main>
        </>
    );
}
