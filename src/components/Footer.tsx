import { 
  PiSun, 
  PiInstagramLogo, 
  PiFacebookLogo, 
  PiTwitterLogo, 
  PiMapPin, 
  PiEnvelopeSimple, 
  PiPhone 
} from "react-icons/pi";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-20 pb-10 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-1 md:col-span-1">
                <a href="#" className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                        <PiSun />
                    </div>
                    <span className="text-2xl font-serif font-bold text-white">Brisa Solei</span>
                </a>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Your personal slice of heaven. Experience luxury, nature, and comfort in perfect harmony.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-500 text-white flex items-center justify-center transition-colors">
                        <PiInstagramLogo className="text-xl" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-500 text-white flex items-center justify-center transition-colors">
                        <PiFacebookLogo className="text-xl" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-500 text-white flex items-center justify-center transition-colors">
                        <PiTwitterLogo className="text-xl" />
                    </a>
                </div>
            </div>

            {/* Links */}
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resort</h4>
                <ul className="space-y-4 text-sm">
                    <li><a href="#" className="hover:text-brand-400 transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-brand-400 transition-colors">Accommodations</a></li>
                    <li><a href="#" className="hover:text-brand-400 transition-colors">Dining</a></li>
                    <li><a href="#" className="hover:text-brand-400 transition-colors">Spa & Wellness</a></li>
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                        <PiMapPin className="text-brand-500 text-lg mt-0.5" />
                        <span>123 Luxury Lane,<br/>Medellin, Cebu, Philippines</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <PiEnvelopeSimple className="text-brand-500 text-lg" />
                        <a href="mailto:stay@brisasolei.com" className="hover:text-white">stay@brisasolei.com</a>
                    </li>
                    <li className="flex items-center gap-3">
                        <PiPhone className="text-brand-500 text-lg" />
                        <a href="tel:+639911234567" className="hover:text-white">+63 991 123 4567</a>
                    </li>
                </ul>
            </div>

            {/* Newsletter */}
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
                <p className="text-xs text-slate-400 mb-4">Join our newsletter for exclusive offers and seasonal updates.</p>
                <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Your email address" className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-brand-500 text-sm" />
                    <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-3 rounded-lg font-bold text-sm transition-colors">Subscribe</button>
                </form>
            </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
            <p>&copy; 2025 Brisa Solei. All rights reserved.</p>
        </div>
    </footer>
  );
}
