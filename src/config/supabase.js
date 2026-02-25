import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://govsmaqzjvxfzmsjdijt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdnNtYXF6anZ4Znptc2pkaWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTQxOTgsImV4cCI6MjA4NzU3MDE5OH0.FUUaq_J3QI_qGCl6xSmilPDV7ah3-CcRB5wuG57xGaY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);