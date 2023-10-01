use NEH_2X_MyBase;

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
insert �������� values ('�������-������', '1000��', 3);
insert �������� values ('�����-����', '1532��', 10);
insert �������� values ('�����-�����������','734��', 7);
update �������� set ��������_��������='��������������-���������' where ���������='1000��'
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

select * from ��������; 

update �������� set ��������_��������='���������' where ���������='1000��'
DELETE �������� WHERE ��������_�������� = '�����-����';
DELETE �������� WHERE ��������_�������� = '�����-�����������';

--3-- �������� SAVE TRAN
-- ���� ���������� ���� �� ���� ������� ������ ���������� T-SQL, �� ���.
-- SAVE TRANSACTION, ������ �����.����� ����������
declare @point varchar(3)
begin try
begin tran
insert into �������� values('test123', '��-�', 'test1', 40)
set @point = 'p1'; save tran @point
insert into �������� values('test1132', '��-�', 'test1', 40)
set @point = 'p2'; save tran @point
insert into �������� values('test1', '��', 'test2', 50)
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

select * from ��������;
DELETE �������� where �������_�������� like 'test1' or �������_�������� like 'test1132' or �������_�������� like 'test123'; 


-- 4 --
------A------

set transaction isolation level READ UNCOMMITTED
begin transaction
-----t1---------
select @@SPID, 'insert ��������' '���������', *
from ��������;
commit;
-----B�-------
--����� ���������� � ������� ��������������� READ COMMITED (�� �����) 
-----t2---------
begin transaction
select @@SPID
insert �������� values('��������-���������','92��', 2);

-----t1----------
-----t2----------
ROLLBACK;

SELECT * FROM ��������;
SELECT * FROM ��������;

--task5 (��������������� ������)
-- A ---
set transaction isolation level READ COMMITTED
begin transaction
select * from ������� where ��������_�������� like '%���������%';
-------------------------- t1 ------------------
-------------------------- t2 -----------------
select * from ������� where ��������_�������� like '%���������%';
commit ;

--- B ---
begin transaction
-------------------------- t1 --------------------

update ������� set ��������_�������� = '���������' where ��������_�������� like '%���������%';
commit tran;
-------------------------- t2 --------------------
rollback

--task6 (��������� ������)

-- A ---
set transaction isolation level REPEATABLE READ
begin transaction
select * from ������� where ��������_�������� like '%���������%';
-------------------------- t1 ------------------
-------------------------- t2 -----------------
select count(*) from ������� where ��������_�������� like '%���������%';
rollback;

--- B ---
begin transaction
update ������� set ��������_�������� ='1253asdat' where ��������_�������� like '%���������%';
commit ;

-- A ---
set transaction isolation level Serializable 
begin transaction
select * from �������;
-------------------------- t1 ------------------
-------------------------- t2 -----------------
rollback;

--- B ---
begin transaction
insert �������� values('ADSDtAD123' , '1DASADAAS' , 'test', 10);
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
