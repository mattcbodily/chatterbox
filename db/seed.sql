create table if not exists member (
    member_id serial primary key,
    username varchar(20) not null,
    email varchar(150) not null,
    password varchar(250) not null,
    admin boolean not null
);

create table if not exists chat_group (
    group_id serial primary key,
    group_name varchar(20) not null,
    group_description text,
    private_group boolean not null,
    taskboard boolean not null
);

create table if not exists group_member_join (
    group_member_id serial primary key,
    member_id int references member(member_id),
    group_id int references chat_group(group_id)
);

create table if not exists messages (
	message_id serial primary key,
	group_id int references chat_group(group_id),
	sender int references member(member_id),
    message text
);

create table if not exists task_board_columns (
    column_id serial primary key,
    group_id int references chat_group(group_id) not null,
    column_order int not null,
    column_name varchar(30)
);

create table if not exists task_board_tasks (
    task_id serial primary key,
    column_id int references task_board_columns(column_id) not null,
    member_id int references member(member_id),
    task_order int not null,
    task varchar(50),
    priority varchar(20)
);