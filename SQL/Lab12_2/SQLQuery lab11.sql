--1
USE UNIVER;
GO
SET NOCOUNT ON;

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'DBO.NewT'))
	DROP TABLE NewT;

DECLARE	@C int, @FLAG char = 'R';

SET IMPLICIT_TRANSACTIONS ON;
CREATE TABLE NewT (
	FIELD int
);
INSERT INTO NewT
	VALUES (1), (2), (3);

SET @C = (SELECT COUNT(*) FROM NewT);
PRINT ('КОЛИЧЕСТВО СТРОК В ТАБЛИЦЕ NewT: ' + CAST(@C AS char(2)));
IF @FLAG = 'C'
	COMMIT;
ELSE ROLLBACK;

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'DBO.NewT'))
	PRINT 'Таблица NewT есть';
ELSE
	PRINT 'Таблицы NewT нет'

--2
USE UNIVER;
GO
SET NOCOUNT ON;
DECLARE @TRCOUNT int;
BEGIN TRY
  BEGIN TRAN
    DELETE AUDITORIUM_TYPE
    WHERE AUDITORIUM_TYPENAME = 'Новая лекционная';
    INSERT AUDITORIUM_TYPE
      VALUES ('ЛК-Н', 'Новая лекционная');
    INSERT AUDITORIUM_TYPE
      VALUES ('ЛК-Н', 'Новая лекционная');
END TRY
BEGIN CATCH
  PRINT 'ОШИБКА ' + CASE
    WHEN ERROR_NUMBER() = 2627 AND
      PATINDEX('%AUDITORIUM_TYPE_PK%', ERROR_MESSAGE()) > 0 THEN 'Дублирование типа аудитории' 
    ELSE 'неизвестная ошибка: ' + CAST(ERROR_NUMBER() AS varchar(5))
  END;
  SET @TRCOUNT = @@TRANCOUNT;
  PRINT 'Кол-во вложенных транзакций: ' + CAST(@TRCOUNT AS varchar(2));
  IF @@TRANCOUNT > 0
    ROLLBACK TRAN;
  ELSE
	COMMIT TRAN;
END CATCH;


SELECT * FROM AUDITORIUM_TYPE
DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE LIKE ('ЛК-Н')
GO

--3
DECLARE @point varchar(32);
BEGIN TRY
  BEGIN TRAN				
    DELETE AUDITORIUM_TYPE
    WHERE AUDITORIUM_TYPENAME = 'Новая лекционная';
    SET @point = 'p1';
    SAVE TRAN @point;

    INSERT AUDITORIUM_TYPE
      VALUES ('ЛК-Н', 'Новая лекционная');
    SET @point = 'p2';
    SAVE TRAN @point;

    INSERT AUDITORIUM_TYPE
      VALUES ('ЛК-Н', 'Новая лекционная');
  COMMIT TRAN;
END TRY
BEGIN CATCH
  PRINT 'Ошибка: ' + CASE
    WHEN ERROR_NUMBER() = 2627 AND
      PATINDEX('%AUDITORIUM_TYPE_PK%', ERROR_MESSAGE()) > 0 THEN 'дублирование типа аудитории'
    ELSE 'неизвестная ошибка: ' + CAST(ERROR_NUMBER() AS varchar(5)) + ERROR_MESSAGE()
  END;
  IF @@TRANCOUNT > 0
  BEGIN
    PRINT 'контрольная точка: ' + @point;
    ROLLBACK TRAN @point;		
    COMMIT TRAN;			
  END
END CATCH
GO

SELECT * FROM AUDITORIUM_TYPE
GO


--8
USE NEH_2X_MyBase;
BEGIN TRAN
	INSERT ВОДИТЕЛЬ
		VALUES ('Герик', 'Валерий', 'Альфонсович', 12)
	BEGIN TRAN
		UPDATE ВОДИТЕЛЬ
		SET Имя = 'Иннокентий'
		WHERE Стаж = 12
	COMMIT;
	IF @@TRANCOUNT > 0
		ROLLBACK
	SELECT (SELECT
			COUNT(*)
		FROM ВОДИТЕЛЬ
		WHERE Имя = 'Валерий')
		'Водители'