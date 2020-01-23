CREATE TABLE "User" (
    user_id bigserial PRIMARY KEY,
    name varchar(100) NOT NULL
);

CREATE TABLE "TodoItem" (
    todo_id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES "User" (user_id) ON DELETE CASCADE,
    text text NOT NULL
);

CREATE INDEX todo_item_user_id_idx ON "TodoItem" (user_id);

