package DAO;

import com.mysql.cj.MysqlConnection;

import java.sql.Connection;

public interface IDBMan {

    Connection connect();
    Boolean disconnect();
}
