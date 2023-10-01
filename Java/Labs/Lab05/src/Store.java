import static java.lang.Thread.currentThread;

class Store {
    private int product = 0;
    long start = System.currentTimeMillis();

    public void get() {
        System.out.println("Турист подошел");
        synchronized (this) {
            while (product < 1) {
                try {
                    wait();
                } catch (InterruptedException e) { }
            }

            long end = start + 10000;

            try {
                while (System.currentTimeMillis() < end) {
                    System.out.println("Турист ждет");
                    currentThread().sleep(2000);
                    while (product < 1) {
                        try {
                            wait();
                        } catch (InterruptedException e) { }
                    }
                    product--;
                    System.out.println("Турист взял 1 лыжи");
                    System.out.println("Лыж на складе: " + product);
                    notify();
                }
                if (System.currentTimeMillis() > end) {
                    currentThread().interrupt();
                    throw new InterruptedException();
                }

            } catch (InterruptedException e) {
                System.out.println("Турист ушел");
            }
        }
    }


    public void getRetiree() {
        System.out.println("Пенсионер подошел");

        synchronized (this) {
            while (product < 1) {
                try {
                    wait();
                } catch (InterruptedException e) { }
            }
            try {
                currentThread().sleep(500);
            } catch (InterruptedException e) { }

            product--;
            System.out.println("Пенсионер взял 1 лыжи");
            System.out.println("Лыж на складе: " + product);
            notify();

            try {
                throw new InterruptedException();
            } catch (InterruptedException e) {
//                System.out.println("Лыжи закрываются");
                currentThread().interrupt();
            }
        }
    }


    public synchronized void put() {
        long start = System.currentTimeMillis();
        long end = start + 6000;

        while (product >= 2) {
            try
            {
                wait();
            } catch (InterruptedException e) { }
        }
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) { }

        product++;
        System.out.println("Работник добавил 1 лыжи");
        System.out.println("Лыж на складе: " + product);
        notify();

        if (System.currentTimeMillis() > end)
            currentThread().interrupt();
    }
}


// класс Работник
class Worker implements Runnable {

    Store store;
    Worker(Store store) {
        this.store=store;
    }
    public void run() {
        for (int i = 1; i < 6; i++) {
            store.put();
        }
    }
}


// Класс Турист
class Tourist implements Runnable {
    Store store;
    Tourist(Store store){
        this.store=store;
    }
    public void run() {
        store.get();
    }
}


// Класс Пенсионер
class Retiree implements Runnable {
    Store store;
    Retiree(Store store) {
        this.store=store;
    }
    public void run() {
        store.getRetiree();
    }
}
