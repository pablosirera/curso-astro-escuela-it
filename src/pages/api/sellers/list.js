import { supabase } from "../../../lib/supabase";

export const prerender = false;

export const GET = async () => {
  const { data, error } = await supabase.from('sellers').select('*');

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
