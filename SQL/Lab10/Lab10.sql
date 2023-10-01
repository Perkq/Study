use UNIVER;

create table #Explore
(
	Ind int,
	String varchar(100),
);

-- 1 --

set nocount on;
Declare @i int = 0;
while @i < 1010 
	begin
	insert #Explore(Ind, String)
		values(floor(30000*rand()), 'строка ' + cast(@i as varchar(10)));
	set @i = @i + 1;
	end;

Drop index #Explore.#Explore_cl
select * from #Explore where Ind between 1500 and 3500 order by Ind;

checkpoint;
DBCC DROPCLEANBUFFERS;
Create clustered index #Explore_cl on #Explore(Ind asc)

select * from #Explore where Ind between 1500 and 3500 order by Ind;

-- 2 --

create table #Ex
(
	IndKey int,
	CC int identity(1, 1),
	String varchar(100)
);

set nocount on;
Declare @i int = 0;
while @i < 15000
	begin
	insert #Ex(IndKey, String)
		values(floor(30000*rand()), 'строка ' + cast(@i as varchar(10)));
	set @i = @i + 1;
	end;


Drop index #Ex.#Ex_NonClu;
select * from #Ex where IndKey > 1500 and CC < 4500;
select * from #Ex order by IndKey, CC

select * from #Ex where	IndKey = 123 and CC > 3

Create index #Ex_NonClu on #Ex(IndKey, CC)
select * from #Ex where IndKey > 1500 and CC < 4500;
select * from #Ex order by IndKey, CC
select * from #Ex where IndKey > 1500 and CC = 3200;

select * from #Ex where	IndKey = 123 and CC > 3


-- 3 -- 


drop index #Ex.#Ex_Ind_Incl;
select CC from #EX where IndKey > 1500


create index #Ex_Ind_Incl on #Ex(IndKey) include (CC)
select CC from #EX where IndKey > 1500


-- 4 -- 

drop index #Ex.#Ex_filter;

select IndKey from #Ex where IndKey between 500 and 9500;
select IndKey from #Ex where (IndKey > 1500 and IndKey < 10500);
select IndKey from #Ex where IndKey = 1700;

create index #Ex_Filter on #Ex(IndKey) where (IndKey > 1200 and IndKey < 10600);

-- 5 -- 

use NEH_2X_MyBase;

create table Explore
(
	Ind int,
	String varchar(100),
);

create index #Test_Ind on Explore(Ind);

set nocount on;
Declare @i int = 0;
while @i < 15000
	begin
	insert Explore(Ind, String)
		values(floor(30000*rand()), 'строка ' + cast(@i as varchar(10)));
	set @i = @i + 1;
	end;

insert top(10000) Explore(Ind, String) select Ind, String from Explore;
SELECT name [Индекс], avg_fragmentation_in_percent [Фрагментация (%)]
FROM sys.dm_db_index_physical_stats(DB_ID(N'NEH_2X_MyBase'), 
	OBJECT_ID(N'Explore'), NULL, NULL, NULL) ss  JOIN sys.indexes ii on ss.object_id = ii.object_id and ss.index_id = ii.index_id  WHERE name is not null;

select count(*) from Explore;
select * from #Ex

alter index #Test_Ind on Explore reorganize;

alter index #Test_Ind on Explore rebuild with (online = off);

drop index Explore.#Test_Ind;

-- 6 --

create index #Ex_Ind on Explore(Ind)
	with (fillfactor = 65);

drop index Explore.#Ex_Ind;

create index #Ex_Ind on Explore(Ind);

INSERT top(50)percent INTO Explore(Ind, String) 
                                             SELECT Ind, String  FROM Explore;
SELECT name [Индекс], avg_fragmentation_in_percent [Фрагментация (%)]
FROM sys.dm_db_index_physical_stats(DB_ID(N'NEH_2X_MyBase'), 
	OBJECT_ID(N'Explore'), NULL, NULL, NULL) ss  JOIN sys.indexes ii on ss.object_id = ii.object_id and ss.index_id = ii.index_id  WHERE name is not null;
			

