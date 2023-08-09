CREATE TABLE `Morphoto`(
  `parent_id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `child_id`  varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `prompt`    varchar(255) COLLATE utf8mb4_bin NOT NULL, 
  `strength`  double NOT NULL,
  PRIMARY KEY (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Status`( 
  `parent_id`   varchar(255) COLLATE utf8mb4_bin NOT NULL, 
  `is_done`     boolean NOT NULL,
  `view_count`  int NOT NULL,
  `created_at`  datetime NOT NULL,
  PRIMARY KEY (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
