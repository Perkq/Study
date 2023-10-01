package by.nehayonak.lol.books;

public class postcard extends office {
    private holidays holiday;

    public holidays getHoliday() {
        return holiday;
    }

    public void setHoliday(holidays holiday) {
        this.holiday = holiday;
    }

    public postcard(){};

    public postcard(String name, int cost, int pageValue, holidays holiday) {
        super(name, cost, pageValue);
        this.holiday = holiday;
    }
}
