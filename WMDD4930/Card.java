// Fig. 7.9: Card.java
// Card class represents a playing card.

public class Card 
{
   public final String face; // face of card ("Ace", "Deuce", ...)
   public final String suit; // suit of card ("Hearts", "Diamonds", ...)

   // two-argument constructor initializes card's face and suit
   public Card(String face, String suit)
   {
      this.face = face;
      this.suit = suit; 
   } 

   // return String representation of Card
   @Override
   public String toString() 
   { 
      return face + " of " + suit;
   } 
} // end class Card

