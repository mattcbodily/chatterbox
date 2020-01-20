insert into task_board_tasks (
    column_id,
    task_order,
    task,
    priority
) values (
    ${id},
    ${order},
    ${task},
    ${priority}
);