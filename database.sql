CREATE TABLE "items" (
	id SERIAL PRIMARY KEY,
	"task" VARCHAR(600),
	"completion_status" BOOLEAN
	
);

INSERT INTO items ("task", "completion_status")
VALUES ('Do dishes', FALSE),
('Make bed', TRUE)