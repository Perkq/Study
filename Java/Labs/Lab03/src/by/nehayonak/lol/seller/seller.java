package by.nehayonak.lol.seller;

import by.nehayonak.lol.books.office;
import by.nehayonak.lol.shop.shop;

import java.util.*;

interface SellPossibilities {
    public int getCostBooks(shop whereToGetCosts);
    public void addBook(office toAdd, shop whereToAdd);
    public void delBook(office toDel, shop whereToDel);
    public office getBook(String name, shop whereToLook);
    public void sortByPrice(shop toSort);
}

public class seller implements SellPossibilities {

    public int getCostBooks(shop whereToGetCosts) {

        int sum = 0;
        for (office temp:
                whereToGetCosts.goods) {
            sum += temp.getCost();
        }
        return sum;
    }

    public void addBook(office toAdd, shop whereToAdd) {
        whereToAdd.goods.add((toAdd));
    }

    public void delBook(office toDel, shop whereToDel) {
        whereToDel.goods.remove((toDel));
    }

    public office getBook(String name, shop whereToLook) {
        for (office temp:
             whereToLook.goods) {
            if(temp.getName().equals(name)) {
                return temp;
            }
        }
        return null;
    }

    public void sortByPrice(shop toSort) {
        toSort.goods.sort(Comparator.comparing(office::getCost));
    }
    public void Print(shop Shop) {
        for (office temp:
             Shop.goods) {
            System.out.println("Название: " + temp.getName());
            System.out.println("Цена: " + temp.getCost());
            System.out.println("Кол-во страниц: " + temp.getPageValue());

        }
    }
}
