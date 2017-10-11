
public class Customer extends Person {
	public Customer() {
		super();
	}

	private String customerNumber;

	@Override
	public String getDisplayText() {
		// TODO Auto-generated method stub
		return this.toString() + System.getProperty("line.separator") + "Customer Number: " + this.getCustomerNumber();
	}

	public String getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
	}

}
