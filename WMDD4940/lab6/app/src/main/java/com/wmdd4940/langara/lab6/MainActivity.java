package com.wmdd4940.langara.lab6;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.GridLayout;
import android.widget.ImageView;

import java.util.ArrayList;
import java.util.Arrays;
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
        List<String> imgList = Arrays.asList("img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img7.png","img8.png","img9.png","img10.png","img11.png","img12.png","img13.png","img14.png","img15.png","blank.png");
        GridLayout grid = findViewById(R.id.grid);
        for (int i = 0; i<grid.getChildCount(); i++) {
            final View v = grid.getChildAt(i);
            if (v instanceof ImageView) {
                Log.d(TAG, String.format("Found imageview: %d", v.getId()));
                ivList.add(v);
//                imgList.add(((ImageView) v).getDrawable());
            }
        }
        for (int i = 0; i<ivList.listIterator())
        Collections.shuffle(imgList);
    }
}
