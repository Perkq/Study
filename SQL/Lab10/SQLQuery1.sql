use NEH_2X_MyBase;

-- 1 --
Drop index #Explore.#Explore_cl
select * from �������� where ����������_����_�_���� between 1 and 10 order by ����������_����_�_����;

checkpoint;
DBCC DROPCLEANBUFFERS;
Create clustered index #Marsh_cl on ��������(��������_�������� asc)

select * from �������� order by ��������_��������;

-- 2 --

select * from �������� where ��������� like '%0��%' and ����������_����_�_���� < 10;
select * from �������� order by ���������, ����������_����_�_����

select * from �������� where ��������� = 123 and ����������_����_�_���� > 3

Create index #Marsh_NonClu on ��������(���������, ����������_����_�_����)
select * from �������� where ��������� like '%0��%' and ����������_����_�_���� < 10;
select * from �������� order by ���������, ����������_����_�_����

select * from �������� where ��������� like '%0��%' and ����������_����_�_���� < 10

-- 3 --
drop index ��������.#My_Incl;
select ��������� from �������� where ����������_����_�_���� < 10


create index #My_Incl on ��������(��������_��������) include (���������)
select ��������� from �������� where ����������_����_�_���� < 10

-- 4 --

drop index ��������.��������_filter;

select ����������_����_�_���� from �������� where ����������_����_�_���� between 0 and 10;
select ����������_����_�_���� from �������� where (����������_����_�_���� > 1 and ����������_����_�_���� < 4);
select ����������_����_�_���� from �������� where ����������_����_�_���� = 1;

create index ��������_Filter on ��������(����������_����_�_����) where (����������_����_�_���� > 1 and ����������_����_�_���� < 10);

-- 5 --