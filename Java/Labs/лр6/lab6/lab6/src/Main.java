import CDB.ConnDB;
import CDB.Log;
import CDB.RequestDB;

import java.io.IOException;
import java.sql.*;

public class Main {


    public static void main(String[] args) throws ClassNotFoundException, SQLException, IOException {

        Log log = new Log();


        var connect = new ConnDB().ToDB();
        var req = new RequestDB(connect);


        req.FirstReq();
        req.SecondReq();
        req.ThirdReq();
        req.SecondReq();
        req.ThirdReq();

        req.Transaction();

    }
}