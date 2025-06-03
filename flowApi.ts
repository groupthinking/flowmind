import { supabase } from './supabaseClient';

export async function setFlowPublicity(flowId: string, user: any, isPublic: boolean) {
  if (!user) throw new Error('Not logged in');
  const { error } = await supabase
    .from('flows')
    .update({ is_public: isPublic, updated_at: new Date().toISOString() })
    .eq('id', flowId)
    .eq('user_id', user.id);
  if (error) throw error;
}

export async function getPublicFlows() {
  const { data, error } = await supabase
    .from('flows')
    .select('id, name, data, updated_at, user_id')
    .eq('is_public', true)
    .order('updated_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data || [];
}

export async function remixFlow(flow: any, user: any) {
  if (!user) throw new Error('Not logged in');
  const { data: insertData, error } = await supabase
    .from('flows')
    .insert([{
      name: flow.name + ' (Remix)',
      data: flow.data,
      user_id: user.id,
      is_public: false,
      remix_of: flow.id,
    }])
    .select('id')
    .single();
  if (error) throw error;
  return insertData.id as string;
}