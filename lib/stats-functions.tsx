import { supabase } from "@/lib/supabase";

const today = new Date().toISOString().split('T')[0];

// 1. Aaj ke total students ka count
export const getTotalStudentsToday = async () => {
  const { count, error } = await supabase
    .from('attendence_logs')
    .select('*', { count: 'exact', head: true })
    .gte('time_in', `${today}T00:00:00`);
  if (error) console.error(error);
  return count || 0;
};

// 2. Jo students abhi library ke andar hain (Active)
export const getActiveInsideCount = async () => {
  const { count, error } = await supabase
    .from('attendence_logs')
    .select('*', { count: 'exact', head: true })
    .is('time_out', null)
    .gte('time_in', `${today}T00:00:00`);
  if (error) console.error(error);
  return count || 0;
};

// 3. Jo bags abhi library mein jama hain
export const getActiveBagsCount = async () => {
  const { count, error } = await supabase
    .from('attendence_logs')
    .select('*', { count: 'exact', head: true })
    .is('time_out', null)
    .eq('bag_deposit', true);
  if (error) console.error(error);
  return count || 0;
};

// 4. Next available token (0-200 logic)
export const getNextAvailableToken = async () => {
  const { data: usedTokens } = await supabase
    .from('attendence_logs')
    .select('bag_tkn')
    .is('time_out', null)
    .not('bag_tkn', 'is', null);

  const usedNumbers = usedTokens?.map(t => parseInt(t.bag_tkn.replace('BAG-', ''))) || [];
  
  for (let i = 1; i <= 200; i++) {
    if (!usedNumbers.includes(i)) return `BAG-${i}`;
  }
  return "FULL";
};