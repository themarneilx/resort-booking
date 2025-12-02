"use client";

import { useState } from "react";
import Link from "next/link";
import { DatePicker, ConfigProvider } from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
    PiUsers,
    PiBed,
    PiArrowsOutSimple,
    PiHeart,
    PiCalendarCheck,
    PiArrowRight
} from "react-icons/pi";

const { RangePicker } = DatePicker;

interface RoomType {
    id: number;
    name: string;
    description: string | null;
    basePrice: number;
    capacity: number;
    amenities: string[] | null;
    images: string[] | null;
}

interface RoomsListClientProps {
    initialRooms: RoomType[];
}

export default function RoomsListClient({ initialRooms }: RoomsListClientProps) {
    const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [priceRange, setPriceRange] = useState(50000);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("Recommended");

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleAmenityChange = (amenity: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        );
    };

    const handleResetFilters = () => {
        setDates(null);
        setPriceRange(50000);
        setSelectedCategories([]);
        setSelectedAmenities([]);
        setSortBy("Recommended");
    };

    // Filter logic
    const filteredRooms = initialRooms.filter(room => {
        // Price filter (basePrice is in cents, so divide by 100)
        const price = room.basePrice / 100;
        if (price > priceRange) return false;

        // Category filter (heuristic matching name)
        if (selectedCategories.length > 0) {
            const matches = selectedCategories.some(cat => {
                if (cat === "Villas") return room.name.includes("Villa");
                if (cat === "Suites") return room.name.includes("Suite");
                if (cat === "Deluxe Rooms") return room.name.includes("Deluxe") || room.name.includes("Room");
                return false;
            });
            if (!matches) return false;
        }

        // Amenity filter
        if (selectedAmenities.length > 0) {
            const matches = selectedAmenities.every(amenity =>
                (room.amenities || []).some(a => a.includes(amenity))
            );
            if (!matches) return false;
        }

        // Date filter (Placeholder logic: In a real app, we would check availability against DB)
        // For now, we just ensure dates are selected if required, or we could filter out rooms that are definitely booked.
        // Since we don't have availability data in 'initialRooms', we'll skip logic or assume all available.
        // Ideally, this component should receive available room IDs or fetch them.
        
        return true;
    });

    // Sort logic
    const sortedRooms = [...filteredRooms].sort((a, b) => {
        if (sortBy === "Price: Low to High") {
            return a.basePrice - b.basePrice;
        }
        if (sortBy === "Price: High to Low") {
            return b.basePrice - a.basePrice;
        }
        return 0; // Default / Recommended
    });

    return (
        <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-8 fade-up" style={{ animationDelay: "0.1s" }}>
                <div className="glass-panel p-6 rounded-2xl sticky top-24">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif font-bold text-xl text-slate-800">Filters</h3>
                        <button onClick={handleResetFilters} className="text-xs text-brand-600 font-bold hover:underline">Reset</button>
                    </div>

                    {/* Dates */}
                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Dates</h4>
                        <div className="space-y-3">
                            <ConfigProvider theme={{ token: { colorPrimary: '#0ea5e9' } }}>
                                <RangePicker
                                    value={dates}
                                    onChange={(values) => setDates(values)}
                                    className="w-full border-slate-200 py-2"
                                    format="YYYY-MM-DD"
                                />
                            </ConfigProvider>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Price Range</h4>
                        <input
                            type="range"
                            min="5000"
                            max="100000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full mb-2"
                        />
                        <div className="flex justify-between text-sm font-medium text-slate-600">
                            <span>₱5k</span>
                            <span>₱{priceRange / 1000}k+</span>
                        </div>
                    </div>

                    {/* Room Categories */}
                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Categories</h4>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    value="Villas"
                                    checked={selectedCategories.includes("Villas")}
                                    onChange={() => handleCategoryChange("Villas")}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                                />
                                <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Villas</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    value="Suites"
                                    checked={selectedCategories.includes("Suites")}
                                    onChange={() => handleCategoryChange("Suites")}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                                />
                                <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Suites</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    value="Deluxe Rooms"
                                    checked={selectedCategories.includes("Deluxe Rooms")}
                                    onChange={() => handleCategoryChange("Deluxe Rooms")}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                                />
                                <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Deluxe Rooms</span>
                            </label>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Amenities</h4>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    value="Ocean View"
                                    checked={selectedAmenities.includes("Ocean View")}
                                    onChange={() => handleAmenityChange("Ocean View")}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                                />
                                <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Ocean View</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    value="Private Pool"
                                    checked={selectedAmenities.includes("Private Pool")}
                                    onChange={() => handleAmenityChange("Private Pool")}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                                />
                                <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Private Pool</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    value="Bathtub"
                                    checked={selectedAmenities.includes("Bathtub")}
                                    onChange={() => handleAmenityChange("Bathtub")}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                                />
                                <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Bathtub</span>
                            </label>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Room Grid */}
            <div className="flex-1">
                {/* Sorting Bar */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-slate-500 text-sm">Showing <span className="font-bold text-slate-800">{sortedRooms.length}</span> available rooms</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500 hidden sm:inline">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2 outline-none"
                        >
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 fade-up" style={{ animationDelay: "0.2s" }}>

                    {sortedRooms.map((room) => (
                        <div key={room.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100">
                            <div className="relative h-64 overflow-hidden">
                                <img src={(room.images && room.images[0]) || "https://via.placeholder.com/400"} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                {room.name.includes("Villa") && (
                                    <div className="absolute top-4 right-4 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        Popular Choice
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{room.name}</h3>
                                    <div className="text-right">
                                        <span className="block text-lg font-bold text-slate-900">₱{(room.basePrice / 100).toLocaleString()}</span>
                                        <span className="text-xs text-slate-400">/ night</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{room.description}</p>

                                {/* Icons */}
                                <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs" title={`${room.capacity} Guests`}>
                                        <PiUsers className="text-lg text-brand-500" /> {room.capacity} Guests
                                    </div>
                                    {/* Heuristic for bed type */}
                                    {(room.amenities || []).find(a => a.includes("Bed")) && (
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                            <PiBed className="text-lg text-brand-500" /> {(room.amenities || []).find(a => a.includes("Bed"))}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto flex gap-3">
                                    <Link href={`/rooms/${room.id}`} className="flex-1 !bg-slate-900 hover:!bg-brand-600 !text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-brand-500/20 text-center flex items-center justify-center">
                                        Book Now
                                    </Link>
                                    <button className="px-4 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                                        <PiHeart className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Load More */}
                <div className="mt-12 text-center">
                    <button className="px-8 py-3 border border-slate-300 text-slate-600 font-bold rounded-full hover:bg-white hover:text-brand-600 hover:border-brand-500 transition-all text-sm uppercase tracking-wide">
                        Load More Rooms
                    </button>
                </div>
            </div>
        </div>
    );
}
