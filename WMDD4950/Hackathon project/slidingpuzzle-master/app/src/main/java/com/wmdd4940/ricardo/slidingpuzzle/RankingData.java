package com.wmdd4940.ricardo.slidingpuzzle;

public class RankingData {

    public String name;
    public int points;

    public RankingData() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public RankingData(String name, int points) {
        this.name = name;
        this.points = points;
    }

}