/*drop database NEH_X2_MyBase
create database NEH_X2_MyBase*/
use NEH_2X_MyBase

create table ВОДИТЕЛЬ
(
	Фамилия_водителя nvarchar(20) primary key,
	Имя nvarchar(20) not null,
	Отчество nvarchar(20),
	Стаж nvarchar(20),
) on FG1;

create table МАРШРУТЫ
(
	Название_маршрута nvarchar(50) primary key,
	Дальность nvarchar(50),
	Количество_дней_в_пути int,
) on FG1;

create table МАРШРУТ
(
	Код_маршрута nvarchar(30) primary key,
	Название_маршрута nvarchar(50) not null foreign key references МАРШРУТЫ(Название_маршрута),
	Фамилия_водителя nvarchar(20) foreign key references ВОДИТЕЛЬ(Фамилия_водителя),
	Дата_отправки date,
	Дата_возвращения date,
	Оплата money not null,
) on FG1;

alter table МАРШРУТ alter column Фамилия_водителя nvarchar(20) not null;

INSERT into ВОДИТЕЛЬ(Фамилия_водителя, Имя, Отчество, Стаж)
		VALUES('Глушеня','Артур', 'Юрьевич', 10),
			 ('Пупкин', 'Валера', 'Дмитриевич', 5);

INSERT into МАРШРУТЫ(Название_маршрута, Дальность, Количество_дней_в_пути)
		VALUES('Лида-Молодечно', '70км', 1),
			  ('Молодечно-Минск', '60км', 1);

INSERT into МАРШРУТ(Код_маршрута, Название_маршрута, Фамилия_водителя, Дата_отправки, Дата_возвращения, Оплата)
		VALUES('390657', 'Лида-Молодечно', 'Глушеня', CONVERT(datetime, '2023-12-02'), CONVERT(datetime, '2023-12-03'), 546),
			  ('879425', 'Молодечно-Минск', 'Пупкин', CONVERT(datetime, '2023-16-07'), CONVERT(datetime, '2023-17-07'), 1090);


SELECT * FROM МАРШРУТ

SELECT Название_маршрута, Фамилия_водителя FROM МАРШРУТ
SELECT Фамилия_водителя, Имя, Отчество FROM ВОДИТЕЛЬ
SELECT count(*) FROM МАРШРУТЫ

UPDATE ВОДИТЕЛЬ set Стаж = 3
SELECT * FROM ВОДИТЕЛЬ


