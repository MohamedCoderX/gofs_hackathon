import { createClient } from '@supabase/supabase-js';


const supabaseUrl = "https://csgzihwihsbymdqpzmen.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZ3ppaHdpaHNieW1kcXB6bWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNTk0NDIsImV4cCI6MjA1NzkzNTQ0Mn0.l7ssGh0tTA5NeQoUUFY9v_KInQH5z7NEpQgNUNiE73o";

if(!supabaseUrl || !supabaseKey){
    console.log("missing")
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase