import java.util.concurrent.Exchanger;
import java.util.concurrent.Semaphore;

public class Main {
    public static void main(String[] args) {
        try {

/*
            long start = System.currentTimeMillis();
            long end = start + 1000;

            Store store = new Store();
            Worker Worker = new Worker(store);
            Tourist Tourist = new Tourist(store);
            Retiree retiree = new Retiree(store);
            new Thread(Worker).start();

            for (int i = 0; i < 2; i++)
                new Thread(Tourist).start();


            Thread retireeThread = new Thread(retiree);
            retireeThread.setPriority(1);
            retireeThread.start();


            new Thread(Tourist).start();

            if (System.currentTimeMillis() > end)
                Thread.currentThread().interrupt();*/


            Semaphore sem = new Semaphore(3);
            Exchanger<Boolean> exDir = new Exchanger<>();
            Exchanger<Integer> exCtr = new Exchanger<>();


            new Car(sem, true, 1, exDir, exCtr).start();
            new Car(sem, true, 2, exDir, exCtr).start();
            new Car(sem, true, 3, exDir, exCtr).start();
            new Car(sem, false, 4, exDir, exCtr).start();
            new Car(sem, false, 5, exDir, exCtr).start();
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
        }
    }
}