use UNIVER;

-- 1 --
create view �������������
	as select TEACHER [���],
		TEACHER_NAME [���],
		GENDER [���],
		PULPIT [��� �������]
	from TEACHER

select * from �������������

drop view �������������

-- 2 --
create view ����������_������
	as select  FACULTY.FACULTY_NAME [���������],
		count(PULPIT.PULPIT) [����������_������]
	from FACULTY join PULPIT 
	on FACULTY.FACULTY = PULPIT.FACULTY
	group by FACULTY_NAME

select * from ����������_������

drop view ����������_������

-- 3 --
create view ��������� (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE)
	as select AUDITORIUM [���],
		AUDITORIUM_NAME [������������ ���������],
		AUDITORIUM_TYPE [��������]
	from AUDITORIUM
	where AUDITORIUM_TYPE like '��%'

select * from ���������

insert ��������� values('200-5', '200-3', '��')

drop view ���������

-- 4 --
alter view ���������
	as select AUDITORIUM [���],
		AUDITORIUM_TYPE [������������]
	from AUDITORIUM
	where AUDITORIUM_TYPE like '��' WITH CHECK OPTION;
			go

insert ��������� values('205-3', '205-3', '��-�')
/*
select * from ����������_���������

drop view ����������_���������
*/
-- 5 --
create view ����������
	as select top 20 SUBJECT [���],
		SUBJECT_NAME [������������],
		PULPIT [��� �������]
	from SUBJECT
order by SUBJECT_NAME 

select * from ����������
drop view ����������

-- 6 --
alter view ����������_������ with schemabinding
	as select FACULTY.FACULTY_NAME [���������],
			count(PULPIT.FACULTY) [����������]
		from dbo.FACULTY join dbo.PULPIT
			on FACULTY.FACULTY = PULPIT.FACULTY
		group by FACULTY.FACULTY_NAME
go

alter table FACULTY drop column FACULTY_NAME;