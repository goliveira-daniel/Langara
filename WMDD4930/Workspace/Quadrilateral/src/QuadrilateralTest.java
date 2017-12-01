
public class QuadrilateralTest {

	public static void main(String args[]) {
		Quadrilateral shapes[] = {
			new Rectangle(0,0,10,20),
			new Parallelogram(0,0,10,20,60),
			new Square(0,0,10)
		};
//		double area=0;
		for (Quadrilateral quadrilateral : shapes) {
			System.out.println(quadrilateral.toString());
		}//end of for loop
	}//end of method main()
}//end of class ShapeGenerator
