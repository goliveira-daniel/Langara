import java.util.Scanner;

public interface Diamondv2Test {
   public static void main(String[] args) 
   {
      // create a Scanner to obtain input from the command window
      Scanner input = new Scanner(System.in);
      System.out.print("Enter an odd integer number to draw a diamond: "); // prompt
      Diamondv2 diamondv2 = new Diamondv2(input.nextInt());
      diamondv2.printDiamond();
      input.close();
   }
}
