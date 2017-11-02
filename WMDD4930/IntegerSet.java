public class IntegerSet {
	private final int length = 100;
	private boolean[] arrInt;

	public IntegerSet() {
		arrInt = new boolean[length];
	}

	static IntegerSet union(IntegerSet source, IntegerSet target){
		IntegerSet temp = new IntegerSet();
		for (int i = 0; i < temp.arrInt.length; i++) {
			temp.arrInt[i] = (source.arrInt[i] || target.arrInt[i]);
		}
		return temp;
	}
	
	static IntegerSet intersection(IntegerSet source, IntegerSet target){
		IntegerSet temp = new IntegerSet();
		for (int i = 0; i < temp.arrInt.length; i++) {
			temp.arrInt[i] = (source.arrInt[i] && target.arrInt[i]);
		}
		return temp;
	}
	
	public void insertElement(int i) {
		if (i <= length) {
			arrInt[i] = true;
		} else {
			throw new IllegalArgumentException("INVALID INTEGER");
		}
	}
	
	public void deleteElement(int i) {
		if (i <= length) {
			arrInt[i] = false;
		} else {
			throw new IllegalArgumentException("INVALID INTEGER");
		}
	}
	
	   @Override
	   public String toString() 
	   {
		   String str = "";
		   for (int i = 0; i < arrInt.length; i++) {
			   if (arrInt[i]) {
				   str += i;
			   } else {
				   str += "---";
			}
		   str += " ";
		}
	      return str;
	   }
	   
	   public boolean isEqualTo(IntegerSet target) {
		for (int i = 0; i < this.length; i++) {
			if (this.arrInt[i] != target.arrInt[i]) {
				return false;
			}
		}
		return true; 
	   }
}