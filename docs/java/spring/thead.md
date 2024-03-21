### Thread

#### 1. 线程的生命周期

> 线程的生命周期包括五种状态：新建、就绪、运行、阻塞、死亡。


#### 2. 线程的创建

> 1. 继承Thread类

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
    }
}
```

> 2. 实现Runnable接口

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
    }
}
```

> 3. 实现Callable接口

```java
public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        return "success";
    }
}
```

#### 3. 线程的启动

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
    }
}

public class Test {
    public static void main(String[] args) {
        MyThread myThread = new MyThread();
        myThread.start();
    }
}
```


> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
    }
}

public class Test {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        return "success";
    }
}

public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 4. 线程的中断

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        while (!isInterrupted()) {
            System.out.println("MyThread.run()");
        }
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
        Thread.sleep(1000);
        myThread.interrupt();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        while (!Thread.currentThread().isInterrupted()) {
            System.out.println("MyRunnable.run()");
        }
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        while (!Thread.currentThread().isInterrupted()) {
            System.out.println("MyCallable.call()");
        }
        return "success";
    }
}

public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 5. 线程的停止

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        while (!isInterrupted()) {
            System.out.println("MyThread.run()");
        }
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
        Thread.sleep(1000);
        myThread.stop();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        while (!Thread.currentThread().isInterrupted()) {
            System.out.println("MyRunnable.run()");
        }
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
        Thread.sleep(1000);
        thread.stop();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        while (!Thread.currentThread().isInterrupted()) {
            System.out.println("MyCallable.call()");
        }
        return "success";
    }
}

public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        Thread.sleep(1000);
        thread.stop();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 6. 线程的休眠

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("MyThread.run()");
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("MyRunnable.run()");
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("MyCallable.call()");
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 7. 线程的礼让

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        Thread.yield();
        System.out.println("MyThread.run()");
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        Thread.yield();
        System.out.println("MyRunnable.run()");
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        Thread.yield();
        System.out.println("MyCallable.call()");
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 8. 线程的等待

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("MyThread.run()");
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
        myThread.join();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("MyRunnable.run()");
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
        thread.join();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("MyCallable.call()");
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```


