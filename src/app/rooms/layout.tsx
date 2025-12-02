"use client";

export default function RoomsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-sand-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white flex flex-col min-h-screen">
            {children}
        </div>
    );
}
