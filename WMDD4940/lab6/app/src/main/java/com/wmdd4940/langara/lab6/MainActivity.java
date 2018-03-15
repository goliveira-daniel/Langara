package com.wmdd4940.langara.lab6;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.GridLayout;
import android.widget.ImageView;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
//import android.widget.RelativeLayout;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getSimpleName();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ArrayList<View> ivList = new ArrayList();
        ArrayList<String> imgList = new ArrayList();
        GridLayout grid = findViewById(R.id.grid);
        for (int i = 0; i<grid.getChildCount(); i++) {
            final View v = grid.getChildAt(i);
            if (v instanceof ImageView) {
                Log.d(TAG,"Found imageview: " + v.getId());
                ivList.add(v);
//                imgList.add(((ImageView) v).getDrawable());

            }
        }
        Collections.shuffle(imgList);
    }
}
