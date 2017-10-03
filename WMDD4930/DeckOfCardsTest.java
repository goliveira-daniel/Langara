// Fig. 7.11: DeckOfCardsTest.java
// Card shuffling and dealing.

public class DeckOfCardsTest
{
   // execute application
   public static void main(String[] args)
   {
      DeckOfCards myDeckOfCards = new DeckOfCards();
      myDeckOfCards.shuffle(); // place Cards in random order
      
      // print all 52 Cards in the order in which they are dealt
      for (int i = 1; i <= 52; i++)
      {
         // deal and display a Card
         System.out.printf("%-19s", myDeckOfCards.dealCard());

		 if (i % 4 == 0) // output a newline after every fourth card
		    System.out.println();
      }
      
      HandOfCards myHand = new HandOfCards();
      for (int i = 0; i < 5; i++) {
    	  myHand.addCard(myDeckOfCards.dealCard());		
      }
      System.out.println("Hand contains:");
      System.out.println(myHand.checkHand());
   } 
} // end class DeckOfCardsTest

