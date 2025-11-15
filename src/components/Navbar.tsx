"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/80 sticky top-0 z-50 border-b border-base-200">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">🌴 Paradise Resorts</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base-content/80">
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#whyus">Why us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a href="#booking" className="btn btn-primary rounded-full">Book now</a>
      </div>
    </div>
  );
}
