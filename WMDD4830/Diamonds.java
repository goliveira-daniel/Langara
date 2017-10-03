/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package diamonds;

/**
 *
 * @author Avell B155 FIRE
 */
public class Diamonds {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        for (int i = 1; i <= 10; i++) {
            writeAst(i);
        }
        
        System.out.println("End exercise A");
        
        for (int i = 10; i >= 0; i--) {
            writeAst(i);
        }
        
        System.out.println("End exercise B");
        
        for (int i = 1; i <= 10; i++) {
            writeRightAst(i);
        }
        
        System.out.println("End exercise C");
        
        for (int i = 10; i >= 0; i--) {
            writeRightAst(i);
        }
        
        System.out.println("End exercise D");
    }
    public static void writeAst(int ast) {
   	for (int i=1; i <= ast; i++) {
   		System.out.print('*');
   	}
   	System.out.println();
   }
    public static void writeRightAst(int ast) {
   	String str;
        for (int i=1; i <= 10; i++) {
            if (i <= ast) {
                str = " ";
            } else {
                str = "*";
            }
            System.out.print(str);
   	}
   	System.out.println();
   }
}
