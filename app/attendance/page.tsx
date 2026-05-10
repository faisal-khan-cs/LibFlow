'use client'; // Sabse pehli line
import LiveClock from "./LiveClock";
import EntryLogSection from "./EntryLogSection";
import { Search, Filter, Download, Calendar, Plus, Users, Check, ShoppingBag, NotebookPen, NotebookPenIcon, LucideNotebookPen, NotebookTabs, PlusCircle, CaseUpperIcon, ArrowBigUp, ArrowDownUpIcon, ArrowUp01Icon, ArrowUp, Notebook } from "lucide-react";

// 1. "export default" likhna zaroori hai
export default function AttendanceLogs() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between flex-row">
      <div className="flex justify-between flex-col">
        <div className="mt-3">
            <LiveClock/>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight m-1">Attendance Logs</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time library entry & bag deposit.</p>
        </div>
        
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 h-15 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all shadow-lg shadow-indigo-100 shrink-0">
          <Plus size={18} />
          New Entry
        </button>
        </div>
      {/* Baaki Table aur Filters ka code yahan aayega jo maine pehle diya tha */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 Present Today */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
            <Users size={20}/>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Present Today</p>
          <h4 className="text-2xl font-black text-slate-800 mt-1">1,284</h4>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">18 from yesteryday</p>
        </div>
        {/* Card 2 Total User Today */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-lime-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
            <Check size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">QR Scans</p>
            <h4 className="text-2xl font-black text-slate-800 mt-1">198</h4>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">80% of total entries</p>
            </div>
        {/* Card 3 Bags Bags deposited */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
            <ShoppingBag size={20}/>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bags Deposited</p>
          <h4 className="text-2xl font-black text-slate-800 mt-1">89</h4>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Next: Bag-1 available</p>
        </div>
        {/* Card 4 Next Bag Tokken */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transitio-shadow">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
            <Notebook size={20}/>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manual ENtries</p>
          <h4 className="text-2xl font-black text-black-800 mt-1">49</h4>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">20% of total entries</p>
        </div>

        
      </div>
      {/* FILTER BAR SECTION */}
<div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-wrap lg:flex-nowrap gap-3 items-center w-full">
  
  {/* 1. SEARCH BAR (Flexible space leta hai) */}
  <div className="relative flex-grow min-w-[250px]">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
    <input 
      type="text" 
      placeholder="Search student or roll no..." 
      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium transition-all"
    />
  </div>

  {/* 2. ENTRY TYPE (All, QR, Manual) */}
  <select className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[120px]">
    <option value="all">All Entries</option>
    <option value="qr">QR Scan</option>
    <option value="manual">Manual Entry</option>
  </select>

  {/* 3. BAG STATUS (All, Deposited, No Bag) */}
  <select className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[130px]">
    <option value="all">All Bags</option>
    <option value="deposited">Deposited</option>
    <option value="none">No Bag</option>
  </select>

  {/* 4. TIME PERIOD (Today, Yesterday, 7 Days) */}
  <select className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[130px]">
    <option value="today">Today</option>
    <option value="yesterday">Yesterday</option>
    <option value="7days">Last 7 Days</option>
    <option value="month">This Month</option>
  </select>

  {/* 5. DEPARTMENT (CS, BA, etc.) */}
  <select className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[120px]">
    <option value="all">All Depts</option>
    <option value="cs">Computer Science</option>
    <option value="ba">Business Admin</option>
    <option value="ee">Electrical Eng.</option>
    <option value="me">Mechanical Eng.</option>
  </select>

</div>
<div className="mt-3">
  <EntryLogSection/>
</div>
      
    </div>

    
  );
}