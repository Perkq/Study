package by.nehayonak.lol.seller;

import by.nehayonak.lol.books.office;
import by.nehayonak.lol.books.regularBook;
import by.nehayonak.lol.shop.shop;
import org.junit.Assert;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

public class sellerTestPart {

    @Test
    void getCostBooks() {
        ArrayList<office> knigi = new ArrayList<>();
        knigi.add(new regularBook("Test1", 200, 100, "GenreTest1"));
        knigi.add(new regularBook("Test2", 300, 50, "GenreTest2"));
        knigi.add(new regularBook("Test3", 400, 200, "GenreTest3"));

        seller Artsiom = new seller();
        shop sosedi = new shop(knigi);


        int actualCost = Artsiom.getCostBooks(sosedi);

        int expectedCost = 900;

        assertEquals(expectedCost, actualCost);
    }

    @Test
    void addBook() {
        ArrayList<office> knigi = new ArrayList<>();
        shop sosedi = new shop(knigi);

        seller Artsiom = new seller();

        Artsiom.addBook(new regularBook("Test1", 200, 100, "GenreTest1"), sosedi);
        Artsiom.addBook(new regularBook("Test2", 300, 50, "GenreTest2"), sosedi);
        Artsiom.addBook(new regularBook("Test3", 400, 200, "GenreTest3"), sosedi);


        ArrayList<office> test = new ArrayList<>();
        test.add(new regularBook("Test1", 200, 100, "GenreTest1"));
        test.add(new regularBook("Test2", 300, 50, "GenreTest2"));
        test.add(new regularBook("Test3", 400, 200, "GenreTest3"));

        shop evroopt = sosedi;


        Assert.assertEquals(sosedi, evroopt);
    }
}