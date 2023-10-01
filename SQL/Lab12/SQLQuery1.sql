use UNIVER;

--1-- РЕЖИМ НЕЯВНОЙ ТРАНЗАКЦИИ
-- транзакция начинается, если выполняется один из следующих операторов: 
-- CREATE, DROP; ALTER TABLE; INSERT, DELETE, UPDATE, SELECT, TRUNCATE TABLE; OPEN, FETCH; GRANT; REVOKE 
-- неявная транзакция продолжается до тех пор, пока не будет выполнен COMMIT или ROLLBACK
set nocount on
if  exists (select * from  SYS.OBJECTS where OBJECT_ID=object_id(N'DBO.L')) 
drop table L;           

declare @c int, @flag char = 'c'; -- если с->r, таблица не сохр
SET IMPLICIT_TRANSACTIONS ON -- вкл режим неявной транзакции
create table L(K int);                   
insert L values (1),(2),(3),(4),(5),(6);
set @c = (select count(*) from L);
print 'количество строк в таблице L: ' + cast(@c as varchar(2));
if @flag = 'c' commit  -- фиксация 
else rollback;     -- откат                           
SET IMPLICIT_TRANSACTIONS OFF -- действует режим автофиксации

if  exists (select * from  SYS.OBJECTS where OBJECT_ID= object_id(N'DBO.L')) 
print 'таблица L есть';  
else print 'таблицы L нет'

--2-- СВОЙСТВО АТОМАРНОСТИ ЯВНОЙ ТРАНЗАКЦИИ

begin try        
begin tran                 -- начало  явной транзакции
insert FACULTY values ('ДФ111', 'Другой факультет');
insert FACULTY values ('ПиМ111', 'Факультет print-технологий');
insert FACULTY values ('ИТ','Самый лучший');
update FACULTY set FACULTY_NAME='The Best' where FACULTY='ИТ'
commit tran;               -- фиксация транзакции
end try
begin catch
print 'ошибка: '+ case 
when error_number() = 2627 and patindex('%FACULTY_PK%', error_message()) > 0 
then 'дублирование '	--позиция 1-го вхождения
else 'неизвестная ошибка: '+ cast(error_number() as  varchar(5))+ error_message()  
end;
if @@trancount > 0 rollback tran; -- ур.вложенности тр.>0,  транз не завершена 	  
end catch;

select * from FACULTY; 

update FACULTY set FACULTY_NAME='Факультет информационных технологий' where FACULTY='ИТ'
DELETE FACULTY WHERE FACULTY = 'ДФ';
DELETE FACULTY WHERE FACULTY = 'ПиМ';

--3-- ОПЕРАТОР SAVE TRAN
-- если транзакция сост из неск независ блоков операторов T-SQL, то исп.
-- SAVE TRANSACTION, формир контр.точку транзакции
declare @point varchar(3)
begin try
begin tran
insert into AUDITORIUM values('test123', 'ЛБ-К', 40, 'test1')
set @point = 'p1'; save tran @point
insert into AUDITORIUM values('test1132', 'ЛБ-К', 40, 'test1')
set @point = 'p2'; save tran @point
insert into AUDITORIUM values('test1', 'ЛК', 50, 'test2')
set @point = 'p3'; save tran @point
commit tran
end try
begin catch
print 'Ошибка! ' + error_message()
if @@TRANCOUNT > 0
begin
print 'Контрольная точка: ' + cast(@point as varchar)
rollback tran @point
commit tran
end
end catch

select * from AUDITORIUM;
DELETE AUDITORIUM where AUDITORIUM like 'test1' or AUDITORIUM like 'test1132' or AUDITORIUM like 'test123'; 


-- 4 --
------A------
--явную транзакцию с уровнем изолированности READ UNCOMMITED,
--кот. допуск неподтвержд, неповтор. и фантомное чтение
set transaction isolation level READ UNCOMMITTED
begin transaction
-----t1---------
select @@SPID, 'insert FACULTY' 'результат', *
from FACULTY ;
commit;
-----B–-------
--явную транзакцию с уровнем изолированности READ COMMITED (по умолч) 
-----t2---------
begin transaction
select @@SPID
insert FACULTY values('ИТasdt','Информационных технологий');

-----t1----------
-----t2----------
ROLLBACK;

delete FACULTY where FACULTY = 'ИТasdt';

SELECT * FROM FACULTY;
SELECT * FROM PULPIT;

--task5 (Неповторяющееся чтение)
-- A ---
set transaction isolation level READ COMMITTED
begin transaction
select * from SUBJECT where SUBJECT = 'БД';
-------------------------- t1 ------------------
-------------------------- t2 -----------------
select * from SUBJECT where SUBJECT = 'БД';
commit ;

--- B ---
begin transaction
-------------------------- t1 --------------------

update SUBJECT set SUBJECT_NAME = 'Базы данных (изменено)'  where SUBJECT = 'БД';
commit tran;
-------------------------- t2 --------------------
rollback

--task6 (фантомное чтение)

-- A ---
set transaction isolation level REPEATABLE READ
begin transaction
select * from SUBJECT where SUBJECT = 'БД';
-------------------------- t1 ------------------
-------------------------- t2 -----------------
select count(*) from SUBJECT where SUBJECT = 'БД';
rollback;

--- B ---
begin transaction
update SUBJECT set SUBJECT_NAME ='1253asdat' where SUBJECT = 'БД'
commit ;

-- A ---
set transaction isolation level Serializable 
begin transaction
select * from SUBJECT;
-------------------------- t1 ------------------
-------------------------- t2 -----------------
rollback;

--- B ---
begin transaction
insert SUBJECT values('ADSDtAD123' , '1DASADAAS' , 'ИСиТ');
commit ;

--Task 8 (вложенная транзакция)
drop table #TEMPDB8
CREATE TABLE #TEMPDB8(A INT, B INT);
INSERT #TEMPDB8 VALUES(1,3);
BEGIN TRAN
INSERT #TEMPDB8 VALUES(999,2)
	BEGIN TRAN
	UPDATE #TEMPDB8 SET A = 1 WHERE B = 2
	COMMIT
IF @@TRANCOUNT > 0 ROLLBACK
SELECT * FROM #TEMPDB8
