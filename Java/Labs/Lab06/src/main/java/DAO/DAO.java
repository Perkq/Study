package DAO;

import org.example.App;

import java.io.IOException;
import java.sql.*;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class DAO implements IDBMan, DBMethods
{

    private Connection con;

    private static final Logger logger = Logger.getLogger(String.valueOf(App.class));
    public static FileHandler fh;
    private Statement state;

    private String user;            // юзер для подключения

    private String password;        // его пароль

    private String from;            // url бд для транзакции (откуда)

    private String to;              // url бд для транзакции (куда)


    public Connection connect() {
        try {
            fh = new FileHandler("F:\\Прога\\2 курс\\2_сем\\Java\\Labs\\Lab06\\log.txt");
            logger.addHandler(fh);
            SimpleFormatter format = new SimpleFormatter();
            fh.setFormatter(format);

            con = DriverManager.getConnection("jdbc:sqlserver://localhost:1433;databaseName=batareikaBY;integratedSecurity=true;"
                    + "encrypt=true;trustServerCertificate=true");
            state = con.createStatement();
            logger.info("Соединение установлено");
        } catch (SQLException | IOException e) {
            throw new RuntimeException(e);
        }
        return  con;
    }


    public Boolean disconnect() {
        try {
            con.close();
            logger.info("Соединение закрыто");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    public String getPlanetsLife() {
        try
        {
            ResultSet resultSet = state.executeQuery(
                    "select PLANETS.Name, SPUTNIK.Name\n" +
                            "from PLANETS, SPUTNIK\n" +
                            "where PLANETS.Life like '%есть%' and PLANETS.Sputnik.name = SPUTNIK.Name"
            );

            while(resultSet.next()) {
                String namePl = resultSet.getString(0);
                String nameSp = resultSet.getString(1);
                System.out.println("Имя планеты: " +namePl + ", имя спутника " + nameSp);
            }

            return resultSet.toString();
        }
        catch (SQLException e)
        {
            logger.info("Ошибка в поиске планет с наличием жизни");
            throw new RuntimeException(e);
        }
    }

    public String getPlanetsMinRad() {
        try
        {
            ResultSet resultSet = state.executeQuery(
                    "select PLANETS.Name, SPUTNIK.Name\n" +
                            "from PLANETS, SPUTNIK\n" +
                            "where PLANETS.Radius = min(PLANETS.Radius) and PLANETS.Sputnik_Name = SPUTNIK.Name"
            );

            while(resultSet.next()) {
                String namePl = resultSet.getString(0);
                String nameSp = resultSet.getString(1);
                System.out.println("Имя планеты: " +namePl + ", имя спутника " + nameSp);
            }

            return resultSet.toString();
        }
        catch (SQLException e)
        {
            logger.info("Ошибка в поиске планет с наличием жизни");
            throw new RuntimeException(e);
        }
    }

    public String getPlanetsSputnikMaxRadius() {
        try
        {
            PreparedStatement preparedStatement = con.prepareStatement(
                    "select PLANETS.Name, SUM(SPUTNIK.Radius) as total_sputnik_radius \n" +
                            "from PLANETS inner join  SPUTNIK on PLANETS.Sputnik_Name = SPUTNIK.Name\n" +
                            "group by PLANETS.Name \n" +
                            "having total_sputnik_radius >= ?"
            );

//            String query = "SELECT planets.name, SUM(moons.radius) AS total_moon_radius\n" +
//                    "FROM planets\n" +
//                    "JOIN moons ON planets.name = moons.planet_name\n" +
//                    "GROUP BY planets.name\n" +
//                    "ORDER BY total_moon_radius DESC\n" +
//                    "LIMIT 1;";
//
//            ResultSet resSet = state.executeQuery(query);


            preparedStatement.setInt(1, 10);

            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()) {
                String namePl = resultSet.getString(0);
                String nameSp = resultSet.getString(1);
                System.out.println("Имя планеты: " +namePl + ", имя спутника " + nameSp);
            }

            return resultSet.toString();
        }
        catch (SQLException e)
        {
            logger.info("Ошибка в поиске планет с наличием жизни");
            throw new RuntimeException(e);
        }
    }

    public void executeTransaction()
    {
        logger.info("Transaction");
        try
        {
            // коннектимся к двум бд: from и to
            int sum = 300;
            Connection connectionFrom = DriverManager.getConnection(from, user, password);
            // ставим автокоммиты в состояние false
            connectionFrom.setAutoCommit(false);
            Connection connectionTo = DriverManager.getConnection(to, user, password);
            connectionTo.setAutoCommit(false);

            try
            {
                if (sum <= 0)
                    throw new NumberFormatException("less or equals zero");
                Statement stFrom = connectionFrom.createStatement();
                Statement stTo = connectionTo.createStatement();


                // сама транзакция
                ResultSet rsFrom = stFrom.executeQuery("select Balance from Table_from");
                ResultSet rsTo = stTo.executeQuery("select Balance from Table_to");


                int accountFrom = 0;
                while (rsFrom.next())
                    accountFrom = rsFrom.getInt(1);
                int resultFrom= 0;
                if (accountFrom >= sum)
                    resultFrom = accountFrom - sum;
                else
                    throw new SQLException("Invalid balance!");


                int accountTo = 0;
                while (rsTo.next())
                    accountTo = rsTo.getInt(1);
                int resultTo = accountTo + sum;
                stFrom.executeUpdate("update Table_from set Balance = " + resultFrom);
                stTo.executeUpdate("update Table_to set Balance = " + resultTo);


                // завершение транзакции: как только прописали коммит, результаты одновременно навсегда изменятся
                connectionFrom.commit();
                connectionTo.commit();

                System.out.println("Transacted:    " + sum + " dollars");
                System.out.println("Balance_from:  " + resultFrom + " dollars");
                System.out.println("Balance_to:    " + resultTo + " dollars");
            }

            // если что то пошло не так:
            catch (SQLException e)
            {
                System.out.println("Error in transaction: " + e.getMessage());
                logger.info("Error!");
                // откат транзакции при ошибке до последнего коммита
                connectionFrom.rollback();
                connectionTo.rollback();
            }
        }



        catch (Exception e)
        {
            System.out.println("Exception in transaction!");
        }
    }

}