#### 9. 线程的唤醒

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        synchronized (this) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("MyThread.run()");
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
        synchronized (myThread) {
            myThread.notify();
        }
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        synchronized (this) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("MyRunnable.run()");
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
        synchronized (myRunnable) {
            myRunnable.notify();
        }
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        synchronized (this) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("MyCallable.call()");
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        synchronized (myCallable) {
            myCallable.notify();
        }
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 10. 线程的同步

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    private int count = 5;

    @Override
    public void run() {
        System.out.println("MyThread.run()");
        count--;
        System.out.println("MyThread.run() count = " + count);
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        Thread thread1 = new Thread(myThread);
        Thread thread2 = new Thread(myThread);
        Thread thread3 = new Thread(myThread);
        Thread thread4 = new Thread(myThread);
        Thread thread5 = new Thread(myThread);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    private int count = 5;

    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        count--;
        System.out.println("MyRunnable.run() count = " + count);
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread1 = new Thread(myRunnable);
        Thread thread2 = new Thread(myRunnable);
        Thread thread3 = new Thread(myRunnable);
        Thread thread4 = new Thread(myRunnable);
        Thread thread5 = new Thread(myRunnable);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    private int count = 5;

    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        count--;
        System.out.println("MyCallable.call() count = " + count);
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask1 = new FutureTask<>(myCallable);
        FutureTask<String> futureTask2 = new FutureTask<>(myCallable);
        FutureTask<String> futureTask3 = new FutureTask<>(myCallable);
        FutureTask<String> futureTask4 = new FutureTask<>(myCallable);
        FutureTask<String> futureTask5 = new FutureTask<>(myCallable);
        Thread thread1 = new Thread(futureTask1);
        Thread thread2 = new Thread(futureTask2);
        Thread thread3 = new Thread(futureTask3);
        Thread thread4 = new Thread(futureTask4);
        Thread thread5 = new Thread(futureTask5);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
        String result1 = futureTask1.get();
        String result2 = futureTask2.get();
        String result3 = futureTask3.get();
        String result4 = futureTask4.get();
        String result5 = futureTask5.get();
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
        System.out.println(result4);
        System.out.println(result5);
    }
}
```

#### 11. 线程的死锁

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    private String lock1;
    private String lock2;

    public MyThread(String lock1, String lock2) {
        this.lock1 = lock1;
        this.lock2 = lock2;
    }

    @Override
    public void run() {
        synchronized (lock1) {
            System.out.println("MyThread.run() lock1");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (lock2) {
                System.out.println("MyThread.run() lock2");
            }
        }
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        String lock1 = "lock1";
        String lock2 = "lock2";
        MyThread myThread1 = new MyThread(lock1, lock2);
        MyThread myThread2 = new MyThread(lock2, lock1);
        myThread1.start();
        myThread2.start();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    private String lock1;
    private String lock2;

    public MyRunnable(String lock1, String lock2) {
        this.lock1 = lock1;
        this.lock2 = lock2;
    }

    @Override
    public void run() {
        synchronized (lock1) {
            System.out.println("MyRunnable.run() lock1");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (lock2) {
                System.out.println("MyRunnable.run() lock2");
            }
        }
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        String lock1 = "lock1";
        String lock2 = "lock2";
        MyRunnable myRunnable1 = new MyRunnable(lock1, lock2);
        MyRunnable myRunnable2 = new MyRunnable(lock2, lock1);
        Thread thread1 = new Thread(myRunnable1);
        Thread thread2 = new Thread(myRunnable2);
        thread1.start();
        thread2.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    private String lock1;
    private String lock2;

    public MyCallable(String lock1, String lock2) {
        this.lock1 = lock1;
        this.lock2 = lock2;
    }

    @Override
    public String call() throws Exception {
        synchronized (lock1) {
            System.out.println("MyCallable.call() lock1");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (lock2) {
                System.out.println("MyCallable.call() lock2");
            }
        }
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        String lock1 = "lock1";
        String lock2 = "lock2";
        MyCallable myCallable1 = new MyCallable(lock1, lock2);
        MyCallable myCallable2 = new MyCallable(lock2, lock1);
        FutureTask<String> futureTask1 = new FutureTask<>(myCallable1);
        FutureTask<String> futureTask2 = new FutureTask<>(myCallable2);
        Thread thread1 = new Thread(futureTask1);
        Thread thread2 = new Thread(futureTask2);
        thread1.start();
        thread2.start();
        String result1 = futureTask1.get();
        String result2 = futureTask2.get();
        System.out.println(result1);
        System.out.println(result2);
    }
}
```

