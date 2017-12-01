
public class Parallelogram extends Quadrilateral {
	
	protected double base=0.0;
	protected double height=0.0;
	protected double angle = 0.0;
	 
	public Parallelogram(double x, double y, double width, double height, double angle) {
		base = width;
		this.height = height;
		this.angle=angle;
		double tanValue = Math.tan(angle);;
		double baseDistance = tanValue/height;
		topLeft = new Point(x,y);
		topRight = new Point(x+width,y);
		bottomLeft = new Point(x-baseDistance, y+height);
		bottomRight = new Point((x-baseDistance)+width, y+height);
	}//end of constructor
	
	@Override
	public double calcArea() {
		// TODO Auto-generated method stub
		return base * height;
	}

}
