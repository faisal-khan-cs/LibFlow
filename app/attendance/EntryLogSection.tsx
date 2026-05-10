'use client';
import { Eye, Edit2, ChevronLeft, ChevronRight, FileText, FileSpreadsheet, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EntryLogSection() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. DATA FETCHING LOGIC
  async function fetchLogs() {
    try {
      setLoading(true);
      
      // 'method' column ko query se nikal diya hai taake error na aaye
      const { data, error } = await supabase
        .from('attendence_logs')
        .select(`
          id,
          bag_deposit,
          bag_tkn,
          time_in,
          time_out,
          usr (
            full_name,
            depart,
            id
          )
        `)
        .order('time_in', { ascending: false });

      if (error) throw error;

      setLogs(data || []);
    } catch (error: any) {
      console.error('Error fetching logs:', error.message);
      alert("Database error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // 2. RUN ON PAGE LOAD
  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6">
      
      {/* --- LEFT SIDE: MAIN TABLE --- */}
      <div className="flex-[3] bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Entry Records</h2>
            <p className="text-xs text-slate-400 font-medium">Showing real-time database logs</p>
          </div>
          <button 
            onClick={fetchLogs}
            disabled={loading}
            className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            <RefreshCcw size={12} className={loading ? "animate-spin" : ""} />
            {loading ? 'Syncing...' : `${logs.length} records`}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="pb-4 pr-4">#</th>
                <th className="pb-4">Student</th>
                <th className="pb-4">Department</th>
                <th className="pb-4">Entry Time</th>
                <th className="pb-4">Bag Token</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCcw className="animate-spin text-indigo-600" size={24} />
                      <span className="text-slate-400 font-bold text-sm">Syncing with database...</span>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-slate-400 font-bold">
                    No logs found in attendence_logs table.
                  </td>
                </tr>
              ) : (
                logs.map((row, index) => (
                  <tr key={row.id} className="group hover:bg-slate-50/50 transition-all">
                    <td className="py-4 text-xs font-bold text-slate-300">{index + 1}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-sm uppercase`}>
                          {row.usr?.full_name?.substring(0, 2) || '??'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{row.usr?.full_name || 'Unknown'}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{row.usr?.id || 'No ID'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-[11px] font-bold text-slate-500 border border-slate-100 px-3 py-1 rounded-lg">
                        {row.usr?.depart || 'General'}
                      </span>
                    </td>
                    <td className="py-4 text-xs font-bold text-slate-500">
                        {row.time_in ? row.time_in : '--:--'}
                    </td>
                    <td className="py-4 text-[10px] font-mono font-bold text-slate-400">
                      {row.bag_tkn ? <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-600">{row.bag_tkn}</span> : "—"}
                    </td>
                    <td className="py-4">
                      <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase ${row.bag_deposit ? 'text-green-600' : 'text-slate-400'}`}>
                        <span className={`w-1 h-1 rounded-full ${row.bag_deposit ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                        {row.bag_deposit ? 'Deposited' : 'No Bag'}
                      </span>
                    </td>
                    <td className="py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 hover:bg-white hover:shadow-md rounded-lg text-slate-400 hover:text-indigo-600 transition-all"><Eye size={16} /></button>
                        <button className="p-1.5 hover:bg-white hover:shadow-md rounded-lg text-slate-400 hover:text-rose-600 transition-all"><Edit2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- RIGHT SIDE: STATS SIDEBAR --- */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-wider">Latest Activity</h3>
          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.slice(0, 5).map((act) => (
                <div key={act.id} className="flex gap-3 border-l-2 border-indigo-100 pl-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{act.usr?.full_name}</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">
                      {act.bag_deposit ? `Bag: ${act.bag_tkn}` : 'No Bag'} • {act.time_in ? act.time_in : '--:--'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No recent activity</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}