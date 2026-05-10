'use client';
import { Check, PlusCircle, QrCode, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";
import ScanModal from "@/components/ScanModal";
import * as xy from "@/lib/stats-functions"
import EntryLogSection from "./attendance/EntryLogSection";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('librarian');
  const [data, setData] = useState({ total: 0, present: 0, bags: 0, token: '...' });

  const loadStats = async () => {
    const [total, present, bags, token] = await Promise.all([
      xy.getTotalStudentsToday(),
      xy.getActiveInsideCount(),
      xy.getActiveBagsCount(),
      xy.getNextAvailableToken()
    ]);
    setData({ total, present, bags, token });
  };
  return (
    <div className="space-y-8">
      {/*HEADER SECTION */}
      <div className="w-full flex flex-row justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tranking-tight">Library Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Real-Time Attendence & security management.</p>
        </div>
        <button 
      onClick={() => setIsModalOpen(true)}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all shadow-lg shadow-indigo-100 shrink-0">
        <QrCode size={20} />
        Scan Student QR
      </button>
      <ScanModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 Total Students */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
            <Users size={20}/>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Students</p>
          <h4 className="text-2xl font-black text-slate-800 mt-1">{data.total}</h4>
        </div>
        {/* Card 2 Total User Today */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
            <Check size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Present Today</p>
            <h4 className="text-2xl font-black text-slate-800 mt-1">{data.present}</h4>
            </div>
        {/* Card 3 Bags Active */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
            <ShoppingBag size={20}/>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bags Active</p>
          <h4 className="text-2xl font-black text-slate-800 mt-1">{data.bags}</h4>
        </div>
        {/* Card 4 Next Bag Tokken */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transitio-shadow">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
            <PlusCircle size={20}/>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Tokken</p>
          <h4 className="text-2xl font-black text-orange-800 mt-1">{data.token}</h4>
        </div>

        
      </div>

      {/* 3. LIVE ACTIVITY LOG SECTION */}
<div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mt-10">
  <div className="flex justify-between items-center mb-8">
    <h3 className="text-xl font-bold text-slate-800">Live Activity Log</h3>
    <span className="flex items-center gap-2 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
      Live Updates
    </span>
  </div>

  {/* Table Headers */}
  <div className="grid grid-cols-5 text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 mb-4">
    <span>Student Info</span>
    <span>Department</span>
    <span>Status</span>
    <span>Bag Token</span>
    <span className="text-right">Time</span>
  </div>

  {/* Table Rows (Mapping area) */}
  <div className="space-y-3">
    <EntryLogSection/>
  </div>
</div>
<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
  <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-1.5 rounded-[1.5rem] shadow-2xl flex items-center gap-1">
    
    {/* Librarian View Button */}
    <button 
      onClick={() => setActiveView('librarian')}
      className={`px-6 py-2.5 rounded-[1.2rem] text-sm font-bold transition-all ${
        activeView === 'librarian' 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      Librarian View
    </button>

    {/* Student View Button */}
    <button 
      onClick={() => setActiveView('student')}
      className={`px-6 py-2.5 rounded-[1.2rem] text-sm font-bold transition-all ${
        activeView === 'student' 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      Student View
    </button>

  </div>
</div>
    </div>
  );
}