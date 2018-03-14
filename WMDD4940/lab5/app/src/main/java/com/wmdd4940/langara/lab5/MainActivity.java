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
    private Button btn1;
    private Button btn2;
    private Button btn3;
    private Button btn4;
    private Button btn5;
    private Button btn6;
    private Button btn7;
    private Button btn8;
    private Button gameControls;
//    winningGames =        [[0,1,2], [3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    private List<List<Integer>> winningGames = Arrays.asList(Arrays.asList(3,4,5), Arrays.asList(0,1,2),Arrays.asList(6,7,8),Arrays.asList(0,3,6),Arrays.asList(1,4,7),Arrays.asList(2,5,8),Arrays.asList(0,4,8),Arrays.asList(2,4,6));

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final Player player = new Player();
        Button btn0 = findViewById(R.id.btn0);
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
                    if (player.getCurrPlayer() == "X") {
                        player.playerXTiles.add(Integer.parseInt(v.getTag().toString()));
                    } else {
                        player.playerOTiles.add(Integer.parseInt(v.getTag().toString()));
                    }
                    if (player.checkWinner()) {
                        tv.setText(getString(R.string.playerWin,player.getCurrPlayer()));
                    } else {
                        player.invertPlayer();
                        button.setEnabled(false);
                        tv.setText(getString(R.string.playerTurn,player.getCurrPlayer()));
                    }
                }
            });
        }
        gameControls = findViewById(R.id.gameControl);
        gameControls.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                for (final Button button:buttons) {
                    button.setEnabled(true);
                    player.playerOTiles.clear();
                    player.playerXTiles.clear();
                    player.randomPlayer();
                    button.setText("");
                    tv.setText(getString(R.string.playerTurn,player.getCurrPlayer()));
                }
            }
        });
    }

    class Player {
        private String currPlayer;
        List<Integer> playerXTiles = new ArrayList<>();
        List<Integer> playerOTiles = new ArrayList<>();

        Player() {
            setCurrPlayer(randomPlayer());
        }

        String getCurrPlayer() {
            return currPlayer;
        }

        boolean checkWinner () {
            if (currPlayer.equals("X")) {
                for (List list:winningGames) {
                    if (playerXTiles.contains(list)) {return true;}
                }
            } else {
                for (List list:winningGames) {
                    if (playerOTiles.contains(list)) {return true;}
                }
            }
            return false;
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
