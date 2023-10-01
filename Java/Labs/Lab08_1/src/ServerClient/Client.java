package ServerClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class Client {
    public void getClient() {
        Socket clientSocket = null;
        try {
            // Открыть клиентское socket connection
            clientSocket = new Socket("localhost", 3000);
            System.out.println("Client: " + clientSocket);
        } catch (UnknownHostException uhe){
            System.out.println("UnknownHostException: " + uhe);
        } catch (IOException ioe){
            System.err.println("IOException: " + ioe);
        }

        try (OutputStream outbound = clientSocket.getOutputStream();
             BufferedReader inbound = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));)
        {
            Scanner scan = new Scanner(System.in);


            int serverNumber;
            while (true) {
                int number = scan.nextInt();
                serverNumber = Integer.parseInt(inbound.readLine());
                outbound.write(scan.nextInt());

                if(inbound.readLine().equals("win")) {
                    System.out.println("Вы угадали число!");
                    break;
                }
                if(inbound.readLine().equals("lose")) {
                    System.out.println("Вы не угадали число :(");
                    continue;
                }

            }
        }
        catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }
}
