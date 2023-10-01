use Test;

create table Owners
(
NameOwner nvarchar(50) primary key,
Passport nvarchar(15) not null,
Birthdate date
);

create table ACCOUNT
(
NumAcc int primary key,
typeOfDeposite nvarchar(50) not null,
dateOfOpening date not null,
OwnerAcc nvarchar(50) not null foreign key references
								Owners(NameOwner)
);

alter table Owners
add Image varbinary(max);

update Owners set Passport = '1234567A123PB1' , Birthdate = '01-02-2004', Image = 101001 where NameOwner like 'nikita'