package org.example;


import DAO.DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {

        DAO dao = new DAO();

        dao.connect();
        dao.getPlanetsLife();
//        Connection cn = DriverManager.getConnection("jdbc:sqlserver://localhost:1433;databaseName=JavaLaba6;integratedSecurity=true;"
//    + "encrypt=true;trustServerCertificate=true");
//
//        Statement st = cn.createStatement();
//        System.out.println( "Hello World!" );
    }
}
