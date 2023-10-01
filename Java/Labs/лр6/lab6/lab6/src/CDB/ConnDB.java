package CDB;

import com.sun.tools.javac.Main;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Logger;

public class ConnDB {

    Log log;

    {
        try {
            log = new Log();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public java.sql.Connection ToDB() {
        String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=ForJava;integratedSecurity=true;\"\n" +
                "                    + \"encrypt=true;trustServerCertificate=true";

        System.out.print("Connecting to SQL Server ... ");
        Connection connection = null;



        try {
            connection = DriverManager.getConnection(connectionUrl);
            System.out.println("Done.");
        } catch (SQLException ex) {
            log.logger.info("Ошибка в подключении");
            ex.printStackTrace();
        }
        return connection;
    }
}


