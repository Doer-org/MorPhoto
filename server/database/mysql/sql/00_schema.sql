CREATE TABLE `User` (
  `user_id`        varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_name`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `image_url`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Morphoto`(
  `morphoto_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `img_url`       varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `parent_id`     varchar(255) COLLATE utf8mb4_bin,
  PRIMARY KEY (`morphoto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `MorphotoLog`( 
  `morphoto_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL, 
  `created_at`    datetime NOT NULL,
  `view_count`    int NOT NULL,
  PRIMARY KEY (`morphoto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
