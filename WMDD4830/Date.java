
public class Date {
	
	private int month;
	private int day;
	private int year;
	
	public Date (int month, int day, int year) {
		// TODO Auto-generated method stub
		this.setDay(day);
		this.setMonth(month);
		this.setYear(year);
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		if (1 <= month && month <= 12) {
			this.month = month;
		} else {
			throw new IllegalArgumentException("INVALID MONTH");
		}
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		if (1 <= day && day <= 31) {
			this.day = day;
		} else {
			throw new IllegalArgumentException("INVALID DAY");
		}
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}
	
	public String displayDate() {
		return Integer.toString(this.getDay()) + "/" + Integer.toString(this.getMonth()) + "/" + Integer.toString(this.getYear()); 
	}
}
