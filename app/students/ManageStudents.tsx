'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Eye, Edit2, Trash2, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function ManageStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);
        // Table 'usr' se data fetch kar rahe hain
        const { data, error } = await supabase
          .from('usr')
          .select('*')
          .order('full_name', { ascending: true });

        if (error) throw error;
        setStudents(data || []);
      } catch (error: any) {
        console.error('Error fetching students:', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. TOP FILTERS BAR */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="relative flex-grow min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input type="text" placeholder="Search by name, ID or department..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
        </div>
        
        {/* Status Tabs */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          {['All', 'Active', 'Inactive'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN TABLE CONTAINER */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Student Directory</h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Managing {students.length} students from Database</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> {loading ? 'Syncing...' : 'Live Sync'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="pb-4 px-2"><input type="checkbox" className="rounded-md border-slate-200" /></th>
                <th className="pb-4">Student</th>
                <th className="pb-4">ID / Roll No</th>
                <th className="pb-4">Department</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-20 text-slate-400 font-bold">Loading students...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-20 text-slate-400 font-bold">No students found in 'usr' table</td></tr>
              ) : (
                students.map((student) => (
                  <tr key={student.system_id} className="group hover:bg-slate-50/50 transition-all">
                    <td className="py-5 px-2"><input type="checkbox" className="rounded-md border-slate-200" /></td>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          {/* Safe Initial Logic */}
                          {student.full_name ? student.full_name.split(' ').map((n:any) => n[0]).join('').toUpperCase() : '??'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{student.full_name || 'N/A'}</span>
                          <span className="text-[11px] text-slate-400 font-medium">System ID: {student.system_id.substring(0,8)}...</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 text-xs font-bold text-slate-500">{student.id}</td>
                    <td className="py-5">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                        {student.depart || 'General'}
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase flex items-center gap-1 w-fit bg-green-50 text-green-600 border border-green-100">
                        <CheckCircle2 size={10} /> Active
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600"><Eye size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600"><Edit2 size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-rose-600"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}