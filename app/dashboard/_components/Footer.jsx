"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Footer() {
    return (
        <footer className="w-full bg-primary/10 text-primary py-6 mt-10">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Logo & Branding */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="group">
                            <Image
                                src="/c.png"
                                alt="Crackit AI Logo"
                                width={50}
                                height={50}
                                className="cursor-pointer transition-transform group-hover:scale-110"
                            />
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">Your Personal AI Interview Coach</p>
                    </div>

                    {/* Quick Links */}
                    <nav className="flex space-x-6">
                        <Link href="/about" className="text-sm text-gray-700 hover:text-primary transition">
                            About Us
                        </Link>
                        <Link href="/Howitworks" className="text-sm text-gray-700 hover:text-primary transition">
                            How It Works
                        </Link>
                        <Link href="/contact" className="text-sm text-gray-700 hover:text-primary transition">
                            Contact
                        </Link>
                        <Link href="/privacy-policy" className="text-sm text-gray-700 hover:text-primary transition">
                            Privacy Policy
                        </Link>
                    </nav>

                    {/* Social Links + Contact */}
                    <div className="flex flex-col items-center md:items-end space-y-2">
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/70 transition"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/70 transition"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/70 transition"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/70 transition"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                        {/* Email */}
                        <div className="flex items-center space-x-2 text-gray-700">
                            <Mail size={18} />
                            <a
                                href="mailto:harshvardhandwivedi18@gmail.com"
                                className="text-sm hover:text-primary transition"
                            >
                                harshvardhandwivedi18@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="mt-6 text-center text-gray-500 text-xs">
                    © {new Date().getFullYear()} Crackit AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
