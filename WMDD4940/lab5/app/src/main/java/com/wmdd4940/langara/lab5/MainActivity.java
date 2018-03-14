package com.wmdd4940.langara.lab5;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private Button btn0, btn1, btn2, btn3, btn4,btn5, btn6, btn7, btn8, gameControls;
//    winningGames =        [[0,1,2], [3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    private List<List<Integer>> winningGames = Arrays.asList([3,4,5]);
//    winningGames = Arrays.asList ()
    //    = new int[][] {[0,1,2], [3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final Player player = new Player();
        btn0 = findViewById(R.id.btn0);
        btn1 = findViewById(R.id.btn1);
        btn2 = findViewById(R.id.btn2);
        btn3 = findViewById(R.id.btn3);
        btn4 = findViewById(R.id.btn4);
        btn5 = findViewById(R.id.btn5);
        btn6 = findViewById(R.id.btn6);
        btn7 = findViewById(R.id.btn7);
        btn8 = findViewById(R.id.btn8);
        final ArrayList<Button> buttons = new ArrayList<> ();
        buttons.add(btn0);
        buttons.add(btn1);
        buttons.add(btn2);
        buttons.add(btn3);
        buttons.add(btn4);
        buttons.add(btn5);
        buttons.add(btn6);
        buttons.add(btn7);
        buttons.add(btn8);
//        final String text = getString(R.string.playerTurn, player.getCurrPlayer());
        final TextView tv = findViewById(R.id.textView);
        for (final Button button:buttons) {
            button.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    button.setText(player.getCurrPlayer());
                    player.invertPlayer();
                    button.setEnabled(false);
                    tv.setText(getString(R.string.playerTurn,player.getCurrPlayer()));
                }
            });
        }
        gameControls = findViewById(R.id.gameControl);
        gameControls.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                for (final Button button:buttons) {
                    button.setEnabled(true);
                    tv.setText(getString(R.string.playerTurn,player.getCurrPlayer()));
                }
            }
        });
    }

    class Player {
        private String currPlayer;

        public Player() {
            setCurrPlayer(randomPlayer());
        }

        public String getCurrPlayer() {
            return currPlayer;
        }

        private void setCurrPlayer(String currPlayer) {
            this.currPlayer = currPlayer;
        }

        private void invertPlayer() {
            setCurrPlayer((getCurrPlayer().equals("X") ? "O" : "X"));
        }

        private String randomPlayer() {
            return Math.random() <= 0.5 ? "O" : "X";
        }

    }

}
