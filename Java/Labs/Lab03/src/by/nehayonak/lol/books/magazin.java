package by.nehayonak.lol.books;

public class magazin extends office{
    private String publisher;

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public magazin(){};

    public magazin(String name, int cost, int pageValue, String publisher) {
        super(name, cost, pageValue);
        this.publisher = publisher;
    }

    public class NewsPaper {
        private String type;

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public NewsPaper(String type) {
            this.type = type;
        }
    }
}
