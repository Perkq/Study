use UNIVER;

-- 1 --
declare IsitCursor cursor
    for select SUBJECT
        from SUBJECT
        where SUBJECT.PULPIT = 'ИСиТ'

declare @sub char(4),
    @str char(100) = ' ';

open IsitCursor;
fetch IsitCursor into @sub;
print 'Предметы на кафедре ИСиТ: ';
while @@FETCH_STATUS = 0
    begin
        set @str = rtrim(@sub) + ', ' + @str;
        fetch IsitCursor into @sub;
    end;
print @str;


close IsitCursor;
deallocate IsitCursor;
go

-- 2 --
DECLARE Teacher_cursor CURSOR LOCAL for select TEACHER.TEACHER_NAME from TEACHER where TEACHER.PULPIT = 'ИСиТ';
DECLARE @teacher char(50), @teacher_ot char(100) ='';
OPEN Teacher_cursor;
print 'Преподаватели ИСиТ';
FETCH  Teacher_cursor into @teacher;
	set @teacher_ot ='1. ' + RTRIM(@teacher);
	print @teacher_ot;
CLOSE Teacher_cursor;
go

OPEN Teacher_cursor;
CLOSE Teacher_cursor
go	

DECLARE Teacher_cursor_2 CURSOR GLOBAL for select TEACHER.TEACHER_NAME from TEACHER where TEACHER.PULPIT = 'ИСиТ';
DECLARE @teacher char(50), @teacher_ot char(100) ='';
OPEN Teacher_cursor_2;
print 'Преподаватели ИСиТ';
FETCH  Teacher_cursor_2 into @teacher;
	set @teacher_ot ='1. ' + RTRIM(@teacher);
	print @teacher_ot;
CLOSE Teacher_cursor_2;
go


OPEN Teacher_cursor_2;
CLOSE Teacher_cursor_2;
deallocate Teacher_cursor_2
go

-- 3 --
create table #TEMP ( VARIABLE nvarchar(20))
insert #TEMP values('DEFAULT')
declare @str nvarchar(20) = ''

declare SC  cursor local static
            for select #TEMP.VARIABLE from #TEMP
declare DC  cursor local dynamic
            for select #TEMP.VARIABLE from #TEMP
open SC
open DC
update #TEMP set VARIABLE = 'CHANGED'
fetch SC into @str
print 'STATIC: '+ @str
fetch DC into @str
print 'DYNAMIC: '+ @str
drop table #TEMP

-- 4 -- 
declare @str varchar(50)
declare curs    cursor local scroll
                for select TEACHER.TEACHER_NAME from TEACHER
open curs
fetch next from curs into @str
print 'NEXT: '+@str
fetch prior from curs into @str
print 'PRIOR: '+@str
fetch first from curs into @str
print 'FIRST: '+@str
fetch last from curs into @str
print 'LAST: '+@str
fetch absolute 2 from curs into @str
print 'ABSOLUTE 2: '+@str
fetch relative -1 from curs into @str
print 'RELATIVE -1: '+@str
close curs

-- 5 --
drop table if exists #TEMP;
go

create table #TEMP ( variable nvarchar(50))
insert #TEMP values('DEFAULT')
insert #TEMP values('delete')

declare @str nvarchar(50) = ''
declare CURS    cursor local dynamic
                for select #TEMP.VARIABLE from #TEMP for update
open CURS
fetch CURS into @str
update #TEMP set #TEMP.VARIABLE = 'UPDATED' where current of CURS
fetch CURS into @str
delete #TEMP where current of CURS
close CURS
select * from #TEMP
drop table #TEMP


-- 6 --
insert into PROGRESS (SUBJECT, IDSTUDENT, PDATE, NOTE) values
	('КГ',   1026,  '06.05.2013',3),
	('КГ',   1027,  '06.05.2013',2),
	('КГ',   1028,  '06.05.2013',2),
	('КГ',   1029,  '06.05.2013',3),
	('КГ',   1030,  '06.05.2013',1),
	('КГ',   1031,  '06.05.2013',3)

select * from PROGRESS


select NAME, NOTE
from PROGRESS
	inner join STUDENT on PROGRESS.IDSTUDENT = STUDENT.IDSTUDENT
where NOTE < 4

declare EX6_1 cursor local
	for	select NAME, NOTE
	from PROGRESS
		inner join STUDENT on PROGRESS.IDSTUDENT = STUDENT.IDSTUDENT
	where NOTE < 4
