use NEH_2X_MyBase;


--1 / 2
select �������.��������_��������,
	max(��������.����) [������������ ����],
	min(��������.����) [����������� ����],
	avg(��������.����) [������� ����],
	sum(��������.����) [��������� ����],
	count(*) [����� ����������]
from ������� join ��������
on �������.�������_�������� = ��������.�������_��������
group by �������.��������_��������

--3
select *
from (select case
			when ���� = 10 then '10'
			when ���� between 8 and 9 then '8-9'
			when ���� between 6 and 7 then '6-7'
			when ���� between 4 and 5 then '4-5'
			end [����], count(*) [����������]
from �������� group by case 
			when ���� = 10 then '10'
			when ���� between 8 and 9 then '8-9'
			when ���� between 6 and 7 then '6-7'
			when ���� between 4 and 5 then '4-5'
			end) as T
order by case [����]
			when '10' then 0
			when '8-9' then 1
			when '6-7' then 2
			when '5-6' then 3
			end

--4
select �.�������_��������, �.��������_��������, round(avg(CAST(�.���� as float(4))),2)[����]
from �������� � inner join ������� � on �.�������_�������� = �.�������_��������
group by �.�������_��������, �.��������_��������
order by [����] desc

--5
select �.�������_��������, �.��������_��������, round(avg(CAST(�.���� as float(4))),2)[����]
from �������� � inner join ������� � on �.�������_�������� = �.�������_��������
where �.��������_�������� like '%�����%'
group by �.�������_��������, �.��������_��������
order by [����] desc

--6
select �.�������_��������, �.��������_��������, round(avg(CAST(�.���� as float(4))),2)[����]
from �������� � inner join ������� � on �.�������_�������� = �.�������_��������
where �.������ > 50 and �.������ < 1000
group by �.�������_��������, �.��������_��������
order by [����] desc
				  
--7
select p1.���, p1.����,
	(select COUNT(*) from �������� p2
	where p2.��� = p1.��� and p2.���� = p1.����) [���-�� �����]
	from �������� p1
		group by p1.���, p1.����
		having ���� in('9', '10')
		order by ���� desc