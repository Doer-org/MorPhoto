INSERT INTO User (user_id, user_name, image_url) VALUES ('abc', 'user1', 'https://www.google.com');
INSERT INTO User (user_id, user_name, image_url) VALUES ('cdf', 'user2', 'https://www.google.com');


INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('abc', 'https://www.google.com', NULL);
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('cdf', 'https://www.google.com', NULL);
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('ghi', 'https://www.google.com', 'abc');
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('jkl', 'https://www.google.com', 'cdf');

INSERT INTO MorphotoLog (morphoto_id, created_at, view_count) VALUES ('abc', '2020-01-01 00:00:00', 1);
INSERT INTO MorphotoLog (morphoto_id, created_at, view_count) VALUES ('cdf', '2020-01-01 00:00:01', 2);
INSERT INTO MorphotoLog (morphoto_id, created_at, view_count) VALUES ('ghi', '2020-01-01 00:00:02', 3);
INSERT INTO MorphotoLog (morphoto_id, created_at, view_count) VALUES ('jkl', '2020-01-01 00:00:03', 4);
