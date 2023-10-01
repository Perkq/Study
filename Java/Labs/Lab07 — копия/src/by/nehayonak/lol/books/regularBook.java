package by.nehayonak.lol.books;

public class regularBook extends office{
    private String genre;

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public regularBook(){};

    public regularBook(String name, int cost, int pageValue, String genre) {
        super(name, cost, pageValue);
        this.genre = genre;
    }
}
