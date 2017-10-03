public class Diamondv2 {
	private int size;
	
	public Diamondv2 (int size) {
		if (size>19) {
			throw new IllegalArgumentException("n >= 0 required, but was " + size);
		} else {
			this.size = size;
		}
	}
	
	public void printDiamond() {
		for (int i = 1; i < this.size; i += 2) {
			for (int j = 0; j < 9 - i / 2; j++) System.out.print(" ");
			for (int j = 0; j < i; j++) System.out.print("*");
			System.out.print("\n");
	    }
	    for (int i = this.size-2; i > 0; i -= 2) {
	    	for (int j = 0; j < 9 - i / 2; j++) System.out.print(" ");
	    	for (int j = 0; j < i; j++) System.out.print("*");
	    	System.out.print("\n");
	    }
	}
}