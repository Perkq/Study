package CDB;

import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class Log {

    Logger logger;
    FileHandler fh;

    public Log() throws IOException {
        logger = Logger.getLogger(String.valueOf(com.sun.tools.javac.Main.class));
        fh = new FileHandler("F:\\Прога\\2 курс\\2_сем\\Java\\Labs\\лр6\\lab6\\log.txt");

        logger.addHandler(fh);        SimpleFormatter format = new SimpleFormatter();
        fh.setFormatter(format);
    }
}
