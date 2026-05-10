'use client';
import ManageStudents from "./ManageStudents";
import {Plus, DownloadIcon, } from "lucide-react";
export default function AttendanceLogs() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between flex-row">
      <div className="flex justify-between flex-col">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight m-1">Users Directory</h1>
          <p className="text-slate-500 font-medium mt-1">Those who can access library.</p>
        </div>
        
      </div>
      <div className="flex justify-between flex-row gap-4">
      <button className="bg-white hover:bg-gray-400 h-15 text-black px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all shadow-lg shadow-indigo-100 shrink-0">
          <DownloadIcon size={18} />
          Export pdf
        </button>
      <button className="bg-indigo-600 hover:bg-indigo-700 h-15 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all shadow-lg shadow-indigo-100 shrink-0">
          <Plus size={18} />
          Add User
        </button>
        </div>
        </div>
        <div className="mt-3">
            <ManageStudents/>
        </div>
    </div>
  );}