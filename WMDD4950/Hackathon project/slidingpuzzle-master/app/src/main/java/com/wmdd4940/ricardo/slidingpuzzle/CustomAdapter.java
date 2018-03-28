package com.wmdd4940.ricardo.slidingpuzzle;

import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageButton;

import java.util.ArrayList;

/**
 * Based on: https://github.com/DaveNOTDavid/sample-puzzle/tree/master/app/src/main/java/com/davenotdavid/samplepuzzle
 */

public class CustomAdapter extends BaseAdapter {
    private ArrayList<ImageButton> buttons;
    private int columnWidth;
    private int columnHeight;

    public CustomAdapter(ArrayList<ImageButton> buttons, int columnWidth, int columnHeight) {
        this.buttons = buttons;
        this.columnWidth = columnWidth;
        this.columnHeight = columnHeight;
    }

    @Override
    public int getCount() {
        return buttons.size();
    }

    @Override
    public Object getItem(int position) {
        return (Object) buttons.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View contentView, ViewGroup parent) {
        ImageButton button = (contentView == null) ? buttons.get(position) : (ImageButton) contentView;

        android.widget.AbsListView.LayoutParams params =  new android.widget.AbsListView.LayoutParams(columnWidth, columnHeight);
        button.setLayoutParams(params);

        return button;
    }
}