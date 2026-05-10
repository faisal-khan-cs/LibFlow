//import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
//const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Humne check lagaya hai ke agar keys miss hon toh error de
////if (!supabaseUrl || !supabaseAnonKey) {
  //throw new Error('Missing Supabase Environment Variables');
//}

//export const supabase = createClient(supabaseUrl, supabaseAnonKey);


import { createClient } from '@supabase/supabase-js';

// lib/supabase.ts
console.log("Key Length:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);