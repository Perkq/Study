use UNIVER;

--1-- ����� ������� ����������
-- ���������� ����������, ���� ����������� ���� �� ��������� ����������: 
-- CREATE, DROP; ALTER TABLE; INSERT, DELETE, UPDATE, SELECT, TRUNCATE TABLE; OPEN, FETCH; GRANT; REVOKE 
-- ������� ���������� ������������ �� ��� ���, ���� �� ����� �������� COMMIT ��� ROLLBACK
set nocount on
if  exists (select * from  SYS.OBJECTS where OBJECT_ID=object_id(N'DBO.L')) 
drop table L;           

declare @c int, @flag char = 'c'; -- ���� �->r, ������� �� ����
SET IMPLICIT_TRANSACTIONS ON -- ��� ����� ������� ����������
create table L(K int);                   
insert L values (1),(2),(3),(4),(5),(6);
set @c = (select count(*) from L);
print '���������� ����� � ������� L: ' + cast(@c as varchar(2));
if @flag = 'c' commit  -- �������� 
else rollback;     -- �����                           
SET IMPLICIT_TRANSACTIONS OFF -- ��������� ����� ������������

if  exists (select * from  SYS.OBJECTS where OBJECT_ID= object_id(N'DBO.L')) 
print '������� L ����';  
else print '������� L ���'

--2-- �������� ����������� ����� ����������

begin try        
begin tran                 -- ������  ����� ����������
insert FACULTY values ('��111', '������ ���������');
insert FACULTY values ('���111', '��������� print-����������');
insert FACULTY values ('��','����� ������');
update FACULTY set FACULTY_NAME='The Best' where FACULTY='��'
commit tran;               -- �������� ����������
end try
begin catch
print '������: '+ case 
when error_number() = 2627 and patindex('%FACULTY_PK%', error_message()) > 0 
then '������������ '	--������� 1-�� ���������
else '����������� ������: '+ cast(error_number() as  varchar(5))+ error_message()  
end;
if @@trancount > 0 rollback tran; -- ��.����������� ��.>0,  ����� �� ��������� 	  
end catch;

select * from FACULTY; 

update FACULTY set FACULTY_NAME='��������� �������������� ����������' where FACULTY='��'
DELETE FACULTY WHERE FACULTY = '��';
DELETE FACULTY WHERE FACULTY = '���';

--3-- �������� SAVE TRAN
-- ���� ���������� ���� �� ���� ������� ������ ���������� T-SQL, �� ���.
-- SAVE TRANSACTION, ������ �����.����� ����������
declare @point varchar(3)
begin try
begin tran
insert into AUDITORIUM values('test123', '��-�', 40, 'test1')
set @point = 'p1'; save tran @point
insert into AUDITORIUM values('test1132', '��-�', 40, 'test1')
set @point = 'p2'; save tran @point
insert into AUDITORIUM values('test1', '��', 50, 'test2')
set @point = 'p3'; save tran @point
commit tran
end try
begin catch
print '������! ' + error_message()
if @@TRANCOUNT > 0
begin
print '����������� �����: ' + cast(@point as varchar)
rollback tran @point
commit tran
end
end catch

select * from AUDITORIUM;
DELETE AUDITORIUM where AUDITORIUM like 'test1' or AUDITORIUM like 'test1132' or AUDITORIUM like 'test123'; 


-- 4 --
------A------
--����� ���������� � ������� ��������������� READ UNCOMMITED,
--���. ������ �����������, ��������. � ��������� ������
set transaction isolation level READ UNCOMMITTED
begin transaction
-----t1---------
select @@SPID, 'insert FACULTY' '���������', *
from FACULTY ;
commit;
-----B�-------
--����� ���������� � ������� ��������������� READ COMMITED (�� �����) 
-----t2---------
begin transaction
select @@SPID
insert FACULTY values('��asdt','�������������� ����������');

-----t1----------
-----t2----------
ROLLBACK;

delete FACULTY where FACULTY = '��asdt';

SELECT * FROM FACULTY;
SELECT * FROM PULPIT;

--task5 (��������������� ������)
-- A ---
set transaction isolation level READ COMMITTED
begin transaction
select * from SUBJECT where SUBJECT = '��';
-------------------------- t1 ------------------
-------------------------- t2 -----------------
select * from SUBJECT where SUBJECT = '��';
commit ;

--- B ---
begin transaction
-------------------------- t1 --------------------

update SUBJECT set SUBJECT_NAME = '���� ������ (��������)'  where SUBJECT = '��';
commit tran;
-------------------------- t2 --------------------
rollback

--task6 (��������� ������)

-- A ---
set transaction isolation level REPEATABLE READ
begin transaction
select * from SUBJECT where SUBJECT = '��';
-------------------------- t1 ------------------
-------------------------- t2 -----------------
select count(*) from SUBJECT where SUBJECT = '��';
rollback;

--- B ---
begin transaction
update SUBJECT set SUBJECT_NAME ='1253asdat' where SUBJECT = '��'
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
insert SUBJECT values('ADSDtAD123' , '1DASADAAS' , '����');
commit ;

--Task 8 (��������� ����������)
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
