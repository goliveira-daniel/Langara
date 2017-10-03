
public class Factorial {
	private int n;
	
	public Factorial (int n) {
		if (n<0) {
			throw new IllegalArgumentException("n >= 0 required, but was " + n);
		} else {
			this.n = n;
		}
	}
	
	private long calculateFactorial(long n) {
		return n <= 1 ? 1 : n * calculateFactorial(n-1);
		}

	public String printFatorial() {
		return "The factorial of " + this.n + " is " + calculateFactorial(this.n);
	}
}