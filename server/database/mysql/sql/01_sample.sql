INSERT INTO Morphoto (parent_id, child_id, prompt, strength) VALUES ('abc', 'ghi', 'prompt1', 0.5);
INSERT INTO Morphoto (parent_id, child_id, prompt, strength) VALUES ('cdf', 'jkl', 'prompt2', 0.5);
INSERT INTO Morphoto (parent_id, child_id, prompt, strength) VALUES ('ghi', 'mno', 'prompt3', 0.5);
INSERT INTO Morphoto (parent_id, child_id, prompt, strength) VALUES ('jkl', 'pqr', 'prompt4', 0.5);

INSERT INTO Status (parent_id, is_done, view_count, created_at) VALUES ('abc', true, 1, '2020-01-01 00:00:00');
INSERT INTO Status (parent_id, is_done, view_count, created_at) VALUES ('cdf', true, 2, '2020-01-01 00:00:01');
INSERT INTO Status (parent_id, is_done, view_count, created_at) VALUES ('ghi', true, 3, '2020-01-01 00:00:02');
INSERT INTO Status (parent_id, is_done, view_count, created_at) VALUES ('jkl', true, 4, '2020-01-01 00:00:03');
