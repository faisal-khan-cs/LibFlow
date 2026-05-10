"use client";
import {X, Camera } from "lucide-react";
import QRScannerSection from "./QRScannerSection";

interface ScanModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ScanModal({ isOpen, onClose}: ScanModalProps){
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z0[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl m-4">
                {/* HEADER  */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Scan Student QR</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                       <X size={20} className="text-slate-400" /> 
                    </button>
                </div>

                {/*Camera PlaceHolder */}
                <div className="aspect-square bg-slate-100 rounded-[2rem] border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-400 overflow-hidden relative">
                    <QRScannerSection/>
                </div>
                {/* FOOTER Info */}
                <p className="mt-6 text-center text-xs text-slate-400 font leading-relaxed">
                    Align the Student&apos;s ID card QR code within the frame to automatically log attendence.
                </p>
            </div>
        </div>
    )
}