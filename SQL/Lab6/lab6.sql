use UNIVER;

--1
select AUDITORIUM_TYPE.AUDITORIUM_TYPE,
	max(AUDITORIUM.AUDITORIUM_CAPACITY) [������������ �����������],
	min(AUDITORIUM.AUDITORIUM_CAPACITY) [����������� �����������],
	avg(AUDITORIUM.AUDITORIUM_CAPACITY) [������� �����������],
	sum(AUDITORIUM.AUDITORIUM_CAPACITY) [��������� �����������],
	count(*) [����� ����������]
from AUDITORIUM join AUDITORIUM_TYPE
on AUDITORIUM.AUDITORIUM_TYPE = AUDITORIUM_TYPE.AUDITORIUM_TYPE
group by AUDITORIUM_TYPE.AUDITORIUM_TYPE


--2
--�� �� �����, ��� � ������..

--3
select *
from (select case
			when NOTE = 10 then '10'
			when NOTE between 8 and 9 then '8-9'
			when NOTE between 6 and 7 then '6-7'
			when NOTE between 4 and 5 then '4-5'
			end [������], count(*) [����������]
from PROGRESS group by case 
			when NOTE = 10 then '10'
			when NOTE between 8 and 9 then '8-9'
			when NOTE between 6 and 7 then '6-7'
			when NOTE between 4 and 5 then '4-5'
			end) as T
order by case [������]
			when '10' then 0
			when '8-9' then 1
			when '6-7' then 2
			when '5-6' then 3
			end

--4
select f.FACULTY, g.PROFESSION, YEAR(GETDATE()) - g.YEAR_FIRST [����], round(avg(CAST(p.NOTE as float(4))),2) [������]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
group by f.FACULTY, g.PROFESSION, g.YEAR_FIRST
order by [������] desc

--5
select f.FACULTY, g.PROFESSION, YEAR(GETDATE()) - g.YEAR_FIRST [����], round(avg(CAST(p.NOTE as float(4))),2) [������]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where p.SUBJECT = '����' or p.SUBJECT = '����'
group by f.FACULTY, g.PROFESSION, g.YEAR_FIRST
order by [������] desc

--6
select f.FACULTY, g.PROFESSION [�������������], p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [������]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like '����'
group by f.FACULTY, g.PROFESSION, p.SUBJECT
order by [������] desc

--7
select p1.SUBJECT [�������], p1.NOTE,
	(select COUNT(*) from PROGRESS p2
	where p2.SUBJECT = p1.SUBJECT and p2.NOTE = p1.NOTE) [���������� ���������]
	from PROGRESS p1
		group by p1.SUBJECT, p1.NOTE
		having NOTE in('8','9')
		order by NOTE desc