#### 12. 线程的通信

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    private int count = 0;

    @Override
    public void run() {
        System.out.println("MyThread.run()");
        while (true) {
            synchronized (this) {
                notify();
                if (count < 100) {
                    System.out.println("MyThread.run() count = " + count);
                    count++;
                    try {
                        wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else {
                    break;
                }
            }
        }
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    private int count = 0;

    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        while (true) {
            synchronized (this) {
                notify();
                if (count < 100) {
                    System.out.println("MyRunnable.run() count = " + count);
                    count++;
                    try {
                        wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else {
                    break;
                }
            }
        }
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    private int count = 0;

    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        while (true) {
            synchronized (this) {
                notify();
                if (count < 100) {
                    System.out.println("MyCallable.call() count = " + count);
                    count++;
                    try {
                        wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else {
                    break;
                }
            }
        }
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 13. 线程的优先级

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run() priority = " + getPriority());
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread1 = new MyThread();
        MyThread myThread2 = new MyThread();
        MyThread myThread3 = new MyThread();
        MyThread myThread4 = new MyThread();
        MyThread myThread5 = new MyThread();
        myThread1.setPriority(Thread.MIN_PRIORITY);
        myThread2.setPriority(Thread.MIN_PRIORITY);
        myThread3.setPriority(Thread.MIN_PRIORITY);
        myThread4.setPriority(Thread.MAX_PRIORITY);
        myThread5.setPriority(Thread.MAX_PRIORITY);
        myThread1.start();
        myThread2.start();
        myThread3.start();
        myThread4.start();
        myThread5.start();
    }
}
```


> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run() priority = " + Thread.currentThread().getPriority());
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable1 = new MyRunnable();
        MyRunnable myRunnable2 = new MyRunnable();
        MyRunnable myRunnable3 = new MyRunnable();
        MyRunnable myRunnable4 = new MyRunnable();
        MyRunnable myRunnable5 = new MyRunnable();
        Thread thread1 = new Thread(myRunnable1);
        Thread thread2 = new Thread(myRunnable2);
        Thread thread3 = new Thread(myRunnable3);
        Thread thread4 = new Thread(myRunnable4);
        Thread thread5 = new Thread(myRunnable5);
        thread1.setPriority(Thread.MIN_PRIORITY);
        thread2.setPriority(Thread.MIN_PRIORITY);
        thread3.setPriority(Thread.MIN_PRIORITY);
        thread4.setPriority(Thread.MAX_PRIORITY);
        thread5.setPriority(Thread.MAX_PRIORITY);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call() priority = " + Thread.currentThread().getPriority());
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable1 = new MyCallable();
        MyCallable myCallable2 = new MyCallable();
        MyCallable myCallable3 = new MyCallable();
        MyCallable myCallable4 = new MyCallable();
        MyCallable myCallable5 = new MyCallable();
        FutureTask<String> futureTask1 = new FutureTask<>(myCallable1);
        FutureTask<String> futureTask2 = new FutureTask<>(myCallable2);
        FutureTask<String> futureTask3 = new FutureTask<>(myCallable3);
        FutureTask<String> futureTask4 = new FutureTask<>(myCallable4);
        FutureTask<String> futureTask5 = new FutureTask<>(myCallable5);
        Thread thread1 = new Thread(futureTask1);
        Thread thread2 = new Thread(futureTask2);
        Thread thread3 = new Thread(futureTask3);
        Thread thread4 = new Thread(futureTask4);
        Thread thread5 = new Thread(futureTask5);
        thread1.setPriority(Thread.MIN_PRIORITY);
        thread2.setPriority(Thread.MIN_PRIORITY);
        thread3.setPriority(Thread.MIN_PRIORITY);
        thread4.setPriority(Thread.MAX_PRIORITY);
        thread5.setPriority(Thread.MAX_PRIORITY);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
        String result1 = futureTask1.get();
        String result2 = futureTask2.get();
        String result3 = futureTask3.get();
        String result4 = futureTask4.get();
        String result5 = futureTask5.get();
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
        System.out.println(result4);
        System.out.println(result5);
    }
}
```

#### 14. 线程的组

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run() group = " + getThreadGroup().getName());
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread1 = new MyThread();
        MyThread myThread2 = new MyThread();
        MyThread myThread3 = new MyThread();
        MyThread myThread4 = new MyThread();
        MyThread myThread5 = new MyThread();
        myThread1.start();
        myThread2.start();
        myThread3.start();
        myThread4.start();
        myThread5.start();
    }
}
```


> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run() group = " + Thread.currentThread().getThreadGroup().getName());
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable1 = new MyRunnable();
        MyRunnable myRunnable2 = new MyRunnable();
        MyRunnable myRunnable3 = new MyRunnable();
        MyRunnable myRunnable4 = new MyRunnable();
        MyRunnable myRunnable5 = new MyRunnable();
        Thread thread1 = new Thread(myRunnable1);
        Thread thread2 = new Thread(myRunnable2);
        Thread thread3 = new Thread(myRunnable3);
        Thread thread4 = new Thread(myRunnable4);
        Thread thread5 = new Thread(myRunnable5);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call() group = " + Thread.currentThread().getThreadGroup().getName());
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable1 = new MyCallable();
        MyCallable myCallable2 = new MyCallable();
        MyCallable myCallable3 = new MyCallable();
        MyCallable myCallable4 = new MyCallable();
        MyCallable myCallable5 = new MyCallable();
        FutureTask<String> futureTask1 = new FutureTask<>(myCallable1);
        FutureTask<String> futureTask2 = new FutureTask<>(myCallable2);
        FutureTask<String> futureTask3 = new FutureTask<>(myCallable3);
        FutureTask<String> futureTask4 = new FutureTask<>(myCallable4);
        FutureTask<String> futureTask5 = new FutureTask<>(myCallable5);
        Thread thread1 = new Thread(futureTask1);
        Thread thread2 = new Thread(futureTask2);
        Thread thread3 = new Thread(futureTask3);
        Thread thread4 = new Thread(futureTask4);
        Thread thread5 = new Thread(futureTask5);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
        String result1 = futureTask1.get();
        String result2 = futureTask2.get();
        String result3 = futureTask3.get();
        String result4 = futureTask4.get();
        String result5 = futureTask5.get();
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
        System.out.println(result4);
        System.out.println(result5);
    }
}
```

#### 15. 线程的守护

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run() daemon = " + isDaemon());
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.setDaemon(true);
        myThread.start();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run() daemon = " + Thread.currentThread().isDaemon());
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.setDaemon(true);
        thread.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call() daemon = " + Thread.currentThread().isDaemon());
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.setDaemon(true);
        thread.start();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 16. 线程的异常

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        int i = 1 / 0;
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        int i = 1 / 0;
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
    }
}
```


> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        int i = 1 / 0;
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 17. 线程的池

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        for (int i = 0; i < 5; i++) {
            executorService.execute(new MyThread());
        }
        executorService.shutdown();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        for (int i = 0; i < 5; i++) {
            executorService.execute(new MyRunnable());
        }
        executorService.shutdown();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        for (int i = 0; i < 5; i++) {
            Future<String> future = executorService.submit(new MyCallable());
            System.out.println(future.get());
        }
        executorService.shutdown();
    }
}
```

#### 18. 线程的锁

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    private int count = 5;

    @Override
    public void run() {
        System.out.println("MyThread.run()");
        count--;
        System.out.println("MyThread.run() count = " + count);
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread1 = new MyThread();
        MyThread myThread2 = new MyThread();
        MyThread myThread3 = new MyThread();
        MyThread myThread4 = new MyThread();
        MyThread myThread5 = new MyThread();
        myThread1.start();
        myThread2.start();
        myThread3.start();
        myThread4.start();
        myThread5.start();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    private int count = 5;

    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        count--;
        System.out.println("MyRunnable.run() count = " + count);
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable1 = new MyRunnable();
        MyRunnable myRunnable2 = new MyRunnable();
        MyRunnable myRunnable3 = new MyRunnable();
        MyRunnable myRunnable4 = new MyRunnable();
        MyRunnable myRunnable5 = new MyRunnable();
        Thread thread1 = new Thread(myRunnable1);
        Thread thread2 = new Thread(myRunnable2);
        Thread thread3 = new Thread(myRunnable3);
        Thread thread4 = new Thread(myRunnable4);
        Thread thread5 = new Thread(myRunnable5);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    private int count = 5;

    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        count--;
        System.out.println("MyCallable.call() count = " + count);
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable1 = new MyCallable();
        MyCallable myCallable2 = new MyCallable();
        MyCallable myCallable3 = new MyCallable();
        MyCallable myCallable4 = new MyCallable();
        MyCallable myCallable5 = new MyCallable();
        FutureTask<String> futureTask1 = new FutureTask<>(myCallable1);
        FutureTask<String> futureTask2 = new FutureTask<>(myCallable2);
        FutureTask<String> futureTask3 = new FutureTask<>(myCallable3);
        FutureTask<String> futureTask4 = new FutureTask<>(myCallable4);
        FutureTask<String> futureTask5 = new FutureTask<>(myCallable5);
        Thread thread1 = new Thread(futureTask1);
        Thread thread2 = new Thread(futureTask2);
        Thread thread3 = new Thread(futureTask3);
        Thread thread4 = new Thread(futureTask4);
        Thread thread5 = new Thread(futureTask5);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
        String result1 = futureTask1.get();
        String result2 = futureTask2.get();
        String result3 = futureTask3.get();
        String result4 = futureTask4.get();
        String result5 = futureTask5.get();
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
        System.out.println(result4);
        System.out.println(result5);
    }
}

