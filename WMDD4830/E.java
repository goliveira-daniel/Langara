
public class E {
	private int n;
	
	public E (int n) {
		if (n<0) {
			throw new IllegalArgumentException("n >= 0 required, but was " + n);
		} else {
			this.n = n;
		}
	}
	
	private long calculateFactorial(long n) {
			return n <= 1 ? 1 : n * calculateFactorial(n-1);
		}
	
	private double calculateE(long n) {
			return n < 1 ? 1 : calculateE(n-1) + (1.0f / calculateFactorial(n));
		}
	
	public String printE() {
		return "The e of " + this.n + " is " + calculateE(this.n);
	}
}
