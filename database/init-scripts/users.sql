-- Create roles and users
CREATE ROLE login_user WITH LOGIN PASSWORD 'Open@123' CONNECTION LIMIT 10;

-- Grant privileges to roles/users
-- GRANT SELECT ON SCHEMA authentication TO login_user;
-- GRANT INSERT ON TABLE authentication.authentication TO register_user;
-- GRANT ALL PRIVILEGES ON TABLE authentication.authentication_id_seq TO register_user;
-- GRANT INSERT, SELECT ON SCHEMA portfolios TO portfolio_user;
-- GRANT ALL PRIVILEGES ON TABLE portfolios.portfolios_id_seq TO portfolio_user;

-- Insert initial data
-- INSERT INTO authentication.authentication (full_name, email, phone_number, password) VALUES (
--     'test',
--     'test@gmail.com',
--     9999999999,
--     crypt('test', gen_salt('bf'))
-- );
