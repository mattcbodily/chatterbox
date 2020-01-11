insert into chat_group (
    group_name,
    group_description,
    private_group
) values (
    ${groupName},
    ${groupDescription},
    ${privateGroup}
)
returning *;