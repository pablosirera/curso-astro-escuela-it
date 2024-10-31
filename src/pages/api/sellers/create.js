import { supabase } from "../../../lib/supabase";

export const prerender = false;

export const POST = async ({ request, redirect }) => {
  const data = await request.formData();
  const name = data.get('name');
  const avatar = data.get('avatar');
  const location = data.get('location');

  if (!name || !avatar || !location) {
    return new Response('Faltan datos obligatorios', { status: 400 });
  }

  const { error } = await supabase.from('sellers').insert([{ name, avatar, location }]);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect('/sellers');
}
