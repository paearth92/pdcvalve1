alter function public.portal_decline_access_request(uuid,text) security invoker;
grant execute on function pdc_private.decline_portal_access_request(uuid,text) to authenticated;