declare @student nvarchar(20), @mark int;
	open EX6_1;
		fetch  EX6_1 into @student, @mark;
		while @@FETCH_STATUS = 0
			begin
				delete PROGRESS where current of EX6_1;
				fetch  EX6_1 into @student, @mark;
			end
	close EX6_1;

select NAME, NOTE from PROGRESS inner join STUDENT on PROGRESS.IDSTUDENT = STUDENT.IDSTUDENT where NOTE<4
go



--1

declare EX6_2 cursor local for select NAME, NOTE from PROGRESS inner join STUDENT S on PROGRESS.IDSTUDENT = S.IDSTUDENT
where PROGRESS.IDSTUDENT=1023;

declare @student nvarchar(20), @mark int;
open EX6_2;
fetch EX6_2 into @student, @mark;
update PROGRESS set NOTE = NOTE + 1 where current of EX6_2;
close EX6_2;


select * from PROGRESS where IDSTUDENT=1023;

-- 8 --
DECLARE @faculty varchar(150), @pulpit varchar(200), @discipline varchar(10), @discipline_list varchar(200) = '', @qteacher varchar(3), @temp_faculty varchar(50), @temp_pulpit varchar(50);

SELECT FACULTY.FACULTY_NAME, PULPIT.PULPIT_NAME, SUBJECT.SUBJECT, count(TEACHER.TEACHER_NAME)
from FACULTY
         inner join PULPIT
                    on PULPIT.FACULTY = FACULTY.FACULTY
         left outer join SUBJECT
                         on SUBJECT.PULPIT = PULPIT.PULPIT
         left outer join TEACHER
                         on TEACHER.PULPIT = PULPIT.PULPIT
group by FACULTY.FACULTY_NAME, PULPIT.PULPIT_NAME, SUBJECT.SUBJECT
order by FACULTY_NAME, PULPIT_NAME asc;

DECLARE GET_REPORT_CURSOR CURSOR LOCAL STATIC for
    SELECT FACULTY.FACULTY_NAME, PULPIT.PULPIT_NAME, SUBJECT.SUBJECT, count(TEACHER.TEACHER_NAME)
    from FACULTY
             inner join PULPIT
                        on PULPIT.FACULTY = FACULTY.FACULTY
             left outer join SUBJECT
                             on SUBJECT.PULPIT = PULPIT.PULPIT
             left outer join TEACHER
                             on TEACHER.PULPIT = PULPIT.PULPIT
    group by FACULTY.FACULTY_NAME, PULPIT.PULPIT_NAME, SUBJECT.SUBJECT
    order by FACULTY_NAME, PULPIT_NAME asc;

OPEN GET_REPORT_CURSOR
FETCH GET_REPORT_CURSOR into @faculty,@pulpit,@discipline,@qteacher;
while(@@FETCH_STATUS = 0)
    begin
        print '';
        print ' - Факультет: ' + rtrim(@faculty);
        set @temp_faculty = @faculty;
        while (@faculty = @temp_faculty)
            begin
                print '';
                print '		Кафедра: ' + rtrim(@pulpit);
                print '			Количество преподавателей: ' + rtrim(@qteacher);
                set @discipline_list = '			Дисциплины: ';
                set @temp_pulpit = @pulpit;
                if (@discipline != '')
                    begin
                        if (@discipline_list = '			Дисциплины: ')
                            begin
                                set @discipline_list += @discipline;
                            end
                        else
                            begin
                                set @discipline_list = rtrim(@discipline_list) + ', ' + @discipline;
                            end;
                    end;
                FETCH GET_REPORT_CURSOR into @faculty,@pulpit,@discipline,@qteacher;
                while (@pulpit = @temp_pulpit)
                    begin
                        if (@discipline != '')
                            begin
                                if (@discipline_list = '			Дисциплины: ')
                                    begin
                                        set @discipline_list += @discipline;
                                    end
                                else
                                    begin
                                        set @discipline_list = rtrim(@discipline_list) + ', ' + @discipline;
                                    end;
                            end;
                        FETCH GET_REPORT_CURSOR into @faculty,@pulpit,@discipline,@qteacher;
                    end;
                if (@discipline_list != '			Дисциплины: ')
                    begin
                        print rtrim(@discipline_list);
                        set @discipline_list = '			Дисциплины: ';
                    end
                else
                    begin
                        print rtrim(@discipline_list) + ' нет' ;
                    end;
                if (@@FETCH_STATUS != 0)
                    begin
                        break;
                    end;
            end;
    end;
CLOSE GET_REPORT_CURSOR;