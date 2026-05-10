'use client';
import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '@/lib/supabase';
import { QrCode, Smartphone, Package, CheckCircle2, XCircle } from "lucide-react";

export default function QRScannerSection() {
  const [studentData, setStudentData] = useState<any>(null);
  const [showBagModal, setShowBagModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', msg: '' });

  useEffect(() => {
    // Scanner UI setup
    const scanner = new Html5QrcodeScanner("reader", { 
      fps: 10, 
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    }, false);

    scanner.render(onScanSuccess, (err) => {});

    async function onScanSuccess(decodedText: string) {
      // Step 1: Check if Student exists in 'usr' table
      const { data, error } = await supabase
        .from('usr')
        .select('*')
        .eq('id', decodedText)
        .single();

      if (data) {
        setStudentData(data);
        setShowBagModal(true);
        scanner.pause(true); // Pause scanning while modal is open
      } else {
        setStatusMsg({ type: 'error', msg: 'Student not found!' });
        setTimeout(() => setStatusMsg({ type: '', msg: '' }), 3000);
      }
    }

    return () => scanner.clear();
  }, []);

  async function saveAttendance(hasBag: boolean) {
    setLoading(true);
    // Random token for bag
    const token = hasBag ? `TKN-${Math.floor(100 + Math.random() * 900)}` : null;

    const { error } = await supabase
      .from('attendence_logs')
      .insert([{
        student_id: studentData.id,
        bag_deposit: hasBag,
        bag_tkn: token,
        timestamp: new Date().toISOString()
      }]);

    if (!error) {
      setStatusMsg({ type: 'success', msg: `Success! ${token ? 'Token: '+token : 'Entered'}` });
      setShowBagModal(false);
      // Refresh to resume or clear
      setTimeout(() => window.location.reload(), 2000);
    } else {
      console.error(error);
      alert("Database error: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* Scanner Box */}
      <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6 w-full text-left">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><QrCode size={20} /></div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Live Scanner</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Point QR Code to Camera</p>
          </div>
        </div>
        <div id="reader" className="w-full rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-inner"></div>
        {statusMsg.msg && (
          <div className={`mt-4 px-6 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold animate-bounce ${statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {statusMsg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {statusMsg.msg}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-xl">
        <Smartphone className="absolute -right-10 -bottom-10 text-indigo-500 opacity-20" size={240} />
        <h2 className="text-2xl font-bold mb-4">Quick Entry System</h2>
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider">
            <span className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">1</span> Scan Student QR
          </div>
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider">
            <span className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">2</span> Confirm Bag Deposit
          </div>
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider">
            <span className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">3</span> Log to Database
          </div>
        </div>
      </div>

      {/* Bag Modal */}
      {showBagModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[3.5rem] p-10 max-w-sm w-full shadow-2xl text-center border border-slate-100 animate-in zoom-in-95">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <Package size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">{studentData?.full_name}</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">{studentData?.depart} • {studentData?.id}</p>
            <div className="space-y-3">
              <button onClick={() => saveAttendance(true)} disabled={loading} className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase text-[11px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                {loading ? 'Processing...' : 'Deposit Bag & Enter'}
              </button>
              <button onClick={() => saveAttendance(false)} className="w-full py-5 bg-slate-50 text-slate-400 rounded-[1.5rem] font-black uppercase text-[11px] hover:bg-slate-100 transition-all">
                Enter Without Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}