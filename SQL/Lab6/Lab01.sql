use NEH_2X_MyBase;


--1 / 2
select МАРШРУТ.Название_маршрута,
	max(ВОДИТЕЛЬ.Стаж) [Максимальный стаж],
	min(ВОДИТЕЛЬ.Стаж) [Минимальный стаж],
	avg(ВОДИТЕЛЬ.Стаж) [Средний стаж],
	sum(ВОДИТЕЛЬ.Стаж) [Суммарный стаж],
	count(*) [Общее количество]
from МАРШРУТ join ВОДИТЕЛЬ
on МАРШРУТ.Фамилия_водителя = ВОДИТЕЛЬ.Фамилия_водителя
group by МАРШРУТ.Название_маршрута

--3
select *
from (select case
			when Стаж = 10 then '10'
			when Стаж between 8 and 9 then '8-9'
			when Стаж between 6 and 7 then '6-7'
			when Стаж between 4 and 5 then '4-5'
			end [Стаж], count(*) [количество]
from ВОДИТЕЛЬ group by case 
			when Стаж = 10 then '10'
			when Стаж between 8 and 9 then '8-9'
			when Стаж between 6 and 7 then '6-7'
			when Стаж between 4 and 5 then '4-5'
			end) as T
order by case [Стаж]
			when '10' then 0
			when '8-9' then 1
			when '6-7' then 2
			when '5-6' then 3
			end

--4
select в.Фамилия_водителя, м.Название_маршрута, round(avg(CAST(в.СТАЖ as float(4))),2)[стаж]
from ВОДИТЕЛЬ в inner join МАРШРУТ м on в.Фамилия_водителя = м.Фамилия_водителя
group by В.Фамилия_водителя, м.Название_маршрута
order by [стаж] desc

--5
select в.Фамилия_водителя, м.Название_маршрута, round(avg(CAST(в.СТАЖ as float(4))),2)[стаж]
from ВОДИТЕЛЬ в inner join МАРШРУТ м on в.Фамилия_водителя = м.Фамилия_водителя
where м.Название_маршрута like '%Минск%'
group by В.Фамилия_водителя, м.Название_маршрута
order by [стаж] desc

--6
select в.Фамилия_водителя, м.Название_маршрута, round(avg(CAST(в.СТАЖ as float(4))),2)[стаж]
from ВОДИТЕЛЬ в inner join МАРШРУТ м on в.Фамилия_водителя = м.Фамилия_водителя
where м.Оплата > 50 and м.Оплата < 1000
group by В.Фамилия_водителя, м.Название_маршрута
order by [стаж] desc
				  
--7
select p1.Имя, p1.Стаж,
	(select COUNT(*) from ВОДИТЕЛЬ p2
	where p2.Имя = p1.Имя and p2.Стаж = p1.Стаж) [кол-во водил]
	from ВОДИТЕЛЬ p1
		group by p1.Имя, p1.Стаж
		having СТАЖ in('9', '10')
		order by Стаж desc