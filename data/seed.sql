-- Seed SQL data base
-- ===================================

-- PostgreSQL Drop table
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  flag varchar(255) NOT NULL DEFAULT 'Try to find me!'
);

-- Insert data into the users table
INSERT INTO users (username, password, flag) VALUES
('admin', '348aeb5660fc2140aec35850c4da997', 'flag{d0nt_5t0r3_p455w0rd5_1n_pl41nt3xt}'),
('user', 'd033e22ae348aeb5660fc2', 'Try to find me!'),
('guest', 'd033e22ae348aeb5660fc2', 'Try to find me!'),
('test', 'test', 'Try a little harder!'),
('test2', 'test2', 'Try a little harder!');

