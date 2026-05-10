import { supabase } from "@/lib/supabase";

// 1. Check if student is already inside
export const getActiveEntry = async (studentId: string) => {
  const { data, error } = await supabase
    .from('attendence_logs')
    .select('*')
    .eq('student_id', studentId)
    .is('time_out', null)
    .single();
  return { data, error };
};

// 2. Check-In Function
export const handleCheckIn = async (studentId: string, hasBag: boolean, token: string | null) => {
  const { error } = await supabase
    .from('attendence_logs')
    .insert([{
      student_id: studentId,
      bag_deposit: hasBag,
      bag_tkn: token,
      time_in: new Date().toISOString(),
      status: 'IN'
    }]);
  return { error };
};

// 3. Check-Out Function
export const handleCheckOut = async (entryId: number) => {
  const { error } = await supabase
    .from('attendence_logs')
    .update({ 
      time_out: new Date().toISOString(), 
      status: 'OUT' 
    })
    .eq('id', entryId);
  return { error };
};