package by.belstu.it.nekhatonak;
import static java.lang.Math.*;
import static  java.lang.System.out;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * @author Anastasia
 * @version 1.0
 */

class WrapperString {

    private String test;

    @Override
    public String toString() {
        return "WrapperString{" +
                "test='" + test + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WrapperString that = (WrapperString) o;
        return Objects.equals(test, that.test);
    }

    @Override
    public int hashCode() {
        return Objects.hash(test);
    }

    public void setTest(String test) {
        this.test = test;
    }

    public String getTest() {
        return test;
    }

    public WrapperString(String test) {
        this.test = test;
    }

    public void replace(char oldchar, char newchar) {
        String test2 = "";
        for(int i = 0; i < test.length(); i++) {
            if(test.charAt(i) == oldchar) {
                test2 += newchar;
            } else {
                test2 += test.charAt(i);
            }
        }
        test = test2;
    }
}

public class TextFunc {

    public int test;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TextFunc textFunc = (TextFunc) o;
        return test == textFunc.test;
    }

    @Override
    public int hashCode() {
        return Objects.hash(test);
    }



    public void setTest(int test) {
        this.test = test;
    }

    public int getTest() {
        return test;
    }

    public TextFunc() {
    }

    public String getValue() {

            return "Hello from first project";

        //TODO do something
    }

}



class JavaTest {

    static int sint;
    final int test = 10;
    public final int test2 = 20;
    public static final int test3 = 30;


    public static void main(String[] args) {
        char c = 'q';
        int i = 10;
        short s = 90;
        byte b = 1;
        long l = 67;
        boolean tr = true;

        String s1 = "q" + 10;
        String s2 = "q" + 'w';
        String s3 = "q" + 2.4;
        byte b1 = (byte) (b + i);
        int i1 = (int) (2.5 + l);
        long l1 = i + 2147483647;
        boolean bool = true && false;
        boolean bool2 = true ^ false;
       // boolean bool3 = true + false; + is not allowed
        long maxLong = 9223372036854775807L;
        long maxLong16 = 0x7fff_ffff_fffL;
        char frst = 'a';
        char scnd = '\u0061';
        char thrd = 97;
        char sum = (char) (frst + scnd + thrd);

        out.println("----------------------------");
        out.println(frst);
        out.println(scnd);
        out.println(thrd);
        out.println(sum);

        out.println("----------------------------");
        out.println(3.45 % 2.4);
        out.println(1.0/0.0);
        out.println(log(-345));
        out.println(Float.intBitsToFloat(0x7F800000));
        out.println(Float.intBitsToFloat(0xFF800000));

        out.println("----------------------------");
        out.println(Math.PI);
        out.println(Math.E);
        out.println(Math.round(PI));
        out.println(Math.min(Math.round(PI), Math.round(E)));
        out.println(Math.random());

        out.println("----------------------------");
        Boolean BObj = true;
        Character CObj = 'w';
        Integer IObj = 12;
        Byte ByObj = 11;
        /**
         * @value 100
         * @see hehehe
         */
        Short SObj = 1;
        Long LObj = 123L;
        Double DObj = 42.2;
        out.println(IObj>>2);
        out.println(IObj>>>1);
        out.println(~IObj);
        out.println(IObj&3);
        out.println(IObj * 7);
        out.println(ByObj + LObj);
        out.println(Math.min(LObj, DObj));
        out.println(Math.max(LObj, DObj));

        Integer integer = 9;

        int in = 0;
       // in = new Integer(9);

        out.println("------------------------------");
        out.println(Integer.parseInt("123"));
        out.println(Integer.toHexString(367));
        out.println(Integer.compare(2, 3));
        out.println(Integer.toString(423));
        out.println(Integer.bitCount(32));
        //out.println();

        out.println("--------------------------------");
        String s34 = "2345";
        out.println(Integer.parseInt(s34));
        char[] By = s34.toCharArray();
        out.println(Boolean.parseBoolean("true"));
        String s11 = "qw";
        String s22 = "er";
        out.println(s11 == s22);
        out.println(s11.equals(s22));
        out.println(s11.compareTo(s22));
        String str = "Privet kak dela";
        String[] arr = str.split(" ");
        out.println(str.contains("kak"));
        out.println(str.hashCode());
        out.println(str.indexOf("k"));
        out.println(str.length());
        out.println(str.replace("Privet", "Poka"));

        out.println("--------------------------------");
        char[][] c1;
        char[] c2[];
        char c3[][];
        c1 = new char[3][];
        out.println(c1.length);
        c1[0] = new char[4];
        out.println(c1[0].length);
        c1[1] = new char[5];
        out.println(c1[1]);
        c1[2] = new char[6];
        out.println(c1[2]);
        c2 = new char[3][5];
        c3 = new char[10][4];
        boolean comRez = c2 == c3;
        out.println(comRez);
        for (char[] q:c1
             ) {
            out.println(q);
        }
     //   out.println(c1[10][2]);

        WrapperString Str = new WrapperString("qwerty");
        Str.replace('q', 'p');
        out.println(Str.getTest());

        WrapperString MyStr = new WrapperString("hello") {
            @Override
            public void replace(char oldchar, char newChar) {
                String test2 = "";
                for(int i = 0; i < getTest().length(); i++) {
                    if(getTest().charAt(i) == oldchar) {
                        test2 += newChar;
                    } else {
                        test2 += getTest().charAt(i);
                    }
                }
                setTest(test2);
            }

            public void delete(char toDelete) {
                String test2 = "";
                for(int i = 0; i < getTest().length(); i++) {
                    if(getTest().charAt(i) == toDelete) continue;
                    else test2 += getTest().charAt(i);
                }
            }

        };

        /**
         * @return all first lab
         * @throws none
         * @param String[] args
         */

    }
}
