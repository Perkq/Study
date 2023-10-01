use UNIVER;

--1
select AUDITORIUM_TYPE.AUDITORIUM_TYPE,
	max(AUDITORIUM.AUDITORIUM_CAPACITY) [Максимальная вместимость],
	min(AUDITORIUM.AUDITORIUM_CAPACITY) [Минимальная вместимость],
	avg(AUDITORIUM.AUDITORIUM_CAPACITY) [Средняя вместимость],
	sum(AUDITORIUM.AUDITORIUM_CAPACITY) [Суммарная вместимость],
	count(*) [Общее количество]
from AUDITORIUM join AUDITORIUM_TYPE
on AUDITORIUM.AUDITORIUM_TYPE = AUDITORIUM_TYPE.AUDITORIUM_TYPE
group by AUDITORIUM_TYPE.AUDITORIUM_TYPE


--2
--то же самое, что и первый..

--3
select *
from (select case
			when NOTE = 10 then '10'
			when NOTE between 8 and 9 then '8-9'
			when NOTE between 6 and 7 then '6-7'
			when NOTE between 4 and 5 then '4-5'
			end [оценки], count(*) [количество]
from PROGRESS group by case 
			when NOTE = 10 then '10'
			when NOTE between 8 and 9 then '8-9'
			when NOTE between 6 and 7 then '6-7'
			when NOTE between 4 and 5 then '4-5'
			end) as T
order by case [оценки]
			when '10' then 0
			when '8-9' then 1
			when '6-7' then 2
			when '5-6' then 3
			end

--4
select f.FACULTY, g.PROFESSION, YEAR(GETDATE()) - g.YEAR_FIRST [курс], round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
group by f.FACULTY, g.PROFESSION, g.YEAR_FIRST
order by [оценка] desc

--5
select f.FACULTY, g.PROFESSION, YEAR(GETDATE()) - g.YEAR_FIRST [курс], round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where p.SUBJECT = 'СУБД' or p.SUBJECT = 'ОАиП'
group by f.FACULTY, g.PROFESSION, g.YEAR_FIRST
order by [оценка] desc

--6
select f.FACULTY, g.PROFESSION [специальность], p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ИДиП'
group by f.FACULTY, g.PROFESSION, p.SUBJECT
order by [оценка] desc

--7
select p1.SUBJECT [предмет], p1.NOTE,
	(select COUNT(*) from PROGRESS p2
	where p2.SUBJECT = p1.SUBJECT and p2.NOTE = p1.NOTE) [количество студентов]
	from PROGRESS p1
		group by p1.SUBJECT, p1.NOTE
		having NOTE in('8','9')
		order by NOTE desc