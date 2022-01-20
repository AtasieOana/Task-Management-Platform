-- CREATING TABLES
-- -------------------------------------------------

CREATE TABLE users (
	id int NOT NULL PRIMARY KEY auto_increment,
    email varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    name varchar(100) NOT NULL,
    registration_date date NOT NULL
);

CREATE TABLE boards (
	id int NOT NULL PRIMARY KEY auto_increment,
    name varchar(30) NOT NULL,
    privacy boolean NOT NULL,
    create_date date, 
    background_color varchar(12)
);

CREATE TABLE users_boards (
	id int NOT NULL PRIMARY KEY auto_increment,
	id_board int NOT NULL,
    id_user int NOT NULL,
    user_type varchar(30),
    user_addition_date date,
	FOREIGN KEY (id_board) REFERENCES boards(id) ON DELETE CASCADE,
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE task_list (
	id int NOT NULL PRIMARY KEY auto_increment,
    name varchar(30) NOT NULL,
    create_date date  NOT NULL, 
    id_board int NOT NULL,
    id_user_creator int NOT NULL,
    FOREIGN KEY (id_board) REFERENCES boards(id) ON DELETE CASCADE,
	FOREIGN KEY (id_user_creator) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE task (
	id int NOT NULL PRIMARY KEY auto_increment,
    title varchar(30) NOT NULL,
    content varchar(500),
    create_date date NOT NULL, 
	start_date date, 
	end_date date, 
    label_color varchar(12),
    id_task_list int NOT NULL,
    id_user_creator int NOT NULL,
    FOREIGN KEY (id_task_list) REFERENCES task_list(id) ON DELETE CASCADE,
	FOREIGN KEY (id_user_creator) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE assigned_users_on_task (
	id int NOT NULL PRIMARY KEY auto_increment,
    id_task int NOT NULL,
    id_user int NOT NULL,
    FOREIGN KEY (id_task) REFERENCES task(id) ON DELETE CASCADE,
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE inbox (
 	id int NOT NULL PRIMARY KEY auto_increment,
    send_date date NOT NULL, 
    message varchar(100) NOT NULL, 
    seen boolean NOT NULL,
	id_user int NOT NULL,
	FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);
-- -------------------------------------------------


-- ADDING INITIAL DATA
-- -------------------------------------------------

INSERT INTO users (id, email, password, name, registration_date) VALUES
(1, 'alice@gmail.com', '$2a$10$NRcytjFZ9aBRFde0wft4gOAdwOKWACOz/T13qO0gLoXUBdKbvyCBK', 'Alice', "2021-12-13"),
(2, 'john_01@gmail.com', '$2a$10$t/JFkKS3QrmCpllo9gtaT.EgmBIKX4JW0TDlrN8p6727D6KPHE.l6',  'John_01', "2021-12-13");

INSERT INTO boards (id, name, privacy, create_date, background_color) VALUES
(1, 'Scrum board', 0, "2021-12-13" , '#2ba143'),
(2, 'Web app Project', 0, "2021-12-13", '#6e7ab4');

INSERT INTO users_boards (id, id_board, id_user, user_type, user_addition_date) VALUES
(1, 1, 1, 'admin',  "2021-12-13"),
(2, 1, 2, 'editor',  "2021-12-13"),
(3, 2, 2, 'admin',  "2021-12-13");

INSERT INTO task_list (id, name, create_date, id_board, id_user_creator) VALUES
(1, "User stories", "2021-12-13", 1,  1),
(2, "To do", "2021-12-13", 1,  1),
(3, "Doing", "2021-12-13", 1,  1),
(4, "Done", "2021-12-13", 1,  2),
(5, "Backlog", "2021-12-13", 2,  2),
(7, "Doing", "2021-12-13", 2,  2),
(8, "Complete", "2021-12-13", 2,  2),
(9, "Bugs", "2021-12-13", 2,  2);

INSERT INTO task (id, title, content, create_date, start_date, end_date, label_color, id_task_list, id_user_creator) VALUES
(1, 'Story #1', 'As a user...', "2021-12-13",  "2021-12-15", "2021-12-17", '#e0ffff', 1, 1),
(2, 'Story #2', 'As a user...', "2021-12-13",  null, '2022-01-02', '#e0ffff', 1, 1),
(3, 'Task A', 'The task description should be here', "2021-12-13",  null, null, '#6082b6', 2, 1),
(4, 'Task B', null, "2021-12-13",  "2021-12-20", null,  null , 2, 2),
(5, 'Task C', null, "2021-12-13", null, null, null , 2, 2),
(6, 'Login', 'The user, after creating an account, can log in to the created account. It is necessary to check if the user has an account created.', "2021-12-13", "2021-12-09", "2021-12-11", '#ffa700' , 5, 2),
(7, 'Sign Up', 'The user fills in a form and creates an account', "2021-12-13", null, null, null , 5, 2);

INSERT INTO assigned_users_on_task (id, id_task, id_user) VALUES
(1, 3, 1),
(2, 3, 2),
(3, 5, 2);
