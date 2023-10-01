use NEH_2X_MyBase;

-- 1 --
Drop index #Explore.#Explore_cl
select * from МАРШРУТЫ where Количество_дней_в_пути between 1 and 10 order by Количество_дней_в_пути;

checkpoint;
DBCC DROPCLEANBUFFERS;
Create clustered index #Marsh_cl on МАРШРУТЫ(Название_маршрута asc)

select * from МАРШРУТЫ order by Название_маршрута;

-- 2 --

select * from Маршруты where Дальность like '%0км%' and Количество_дней_в_пути < 10;
select * from Маршруты order by Дальность, Количество_дней_в_пути

select * from Маршруты where Дальность = 123 and Количество_дней_в_пути > 3

Create index #Marsh_NonClu on Маршруты(Дальность, Количество_дней_в_пути)
select * from Маршруты where Дальность like '%0км%' and Количество_дней_в_пути < 10;
select * from Маршруты order by Дальность, Количество_дней_в_пути

select * from Маршруты where Дальность like '%0км%' and Количество_дней_в_пути < 10

-- 3 --
drop index Маршруты.#My_Incl;
select Дальность from МАРШРУТЫ where Количество_дней_в_пути < 10


create index #My_Incl on МАРШРУТЫ(Название_маршрута) include (Дальность)
select Дальность from МАРШРУТЫ where Количество_дней_в_пути < 10

-- 4 --

drop index МАРШРУТЫ.МАРШРУТЫ_filter;

select Количество_дней_в_пути from МАРШРУТЫ where Количество_дней_в_пути between 0 and 10;
select Количество_дней_в_пути from МАРШРУТЫ where (Количество_дней_в_пути > 1 and Количество_дней_в_пути < 4);
select Количество_дней_в_пути from МАРШРУТЫ where Количество_дней_в_пути = 1;

create index МАРШРУТЫ_Filter on МАРШРУТЫ(Количество_дней_в_пути) where (Количество_дней_в_пути > 1 and Количество_дней_в_пути < 10);

-- 5 --