package by.nehayonak.lol.books;


import java.io.Serializable;

public abstract class office implements Serializable {
    private String name;

    protected office() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private int cost;
    private int pageValue;

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getPageValue() {
        return pageValue;
    }

    public void setPageValue(int pageValue) {
        this.pageValue = pageValue;
    }

    public office(String name, int cost, int pageValue) {
        this.name = name;
        this.cost = cost;
        this.pageValue = pageValue;
    }
}
