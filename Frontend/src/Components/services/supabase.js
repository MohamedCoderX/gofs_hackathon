
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://csgzihwihsbymdqpzmen.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZ3ppaHdpaHNieW1kcXB6bWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNTk0NDIsImV4cCI6MjA1NzkzNTQ0Mn0.l7ssGh0tTA5NeQoUUFY9v_KInQH5z7NEpQgNUNiE73o";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);