
public class Employee extends Person {
	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}

	private String socialSecurityNumber;

	@Override
	public String getDisplayText() {
		// TODO Auto-generated method stub
		return this.toString() + System.getProperty("line.separator") + "Social Security Number: " + this.getSocialSecurityNumber();
	}

	public String getSocialSecurityNumber() {
		return socialSecurityNumber;
	}

	public void setSocialSecurityNumber(String socialSecurityNumber) {
		this.socialSecurityNumber = socialSecurityNumber;
	}

}
