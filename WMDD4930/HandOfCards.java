
public class HandOfCards {
	private Card[] handOfCards;
	private int cardsOnHand = 0;
    private static final int NUMBER_OF_CARDS = 5;
	
	public HandOfCards(Card[] cards) {
		handOfCards = new Card[cards.length];		
	}
	
	public HandOfCards() {
		handOfCards = new Card[NUMBER_OF_CARDS];		
	}
	
	public void addCard(Card card) {
		if (cardsOnHand < handOfCards.length) {
			handOfCards[cardsOnHand] = card;
			cardsOnHand++;
		}
	}
	
	public String checkHand() {
		int dups = 0;
		for (int i = 0; i < handOfCards.length; i++) { 
			for (int j = i + 1 ; j < handOfCards.length; j++) {
				if (handOfCards[i].face.equals(handOfCards[j].face)) {
					dups++;
					break;
					// got the duplicate element
				} 
			}
		}
		switch (dups) {
			case 2: return "A pair";
			case 3: return "Three of a kind";
			case 4: return "Four of a kind";
			case 5: return "A Flush";
			default: return null;
		}
	}
}
