package com.wmdd4940.langara.rectangleCalculator;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.text.NumberFormat;

import android.view.KeyEvent;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.TextView.OnEditorActionListener;

import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

public class MainActivity extends AppCompatActivity
        implements OnEditorActionListener {

    // define variables for the widgets
    private EditText widthEditText;
    private EditText heightEditText;
    private TextView areaTextView;
    private TextView perimeterTextView;

    // define instance variables that should be saved
    private String widthString = "";
    private String heightString = "";

    // define the SharedPreferences object
    private SharedPreferences savedValues;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // get references to the widgets
        widthEditText = (EditText) findViewById(R.id.widthEditText);
        heightEditText = (EditText) findViewById(R.id.heightEditText);
        areaTextView = (TextView) findViewById(R.id.areaTextView);
        perimeterTextView = (TextView) findViewById(R.id.perimeterTextView);

        // set the listeners
        widthEditText.setOnEditorActionListener(this);
        heightEditText.setOnEditorActionListener(this);

        // get SharedPreferences object
        savedValues = getSharedPreferences("SavedValues", MODE_PRIVATE);

    }

    @Override
    public void onPause() {
        // save the instance variables
        Editor editor = savedValues.edit();
        editor.putString("widthString", widthString);
        editor.putString("heightString", heightString);
        editor.commit();

        super.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();

        // get the instance variables
        widthString = savedValues.getString("widthString", "");
        heightString = savedValues.getString("heightString", "");

        // set the bill amount on its widget
        widthEditText.setText(widthString);

        // calculate and display
        calculateAndDisplay();
    }

    public void calculateAndDisplay() {

        // get the bill amount
        widthString = widthEditText.getText().toString();
        heightString = heightEditText.getText().toString();
        float width;
        if (widthString.equals("")) {
            width = 0;
        } else {
            width = Float.parseFloat(widthString);
        }

        float height;
        if (heightString.equals("")) {
            height = 0;
        } else {
            height = Float.parseFloat(heightString);
        }

        // calculate tip and total
        float area = width * height;
        float perimeter = 2 * width + 2 * height;

        // display the other results with formatting
//        NumberFormat currency = NumberFormat.getCurrencyInstance();
        areaTextView.setText(Float.toString(area));
        perimeterTextView.setText(Float.toString(perimeter));

//        NumberFormat percent = NumberFormat.getPercentInstance();
//        percentTextView.setText(percent.format(heightString));
    }

    @Override
    public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        if (actionId == EditorInfo.IME_ACTION_DONE ||
                actionId == EditorInfo.IME_ACTION_UNSPECIFIED) {
            calculateAndDisplay();
        }
        return false;
    }

}


