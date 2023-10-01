import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;

public class UDP {

    public void sendInfo() {
        try {
            DatagramSocket sock = new DatagramSocket(3000);
            DatagramPacket packet = new DatagramPacket("Hello".getBytes(), "Hello".length(), 3000);

        } catch (SocketException e) {
            throw new RuntimeException(e);
        }

    }

    public void getInfo() {
        try {
            DatagramSocket sock = new DatagramSocket(3000);

            byte buff[] = null;
            DatagramPacket packet = new DatagramPacket(buff, "Hello".length());
        } catch (SocketException e) {
            throw new RuntimeException(e);
        }

    }
}
