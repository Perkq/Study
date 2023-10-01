package by.nehayonak.lol.seller;

import by.nehayonak.lol.books.office;
import by.nehayonak.lol.books.regularBook;
import by.nehayonak.lol.shop.shop;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;


import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

public class sellertestfirstpart {

    @Test
    void delBook() {
        ArrayList<office> knigi = new ArrayList<>();
        shop sosedi = new shop(knigi);

        seller Artsiom = new seller();

        Artsiom.addBook(new regularBook("Test1", 200, 100, "GenreTest1"), sosedi);
        Artsiom.addBook(new regularBook("Test2", 300, 50, "GenreTest2"), sosedi);
        regularBook book = new regularBook("Test3", 400, 200, "GenreTest3");
        Artsiom.addBook(book, sosedi);
        Artsiom.delBook(book, sosedi);


        ArrayList<office> test = new ArrayList<>();
        test.add(new regularBook("Test1", 200, 100, "GenreTest1"));
        test.add(new regularBook("Test2", 300, 50, "GenreTest2"));

        shop evroopt = sosedi;


        Assert.assertEquals(sosedi, evroopt);
    }

    @AfterClass
    @Test
    void getBook() {
        ArrayList<office> knigi = new ArrayList<>();
        shop sosedi = new shop(knigi);

        seller Artsiom = new seller();

        Artsiom.addBook(new regularBook("Test1", 200, 100, "GenreTest1"), sosedi);
        Artsiom.addBook(new regularBook("Test2", 300, 50, "GenreTest2"), sosedi);
        regularBook book = new regularBook("Test3", 400, 200, "GenreTest3");
        Artsiom.addBook(book, sosedi);

        regularBook testBook = (regularBook) Artsiom.getBook("Test3", sosedi);

        regularBook test2Book = new regularBook("Test3", 400, 200, "GenreTest3");

        assertEquals(testBook, testBook);
    }


    @Disabled
    @Test
    void sortByPrice() {
        ArrayList<office> knigi = new ArrayList<>();
        shop sosedi = new shop(knigi);

        seller Artsiom = new seller();
        regularBook book = new regularBook("Test3", 400, 200, "GenreTest3");
        Artsiom.addBook(new regularBook("Test2", 300, 50, "GenreTest2"), sosedi);
        Artsiom.addBook(new regularBook("Test1", 200, 100, "GenreTest1"), sosedi);
        Artsiom.addBook(book, sosedi);

        Artsiom.sortByPrice(sosedi);

        ArrayList<office> test = new ArrayList<>();
        test.add(new regularBook("Test1", 200, 100, "GenreTest1"));
        test.add(new regularBook("Test2", 300, 50, "GenreTest2"));
        test.add(new regularBook("Test3", 400, 200, "GenreTest3"));

        shop evroopt = new shop(test);


        Assert.assertEquals(sosedi, evroopt);
    }
}