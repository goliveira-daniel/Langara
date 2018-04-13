package com.wmdd4940.langara.lab8;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
private LinearLayout ll1, ll2;
private TextView pl1Cards, pl2Cards;
private Button deal, compare;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        DeckOfCards myDeckOfCards = new DeckOfCards();
        myDeckOfCards.shuffle(); // place Cards in random order
        final HandOfCards player1 = new HandOfCards();
        final HandOfCards player2 = new HandOfCards();
        for (int i = 0; i < 5; i++) {
            player1.addCard(myDeckOfCards.dealCard());
        }
        for (int i = 0; i < 5; i++) {
            player2.addCard(myDeckOfCards.dealCard());
        }
        ll1 = findViewById(R.id.linearPlayer1);
        ll2 = findViewById(R.id.linearPlayer2);
        pl1Cards = findViewById(R.id.tvPlayer1Card);
        pl2Cards = findViewById(R.id.tvPlayer2Card);
        deal = findViewById(R.id.btnDeal);
        compare = findViewById(R.id.btnCompare);
        deal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            loadImages(ll1, player1.getCard());
            loadImages(ll2, player2.getCard());

            for (Card card: player1.getCard()) {
                pl1Cards.setText(pl1Cards.getText() + card.toString() + "\n");
            }
            for (Card card: player2.getCard()) {
                pl2Cards.setText(pl2Cards.getText() + card.toString() + "\n");
            }

            deal.setEnabled(false);
            compare.setEnabled(true);
            }
        });
    }

    protected void loadImages (LinearLayout layout, Card[] cards) {
        for (int i = 0; i < layout.getChildCount(); i++) {
            View v = layout.getChildAt(i);
            if (v instanceof ImageView) {
                ImageView imageView = (ImageView) v;
                imageView.setImageResource(getResources().getIdentifier(cards[i].toString().replaceAll("\\s+", "").toLowerCase(),"mipmap",getPackageName()));
            }
        }
    }
}
