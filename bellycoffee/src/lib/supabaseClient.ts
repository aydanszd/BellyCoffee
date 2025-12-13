import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://qqwyxumtazqjzpaenecf.supabase.co';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxd3l4dW10YXpxanpwYWVuZWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NzM1NDUsImV4cCI6MjA4MTA0OTU0NX0.nKPBuITqWbONBm_kaY6XZPwwihpO3ODaHAFOQcBrfx4';

export const supabase = createClient(supabaseUrl, supabaseKey);