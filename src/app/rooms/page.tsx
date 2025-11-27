"use client";

import { useState } from "react";
import { 
  PiUsers, 
  PiBed, 
  PiArrowsOutSimple, 
  PiHeart, 
  PiCalendarCheck, 
  PiArrowRight
} from "react-icons/pi";

export default function ViewRoomPage() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
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
    setCheckInDate("");
    setCheckOutDate("");
    setPriceRange(50000);
    setSelectedCategories([]);
    setSelectedAmenities([]);
    setSortBy("Recommended");
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          
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
                              <div>
                                  <label className="text-xs text-slate-400 block mb-1">Check In</label>
                                  <input 
                                    type="date" 
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500 text-slate-600"
                                  />
                              </div>
                              <div>
                                  <label className="text-xs text-slate-400 block mb-1">Check Out</label>
                                  <input 
                                    type="date" 
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500 text-slate-600"
                                  />
                              </div>
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
                                  <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Villas (3)</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer group">
                                  <input 
                                    type="checkbox" 
                                    value="Suites"
                                    checked={selectedCategories.includes("Suites")}
                                    onChange={() => handleCategoryChange("Suites")}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                                  />
                                  <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Suites (5)</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer group">
                                  <input 
                                    type="checkbox" 
                                    value="Deluxe Rooms"
                                    checked={selectedCategories.includes("Deluxe Rooms")}
                                    onChange={() => handleCategoryChange("Deluxe Rooms")}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                                  />
                                  <span className="text-slate-600 group-hover:text-brand-600 transition-colors text-sm">Deluxe Rooms (8)</span>
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
                      <p className="text-slate-500 text-sm">Showing <span className="font-bold text-slate-800">5</span> available rooms</p>
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
                      
                      {/* Room Card 1 (Villa) */}
                      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100">
                          <div className="relative h-64 overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Ocean Villa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute top-4 right-4 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                  Popular Choice
                              </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Ocean Front Villa</h3>
                                  <div className="text-right">
                                      <span className="block text-lg font-bold text-slate-900">₱25,000</span>
                                      <span className="text-xs text-slate-400">/ night</span>
                                  </div>
                              </div>
                              <p className="text-slate-500 text-sm mb-4 line-clamp-2">Direct access to the beach with a private infinity pool and spacious terrace. Experience luxury at its finest.</p>
                              
                              {/* Icons */}
                              <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs" title="2 Guests">
                                      <PiUsers className="text-lg text-brand-500" /> 2 Adults
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs" title="1 King Bed">
                                      <PiBed className="text-lg text-brand-500" /> King Bed
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs" title="180 sqm">
                                      <PiArrowsOutSimple className="text-lg text-brand-500" /> 180m²
                                  </div>
                              </div>

                              <div className="mt-auto flex gap-3">
                                  <button className="flex-1 bg-slate-900 hover:bg-brand-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-brand-500/20">Book Now</button>
                                  <button className="px-4 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                                      <PiHeart className="text-xl" />
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Room Card 2 (Garden Suite) */}
                      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100">
                          <div className="relative h-64 overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1590490360182-f33efe80a7lib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Garden Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Tropical Garden Suite</h3>
                                  <div className="text-right">
                                      <span className="block text-lg font-bold text-slate-900">₱18,000</span>
                                      <span className="text-xs text-slate-400">/ night</span>
                                  </div>
                              </div>
                              <p className="text-slate-500 text-sm mb-4 line-clamp-2">Surrounded by lush flora, this suite offers privacy and a serene outdoor rain shower. Perfect for nature lovers.</p>
                              
                              <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiUsers className="text-lg text-brand-500" /> 2 Adults, 1 Child
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiBed className="text-lg text-brand-500" /> Queen Bed
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiArrowsOutSimple className="text-lg text-brand-500" /> 120m²
                                  </div>
                              </div>

                              <div className="mt-auto flex gap-3">
                                  <button className="flex-1 bg-slate-900 hover:bg-brand-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-brand-500/20">Book Now</button>
                                  <button className="px-4 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                                      <PiHeart className="text-xl" />
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Room Card 3 (Seaview Deluxe) */}
                      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100">
                          <div className="relative h-64 overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" alt="Deluxe Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Seaview Deluxe</h3>
                                  <div className="text-right">
                                      <span className="block text-lg font-bold text-slate-900">₱15,500</span>
                                      <span className="text-xs text-slate-400">/ night</span>
                                  </div>
                              </div>
                              <p className="text-slate-500 text-sm mb-4 line-clamp-2">Panoramic views of the horizon from your private balcony. A romantic setting for couples seeking tranquility.</p>
                              
                              <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiUsers className="text-lg text-brand-500" /> 2 Adults
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiBed className="text-lg text-brand-500" /> Queen Bed
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiArrowsOutSimple className="text-lg text-brand-500" /> 80m²
                                  </div>
                              </div>

                              <div className="mt-auto flex gap-3">
                                  <button className="flex-1 bg-slate-900 hover:bg-brand-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-brand-500/20">Book Now</button>
                                  <button className="px-4 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                                      <PiHeart className="text-xl" />
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Room Card 4 (Family Suite) */}
                      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100">
                          <div className="relative h-64 overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Family Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Grand Family Suite</h3>
                                  <div className="text-right">
                                      <span className="block text-lg font-bold text-slate-900">₱32,000</span>
                                      <span className="text-xs text-slate-400">/ night</span>
                                  </div>
                              </div>
                              <p className="text-slate-500 text-sm mb-4 line-clamp-2">Spacious accommodation featuring two bedrooms, a living area, and direct pool access. Ideal for large families.</p>
                              
                              <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiUsers className="text-lg text-brand-500" /> 4 Adults, 2 Kids
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiBed className="text-lg text-brand-500" /> 2 King Beds
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                      <PiArrowsOutSimple className="text-lg text-brand-500" /> 220m²
                                  </div>
                              </div>

                              <div className="mt-auto flex gap-3">
                                  <button className="flex-1 bg-slate-900 hover:bg-brand-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-brand-500/20">Book Now</button>
                                  <button className="px-4 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                                      <PiHeart className="text-xl" />
                                  </button>
                              </div>
                          </div>
                      </div>

                  </div>

                  {/* Load More */}
                  <div className="mt-12 text-center">
                      <button className="px-8 py-3 border border-slate-300 text-slate-600 font-bold rounded-full hover:bg-white hover:text-brand-600 hover:border-brand-500 transition-all text-sm uppercase tracking-wide">
                          Load More Rooms
                      </button>
                  </div>
              </div>
          </div>
      </main>
    </>
  );
}
