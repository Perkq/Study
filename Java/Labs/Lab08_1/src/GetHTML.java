import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

public class GetHTML {
    public void getContent() {
        URL tut = null;
        String urlName = "https://www.youtube.com/";
        try {
            tut = new URL(urlName);
        } catch (MalformedURLException e) {
            // некорректно заданы протокол, доменное имя или путь к файлу
            e.printStackTrace();
        }
        if (tut == null) {
            throw new RuntimeException();
        }

        try (BufferedReader d = new BufferedReader(new InputStreamReader(tut.openStream()))) {
            String line = "";
            while ((line = d.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
