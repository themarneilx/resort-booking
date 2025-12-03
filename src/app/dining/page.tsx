import { PiForkKnife } from "react-icons/pi";

export default function DiningPage() {
    return (
        <main className="min-h-screen bg-sand-50">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Dining"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 text-center text-white px-6 fade-up">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Culinary Delights</h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-white/90">
                        Savor the flavors of paradise with our world-class dining experiences.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-20 text-center fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
                    <PiForkKnife className="text-4xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Coming Soon</h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    We are currently curating an exquisite culinary journey for you.
                    From beachfront seafood feasts to intimate fine dining under the stars,
                    our new menus will be unveiled shortly.
                </p>
                <div className="inline-block px-8 py-3 bg-white rounded-full border border-slate-200 text-slate-500 font-medium text-sm shadow-sm">
                    Stay Tuned
                </div>
            </div>
        </main>
    );
}
