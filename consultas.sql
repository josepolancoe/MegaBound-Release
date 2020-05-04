SELECT u.Id, u.gm, u.IdAcc, u.country, u.game_id, u.rank, u.gp, u.gold, u.cash, u.name_changes, u.gender, u.photo_url, u.is_muted, u.win, u.loss, ae.head, ae.body, ae.eyes, ae.flag, ae.background, ae.foreground, ac.Session FROM users u INNER JOIN user_avatar_equiped ae ON u.Id = ae.Id INNER JOIN accounts ac ON ac.Id = u.IdAcc WHERE u.IdAcc = '22813'

SELECT IdAcc, game_id, photo_url, bg_url, country, rank, gp, win, gender, loss FROM users where LOWER(`game_id`) = 'Polanco'

SELECT gm.Id, gm.UserId, gm.Job, g.Id, g.Name FROM guild_member gm INNER JOIN guild g on gm.Id = g.Id WHERE g.Name = 'Shadow' LIMIT 1

SELECT gm.Id, gm.UserId, gm.Job, g.Id, g.Name FROM guild_member gm INNER JOIN guild g on gm.Id = g.Id WHERE LOWER(Name)='GM'


SELECT u.Id, u.IdAcc, u.country, u.game_id, u.rank, u.gp, u.gold, u.cash, u.gender, u.photo_url,u.bg_url, u.win, u.loss, gm.Id, gm.UserId, gm.Job, ac.Session, g.Id, g.Name as nameGuild FROM users u INNER JOIN accounts ac ON u.IdAcc = ac.Id LEFT JOIN guild_member gm ON gm.UserId = ac.Id LEFT JOIN guild g on gm.Id = g.Id WHERE u.game_id = 'Polanco'

SELECT u.Id, u.IdAcc, u.game_id, u.rank, u.gp, u.gender, gm.Id, gm.UserId, gm.Job, ac.Session, g.Id, g.Name FROM users u INNER JOIN accounts ac ON u.IdAcc = ac.Id LEFT JOIN guild_member gm ON gm.UserId = ac.Id LEFT JOIN guild g on gm.Id = g.Id WHERE g.Name = 'GM'

UPDATE 
users SET rank = IF(gp > 1100, 1, IF(gp > 1 AND A < 2, 2, A))
WHERE game_id='Atenea';

UPDATE users SET rank = CASE WHEN rank=26 THEN 26 WHEN rank=27 THEN 27 WHEN gp>120000 THEN 24 WHEN gp>110000 THEN 23 WHEN gp>100000 THEN 22 WHEN gp > 90000 THEN 21 WHEN gp>80000 THEN 20 WHEN gp>70000 THEN 19 WHEN gp>60000 THEN 18 WHEN gp>50000 THEN 17 WHEN gp>40000 THEN 16 WHEN gp>30000 THEN 15 WHEN gp>22933 THEN 14 WHEN gp>15001 THEN 13 WHEN gp>10042 THEN 12 WHEN gp>6900 THEN 11 WHEN gp>6000 THEN 10 WHEN gp>5100 THEN 9 WHEN gp>4200 THEN 8 WHEN gp>3500 THEN 7 WHEN gp>2800 THEN 6 WHEN gp>2300 THEN 5 WHEN gp>1800 THEN 4 WHEN gp>1500 THEN 3 WHEN gp>1200 THEN 2 WHEN gp>1100 THEN 1 WHEN gp>=1000 THEN 0 END WHERE game_id='Velaxx'


prueba mi nuevo DB estamos buscando GM's y ropa RARE -> www.megaboun d.ga (quita el espacio)