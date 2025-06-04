import { supabase } from './supabaseClient';

export async function likeFlow(flowId: string, user: any, flowOwnerId: string) {
  if (!user) throw new Error('Not logged in');
  await supabase.from('likes').upsert([{ flow_id: flowId, user_id: user.id }]);
  if (user.id !== flowOwnerId) {
    await supabase.from('notifications').insert([{ user_id: flowOwnerId, type: 'like', flow_id: flowId, actor_id: user.id }]);
  }
}
export async function unlikeFlow(flowId: string, user: any) {
  if (!user) throw new Error('Not logged in');
  await supabase.from('likes').delete().eq('flow_id', flowId).eq('user_id', user.id);
}
export async function getFlowLikes(flowId: string) {
  const { count } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('flow_id', flowId);
  return count || 0;
}
export async function userLiked(flowId: string, user: any) {
  if (!user) return false;
  const { count } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('flow_id', flowId).eq('user_id', user.id);
  return count > 0;
}
export async function getFlowComments(flowId: string) {
  const { data } = await supabase.from('comments').select('id, body, created_at, user_id').eq('flow_id', flowId).order('created_at', { ascending: false });
  return data || [];
}
export async function addFlowComment(flowId: string, user: any, body: string, flowOwnerId: string) {
  if (!user) throw new Error('Not logged in');
  await supabase.from('comments').insert([{ flow_id: flowId, user_id: user.id, body }]);
  if (user.id !== flowOwnerId) {
    await supabase.from('notifications').insert([{ user_id: flowOwnerId, type: 'comment', flow_id: flowId, actor_id: user.id }]);
  }
}
export async function getUserProfile(userId: string) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return data;
}
export async function updateUserProfile(user: any, { display_name, avatar_url }: { display_name: string, avatar_url?: string }) {
  if (!user) throw new Error('Not logged in');
  await supabase.from('profiles').upsert([{ id: user.id, email: user.email, display_name, avatar_url }]);
}
export async function getUserNotifications(user: any) {
  if (!user) throw new Error('Not logged in');
  const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
  return data || [];
}
export async function markNotificationsRead(user: any) {
  if (!user) throw new Error('Not logged in');
  await supabase.from('notifications').update({ read: true }).eq('user_id', user.id);
}