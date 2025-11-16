import { Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-base-300 text-base-content">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold">Brisa Solei</h2>
            <p className="mt-2 text-sm text-base-content/70">Your personal slice of heaven.</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold tracking-wider uppercase">Navigation</h3>
            <div className="flex flex-col gap-2 mt-4 text-sm">
              <a href="#discover" className="link link-hover">Discover</a>
              <a href="#rooms" className="link link-hover">Rooms</a>
              <a href="#gallery" className="link link-hover">Gallery</a>
              <a href="#contact" className="link link-hover">Contact</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold tracking-wider uppercase">Contact Us</h3>
            <div className="flex flex-col gap-2 mt-4 text-sm">
              <p>123 Luxury Lane</p>
              <p>Medellin, Cebu</p>
              <p>support@brisasolei.com</p>
              <p>+63 991 123 4567</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold tracking-wider uppercase">Stay Updated</h3>
            <p className="mt-4 text-sm">Join our newsletter for exclusive offers.</p>
            <div className="form-control mt-2">
              <div className="join">
                <input type="email" placeholder="Enter your email" className="input input-bordered join-item w-full" />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-base-content/10 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 Brisa Solei. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
