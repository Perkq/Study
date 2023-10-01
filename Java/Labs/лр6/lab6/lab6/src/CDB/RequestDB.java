package CDB;


import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.Scanner;

public class RequestDB {

    Log log;

    {
        try {
            log = new Log();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    Connection connection = null;

    public RequestDB(Connection connection) {
        this.connection = connection;
    }


    public void FirstReq() throws SQLException {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Введите название группы товаров: ");
        String nameprod = scanner.nextLine();
        System.out.println("Вывести перечень параметров для заданной группы продукции.");
        String sql = "Select Params_group From Products_Group  Where Products_Group.Name= ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, nameprod);
        ResultSet resultSet = preparedStatement.executeQuery();

        while (resultSet.next()) {

            System.out.print("Params: ");
            String param = resultSet.getString("Params_Group");

            System.out.printf("%s \n", param);
        }

        log.logger.info("Первый запрос выполнен успешно!");
    }

    public void SecondReq() throws SQLException {
        Statement statement = connection.createStatement();
        System.out.println("Вывести перечень продукции, не содержащий заданного параметра. ");
        ResultSet resultSet = statement.executeQuery("SELECT Products.Name\n" +
                "From Products\n" +
                "where Products.Name not in (select Products.Name FROM Products inner join Products_Group On\n" +
                "                        Products.Prod_Group = Products_Group.Name inner join Params_Group On\n" +
                "                        Params_Group.Name = Products_Group.Params_Group inner join Params On Params.Names = Params_group.Params Where Params.Names\n" +
                "                        in (select Params.Names from Params where Params.Names = 'Пиксел'))");
        System.out.println("List: ");
        while (resultSet.next()) {

            String prod = resultSet.getString("Name");
            System.out.printf("%s \n", prod);
        }

        log.logger.info("Второй запрос выполнен успешно!");

    }

    public void ThirdReq() throws SQLException {
        System.out.println("Вывести информацию о продукции для заданной группы. ");
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("Select Products.Info\n" +
                "From Products inner join Products_Group\n" +
                "On Products.Prod_group = Products_Group.Name\n" +
                "Where Products_Group.Name = 'Смартфон'");
        System.out.println("Info: ");
        while (resultSet.next()) {

            String info = resultSet.getString("Info");
            System.out.printf("%s \n", info);
        }

        log.logger.info("Третий запрос выполнен успешно!");

    }

    public void FourthReq() throws SQLException {
        System.out.println("Вывести информацию о продукции и всех ее параметрах со значениями.");
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select Products.Name, Params.Names," +
                " Products.Params, Products.Info, Products.Date, Products.Prod_group\n" +
                "From\n" +
                "Products inner join Products_Group \n" +
                "On Products.Prod_Group = Products_Group.Name \n" +
                "inner join Params_Group On\n" +
                "Params_Group.Name = Products_Group.Params_Group \n" +
                "inner join Params On Params.Names = Params_group.Params");
        System.out.println("Info: ");
        while (resultSet.next()) {

            String name = resultSet.getString("Name");
            String name2 = resultSet.getString("Names");
            int par = resultSet.getInt("Params");
            String info = resultSet.getString("Info");
            String date = resultSet.getString("Date");
            String group = resultSet.getString("Prod_group");

            System.out.printf("%s \t%s \t%d \t%s \t%s \n", name, name2, par, info, date);
        }

        log.logger.info("Четвертый запрос выполнен успешно!");



    }

    public void Transaction() {
//    Connection connection = ;
        // Сброс автофиксации
        try {
            connection.setAutoCommit(false);
            PreparedStatement updateSales = connection.prepareStatement(
                    "UPDATE Params SET NAMES = ?");
            updateSales.setString(1, "Test");
            updateSales.executeUpdate();

            // Вторая транзакция
            PreparedStatement updateTotal = connection.prepareStatement(
                    "UPDATE Params SET NAMES = ?");
            updateTotal.setString(1, "Test2");
            updateTotal.executeUpdate();
            // Завершение транзакции
            connection.commit();
            // Восстановление по умолчанию
            connection.setAutoCommit(true);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        // Первая транзакция

    }


}

