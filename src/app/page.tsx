"use client";
import { 
  PiCalendarBlank, 
  PiUsers, 
  PiMagnifyingGlass, 
  PiSparkle, 
  PiWine, 
  PiWaves, 
  PiArrowRight, 
  PiWifiHigh, 
  PiBed, 
  PiCoffee, 
  PiTelevision, 
  PiMartini, 
  PiSun, 
  PiQuotes 
} from "react-icons/pi";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      
      {/* Hero Section */}
      <header className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            src="/drone.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 md:pt-0 md:mt-[-50px]">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs uppercase tracking-widest mb-6 fade-up" style={{ animationDelay: "0.1s" }}>
            Welcome to Paradise
          </span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight fade-up" style={{ animationDelay: "0.2s" }}>
            Your Oasis Awaits
          </h1>
          <p className="text-base md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto font-light fade-up" style={{ animationDelay: "0.3s" }}>
            Experience unparalleled luxury and tranquility where the ocean meets the sky. Book your dream escape today.
          </p>

          {/* Booking Widget (Glassmorphism) */}
          <div className="flex flex-col md:flex-row items-stretch gap-2 p-2 md:p-3 rounded-2xl glass-panel shadow-2xl max-w-4xl mx-auto fade-up" style={{ animationDelay: "0.5s" }}>
              
            {/* Check In */}
            <div 
              onClick={() => alert("Date picker coming soon!")}
              className="flex-1 bg-white/90 hover:bg-white transition-colors rounded-xl px-4 py-2 md:py-3 text-left cursor-pointer group flex flex-col justify-center min-h-[60px] md:min-h-[70px]"
            >
              <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 md:mb-1">Check In</label>
              <div className="flex items-center gap-2 text-slate-800">
                <PiCalendarBlank className="text-brand-500 text-lg" />
                <span className="font-medium whitespace-nowrap text-sm md:text-base">Add Date</span>
              </div>
            </div>

            {/* Check Out */}
            <div 
              onClick={() => alert("Date picker coming soon!")}
              className="flex-1 bg-white/90 hover:bg-white transition-colors rounded-xl px-4 py-2 md:py-3 text-left cursor-pointer group flex flex-col justify-center min-h-[60px] md:min-h-[70px]"
            >
              <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 md:mb-1">Check Out</label>
              <div className="flex items-center gap-2 text-slate-800">
                <PiCalendarBlank className="text-brand-500 text-lg" />
                <span className="font-medium whitespace-nowrap text-sm md:text-base">Add Date</span>
              </div>
            </div>

            {/* Guests */}
            <div 
              onClick={() => alert("Guest selection coming soon!")}
              className="flex-1 bg-white/90 hover:bg-white transition-colors rounded-xl px-4 py-2 md:py-3 text-left cursor-pointer group flex flex-col justify-center min-h-[60px] md:min-h-[70px]"
            >
              <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 md:mb-1">Guests</label>
              <div className="flex items-center gap-2 text-slate-800">
                <PiUsers className="text-brand-500 text-lg" />
                <span className="font-medium whitespace-nowrap text-sm md:text-base">2 Adults, 0 Kids</span>
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={() => alert("Search functionality coming soon!")}
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 md:py-0 rounded-xl font-bold transition-all shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2 md:w-auto w-full min-h-[60px] md:min-h-[70px]"
            >
              <PiMagnifyingGlass className="text-xl" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </header>

      {/* Discover Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Discover Brisa Solei</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              From pristine beaches to world-class amenities, every moment is crafted for your delight. We redefine luxury with a touch of nature.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 rounded-2xl bg-sand-50 hover:bg-white border border-transparent hover:border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <PiSparkle />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-slate-900">World-Class Spa</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Rejuvenate your senses with our holistic wellness treatments, utilizing organic ingredients sourced locally from the island.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-2xl bg-sand-50 hover:bg-white border border-transparent hover:border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <PiWine />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-slate-900">Gourmet Dining</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Savor exquisite flavors from around the globe at our signature restaurants, featuring ocean-to-table seafood and sunset views.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-2xl bg-sand-50 hover:bg-white border border-transparent hover:border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <PiWaves />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-slate-900">Private Beaches</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Relax on secluded shores with crystal-clear waters. Our private cabanas offer the perfect blend of shade and sunshine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section id="rooms" className="py-24 px-6 bg-sand-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Our Accommodations</h2>
              <p className="text-slate-600 max-w-xl">
                Elegant rooms, suites, and villas designed for ultimate comfort. Wake up to the sound of the ocean.
              </p>
            </div>
            <a href="#" className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-2 group">
              View All Rooms <PiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Rooms Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Room 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Ocean Villa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  From ₱25,000/night
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Ocean Front Villa</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">Direct access to the beach with a private infinity pool and spacious terrace.</p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-3 text-slate-400">
                    <PiUsers className="text-lg" title="2 Guests" />
                    <PiWifiHigh className="text-lg" title="Free Wifi" />
                    <PiBed className="text-lg" title="King Bed" />
                  </div>
                  <button className="text-sm font-bold text-brand-600 hover:text-brand-700 uppercase tracking-wide">Details</button>
                </div>
              </div>
            </div>

            {/* Room 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1590490360182-f33efe80a713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Garden Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  From ₱18,000/night
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Tropical Garden Suite</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">Surrounded by lush flora, this suite offers privacy and a serene outdoor rain shower.</p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-3 text-slate-400">
                    <PiUsers className="text-lg" />
                    <PiCoffee className="text-lg" />
                    <PiTelevision className="text-lg" />
                  </div>
                  <button className="text-sm font-bold text-brand-600 hover:text-brand-700 uppercase tracking-wide">Details</button>
                </div>
              </div>
            </div>

            {/* Room 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" alt="Deluxe Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  From ₱15,500/night
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Seaview Deluxe</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">Panoramic views of the horizon from your private balcony. Perfect for couples.</p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-3 text-slate-400">
                    <PiUsers className="text-lg" />
                    <PiMartini className="text-lg" />
                    <PiSun className="text-lg" />
                  </div>
                  <button className="text-sm font-bold text-brand-600 hover:text-brand-700 uppercase tracking-wide">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Scenes from Brisa Solei</h2>
            <p className="text-slate-600">Explore the stunning beauty and luxurious corners of our exclusive resort.</p>
          </div>

          {/* Bento/Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            {/* Item 1 (Large) */}
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80" alt="Beach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h4 className="font-bold text-xl">Private Lagoon</h4>
                <p className="text-sm text-white/80">Crystal clear waters</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Drinks" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
            </div>

            {/* Item 3 */}
            <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img src="https://images.unsplash.com/photo-1559599101-f09722fb2948?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80" alt="Interior" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
            </div>

            {/* Item 4 (Wide) */}
            <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Resort Pool" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h4 className="font-bold text-xl">Infinity Pool</h4>
                <p className="text-sm text-white/80">Sunset views</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / CTA Section */}
      <section className="py-24 px-6 bg-brand-900 relative overflow-hidden">
        {/* Decor pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <PiQuotes className="text-6xl text-brand-500/50 mb-6 inline-block" />
          <h3 className="text-2xl md:text-4xl font-serif text-white leading-relaxed mb-8">
            &quot;Brisa Solei isn&apos;t just a resort; it&apos;s a state of mind. The attention to detail, the warmth of the staff, and the sheer beauty of the location made this the best vacation of my life.&quot;
          </h3>
          <div className="flex items-center justify-center gap-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-12 h-12 rounded-full border-2 border-brand-500" />
            <div className="text-left">
              <p className="text-white font-bold">Marneil Cabahug</p>
              <p className="text-brand-200 text-sm">Stayed in Ocean Villa, Oct 2024</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}