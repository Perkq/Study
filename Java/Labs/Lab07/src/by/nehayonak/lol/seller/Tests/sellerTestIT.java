package by.nehayonak.lol.seller.Tests;

import by.nehayonak.lol.books.office;
import by.nehayonak.lol.books.regularBook;
import by.nehayonak.lol.seller.seller;
import by.nehayonak.lol.shop.shop;
import org.junit.AfterClass;
import org.junit.Ignore;
import org.junit.jupiter.api.Disabled;
//import org.junit.jupiter.api.Test;
import org.junit.Test;


import java.util.ArrayList;

public class sellerTestIT {
    @Test
    public void delBook() {
        ArrayList<office> knigi = new ArrayList<>();
        shop sosedi = new shop(knigi);

        seller Artsiom = new seller();

        Artsiom.addBook(new regularBook("Test1", 200, 100, "GenreTest1"), sosedi);
        Artsiom.addBook(new regularBook("Test2", 300, 50, "GenreTest2"), sosedi);
        regularBook book = new regularBook("Test3", 400, 200, "GenreTest3");
        Artsiom.addBook(book, sosedi);
        Artsiom.delBook(book, sosedi);

    }

    @Test
    public void getBook() {
        ArrayList<office> knigi = new ArrayList<>();
        shop sosedi = new shop(knigi);

        seller Artsiom = new seller();

        Artsiom.addBook(new regularBook("Test1", 200, 100, "GenreTest1"), sosedi);
        Artsiom.addBook(new regularBook("Test2", 300, 50, "GenreTest2"), sosedi);
        regularBook book = new regularBook("Test3", 400, 200, "GenreTest3");
        Artsiom.addBook(book, sosedi);
    }


    @Ignore
    @Test
    public void sortByPrice() {
        ArrayList<office> knigi = new ArrayList<>();
        shop sosedi = new shop(knigi);

        seller Artsiom = new seller();
        regularBook book = new regularBook("Test3", 400, 200, "GenreTest3");
        Artsiom.addBook(new regularBook("Test2", 300, 50, "GenreTest2"), sosedi);
        Artsiom.addBook(new regularBook("Test1", 200, 100, "GenreTest1"), sosedi);
        Artsiom.addBook(book, sosedi);

        Artsiom.sortByPrice(sosedi);

    }
}