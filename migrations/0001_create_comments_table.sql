-- Migration number: 0001 	 2024-12-27T22:04:18.794Z
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL
);

-- Insert some sample data into our comments table.
INSERT INTO comments (author, content)
VALUES
    ('Kristian', 'Congrats!'),
    ('Serena', 'Great job!'),
    ('Max', 'Keep up the good work!')
;

CREATE TABLE NATION (
    N_NATIONKEY     INTEGER NOT NULL PRIMARY KEY,
    N_NAME          TEXT    NOT NULL,
    N_REGIONKEY     INTEGER NOT NULL,
    N_COMMENT       TEXT    NOT NULL,
    FOREIGN KEY (N_REGIONKEY) REFERENCES REGION(R_REGIONKEY)
);

INSERT INTO NATION (N_NATIONKEY, N_NAME, N_REGIONKEY, N_COMMENT)
VALUES
(0,  'ALGERIA',  0,  'haggle. carefully final deposits detectivit'),
(1,  'ARGENTINA',  1,  'algeria y; as the lifeboats of the world '),
(2,  'BRAZIL',  1,  'y the print promises to find the package'),
(3,  'CANADA',  1,  'finally lose the print. close the door. '),
(4,  'EGYPT',  4,  'finally regular accounts have a special. '),
(5,  'ETHIOPIA',  0,  'this is the place where the package'),
(6,  'FRANCE',  3,  'package seems to be here. find the key'),
(7,  'GERMANY',  3,  'have the key. close the door. find the. '),
(8,  'INDIA',  2,  'special. finally the package is here. giv'),
(9,  'INDONESIA',  2,  'finally regular accounts have a special. '),
(10, 'IRAN',  4,  'have to find the package. where is the p'),
(11, 'IRAQ',  4,  'final deposits detectivit carefully final'),
(12, 'JAPAN',  2,  'detectivit carefully final deposits. haggl'),
(13, 'JORDAN',  4,  'find the key. package seems to be here. '),
(14, 'KENYA',  0,  'accounts have a special. finally the pack'),
(15, 'MOROCCO',  0,  'al deposits. haggle. carefully final dep'),
(16, 'MOZAMBIQUE',  0,  'finally regular accounts have a special.'),
(17, 'PERU',  1,  'have a special. finally the package is here'),
(18, 'CHINA',  2,  'accounts have a special. finally the pack'),
(19, 'ROMANIA',  3,  'y the print promises to find the package'),
(20, 'SAUDI ARABIA', 4,  'finally regular accounts have a special. '),
(21, 'VIETNAM',  2,  'is here. give the package to the final. '),
(22, 'RUSSIA',  3,  'accounts have a special. finally the pack'),
(23, 'UNITED KINGDOM', 3,  'detectivit carefully final deposits. haggl'),
(24, 'UNITED STATES', 1,  'have a special. finally the package is here')
;