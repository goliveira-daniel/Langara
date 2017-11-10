package TicTacToe;

public class TicTacToe {
	private enum cell {
		X,
		O,
		EMPTY;
	}
	private final int BOARD_SIZE = 2;
	private cell[][] board = new cell[BOARD_SIZE][BOARD_SIZE];
	
	public TicTacToe(){
		for (int i = 0; i < board.length; i++) {
			for (int j = 0; j < board[i].length; j++) {
				board[i][j] = cell.EMPTY;
			}
		}
	}
	
	private boolean checkWinner() {
		boolean temp = true;
		for (int i = 0; i < board.length -1; i++) {
			if (!temp && ) {
				
			}
			for (int j = 0; j < board[i].length; j++) {				
				if (board[i] != board[i+1]) {
					temp = false
							
							
							
							;
					break;
				}
			}
			if (!temp) {
				break;
			}
		}
		return temp;
	}
}
