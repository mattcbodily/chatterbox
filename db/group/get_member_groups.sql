select * from chat_group cg
join group_member_join gm on cg.group_id = gm.group_id
where gm.member_id = ${id};