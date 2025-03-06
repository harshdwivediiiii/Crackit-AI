"use client";

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"; // Added SheetHeader and SheetTitle
import { Menu, Search, LayoutDashboard, ArrowUpCircle, MessageSquare, HelpCircle, HomeIcon } from 'lucide-react';

function Navbar() {
    const path = usePathname();
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const pages = [
        { name: 'Home', link: '/', icon: <HomeIcon size={18} /> },
        { name: 'Dashboard', link: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Questions', link: '/dashboard/questions', icon: <MessageSquare size={18} /> },
        { name: 'Upgrade', link: '/dashboard/upgrade', icon: <ArrowUpCircle size={18} /> },
        { name: 'How it Works?', link: '/dashboard/how', icon: <HelpCircle size={18} /> },
    ];

    useEffect(() => {
        if (search) {
            const filtered = pages.filter(page => page.name.toLowerCase().includes(search.toLowerCase()));
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [search]);

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            {/* Logo */}
            <Image src={'/logo.svg'} width={160} height={100} alt='logo' />

            {/* Desktop Nav */}
            <ul className='hidden md:flex gap-6'>
                {pages.map(({ name, link, icon }) => (
                    <Link key={name} href={link} className='flex items-center gap-2'>
                        <li className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer 
                        ${path === link && 'text-primary font-bold'}`}>
                            {icon} {name}
                        </li>
                    </Link>
                ))}
            </ul>

            {/* Search Bar (Desktop Center) */}
            <div className='hidden md:flex flex-grow justify-center relative'>
                <div className='relative w-[300px]'>
                    <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='pl-8 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-primary'
                    />
                    {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 z-50 shadow-md">
                            {suggestions.map(({ name, link }) => (
                                <div
                                    key={name}
                                    onClick={() => router.push(link)}
                                    className="p-2 cursor-pointer hover:bg-gray-100 transition flex items-center gap-2"
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Corner Section */}
            <div className='flex items-center gap-4 ml-auto'>
                {/* Mobile Nav - Hamburger Menu */}
                <div className="md:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <button className="p-2">
                                <Menu size={28} />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-4 flex flex-col justify-between h-full">

                            {/* Fix: Added SheetHeader & SheetTitle for accessibility */}
                            <SheetHeader>
                                <SheetTitle>Crackit AI</SheetTitle>
                            </SheetHeader>

                            <div className='flex-1'>
                                <Image src={'/logo.svg'} width={120} height={60} alt='logo' className='mb-4' />
                                <ul className='flex flex-col gap-4'>
                                    {pages.map(({ name, link, icon }) => (
                                        <Link key={name} href={link} onClick={() => setIsSheetOpen(false)}>
                                            <li className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer 
                                            ${path === link && 'text-primary font-bold'}`}>
                                                {icon} {name}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>

                                {/* Mobile Search Bar */}
                                <div className="relative mt-6">
                                    <Search className='absolute left-2 text-gray-500' size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className='pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-primary w-full'
                                    />
                                    {suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 z-50 shadow-md">
                                            {suggestions.map(({ name, link }) => (
                                                <div
                                                    key={name}
                                                    onClick={() => {
                                                        router.push(link);
                                                        setIsSheetOpen(false);
                                                    }}
                                                    className="p-2 cursor-pointer hover:bg-gray-100 transition flex items-center gap-2"
                                                >
                                                    {name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* User Button at Bottom */}
                            <div className='border-t pt-4'>
                                <UserButton />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop UserButton (always visible) */}
                <UserButton />
            </div>
        </div>
    );
}

export default Navbar;
