package ServerClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    public void getServer() {
        ServerSocket serverSocket = null;
        Socket client = null;
        BufferedReader inbound = null;
        OutputStream outbound = null;

        try {
            // Создаем server socket
            serverSocket = new ServerSocket(3000);
//            System.out.println("Waiting for a student request...");
            while (true) {
                // Ждем запрос
                client = serverSocket.accept();
                // Получаем поток
                inbound = new BufferedReader(new InputStreamReader(client.getInputStream()));
                outbound = client.getOutputStream();

                int CheckNum = 10;

                if(Integer.parseInt(inbound.readLine()) == CheckNum) {
                    outbound.write("win".getBytes());
                    break;
                } else {
                    outbound.write("lose".getBytes());
                    continue;
                }

            }
        } catch (IOException ioe) {
            System.out.println("Error in Server: " + ioe);
        } finally {
            try {
                inbound.close();
                outbound.close();
            } catch (Exception e) {
                System.out.println("FitServer: can't close streams" + e.getMessage());
            }
        }
    }
}
