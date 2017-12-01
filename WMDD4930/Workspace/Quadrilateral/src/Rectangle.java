
public class Rectangle extends Quadrilateral {
	
	public Rectangle(int x, int y, int width, int height) {
//		super();
		topLeft = new Point(x,y);
		topRight = new Point(x+width,y);
		bottomLeft = new Point(x, y+height);
		bottomRight = new Point(x+width, y+height);
	}
	@Override
	public double calcArea() {
		// TODO Auto-generated method stub
		return (bottomRight.getX() - topLeft.getX()) * (bottomRight.getY() - topLeft.getY());
	}

}