```

#### 19. 线程的状态

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        System.out.println("myThread.getState() = " + myThread.getState());
        myThread.start();
        System.out.println("myThread.getState() = " + myThread.getState());
        Thread.sleep(1000);
        System.out.println("myThread.getState() = " + myThread.getState());
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        System.out.println("thread.getState() = " + thread.getState());
        thread.start();
        System.out.println("thread.getState() = " + thread.getState());
        Thread.sleep(1000);
        System.out.println("thread.getState() = " + thread.getState());
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        System.out.println("thread.getState() = " + thread.getState());
        thread.start();
        System.out.println("thread.getState() = " + thread.getState());
        Thread.sleep(1000);
        System.out.println("thread.getState() = " + thread.getState());
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 20. 线程的中断

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        while (true) {
            if (isInterrupted()) {
                System.out.println("MyThread.run() interrupt");
                break;
            }
        }
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
        Thread.sleep(1000);
        myThread.interrupt();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        while (true) {
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("MyRunnable.run() interrupt");
                break;
            }
        }
    }
}

public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        while (true) {
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("MyCallable.call() interrupt");
                break;
            }
        }
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```


#### 21. 线程的停止

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThread.run()");
        while (true) {
            if (isInterrupted()) {
                System.out.println("MyThread.run() interrupt");
                break;
            }
        }
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
        Thread.sleep(1000);
        myThread.interrupt();
    }
}
```

> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        while (true) {
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("MyRunnable.run() interrupt");
                break;
            }
        }
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        while (true) {
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("MyCallable.call() interrupt");
                break;
            }
        }
        return "success";
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

#### 22. 线程的暂停

> 1. 继承Thread类

```java

