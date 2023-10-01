use NEH_2X_MyBase;

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
insert МАРШРУТЫ values ('Вилейка-Москва', '1000км', 3);
insert МАРШРУТЫ values ('Токио-Сочи', '1532км', 10);
insert МАРШРУТЫ values ('Питер-Владивосток','734км', 7);
update МАРШРУТЫ set Название_маршрута='НижнийНовгород-Молодечно' where Дальность='1000км'
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

select * from МАРШРУТЫ; 

update МАРШРУТЫ set Название_маршрута='КАЗАХСТАН' where Дальность='1000км'
DELETE МАРШРУТЫ WHERE Название_маршрута = 'Токио-Сочи';
DELETE МАРШРУТЫ WHERE Название_маршрута = 'Питер-Владивосток';

--3-- ОПЕРАТОР SAVE TRAN
-- если транзакция сост из неск независ блоков операторов T-SQL, то исп.
-- SAVE TRANSACTION, формир контр.точку транзакции
declare @point varchar(3)
begin try
begin tran
insert into ВОДИТЕЛЬ values('test123', 'ЛБ-К', 'test1', 40)
set @point = 'p1'; save tran @point
insert into ВОДИТЕЛЬ values('test1132', 'ЛБ-К', 'test1', 40)
set @point = 'p2'; save tran @point
insert into ВОДИТЕЛЬ values('test1', 'ЛК', 'test2', 50)
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

select * from ВОДИТЕЛЬ;
DELETE ВОДИТЕЛЬ where Фамилия_водителя like 'test1' or Фамилия_водителя like 'test1132' or Фамилия_водителя like 'test123'; 


-- 4 --
------A------

set transaction isolation level READ UNCOMMITTED
begin transaction
-----t1---------
select @@SPID, 'insert МАРШРУТЫ' 'результат', *
from МАРШРУТЫ;
commit;
-----B–-------
--явную транзакцию с уровнем изолированности READ COMMITED (по умолч) 
-----t2---------
begin transaction
select @@SPID
insert МАРШРУТЫ values('Бобруйск-Молодечно','92км', 2);

-----t1----------
-----t2----------
ROLLBACK;

SELECT * FROM МАРШРУТЫ;
SELECT * FROM ВОДИТЕЛЬ;

--task5 (Неповторяющееся чтение)
-- A ---
set transaction isolation level READ COMMITTED
begin transaction
select * from МАРШРУТ where Название_маршрута like '%Молодечно%';
-------------------------- t1 ------------------
-------------------------- t2 -----------------
select * from МАРШРУТ where Название_маршрута like '%Молодечно%';
commit ;

--- B ---
begin transaction
-------------------------- t1 --------------------

update МАРШРУТ set Название_маршрута = 'Караганда' where Название_маршрута like '%Молодечно%';
commit tran;
-------------------------- t2 --------------------
rollback

--task6 (фантомное чтение)

-- A ---
set transaction isolation level REPEATABLE READ
begin transaction
select * from МАРШРУТ where Название_маршрута like '%Молодечно%';
-------------------------- t1 ------------------
-------------------------- t2 -----------------
select count(*) from МАРШРУТ where Название_маршрута like '%Молодечно%';
rollback;

--- B ---
begin transaction
update МАРШРУТ set Название_маршрута ='1253asdat' where Название_маршрута like '%Молодечно%';
commit ;

-- A ---
set transaction isolation level Serializable 
begin transaction
select * from МАРШРУТ;
-------------------------- t1 ------------------
-------------------------- t2 -----------------
rollback;

--- B ---
begin transaction
insert МАРШРУТЫ values('ADSDtAD123' , '1DASADAAS' , 'test', 10);
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
