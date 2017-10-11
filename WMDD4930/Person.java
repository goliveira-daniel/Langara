
public abstract class Person {
	private String firstName;
	private String lastName;
	private String email;
	
	public Person() {
		
	}
	
   @Override
   public String toString() { 
      return "Name: " + this.getFirstName() + " " + this.getLastName() + System.getProperty("line.separator") + "E-Mail: " + this.getEmail();
   }
   
   abstract public String getDisplayText();
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
