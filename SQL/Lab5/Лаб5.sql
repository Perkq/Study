use UNIVER;
--1
/*�� ������ ������ FACULTY, PULPIT � PROFESSION ������������ ������ ������������ ������ (������� PULPIT_NAME), 
������� ��������� �� ���������� (������� FACULTY), �������������� ���������� �� �������������, 
� ������������ (������� PROFESSION_NAME) �������� ���������� ����� ���������� ��� ����������. 
����������: ������������ � ������ WHERE �������� IN c ����������������� ����������� � ������� PROFESSION. */

SELECT PULPIT.PULPIT_NAME, FACULTY.FACULTY_NAME
FROM PULPIT, FACULTY
WHERE PULPIT.FACULTY=FACULTY.FACULTY and PULPIT.FACULTY In (
SELECT PROFESSION.FACULTY 
FROM PROFESSION 
WHERE (PROFESSION_NAME Like '%����������%' or PROFESSION_NAME like '%����������%'))


--2 
/*��� �� ��������� ��� ������� � ����������� INNER JOIN ������ FROM �������� �������. 
��� ���� ��������� ���������� ������� ������ ���� ����������� ���������� ��������� �������*/

SELECT PULPIT.PULPIT_NAME, FACULTY.FACULTY_NAME
FROM PULPIT INNER JOIN FACULTY
ON PULPIT.FACULTY=FACULTY.FACULTY 
WHERE PULPIT.FACULTY In (
SELECT PROFESSION.FACULTY 
FROM PROFESSION 
WHERE (PROFESSION_NAME Like '%����������%' or PROFESSION_NAME like '%����������%'))


--3
/*���������� ������, ����������� 1 ����� ��� ������������� ����������. 
����������: ������������ ���������� INNER JOIN ���� ������.*/

SELECT distinct PULPIT.PULPIT_NAME, FACULTY.FACULTY_NAME
FROM PULPIT INNER JOIN FACULTY
ON PULPIT.FACULTY=FACULTY.FACULTY 
INNER JOIN PROFESSION
ON PROFESSION.FACULTY=PULPIT.FACULTY
WHERE (PROFESSION_NAME Like '%����������%' or PROFESSION_NAME like '%����������%')


--4 
/*�� ������ ������� AUDITORIUM ������������ ������ ��������� ����� ������� ������������ (������� AUDITORI-UM_CAPACITY) 
��� ������� ���� ��������� (AUDITORIUM_TYPE). ��� ���� ��������� ������� ������������� � ������� �������� �����������. 
����������: ������������ ������������� ��������� c �������� TOP � ORDER BY. */

SELECT * FROM AUDITORIUM a
WHERE  AUDITORIUM_CAPACITY = (
	SELECT TOP(1) AUDITORIUM_CAPACITY FROM AUDITORIUM aa
	WHERE aa.AUDITORIUM_TYPE=a.AUDITORIUM_TYPE 
	ORDER BY AUDITORIUM_CAPACITY desc)
ORDER BY AUDITORIUM_CAPACITY desc


--5
/*�� ������ ������ FACULTY � PULPIT ������������ ������ ������������ ����������� (������� FACULTY_NAME), �� ������� ��� �� ����� ������� (������� PULPIT). 
����������: ������������ �������� EXISTS � ��������������� �����-����. */

SELECT FACULTY.FACULTY_NAME [���������� ��� ������]
FROM FACULTY
WHERE not exists (SELECT * FROM PULPIT
WHERE PULPIT.FACULTY=FACULTY.FACULTY)

SELECT FACULTY.FACULTY_NAME [���������� � ���������]
FROM FACULTY
WHERE exists (SELECT * FROM PULPIT
WHERE PULPIT.FACULTY=FACULTY.FACULTY)


--6
/*�� ������ ������� PROGRESS ������������ ������, ���������� ������� �������� ������ (������� NOTE) �� �����������, 
������� ��������� ����: ����, �� � ����. ����������: ������������ ��� ����������������� ���������� � ������ SELECT; 
� ����������� ��������� ���������� ������� AVG. */

SELECT TOP 1
(SELECT avg(PROGRESS.NOTE) FROM PROGRESS
		WHERE PROGRESS.SUBJECT like '����')[����],
(SELECT avg(PROGRESS.NOTE) FROM PROGRESS
		WHERE PROGRESS.SUBJECT like '��')[��],
(SELECT avg(PROGRESS.NOTE) FROM PROGRESS
		WHERE PROGRESS.SUBJECT like '����')[����]
FROM PROGRESS


--7
/*����������� SELECT-������, ��������������� ������� ���������� ALL ��������� � �����������.*/
--����������: ����, ������� >= ����. ��  PROGRESS.NOTE<=5

SELECT NAME, SUBJECT, NOTE
FROM STUDENT, PROGRESS
WHERE  PROGRESS.SUBJECT like '����' and NOTE>=all (SELECT PROGRESS.NOTE FROM PROGRESS
	WHERE PROGRESS.NOTE<=5)


--8
/*����������� SELECT-������, ��������������� ������� ���������� ANY ��������� � �����������.*/
--������ ���������, ��� ����������� > ���� �� 1 �� %��%

SELECT * FROM AUDITORIUM
WHERE AUDITORIUM_CAPACITY > ANY(SELECT AUDITORIUM_CAPACITY FROM AUDITORIUM
			WHERE AUDITORIUM_TYPE LIKE '%��%')
ORDER BY AUDITORIUM_CAPACITY asc


--10
/*����� � ������� STUDENT ���������, � ������� ���� �������� � ���� ����. ��������� �������.*/

SELECT distinct s1.IDSTUDENT, s1.NAME, s1.BDAY 
FROM STUDENT s1 inner join STUDENT s2
	ON (s1.BDAY = s2.BDAY and s1.IDSTUDENT != s2.IDSTUDENT)
ORDER BY s1.BDAY desc