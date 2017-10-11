import java.util.Scanner;

public class PersonApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner input = new Scanner(System.in);
		System.out.println("Welcome to the Person Tester application");
		System.out.println();
		boolean isValidEntry = false;
		boolean Continue = true;
		String entry;
		Customer customer = null;
		Employee employee = null;
		do {
			
			do {
				System.out.print("Create customer or employee? (c/e): ");
				entry = input.next();
				switch (entry) {
				case "c":
				case "C":
					isValidEntry = true;
					customer = new Customer();
					break;
				case "e":
				case "E":
					isValidEntry = true;
					employee = new Employee();
					break;
				default:
					System.out.println("Invalid entry.");
				}
			} while (!isValidEntry);
			
			System.out.println();
			
			if (customer != null) {
				System.out.print("Enter first name: ");
				customer.setFirstName(input.next());
				System.out.print("Enter last name: ");
				customer.setLastName(input.next());
				System.out.print("Enter email address: ");
				customer.setEmail(input.next());
				System.out.print("Customer number: ");
				customer.setCustomerNumber(input.next());
				System.out.println("You entered:");
				System.out.println(customer.getDisplayText());
			}
			
			if (employee != null) {
				System.out.print("Enter first name: ");
				employee.setFirstName(input.next());
				System.out.print("Enter last name: ");
				employee.setLastName(input.next());
				System.out.print("Enter email address: ");
				employee.setEmail(input.next());
				System.out.print("Social Security number: ");
				employee.setSocialSecurityNumber(input.next());
				System.out.println("You entered:");
				System.out.println(employee.getDisplayText());
			}
			isValidEntry = false;
			System.out.print("Continue? (y/n): ");
			entry = input.next();
			switch (entry) {
			case "y":
			case "Y":
				customer = null;
				employee = null;
				break;
			case "n":
			case "N":
				Continue = false;
				break;
			default:
				System.out.println("Invalid entry.");
			}
		} while (Continue);
		input.close();
	}
}
