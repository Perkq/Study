use UNIVER;

--1
select f.FACULTY, g.PROFESSION, p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ИДиП'
group by rollup (f.FACULTY, g.PROFESSION, p.SUBJECT)

--2
select f.FACULTY, g.PROFESSION, p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ИДиП'
group by cube (f.FACULTY, g.PROFESSION, p.SUBJECT)

--3
select f.FACULTY, g.PROFESSION, p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ИДиП'
group by f.FACULTY, g.PROFESSION, p.SUBJECT
	union
select f.FACULTY, g.PROFESSION, p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ХТиТ'
group by f.FACULTY, g.PROFESSION, p.SUBJECT

--4
select f.FACULTY, g.PROFESSION, p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ИДиП'
group by f.FACULTY, g.PROFESSION, p.SUBJECT
	intersect
select f.FACULTY, g.PROFESSION, p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ХТиТ'
group by f.FACULTY, g.PROFESSION, p.SUBJECT

--5
select f.FACULTY, g.PROFESSION, p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ИДиП'
group by f.FACULTY, g.PROFESSION, p.SUBJECT
	except
select f.FACULTY, g.PROFESSION, p.SUBJECT, round(avg(CAST(p.NOTE as float(4))),2) [оценка]
from FACULTY f inner join GROUPS g on f.FACULTY = g.FACULTY
inner join STUDENT s on g.IDGROUP = s.IDGROUP
inner join PROGRESS p on p.IDSTUDENT = s.IDSTUDENT
where g.FACULTY like 'ХТиТ'
group by f.FACULTY, g.PROFESSION, p.SUBJECT
