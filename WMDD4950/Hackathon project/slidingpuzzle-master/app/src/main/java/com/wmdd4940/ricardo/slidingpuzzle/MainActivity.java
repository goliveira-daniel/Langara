package com.wmdd4940.ricardo.slidingpuzzle;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.nfc.Tag;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.res.ResourcesCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.firebase.ui.database.FirebaseListAdapter;
import com.firebase.ui.database.FirebaseListOptions;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;

import java.util.ArrayList;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity implements MessageDialogFragment.Listener  {
    private static String[] blockList;

    private static GestureDetectGridView puzzleGridView;

    private static TextView LabelInformation;
    private static Button BtnSolve;
    private static Button BtnStart;

    private static int puzzleColumnWidth;
    private static int puzzleColumnHeight;

    public static final String up = "up";
    public static final String down = "down";
    public static final String left = "left";
    public static final String right = "right";

    private static int MoveCount = 0;

    private static int BlankPosition = 15;

    private static Timer gameTimer;
    private static int timeCounter;

    // define instance variables that should be saved
    private static String InstBlockList = "";

    private SharedPreferences savedValues;

    private static final int REQUEST_RECORD_AUDIO_PERMISSION = 1;

    private SpeechService mSpeechService;

    private VoiceRecorder mVoiceRecorder;

    private final VoiceRecorder.Callback mVoiceCallback = new VoiceRecorder.Callback() {

        @Override
        public void onVoiceStart() {
            showStatus(true);
            if (mSpeechService != null) {
                mSpeechService.startRecognizing(mVoiceRecorder.getSampleRate());
            }
        }

        @Override
        public void onVoice(byte[] data, int size) {
            if (mSpeechService != null) {
                mSpeechService.recognize(data, size);
            }
        }

        @Override
        public void onVoiceEnd() {
            showStatus(false);
            if (mSpeechService != null) {
                mSpeechService.finishRecognizing();
            }
        }

    };

    private TextView mStatus;
    private TextView mText;

    private int mColorHearing;
    private int mColorNotHearing;

    private final ServiceConnection mServiceConnection = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName componentName, IBinder binder) {
            mSpeechService = SpeechService.from(binder);
            mSpeechService.addListener(mSpeechServiceListener);
            mStatus.setVisibility(View.VISIBLE);
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            mSpeechService = null;
        }

    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final Resources resources = getResources();
        final Resources.Theme theme = getTheme();
        mColorHearing = ResourcesCompat.getColor(resources, R.color.status_hearing, theme);
        mColorNotHearing = ResourcesCompat.getColor(resources, R.color.status_not_hearing, theme);

        mStatus = (TextView) findViewById(R.id.speechStatus);
        mText = (TextView) findViewById(R.id.speechText);

        init();

        setDimensions();

        savedValues = getSharedPreferences("SavedValues", MODE_PRIVATE);
    }

    @Override
    protected void onStart() {
        super.onStart();

        // Prepare Cloud Speech API

        // Start listening to voices
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
                == PackageManager.PERMISSION_GRANTED) {
            startVoiceRecorder();
        } else if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                Manifest.permission.RECORD_AUDIO)) {
            showPermissionMessageDialog();
        } else {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO},
                    REQUEST_RECORD_AUDIO_PERMISSION);
        }
        try {
            bindService(new Intent(this, SpeechService.class), mServiceConnection, BIND_AUTO_CREATE);
        }
        catch (Exception e) {
            Log.e("Error", e.toString());
        }
    }

    @Override
    protected void onStop() {
        // Stop listening to voice
        stopVoiceRecorder();

        // Stop Cloud Speech API
        if (mSpeechService != null) {
            mSpeechService.removeListener(mSpeechServiceListener);
            mSpeechService = null;
        }
        unbindService(mServiceConnection);

        super.onStop();
    }

    @Override
    public void onPause() {
        StringBuilder StrBlockList = new StringBuilder();
        // save the instance variables
        SharedPreferences.Editor editor = savedValues.edit();
        editor.putInt("MoveCount", MoveCount);
        editor.putInt("BlankPosition", BlankPosition);
        for(String block:blockList){
            StrBlockList.append(block);
            StrBlockList.append(",");
        }
        InstBlockList = StrBlockList.toString();
        editor.putString("BlockList", InstBlockList);
        editor.commit();

        super.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();

        // get the instance variables
        MoveCount = savedValues.getInt("MoveCount", 0);
        BlankPosition = savedValues.getInt("BlankPosition", 15);
        InstBlockList = savedValues.getString("BlockList", "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15");

        blockList = InstBlockList.split(",");

        // set the Label with game information
        LabelInformation.setText("Moves so far: " + Integer.toString(MoveCount));

        // display the board
        display(getApplicationContext());
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        if (requestCode == REQUEST_RECORD_AUDIO_PERMISSION) {
            if (permissions.length == 1 && grantResults.length == 1
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startVoiceRecorder();
            } else {
                showPermissionMessageDialog();
            }
        } else {
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    private void startVoiceRecorder() {
        if (mVoiceRecorder != null) {
            mVoiceRecorder.stop();
        }
        mVoiceRecorder = new VoiceRecorder(mVoiceCallback);
        mVoiceRecorder.start();
    }

    private void stopVoiceRecorder() {
        if (mVoiceRecorder != null) {
            mVoiceRecorder.stop();
            mVoiceRecorder = null;
        }
    }

    private void showPermissionMessageDialog() {
        MessageDialogFragment
                .newInstance(getString(R.string.permission_message))
                .show(getSupportFragmentManager(), "message_dialog");
    }

    private void showStatus(final boolean hearingVoice) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mStatus.setTextColor(hearingVoice ? mColorHearing : mColorNotHearing);
            }
        });
    }

    @Override
    public void onMessageDialogDismissed() {
        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO},
                REQUEST_RECORD_AUDIO_PERMISSION);
    }

    private void handleText(String text) {
        if (text.equalsIgnoreCase("Start Game")) {
            scramble();
        } else if (text.equalsIgnoreCase("Solve Game")) {
            solveGame();
        }  else if (text.equalsIgnoreCase("up") || text.equalsIgnoreCase("move up")) {
            CalculateMoves(getApplicationContext(), MainActivity.down, BlankPosition - 4);
        } else if (text.equalsIgnoreCase("down") || text.equalsIgnoreCase("move down")) {
            CalculateMoves(getApplicationContext(), MainActivity.up, BlankPosition + 4);
        } else if (text.equalsIgnoreCase("left") || text.equalsIgnoreCase("move left")) {
            CalculateMoves(getApplicationContext(), MainActivity.right, BlankPosition - 1);
        } else if (text.equalsIgnoreCase("right") || text.equalsIgnoreCase("move right")) {
            CalculateMoves(getApplicationContext(), MainActivity.left, BlankPosition + 1);
        }
    }

    private final SpeechService.Listener mSpeechServiceListener =
            new SpeechService.Listener() {
                @Override
                public void onSpeechRecognized(final String text, final boolean isFinal) {
                    if (isFinal) {
                        mVoiceRecorder.dismiss();
                    }
                    if (mText != null && !TextUtils.isEmpty(text)) {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                if (isFinal) {
                                    mText.setText(text);
                                    handleText(text);
                                }
                            }
                        });
                    }
                }
            };

    private void setDimensions() {
        ViewTreeObserver vto = puzzleGridView.getViewTreeObserver();
        vto.addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void  onGlobalLayout() {
                puzzleGridView.getViewTreeObserver().removeOnGlobalLayoutListener(this);

                int displayWidth = puzzleGridView.getMeasuredWidth();
                int displayHeight = puzzleGridView.getMeasuredHeight();

                int statusBarHeight = getStatusBarHeight(getApplicationContext());
                int requiredHeight = displayHeight - statusBarHeight;

                puzzleColumnWidth = displayWidth / 4;
                puzzleColumnHeight = requiredHeight / 4;

                display(getApplicationContext());
            }
        });
    }

    private int getStatusBarHeight(Context context){
        int result = 0;
        int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");

        if (resourceId > 0) {
            result = context.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }

    private static void display(Context context) {
        ArrayList<ImageButton> buttons = new ArrayList<>();

        ImageButton button;

        for (int i = 0; i < blockList.length; i++) {
            button = new ImageButton(context);

            button.setImageResource(R.drawable.imageview);
            button.setPadding(0,0,0,0);

            int v = Integer.parseInt(blockList[i]);

            switch (v) {
                case 0:
                    button.setBackgroundResource(R.drawable.img1);
                    break;
                case 1:
                    button.setBackgroundResource(R.drawable.img2);
                    break;
                case 2:
                    button.setBackgroundResource(R.drawable.img3);
                    break;
                case 3:
                    button.setBackgroundResource(R.drawable.img4);
                    break;
                case 4:
                    button.setBackgroundResource(R.drawable.img5);
                    break;
                case 5:
                    button.setBackgroundResource(R.drawable.img6);
                    break;
                case 6:
                    button.setBackgroundResource(R.drawable.img7);
                    break;
                case 7:
                    button.setBackgroundResource(R.drawable.img8);
                    break;
                case 8:
                    button.setBackgroundResource(R.drawable.img9);
                    break;
                case 9:
                    button.setBackgroundResource(R.drawable.img10);
                    break;
                case 10:
                    button.setBackgroundResource(R.drawable.img11);
                    break;
                case 11:
                    button.setBackgroundResource(R.drawable.img12);
                    break;
                case 12:
                    button.setBackgroundResource(R.drawable.img13);
                    break;
                case 13:
                    button.setBackgroundResource(R.drawable.img14);
                    break;
                case 14:
                    button.setBackgroundResource(R.drawable.img15);
                    break;
                case 15:
                    button.setBackgroundResource(R.drawable.blank);
                    break;
            }
            buttons.add(button);
        }

        puzzleGridView.setAdapter(new CustomAdapter(buttons, puzzleColumnWidth, puzzleColumnHeight));

    }

    private void solveGame() {
        MoveCount = 0;
        BlankPosition = 15;
        LabelInformation.setText("Moves so far: " + Integer.toString(MoveCount));
        for (int i = 0; i < 16; i++) {
            blockList[i] = String.valueOf(i);
        }
        display(getApplicationContext());
        gameTimer.cancel();
    }

    private void scramble() {
        MoveCount = 0;
        BlankPosition = 15;
        LabelInformation.setText("Moves so far: " + Integer.toString(MoveCount));
        int index;
        String temp;
        Random random = new Random();

        for (int i = blockList.length - 2; i > 0; i--) {
            index = random.nextInt( i + 1 );
            temp = blockList[index];
            blockList[index] = blockList[i];
            blockList[i] = temp;
        }

        gameTimer = new Timer();
        gameTimer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(new Runnable()
                {
                    @Override
                    public void run()
                    {
                        timeCounter++;
                    }
                });
            }
        }, 20, 20);
        timeCounter = 0;

        display(getApplicationContext());
    }

    private void init() {
        LabelInformation = (TextView) findViewById(R.id.LabelInformation);
        BtnSolve = (Button) findViewById(R.id.btnSolve);
        // Set a click listener for BtnSolve
        BtnSolve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                solveGame();
            }
        });

        BtnStart = (Button) findViewById(R.id.btnStartGame);
        // Set a click listener for BtnStart
        BtnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                scramble();
            }
        });

        puzzleGridView = (GestureDetectGridView) findViewById(R.id.grid);

        puzzleGridView.setNumColumns(4);

        blockList = new String[16];

        for (int i = 0; i < 16; i++) {
            blockList[i] = String.valueOf(i);
        }

        gameTimer = new Timer();
        gameTimer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(new Runnable()
                {
                    @Override
                    public void run()
                    {
                        timeCounter++;
                    }
                });
            }
        }, 20, 20);
        timeCounter = 0;
    }

    private static void SwapTiles(Context context, int currentPosition, int swap) {
        BlankPosition = currentPosition;
        String newPosition = blockList[currentPosition + swap];
        blockList[currentPosition + swap] = blockList[currentPosition];
        blockList[currentPosition] = newPosition;
        display(context);

        MoveCount++;

        LabelInformation.setText("Moves so far: " + Integer.toString(MoveCount));

        if (isSolved()) {
            gameTimer.cancel();
            ranking(context);
        }
    }

    public static void CalculateMoves(Context context, String direction, int position) {
        /* Commented in order to test the app win easily.
        if (isSolved() || position == BlankPosition) {
            Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
            return;
        }
        */
            switch (position) {
                case 0:
                    if (direction.equals(right) && BlankPosition == 1)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(down) && BlankPosition == 4)
                        SwapTiles(context, position, 4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 1:
                    if (direction.equals(right) && BlankPosition == 2)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(left) && BlankPosition == 0)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 5)
                        SwapTiles(context, position, 4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 2:
                    if (direction.equals(right) && BlankPosition == 3)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(left) && BlankPosition == 1)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 6)
                        SwapTiles(context, position, 4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 3:
                    if (direction.equals(left) && BlankPosition == 2)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 7)
                        SwapTiles(context, position, 4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 4:
                    if (direction.equals(right) && BlankPosition == 5)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(down) && BlankPosition == 8)
                        SwapTiles(context, position, 4);
                    else if (direction.equals(up) && BlankPosition == 0)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 5:
                    if (direction.equals(right) && BlankPosition == 6)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(left) && BlankPosition == 4)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 9)
                        SwapTiles(context, position, 4);
                    else if (direction.equals(up) && BlankPosition == 1)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 6:
                    if (direction.equals(right) && BlankPosition == 7)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(left) && BlankPosition == 5)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 10)
                        SwapTiles(context, position, 4);
                    else if (direction.equals(up) && BlankPosition == 2)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 7:
                    if (direction.equals(left) && BlankPosition == 6)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 11)
                        SwapTiles(context, position, 4);
                    else if (direction.equals(up) && BlankPosition == 3)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 8:
                    if (direction.equals(right) && BlankPosition == 9)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(down) && BlankPosition == 12)
                        SwapTiles(context, position, 4);
                    else if (direction.equals(up) && BlankPosition == 4)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 9:
                    if (direction.equals(right) && BlankPosition == 10)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(left) && BlankPosition == 8)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 13)
                        SwapTiles(context, position, 4);
                    else if (direction.equals(up) && BlankPosition == 5)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 10:
                    if (direction.equals(right) && BlankPosition == 11)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(left) && BlankPosition == 9)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 14)
                        SwapTiles(context, position, 4);
                    else if (direction.equals(up) && BlankPosition == 6)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 11:
                    if (direction.equals(left) && BlankPosition == 10)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(down) && BlankPosition == 15)
                        SwapTiles(context, position, 4);
                    else if (direction.equals(up) && BlankPosition == 7)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 12:
                    if (direction.equals(right) && BlankPosition == 13)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(up) && BlankPosition == 8)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 13:
                    if (direction.equals(left) && BlankPosition == 12)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(right) && BlankPosition == 14)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(up) && BlankPosition == 9)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 14:
                    if (direction.equals(left) && BlankPosition == 13)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(right) && BlankPosition == 15)
                        SwapTiles(context, position, 1);
                    else if (direction.equals(up) && BlankPosition == 10)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
                case 15:
                    if (direction.equals(left) && BlankPosition == 14)
                        SwapTiles(context, position, -1);
                    else if (direction.equals(up) && BlankPosition == 11)
                        SwapTiles(context, position, -4);
                    else Toast.makeText(context, "Invalid move", Toast.LENGTH_SHORT).show();
                    break;
            }
    }

    private static boolean isSolved() {
        for (int i = 0; i < blockList.length; i++) {
            if (!blockList[i].equals(String.valueOf(i))) {
                return false;
            }
        }

        return true;
    }

    private static int getUserScore() {
        return (MoveCount * 10 + timeCounter / 10);
    }

    private static int getFinalScore(int userScore) {
        int score = 8000 - userScore;
        return score < 0 ? 0 : score;
    }

    private static void ranking(final Context context) {
        LayoutInflater li = LayoutInflater.from(context);
        View rankingPopUpView = li.inflate(R.layout.rankingpopup, null);

        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);
        alertDialogBuilder.setView(rankingPopUpView);

        final EditText userInput = (EditText) rankingPopUpView.findViewById(R.id.editTextDialogUserInput);
        ((TextView) rankingPopUpView.findViewById(R.id.scoreTextView)).setText("" + getFinalScore(getUserScore()));

        alertDialogBuilder
                .setCancelable(false)
                .setPositiveButton("OK",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,int id) {
                                final String userName = userInput.getText().toString();
                                if (!userName.isEmpty()) {
                                    RankingData r = new RankingData(userName, getUserScore());
                                    DatabaseReference rankingRef = FirebaseDatabase.getInstance().getReference("/");
                                    rankingRef.push().setValue(r);
                                }
                                rankingShow(context);
                            }
                        })
                .setNegativeButton("Cancel",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,int id) {
                                dialog.cancel();
                                rankingShow(context);
                            }
                        });

        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();
    }

    private static void rankingShow(final Context context) {
        LayoutInflater li = LayoutInflater.from(context);
        final View rankingShow = li.inflate(R.layout.rankingshow, null);

        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);
        alertDialogBuilder.setView(rankingShow);

        Query query = FirebaseDatabase.getInstance().getReference("/").orderByChild("points");

        FirebaseListOptions<RankingData> options = new FirebaseListOptions.Builder<RankingData>()
                .setLayout(R.layout.rankingrow)
                .setQuery(query, RankingData.class)
                .build();

        final FirebaseListAdapter<RankingData> adapter = new FirebaseListAdapter<RankingData>(options) {
            @Override
            protected void populateView(View v, RankingData model, int position) {
                if (position == 0) {
                    ((ImageView) v.findViewById(R.id.rowImageView)).setImageResource(R.drawable.gold);
                } else if (position == 1) {
                    ((ImageView) v.findViewById(R.id.rowImageView)).setImageResource(R.drawable.silver);
                } else if (position == 2) {
                    ((ImageView) v.findViewById(R.id.rowImageView)).setImageResource(R.drawable.bronze);
                }

                ((TextView) v.findViewById(R.id.rowNameTextView)).setText(model.name);
                ((TextView) v.findViewById(R.id.rowPointsTextView)).setText("" + getFinalScore(model.points));
            }
        };

        ListView rankingListView = rankingShow.findViewById(R.id.rankingListView);
        rankingListView.setAdapter(adapter);
        adapter.startListening();

        alertDialogBuilder
                .setCancelable(false)
                .setPositiveButton("OK",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                adapter.stopListening();
                            }
                        });

        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();
    }
}

