import java.util.Scanner;

public class Simpletron {
	private int [] memory;
	private static final int INSTRUCTION_LIMIT = 99;
	private int instructionCounter;
	private int accumulator;	// a register to hold the current instruction being excecuted 
	private int instructionRegister;	// a temporary holder for the next instruction to be executed 
	private int operationCode;	// indicates the current operation in excecution
	private int operand;	// the rightmost two digits of the instruction being performed currently
	
	private static final int READ=10, 
		  WRITE=11,
		  LOAD=20,
		  STORE=21,
		  ADD=30,
		  SUB=31,
		  DIV=32,
		  MUL=33,
//		  JUMP=40,
//		  JUMPL=41,
//		  JUMPZ=42,
		  HALT=43;
	
	public int getInstructionRegister() {
		return instructionRegister;
	}

	public void setInstructionRegister(int instructionRegister) {
		this.instructionRegister = instructionRegister;
	}

	public int getOperationCode() {
		return operationCode;
	}

	public void setOperationCode(int operationCode) {
		this.operationCode = operationCode;
	}

	public int getOperand() {
		return operand;
	}

	public void setOperand(int operand) {
		this.operand = operand;
	}
	
	public Simpletron(){
		System.out.printf ("\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s %s\n%s %s\n", 
				"*** Welcome to Simpletron! ***",
				"*** Please enter your program one instruction ***",
				"*** (or data word) at a time into the input   ***",
				"*** text field. I will display the location   ***",
				"*** number and a question mark (?). You then  ***",
				"*** type the word for that location. Enter    ***",
				"*** code 9999 to stop entering your program   ***",
				" Loc", " Inst", "****", "*****");
		
		int submittedInstruction = 0;
		int memoryPointer = 0;

		Scanner input = new Scanner ( System.in );
		memory =  new int[INSTRUCTION_LIMIT];

		do {
			System.out.printf ("%d %s  ", memoryPointer, "?" );
			submittedInstruction = input.nextInt ();
			if ( submittedInstruction != -99999 )
				memory [ memoryPointer ] = submittedInstruction;
			memoryPointer++;	// go to the next memory location
			
		} while ( submittedInstruction != -99999 && memoryPointer < INSTRUCTION_LIMIT );	// end do-while
        System.out.printf ("\n%s", "*** Program loading completed ***\n");
		
//		input.close();
	}

	public void execute(){
        System.out.printf ("\n%s", "*** Program execution begins ***\n");
		for (int code : memory) {
			if (code != 0) {
				this.load();
				this.evaluate(this.getOperationCode(), this.getOperand());
			}
		}
	}
	
	private void load ( ) {
		// load the first instruction to the registers and begin execution
		this.setOperationCode(memory [instructionCounter] / 100);
		this.setOperand(memory [instructionCounter] % 100);
	}
	
	private void evaluate (int instruction, int operand) {
		 switch(instruction){
		    case READ: this.read(operand); break;
		    case WRITE: 
		    	System.out.println ("The result of the operation is " + memory [instructionCounter] ); break;
		    case LOAD: accumulator=memory[instructionCounter]; break;
		    case STORE: memory[instructionCounter]=accumulator; break;
		    case ADD:  accumulator+=memory[instructionCounter]; break;
		    case SUB: accumulator-=memory[instructionCounter]; break;
		    case MUL: accumulator*=memory[instructionCounter]; break;
		    case DIV: accumulator/=memory[instructionCounter]; break;
//		    case JUMP: PC=instructionCounter-1; break;
//		    case JUMPL: if(accumulator<0) PC=instructionCounter-1; break;
//		    case JUMPZ: if(accumulator==0) PC=instructionCounter-1; break;
		    case HALT: 
		    	System.out.printf ("\n%s\n", "*** Simpletron execution terminated ***"); 
		    	System.exit ( 0 ); 
		    default:  
		    	System.err.println("*** Bad operation code: " + this.getInstructionRegister() + " ***");
		        System.exit(1);
		 }
		 instructionCounter++;
	}
	private void read(int operands){
//		int userInput;
		Scanner input = new Scanner ( System.in );
		System.out.print ( "Please Enter a whole number (positive or negative): " );
		memory [operands] = input.nextInt ();
	}
}
