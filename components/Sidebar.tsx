'use client';
import Link from 'next/link';
import {LayoutDashboard, Users, ClipboardList, LogOut, BookAIcon } from 'lucide-react'; //To import the icons
import Dashboard from '@/app/page';
import { usePathname } from 'next/navigation';

export default function Sidebar(){
    const pathname = usePathname();
    const isActive = (path:string) => pathname ===path;
    return(
        <aside className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col p-6 fixed left-0 top-0">
        <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                <BookAIcon size={23}/>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">LibFlow</span>
        </div>
        <nav className="flex-1 space-y-2">
            <Link href="/" 
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
            isActive('/') 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
          }`}
        >
            <LayoutDashboard size={20}/>
            Dashboard
            </Link>
            <Link href="/attendance" 
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
            isActive('/attendance') 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
          }`}
        >
            <ClipboardList size={20}/>
            Attendence Logs
            </Link>
            <Link href="/students" 
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
            isActive('/students') 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
          }`}
        >
            <Users size={20}/>
            Students
            </Link>
        </nav>
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 transition-all mt-auto border-t border-slate-50 pt-4">
            <LogOut size={20}/>
            Sign Out
        </button>
        </aside>
    );
}