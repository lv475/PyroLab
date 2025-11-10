import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mmcixreakaxqoyvholag.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tY2l4cmVha2F4cW95dmhvbGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTUwNjUsImV4cCI6MjA3ODEzMTA2NX0.JRCEZfzp9nvFqnyK-qvaWfYgyWbWA7101uzhgKSfs6c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
