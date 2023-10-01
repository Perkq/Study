use UNIVER;

-- 1 --
create view Преподаватель
	as select TEACHER [Код],
		TEACHER_NAME [Имя],
		GENDER [Пол],
		PULPIT [Код кафедры]
	from TEACHER

select * from Преподаватель

drop view Преподаватель

-- 2 --
create view Количество_кафедр
	as select  FACULTY.FACULTY_NAME [Факультет],
		count(PULPIT.PULPIT) [Количество_кафедр]
	from FACULTY join PULPIT 
	on FACULTY.FACULTY = PULPIT.FACULTY
	group by FACULTY_NAME

select * from Количество_кафедр

drop view Количество_кафедр

-- 3 --
create view Аудитории (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE)
	as select AUDITORIUM [код],
		AUDITORIUM_NAME [наименование аудитории],
		AUDITORIUM_TYPE [название]
	from AUDITORIUM
	where AUDITORIUM_TYPE like 'ЛК%'

select * from Аудитории

insert Аудитории values('200-5', '200-3', 'ЛК')

drop view Аудитории

-- 4 --
alter view Аудитории
	as select AUDITORIUM [код],
		AUDITORIUM_TYPE [наименование]
	from AUDITORIUM
	where AUDITORIUM_TYPE like 'ЛК' WITH CHECK OPTION;
			go

insert Аудитории values('205-3', '205-3', 'ЛК-К')
/*
select * from Лекционные_аудитории

drop view Лекционные_аудитории
*/
-- 5 --
create view Дисциплины
	as select top 20 SUBJECT [код],
		SUBJECT_NAME [наименование],
		PULPIT [код кафедры]
	from SUBJECT
order by SUBJECT_NAME 

select * from Дисциплины
drop view Дисциплины

-- 6 --
alter view Количество_кафедр with schemabinding
	as select FACULTY.FACULTY_NAME [факультет],
			count(PULPIT.FACULTY) [количество]
		from dbo.FACULTY join dbo.PULPIT
			on FACULTY.FACULTY = PULPIT.FACULTY
		group by FACULTY.FACULTY_NAME
go

alter table FACULTY drop column FACULTY_NAME;