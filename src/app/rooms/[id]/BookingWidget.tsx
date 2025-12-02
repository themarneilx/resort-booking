"use client";

import { useState } from "react";
import { DatePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { PiStarFill, PiWarningCircle } from "react-icons/pi";

const { RangePicker } = DatePicker;

interface RoomType {
    id: number;
    name: string;
    basePrice: number;
    capacity: number;
}

export default function BookingWidget({ room }: { room: RoomType }) {
    const { user } = useAuth();
    const router = useRouter();
    const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [guests, setGuests] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const basePrice = room.basePrice / 100;
    const serviceFee = Math.round(basePrice * 0.1); // 10% service fee

    const days = dates && dates[0] && dates[1] ? dates[1].diff(dates[0], 'day') : 0;
    const totalBase = basePrice * days;
    const total = totalBase + serviceFee;

    const handleBook = async () => {
        setError("");
        if (!user) {
            // Encode the current path to redirect back after login
            router.push(`/login?redirect=/rooms/${room.id}`);
            return;
        }

        if (!dates || !dates[0] || !dates[1]) {
            setError("Please select check-in and check-out dates");
            return;
        }

        setIsLoading(true);

        try {
            const res = await api.post("/bookings", {
                roomTypeId: room.id,
                startDate: dates[0].format("YYYY-MM-DD"),
                endDate: dates[1].format("YYYY-MM-DD"),
                guests,
                totalPrice: total * 100 // Send in cents
            });

            if (res.data.success) {
                message.success("Booking successful!");
                router.push("/manage"); // Redirect to dashboard
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to book room. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 sticky top-24">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-2xl font-bold text-slate-900">₱{basePrice.toLocaleString()}</span>
                    <span className="text-slate-500 text-sm"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                    <PiStarFill className="text-amber-400" />
                    <span>4.9</span>
                    <span className="text-slate-400 font-normal underline decoration-slate-300 ml-1">12 reviews</span>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                    <div className="p-3 border-b border-slate-300 bg-white">
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Dates</label>
                        <RangePicker
                            className="w-full border-none shadow-none p-0"
                            format="YYYY-MM-DD"
                            disabledDate={(current) => current && current < dayjs().endOf('day')}
                            onChange={(values) => setDates(values)}
                        />
                    </div>
                    <div className="p-3 bg-white">
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Guests</label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full text-sm outline-none bg-transparent text-slate-700"
                        >
                            {[...Array(room.capacity)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2">
                        <PiWarningCircle className="text-lg flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    onClick={handleBook}
                    disabled={isLoading || !days}
                    className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-all shadow-lg hover:shadow-brand-500/20 text-lg"
                >
                    {isLoading ? "Processing..." : "Reserve"}
                </button>
            </div>

            {days > 0 && (
                <div className="space-y-3 text-slate-600 text-sm">
                    <p className="text-center text-slate-500 text-xs mb-4">You won't be charged yet</p>
                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">₱{basePrice.toLocaleString()} x {days} nights</span>
                        <span>₱{totalBase.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">Service fee</span>
                        <span>₱{serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between font-bold text-slate-900 text-base">
                        <span>Total</span>
                        <span>₱{total.toLocaleString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
