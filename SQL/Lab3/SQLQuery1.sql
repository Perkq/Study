/*drop database NEH_X2_MyBase
create database NEH_X2_MyBase*/
use NEH_2X_MyBase

create table ��������
(
	�������_�������� nvarchar(20) primary key,
	��� nvarchar(20) not null,
	�������� nvarchar(20),
	���� nvarchar(20),
) on FG1;

create table ��������
(
	��������_�������� nvarchar(50) primary key,
	��������� nvarchar(50),
	����������_����_�_���� int,
) on FG1;

create table �������
(
	���_�������� nvarchar(30) primary key,
	��������_�������� nvarchar(50) not null foreign key references ��������(��������_��������),
	�������_�������� nvarchar(20) foreign key references ��������(�������_��������),
	����_�������� date,
	����_����������� date,
	������ money not null,
) on FG1;

alter table ������� alter column �������_�������� nvarchar(20) not null;

INSERT into ��������(�������_��������, ���, ��������, ����)
		VALUES('�������','�����', '�������', 10),
			 ('������', '������', '����������', 5);

INSERT into ��������(��������_��������, ���������, ����������_����_�_����)
		VALUES('����-���������', '70��', 1),
			  ('���������-�����', '60��', 1);

INSERT into �������(���_��������, ��������_��������, �������_��������, ����_��������, ����_�����������, ������)
		VALUES('390657', '����-���������', '�������', CONVERT(datetime, '2023-12-02'), CONVERT(datetime, '2023-12-03'), 546),
			  ('879425', '���������-�����', '������', CONVERT(datetime, '2023-16-07'), CONVERT(datetime, '2023-17-07'), 1090);


SELECT * FROM �������

SELECT ��������_��������, �������_�������� FROM �������
SELECT �������_��������, ���, �������� FROM ��������
SELECT count(*) FROM ��������

UPDATE �������� set ���� = 3
SELECT * FROM ��������


