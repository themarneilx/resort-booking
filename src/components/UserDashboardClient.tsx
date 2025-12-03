"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api, { setAccessToken } from "@/lib/axios";
import { App, Modal, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
    PiSuitcaseRolling,
    PiUser,
    PiCreditCard,
    PiGear,
    PiSignOut,
    PiCheckCircle,
    PiCalendarCheck,
    PiCalendarX,
    PiClock,
    PiCalendar,
    PiWarningCircle,
    PiReceiptX,
    PiForkKnife
} from "react-icons/pi";

const { RangePicker } = DatePicker;

interface Booking {
    id: string;
    status: "DRAFT" | "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
    totalPrice: number;
    startDate: string;
    endDate: string;
    room: {
        roomNumber: string;
        roomType: {
            id: number;
            name: string;
            images: string[] | null;
            basePrice: number;
        };
    };
}

export default function UserDashboardClient({ userName, bookings }: { userName: string, bookings: Booking[] }) {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [manageModalOpen, setManageModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [newDates, setNewDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const router = useRouter();
    const { message, modal } = App.useApp();

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = async () => {
        try {
            await api.post("/auth/logout");
            setAccessToken(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
            setAccessToken(null);
            router.push("/login");
        }
    };

    const handleManageClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setManageModalOpen(true);
        setNewDates(null);
    };

    const handleCancelBooking = async () => {
        if (!selectedBooking) return;

        modal.confirm({
            title: 'Cancel Booking',
            content: 'Are you sure you want to cancel this booking? This action cannot be undone.',
            okText: 'Yes, Cancel',
            okType: 'danger',
            cancelText: 'No, Keep it',
            onOk: async () => {
                setIsProcessing(true);
                try {
                    await api.patch(`/bookings/${selectedBooking.id}`, { status: "CANCELLED" });
                    message.success("Booking cancelled successfully");
                    setManageModalOpen(false);
                    router.refresh();
                } catch (error: any) {
                    message.error(error.response?.data?.error || "Failed to cancel booking");
                } finally {
                    setIsProcessing(false);
                }
            }
        });
    };

    const handleChangeDates = async () => {
        if (!selectedBooking || !newDates || !newDates[0] || !newDates[1]) {
            message.error("Please select new dates");
            return;
        }

        setIsProcessing(true);
        try {
            await api.patch(`/bookings/${selectedBooking.id}`, {
                startDate: newDates[0].format("YYYY-MM-DD"),
                endDate: newDates[1].format("YYYY-MM-DD")
            });
            message.success("Dates updated! Your booking is now pending approval.");
            setManageModalOpen(false);
            router.refresh();
        } catch (error: any) {
            message.error(error.response?.data?.error || "Failed to update dates");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleBookAgain = (booking: Booking) => {
        router.push(`/rooms/${booking.room.roomType.id}`);
    };

    const upcomingBookings = bookings.filter(b => ["CONFIRMED", "PENDING_PAYMENT"].includes(b.status));
    const historyBookings = bookings.filter(b => b.status === "COMPLETED");
    const cancelledBookings = bookings.filter(b => b.status === "CANCELLED");

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatPrice = (cents: number) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(cents / 100);
    };

    return (
        <main className="flex-grow pt-10 pb-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-10 fade-up">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Welcome back, {userName}</h1>
                    <p className="text-slate-500 mt-2">Manage your stays and explore your upcoming paradise.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-3 fade-up" style={{ animationDelay: "0.1s" }}>
                        <div className="glass-panel rounded-2xl p-6 sticky top-24">
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 text-brand-700 font-bold border border-brand-100 transition-all">
                                        <PiSuitcaseRolling className="text-xl" />
                                        My Bookings
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                                        <PiUser className="text-xl" />
                                        Profile Details
                                    </a>
                                </li>
                                <li>
                                    <a href="/dining" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                                        <PiForkKnife className="text-xl" />
                                        Dining
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                                        <PiCreditCard className="text-xl" />
                                        Payment Methods
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                                        <PiGear className="text-xl" />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <button
                                    onClick={handleLogoutClick}
                                    className="flex items-center gap-3 px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all w-full"
                                >
                                    <PiSignOut className="text-xl" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bookings Content */}
                    <div className="lg:col-span-9 fade-up" style={{ animationDelay: "0.2s" }}>

                        {/* Tabs */}
                        <div className="flex gap-6 mb-6 border-b border-slate-200 pb-1 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("upcoming")}
                                className={`pb-3 font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${activeTab === "upcoming" ? "text-brand-600 border-b-2 border-brand-500" : "text-slate-400 hover:text-slate-600 border-b-2 border-transparent hover:border-slate-300"}`}
                            >
                                Upcoming Stays
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`pb-3 font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${activeTab === "history" ? "text-brand-600 border-b-2 border-brand-500" : "text-slate-400 hover:text-slate-600 border-b-2 border-transparent hover:border-slate-300"}`}
                            >
                                Booking History
                            </button>
                            <button
                                onClick={() => setActiveTab("cancelled")}
                                className={`pb-3 font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${activeTab === "cancelled" ? "text-brand-600 border-b-2 border-brand-500" : "text-slate-400 hover:text-slate-600 border-b-2 border-transparent hover:border-slate-300"}`}
                            >
                                Cancelled
                            </button>
                        </div>

                        {/* Upcoming List Container */}
                        <div className={`${activeTab === "upcoming" ? "block" : "hidden"} space-y-6`}>
                            {upcomingBookings.length === 0 ? (
                                <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-slate-300">
                                    <PiSuitcaseRolling className="text-4xl text-slate-300 mb-2 inline-block" />
                                    <p className="text-slate-500">No upcoming bookings found.</p>
                                </div>
                            ) : (
                                upcomingBookings.map(booking => (
                                    <div key={booking.id} className="glass-panel rounded-2xl p-4 md:p-6 transition-all hover:shadow-lg group">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Image */}
                                            <div className="w-full md:w-64 h-48 md:h-auto shrink-0 rounded-xl overflow-hidden relative">
                                                <img src={booking.room.roomType.images?.[0] || "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute top-3 left-3">
                                                    {booking.status === "CONFIRMED" ? (
                                                        <span className="status-confirmed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 bg-[#d1fae5] text-[#065f46]">
                                                            <PiCheckCircle className="text-lg" /> Confirmed
                                                        </span>
                                                    ) : (
                                                        <span className="status-pending px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 bg-[#fef3c7] text-[#92400e]">
                                                            <PiClock className="text-lg" /> Pending
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-serif font-bold text-slate-900">{booking.room.roomType.name}</h3>
                                                        <p className="text-slate-500 text-sm">Booking ID: #{booking.id.slice(0, 8).toUpperCase()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-serif font-bold text-brand-600">{formatPrice(booking.totalPrice)}</p>
                                                        <p className="text-xs text-slate-400">Total Price</p>
                                                    </div>
                                                </div>

                                                {/* Date Grid */}
                                                <div className="grid grid-cols-2 gap-4 my-4 bg-sand-100/50 p-4 rounded-lg border border-sand-200">
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Check-in</p>
                                                        <p className="text-slate-800 font-semibold flex items-center gap-2">
                                                            <PiCalendarCheck className="text-brand-500" /> {formatDate(booking.startDate)}
                                                        </p>
                                                        <p className="text-xs text-slate-500 pl-6">After 2:00 PM</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Check-out</p>
                                                        <p className="text-slate-800 font-semibold flex items-center gap-2">
                                                            <PiCalendarX className="text-brand-500" /> {formatDate(booking.endDate)}
                                                        </p>
                                                        <p className="text-xs text-slate-500 pl-6">Before 12:00 PM</p>
                                                    </div>
                                                </div>

                                                {booking.status === "PENDING_PAYMENT" && (
                                                    <div className="mb-4">
                                                        <p className="text-sm bg-orange-50 text-orange-800 p-3 rounded-lg border border-orange-100 flex items-start gap-2">
                                                            <PiWarningCircle className="text-lg mt-0.5" />
                                                            Your booking is pending confirmation. You will be notified once confirmed.
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Actions */}
                                                <div className="mt-auto flex flex-col md:flex-row gap-3 pt-2">
                                                    {booking.status === "PENDING_PAYMENT" ? (
                                                        <button disabled className="flex-1 bg-slate-100 text-slate-400 cursor-not-allowed py-2.5 rounded-lg font-medium transition-colors text-sm shadow-none border border-slate-200">
                                                            Pending Approval
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleManageClick(booking)}
                                                            className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-2.5 rounded-lg font-medium transition-colors text-sm shadow-md hover:shadow-brand-500/20"
                                                        >
                                                            Manage Booking
                                                        </button>
                                                    )}
                                                    <button className="px-6 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white rounded-lg font-medium transition-all text-sm">
                                                        Contact Support
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* History List Container */}
                        <div className={`${activeTab === "history" ? "block" : "hidden"} space-y-6`}>
                            {historyBookings.length === 0 ? (
                                <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-slate-300">
                                    <PiReceiptX className="text-4xl text-slate-300 mb-2 inline-block" />
                                    <p className="text-slate-500">No past bookings found.</p>
                                </div>
                            ) : (
                                historyBookings.map(booking => (
                                    <div key={booking.id} className="glass-panel rounded-2xl p-4 md:p-6 opacity-75 hover:opacity-100 transition-opacity">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-48 h-32 shrink-0 rounded-xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                                                <img src={booking.room.roomType.images?.[0] || "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Room" className="w-full h-full object-cover" />
                                                <div className="absolute top-2 left-2">
                                                    <span className="status-completed px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm bg-slate-100 text-slate-600">
                                                        Completed
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <h3 className="text-lg font-serif font-bold text-slate-700">{booking.room.roomType.name}</h3>
                                                    <span className="text-slate-500 font-medium">{formatPrice(booking.totalPrice)}</span>
                                                </div>
                                                <p className="text-slate-500 text-sm mb-3">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleBookAgain(booking)}
                                                        className="text-sm text-brand-600 font-bold hover:underline"
                                                    >
                                                        Book Again
                                                    </button>
                                                    <button className="text-sm text-slate-500 hover:text-slate-800">View Invoice</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Cancelled List Container */}
                        <div className={`${activeTab === "cancelled" ? "block" : "hidden"} space-y-6`}>
                            {cancelledBookings.length === 0 ? (
                                <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-slate-300">
                                    <PiReceiptX className="text-4xl text-slate-300 mb-2 inline-block" />
                                    <p className="text-slate-500">No cancelled bookings found.</p>
                                </div>
                            ) : (
                                cancelledBookings.map(booking => (
                                    <div key={booking.id} className="glass-panel rounded-2xl p-4 md:p-6 opacity-60 hover:opacity-80 transition-opacity">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-48 h-32 shrink-0 rounded-xl overflow-hidden relative grayscale">
                                                <img src={booking.room.roomType.images?.[0] || "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Room" className="w-full h-full object-cover" />
                                                <div className="absolute top-2 left-2">
                                                    <span className="status-cancelled px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm bg-red-100 text-red-600">
                                                        Cancelled
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <h3 className="text-lg font-serif font-bold text-slate-700">{booking.room.roomType.name}</h3>
                                                    <span className="text-slate-500 font-medium">{formatPrice(booking.totalPrice)}</span>
                                                </div>
                                                <p className="text-slate-500 text-sm mb-3">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleBookAgain(booking)}
                                                        className="text-sm text-brand-600 font-bold hover:underline"
                                                    >
                                                        Book Again
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full fade-up">
                        <div className="text-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-3">
                                <PiSignOut className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Sign Out?</h3>
                            <p className="text-slate-500 text-sm">Are you sure you want to leave your paradise dashboard?</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Booking Modal */}
            <Modal
                title={<span className="font-serif font-bold text-xl">Manage Booking</span>}
                open={manageModalOpen}
                onCancel={() => setManageModalOpen(false)}
                footer={null}
                centered
                className="font-sans"
            >
                {selectedBooking && (
                    <div className="space-y-6 pt-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-1">{selectedBooking.room.roomType.name}</h4>
                            <p className="text-sm text-slate-500 mb-3">
                                {formatDate(selectedBooking.startDate)} - {formatDate(selectedBooking.endDate)}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${selectedBooking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {selectedBooking.status === 'CONFIRMED' ? 'Confirmed' : 'Pending'}
                                </span>
                                <span className="text-slate-400">•</span>
                                <span className="font-medium text-slate-700">{formatPrice(selectedBooking.totalPrice)}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Change Dates</label>
                            <p className="text-xs text-slate-500 mb-2">Changing dates will require admin re-approval.</p>
                            <RangePicker
                                className="w-full"
                                format="YYYY-MM-DD"
                                disabledDate={(current) => current && current < dayjs().endOf('day')}
                                onChange={(dates) => setNewDates(dates)}
                            />
                            <button
                                onClick={handleChangeDates}
                                disabled={!newDates || isProcessing}
                                className="mt-3 w-full bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-all"
                            >
                                {isProcessing ? "Updating..." : "Request Date Change"}
                            </button>
                        </div>

                        <div className="border-t border-slate-200 pt-4">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Cancellation</label>
                            <p className="text-xs text-slate-500 mb-3">
                                Cancellation policies apply. This action cannot be undone.
                            </p>
                            <button
                                onClick={handleCancelBooking}
                                disabled={isProcessing}
                                className="w-full border border-red-200 text-red-600 hover:bg-red-50 font-bold py-2.5 rounded-lg transition-all"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </main>
    );
}
