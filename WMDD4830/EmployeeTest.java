
public class EmployeeTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Employee employee1 = new Employee("Daniel","Oliveira",6000);
		Employee employee2 = new Employee("Mariana","Abacaxi",8000);
		
		   System.out.printf("%s %s monthly salary is %.2f%n",
		             employee1.getFirstName(), employee1.getLastName(), employee1.getMonthlySalary());
		   
		   System.out.printf("Giving %s %s a 10 percent salary raise%n",
		             employee1.getFirstName(), employee1.getLastName());
		   
		   employee1.giveRaise(10);
		   
		   System.out.printf("%s %s monthly salary after the 10 percent raise is %.2f%n",
		             employee1.getFirstName(), employee1.getLastName(), employee1.getMonthlySalary());
		   
		   System.out.printf("%s %s monthly salary is %.2f%n",
		             employee2.getFirstName(), employee2.getLastName(), employee2.getMonthlySalary());
		   
		   System.out.printf("Giving %s %s a 10 percent salary raise%n",
		             employee2.getFirstName(), employee2.getLastName());
		   
		   employee2.giveRaise(10);
		   
		   System.out.printf("%s %s monthly salary after the 10 percent raise is %.2f%n",
		             employee2.getFirstName(), employee2.getLastName(), employee2.getMonthlySalary());
	}

}
