
public class IntegerSetTest {
	/**
	 * Test for class IntegerSet
	 * @param args
	 */
	public static void main(String[] args) 
	{
		//create IntegerSet objects to test
		IntegerSet set1 = new IntegerSet();
		IntegerSet set2 = new IntegerSet();
		
		//insert some values into set1 and print
		set1.insertElement(13);
		set1.insertElement(23);
		set1.insertElement(33);
		set1.insertElement(43);
		set1.insertElement(53);
		set1.insertElement(63);
		System.out.print("Set 1: ");
		System.out.println(set1.toString());
		
		//insert some values into set2 and print
		set2.insertElement(12);
		set2.insertElement(22);
		set2.insertElement(33);
		set2.insertElement(43);
		set2.insertElement(52);
		set2.insertElement(63);
		System.out.print("Set 2: ");
		System.out.println(set2.toString());
		
		//test union and intersection methods after adding values
		System.out.print("Union: ");
		System.out.println(IntegerSet.union(set1,set2).toString());
		System.out.print("Intersection: ");
		System.out.println(IntegerSet.intersection(set1,set2).toString());
		
		//delete some values from set1 and print
		set1.deleteElement(53);
		set1.deleteElement(63);
		System.out.print("New Set 1: ");
		System.out.println(set1.toString());
		
		//delete some values from set2 and print
		set2.deleteElement(12);
		set2.deleteElement(22);
		System.out.print("New Set 2: ");
		System.out.println(set2.toString());
		
		//test union and intersection methods after deleting values
		System.out.print("New Union: ");
		System.out.println(IntegerSet.union(set1,set2).toString());
		System.out.print("New Intersection: ");
		System.out.println(IntegerSet.intersection(set1,set2).toString());		

	}
}