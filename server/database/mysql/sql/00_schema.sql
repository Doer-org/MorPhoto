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
  PRIMARY KEY (`morphoto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('abc', 'https://www.google.com', 'abc');
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('cdf', 'https://www.google.com', 'cdf');
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('ghi', 'https://www.google.com', 'abc');
INSERT INTO Morphoto (morphoto_id, img_url, parent_id) VALUES ('jkl', 'https://www.google.com', 'cdf');

CREATE TABLE `MorphotoLog`( 
  `morphoto_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL, 
  `created_at`    datetime NOT NULL,
  `view_count`    int NOT NULL,
  PRIMARY KEY (`morphoto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO MorphotoLog (morphoto_id, created_at, view_count) VALUES ('abc', '2020-01-01 00:00:00', 1);
INSERT INTO MorphotoLog (morphoto_id, created_at, view_count) VALUES ('cdf', '2020-01-01 00:00:01', 2);
INSERT INTO MorphotoLog (morphoto_id, created_at, view_count) VALUES ('ghi', '2020-01-01 00:00:02', 3);
INSERT INTO MorphotoLog (morphoto_id, created_at, view_count) VALUES ('jkl', '2020-01-01 00:00:03', 4);