public class MyThread extends Thread {
    private int count = 0;

    @Override
    public void run() {
        System.out.println("MyThread.run()");
        while (true) {
            count++;
            System.out.println("MyThread.run() count = " + count);
        }
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
        Thread.sleep(1000);
        myThread.suspend();
        System.out.println("main suspend");
        Thread.sleep(1000);
        myThread.resume();
        System.out.println("main resume");
    }
}
```


> 2. 实现Runnable接口

```java

public class MyRunnable implements Runnable {
    private int count = 0;

    @Override
    public void run() {
        System.out.println("MyRunnable.run()");
        while (true) {
            count++;
            System.out.println("MyRunnable.run() count = " + count);
        }
    }
}


public class Test {
    public static void main(String[] args) throws InterruptedException {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
        Thread.sleep(1000);
        thread.suspend();
        System.out.println("main suspend");
        Thread.sleep(1000);
        thread.resume();
        System.out.println("main resume");
    }
}
```

> 3. 实现Callable接口

```java

public class MyCallable implements Callable<String> {
    private int count = 0;

    @Override
    public String call() throws Exception {
        System.out.println("MyCallable.call()");
        while (true) {
            count++;
            System.out.println("MyCallable.call() count = " + count);
        }
    }
}


public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        Thread.sleep(1000);
        thread.suspend();
        System.out.println("main suspend");
        Thread.sleep(1000);
        thread.resume();
        System.out.println("main resume");
        String result = futureTask.get();
        System.out.println(result);
    }
}
```

