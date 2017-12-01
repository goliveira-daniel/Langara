
public abstract class Quadrilateral {
	protected Point topLeft = new Point(0,0);
	protected Point topRight = new Point(0,0);
	protected Point bottomLeft = new Point(0,0);
	protected Point bottomRight = new Point(0,0);
	
	public abstract double calcArea();
	
    @Override
    public String toString() { 
      return "Area of " + this.getClass() + ": " + this.calcArea();
    }
}
