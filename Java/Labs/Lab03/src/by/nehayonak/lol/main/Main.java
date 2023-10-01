package by.nehayonak.lol.main;

import by.nehayonak.lol.books.*;
import by.nehayonak.lol.seller.seller;
import by.nehayonak.lol.shop.shop;
import by.nehayonak.lol.xmlParser.StaxStreamProcessor;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.xml.XMLConstants;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.File;
import java.io.FileWriter;
import java.io.StringWriter;
import java.util.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.logging.Logger;
import java.util.logging.FileHandler;
import java.util.logging.SimpleFormatter;

public class Main {

    private static final Logger logger = Logger.getLogger(String.valueOf(Main.class));

    public static FileHandler fh;
    public static void main(String[] args) {
        try {
            fh = new FileHandler("F:\\Прога\\2 курс\\2_сем\\Java\\Labs\\Lab03\\log.txt");
            logger.addHandler(fh);
            SimpleFormatter format = new SimpleFormatter();
            fh.setFormatter(format);

            postcard febr = new postcard();
            regularBook book = new regularBook();
            magazin journal = new magazin();

            List<office> bookList = Arrays.asList(journal, febr, book);

            ArrayList<String> name = new ArrayList<>();
            ArrayList<String> cost = new ArrayList<>();
            ArrayList<String> pagevalue = new ArrayList<>();
            ArrayList<String> publisher = new ArrayList<>();
            ArrayList<String> holidays = new ArrayList<>();
            ArrayList<String> genre = new ArrayList<>();

            StaxStreamProcessor.addNamesToList("name", name);
            StaxStreamProcessor.addNamesToList("cost", cost);
            StaxStreamProcessor.addNamesToList("pagevalue", pagevalue);
            StaxStreamProcessor.addNamesToList("publisher", publisher);
            StaxStreamProcessor.addNamesToList("holidays", holidays);
            StaxStreamProcessor.addNamesToList("genre", genre);


            for (int i = 0; i < bookList.size(); i++)
            {
                bookList.get(i).setName(name.get(i));
                bookList.get(i).setCost(Integer.parseInt(cost.get(i)));
                bookList.get(i).setPageValue(Integer.parseInt(pagevalue.get(i)));
            }

            bookList.forEach(temp -> System.out.println("Имя книги:" + temp.getName() + "\nЦена: " + temp.getCost() + "\nКол-во страниц: " + temp.getPageValue()));


            ObjectMapper mapper = new ObjectMapper();

            File file = new File("F:\\Прога\\2 курс\\2_сем\\Java\\Labs\\Lab03\\files\\info.json");
            FileWriter writer = new FileWriter(file);
            String listToJson = mapper.writeValueAsString(bookList);
            writer.write(listToJson);
            writer.close();

            /// валидация xml с xsd
            File schemaFile = new File("F:\\Прога\\2 курс\\2_сем\\Java\\Labs\\Lab03\\files\\validation.xsd");
            Source xmlFile = new StreamSource(new File("F:\\Прога\\2 курс\\2_сем\\Java\\Labs\\Lab03\\files\\booklist.xml"));
            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI); // нужно для считывания схемы
            Schema schema = schemaFactory.newSchema(schemaFile);    // здесь лежит прочитанная и понятная джаве сама xsd-схема
            Validator validator = schema.newValidator();            // запуск xsd-валидатора из javax.xml.validation.Validator
            validator.validate(xmlFile);                            // сама валидация
            System.out.println("\nXML-файл успешно прошёл валидацию с XSD!");


            /*ArrayList<office> knigi = new ArrayList<>();
            knigi.add(new postcard("More", 100, 20, holidays.februar23));
            knigi.add(new regularBook("Harry Potter", 200, 150, "Fantastic"));
            knigi.add(new magazin("Night bobruisk", 20, 20, "Polina Glushenya"));

            shop bukwa = new shop(knigi);
            seller Artsiom = new seller();
            Artsiom.addBook(new regularBook("Ne znayu", 102, 202, "Cringe"), bukwa);
            Artsiom.Print(bukwa);
            Artsiom.sortByPrice(bukwa);
            System.out.println("----------------------------------------");
            Artsiom.Print(bukwa);
            logger.info("test");*/

        }
        catch (Exception e) {
            logger.info("Fatal error! " + e.getMessage());
        }

    }
}