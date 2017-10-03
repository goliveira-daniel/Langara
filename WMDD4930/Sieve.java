import java.lang.Math;

public class Sieve {
	public static void main( String[] args ) {
		boolean[] isPrime = new boolean[1000];
		for (int i = 0; i < isPrime.length; i++) {
			isPrime[i] = true;
		}
		for (int i = 2; i < Math.sqrt(isPrime.length); i++) {
			if (isPrime[i]) {
				for (int j = i * i; j < isPrime.length; j += i) {
					isPrime[j] = false;
				}
			}
		}
		int count = 0;
		for (int i = 2; i < isPrime.length; i++) {
//			isPrime[i] ? (System.out.println(""));
			if (isPrime[i]) {
				System.out.println("Number " + i + " is prime"); 
				count++;
			}
		}
		System.out.println(count + " primes found");		
	}
}