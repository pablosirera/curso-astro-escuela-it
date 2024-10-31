import { supabase } from "../../../lib/supabase";

export const prerender = false;

export const GET = async ({ params, request, redirect }) => {
  const { id } = params;
  const { data, error } = await supabase.from('sellers').select('*').eq('id', id).single();

  // if (!data) {
  //   console.log('data', data)
  //   return redirect('/sellers')
  // }

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export const POST = async ({ params, request, redirect }) => {
  const { id } = params;

  if (request.url.includes('delete')) {
    const { error } = await supabase.from('sellers').delete().eq('id', id);
    if (error) {
      return new Response(error.message, { status: 500 });
    }

    return redirect('/sellers');
  }

  const data = await request.formData();
  const name = data.get('name');
  const avatar = data.get('avatar');
  const location = data.get('location');

  if (!name || !avatar || !location) {
    return new Response('Faltan datos obligatorios', { status: 400 });
  }

  const {error} = await supabase.from('sellers').update({ name, avatar, location }).eq('id', id);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect(`/sellers/${id}`);
}