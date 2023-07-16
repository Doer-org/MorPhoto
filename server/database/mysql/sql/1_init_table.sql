CREATE TABLE `Users` (
  `user_id`        varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_name`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `image_url`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO Users (user_id, user_name, image_url) VALUES ('abc', 'user1', 'https://www.google.com');
INSERT INTO Users (user_id, user_name, image_url) VALUES ('cdf', 'user2', 'https://www.google.com');
