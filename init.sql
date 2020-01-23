CREATE TABLE users (
    user_id bigserial PRIMARY KEY,
    name varchar(100) NOT NULL
);

CREATE TABLE todos (
    todo_id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    text text NOT NULL
);

CREATE INDEX todos_user_id_idx ON todos (user_id);

