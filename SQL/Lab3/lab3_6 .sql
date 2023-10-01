use master;
create database G_MyBase
on primary 
(name=N'NEH_2X_MyBase_mdf', filename = N'F:\Прога\2 курс\2_сем\БД\Лаб\NEH_2X_MyBase_mdf.mdf',
size = 10240Kb, maxsize = 1Gb, filegrowth = 25%),
(name=N'NEH_2X_MyBase_ndf', filename = N'F:\Прога\2 курс\2_сем\БД\Лаб\NEH_2X_MyBase_ndf.mdf',
size = 10240Kb, maxsize = 1Gb, filegrowth = 25%),
filegroup FG1
(name=N'NEH_2X_MyBase_fg1_1', filename = N'F:\Прога\2 курс\2_сем\БД\Лаб\NEH_2X_MyBase_fgq-1.ndf',
size = 10240Kb, maxsize = 1Gb, filegrowth = 25%),
(name=N'NEH_2X_MyBase_fg1_2', filename = N'F:\Прога\2 курс\2_сем\БД\Лаб\NEH_2X_MyBase_fgq-2.ndf',
size = 10240Kb, maxsize = 1Gb, filegrowth = 25%)
log on 
(name=N'NEH_2X_MyBase_log', filename = N'F:\Прога\2 курс\2_сем\БД\Лаб\NEH_2X_MyBase_log.ldf',
size = 10240Kb, maxsize = 1Gb, filegrowth = 10%)
go