import { createClient } from "@supabase/supabase-js";

const apiUrl = 'https://vuddufpsepkxatpvubqq.supabase.co';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZGR1ZnBzZXBreGF0cHZ1YnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzkxODAsImV4cCI6MjA3NTM1NTE4MH0.TZtm75GTzhB6D6g66Eexf4qBC3Wdi0CpVAJzgXsiNiQ';

export const supabase = createClient(apiUrl,apiKey);