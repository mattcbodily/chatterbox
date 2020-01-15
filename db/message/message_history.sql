select msg.sender, msg.message, mem.username, mem.avatar from messages msg
join member mem on msg.sender = mem.member_id
where msg.group_id = ${id};