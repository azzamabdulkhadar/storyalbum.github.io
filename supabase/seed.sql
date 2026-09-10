-- Optional: seed the database with the current static content.
-- Run AFTER 0001_init.sql if you want the site served from the DB.

insert into public.profiles (name, nickname, birthday, hometown, favorite_color, favorite_food)
values ('Her Name', 'Nick', '05th (Nov)', 'City, Earth', 'Lavender', 'Pasta, Chocolate');

insert into public.chapters (year, title, description, sort_order) values
  ('2004','The Beginning','She came into this world with a heart full of love and endless possibilities.',1),
  ('2010','Childhood','Tiny hands, big dreams.',2),
  ('2015','Growing Up','School, friends & countless memories.',3),
  ('2019','Teenage Years','New dreams. New people. New emotions.',4),
  ('2023','A New Chapter','Life started changing.',5),
  ('2025','Present','The girl she has become.',6);

insert into public.memories (title, description, memory_date, category, sort_order) values
  ('Golden hour with her','A completely ordinary day that somehow became a beautiful memory.','2024-09-12','Friends',1),
  ('Under the stars','Counting stars and losing count.','2025-01-04','Trips',2),
  ('Chai & conversations','Where every problem felt smaller.','2024-11-21','Family',3);

insert into public.quotes (text, category, language, sort_order) values
  (E'Uski muskurahat mein kuch toh baat hai,\nwarna yun hi koi dil ke itne paas nahi aata.','Love','hinglish',1),
  (E'Kuch log yaadon mein nahi,\ndil ke kisi khoobsurat kone mein rehte hain.','Emotional','hinglish',2);

insert into public.letters (title, content, date, is_private) values
  ('Dear Younger Me...',
   '["You are allowed to take up space. The things that make you different are the things that will make you unforgettable."]'::jsonb,
   '2025-01-01', true);

insert into public.songs (title, artist, reason, sort_order) values
  ('Perfect','Ed Sheeran','Because she''s perfect, just the way she is.',1),
  ('Raataan Lambiyan','Jubin Nautiyal, Asees Kaur','Reminds me of her soft heart.',2);
