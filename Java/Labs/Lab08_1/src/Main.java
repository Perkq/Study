import ServerClient.Client;
import ServerClient.Server;

public class Main {
    public static void main(String[] args) {
//        GetHTML YouTube = new GetHTML();
//
//        YouTube.getContent();

        Server servak = new Server();
        Client client = new Client();

        servak.getServer();
        client.getClient();

    }
}