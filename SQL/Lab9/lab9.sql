use UNIVER;

-- 1 --
declare @c char = 'c',
		@v varchar(5) = 'Hello',
		@d datetime,
		@t time,
		@i int,
		@s smallint,
		@ti tinyint,
		@n numeric(12,5);

set @d = getdate();
select @t = '23:05:15';
select @i = count(*) from STUDENT;
select @s = @i + avg(PROGRESS.NOTE) from PROGRESS;
select @n = convert(numeric(12, 5), 12345.6789);

select @c c, @v v, @d d, @t t, @n n;
print 'i= ' + cast(@i as varchar(10));
print 's= ' + cast(@s as varchar(10));
print 'ti= ' + cast(@ti as varchar(10));

-- 2 --
declare @x1 int = (select sum(AUDITORIUM.AUDITORIUM_CAPACITY) from AUDITORIUM),
		@x2 real,
		@x3 numeric(8,3),
		@x4 real,
		@x5 real;

if @x1 >= 200
begin 
	set @x2 = (select count(*) from AUDITORIUM);
	set @x3 = (select avg(AUDITORIUM_CAPACITY) from AUDITORIUM);
	set @x4 = (select cast(count(*) as numeric(8,3)) from AUDITORIUM where AUDITORIUM_CAPACITY <=@x3);
	set @x5 = 100*(cast(@x4 as float) / cast(@x2 as float));
	select @x2 '���������� ��������� � �������� ����� 200 �2: ', @x3 '������� ����������� ���������: ', @x4 '���������� ��������� � �������� ����� ������� �������', @x5 '������� ��������� � �������� ����� ������� �������';
end
else if @x1 < 200
	select @x1 '��������� �����������';

-- 3 --
print '����� ������������ ����� ' + cast(@@rowcount as varchar(10));
print '������ SQL Server ' + cast(@@version as varchar(10));
print '��������� ������������� ��������, ����������� �������� �������� �����������: ' + cast(@@spid as varchar(10));
print '��� ��������� ������: ' + cast(@@error as varchar(10));
print '��� �������: ' + cast(@@servername as varchar(10));
print '������� ����������� ����������: ' + cast(@@trancount as varchar(10));
print 'print: ' + cast(@@fetch_status as varchar(10));
print '������� ����������� ������� ���������: ' + cast(@@nestlevel as varchar(10));

-- 4 --
declare @tt float=0.5, @x int=8, @z float;
if @tt>@x
set @z= power(round(sin(@tt),2), 2);
else
if @tt<@x
set @z=4*(@tt+@x)
else
set @z=1-exp(round(@x,2));
print '�������� ���������� z: ' + cast(@z as varchar(10));

--
select SUBSTRING(NAME, 1, CHARINDEX(' ', NAME)+1)+'.'
      +SUBSTRING(NAME, CHARINDEX(' ', NAME, CHARINDEX(' ', NAME)+1)+1, 1) + '.' [�������� ���������] from STUDENT;

--
select NAME as '��� ��������', 2022-YEAR(BDAY) as '�������'		--� ���� �� � ����.������
	from STUDENT
	where MONTH(BDAY)=MONTH(getdate())+1;

--
select PDATE, DATENAME(WEEKDAY, PDATE) as [����_������]
	from PROGRESS
		where SUBJECT = '����'

-- 5 --
if ((select count(*) from AUDITORIUM) > 10)
    begin
	print '��������� ������ 10-��';
	end
else
    begin
	print '��������� ������ 10-��';
	end

-- 6 --
select case 
		when PROGRESS.NOTE between 0 and 4 then '�� ����'
		when PROGRESS.NOTE between 4 and 7 then '���������'
		when PROGRESS.NOTE between 7 and 9 then '������'
		when PROGRESS.NOTE between 9 and 10 then '�������'
	end '������', count(*) '����������'
from PROGRESS, STUDENT, GROUPS
where PROGRESS.IDSTUDENT = STUDENT.IDSTUDENT
	and STUDENT.IDGROUP = GROUPS.IDGROUP
	and GROUPS.FACULTY = '����'
group by 
	case
	when PROGRESS.NOTE between 0 and 4 then '�� ����'
	when PROGRESS.NOTE between 4 and 7 then '���������'
	when PROGRESS.NOTE between 7 and 9 then '������'
	when PROGRESS.NOTE between 9 and 10 then '�������'
	end

-- 7 --
drop table #EXAMPLE
create table #EXAMPLE
	(id int not null,
	name varchar(10) not null,
	age int not null);

set nocount on;         -- �� �������� ��������� � ����� �����
declare @ii int = 0;
while (@ii < 10)
	begin
        insert #EXAMPLE(id, name, age) values (@ii, ('user' + cast(@ii as varchar(2))),  cast((floor(rand()*(60 - 1))) as int));
		set @ii = @ii + 1;
        if (@ii%100=0)
        print @ii;       -- ������� ���������
        set @ii=@ii;
    end;
select * from #EXAMPLE

-- 8 --
declare @ex8 int = 0;
while @ex8 < 10
	begin
		print 'x = ' + cast(@ex8 as varchar(2));
		if (@ex8 = 7) return;
		set @ex8 = @ex8 + 1;
	end;

-- 9 --
begin try
	insert into #EXAMPLE values (null, null, null);
	print '����� ��������� � �������';
end try
begin catch
	print 'ERROR_NUMBER: ' + CONVERT(varchar, ERROR_NUMBER());
	print 'ERROR_MESSAGE: ' + ERROR_MESSAGE();
	print 'ERROR_LINE: ' + CONVERT(varchar, ERROR_LINE());
	print 'ERROR_PROCEDURE: ' + CONVERT(varchar, ERROR_PROCEDURE());
	print 'ERROR_SEVERITY: ' + CONVERT(varchar, ERROR_SEVERITY());
	print 'ERROR_STATE: ' + CONVERT(varchar, ERROR_STATE());
end catch