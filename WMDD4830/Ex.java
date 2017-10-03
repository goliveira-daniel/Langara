
public class Ex {
	private int n;
	
	public Ex (int n) {
		if (n<0) {
			throw new IllegalArgumentException("n >= 0 required, but was " + n);
		} else {
			this.n = n;
		}
	}
	
	private long calculateFactorial(long n) {
			return n <= 1 ? 1 : n * calculateFactorial(n-1);
		}
	
	private double calculateEx(long n) {
			return n < 1 ? 1 : calculateEx(n-1) + (Math.pow(this.n, n) / calculateFactorial(n));
		}
	
	public String printEx() {
		return "The e (x) of " + this.n + " is " + calculateEx(this.n);
	}
}
