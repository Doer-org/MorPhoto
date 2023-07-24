CREATE TABLE `User` (
  `user_id`        varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_name`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `image_url`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO User (user_id, user_name, image_url) VALUES ('abc', 'user1', 'https://www.google.com');
INSERT INTO User (user_id, user_name, image_url) VALUES ('cdf', 'user2', 'https://www.google.com');

CREATE TABLE `Morphoto`(
  `morphoto_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `img_url`       varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `parent_id`     varchar(255) COLLATE utf8mb4_bin NOT NULL,
)

INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('abc', 'https://www.google.com', 'abc');
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('cdf', 'https://www.google.com', 'cdf');
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('ghi', 'https://www.google.com', 'abc');
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('jkl', 'https://www.google.com', 'cdf');