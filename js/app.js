function init() {

    //1) Define the required variables used to track the state of the game.

    //2) Store cached element references.

    //3) Upon loading, the game state should be initialized, and a function should 
    //   be called to render this game state.

    //4) The state of the game should be rendered to the user.

    //5) Define the required constants.

    //6) Handle a player clicking a square with a `handleClick` function.

    //7) Create Reset functionality.

    /*-------------------------------- Constants --------------------------------*/
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]


    /*---------------------------- Variables (state) ----------------------------*/
    let board = ['', '', '', '', '', '', '', '', ''];
    let turn = 'X'
    let winner = false
    let tie = true


    /*------------------------ Cached Element References ------------------------*/
    const squareEls = document.querySelectorAll('.sqr');
    const messageEl = document.querySelector('#message');
    const resetBtnEl = document.querySelector('#reset');

    /*-------------------------------- Functions --------------------------------*/



    function render() {
        updateMessage()
        updateBoard()
    }

    function updateBoard() {
        squareEls.forEach((sqr, index) => {
            sqr.textContent = board[index];
        });

        console.log(board)

    }

    function updateMessage() {
        if (winner === false && tie === false) {
            messageEl.textContent = `${turn}'s turn`;
        } else if (winner === false && tie === true) {
            messageEl.textContent = "It's a tie!";
        } else {
            messageEl.textContent = `${turn} is the winner!`;
        }
    }

    function handleClick(event) {

        const squareIndex = event.target.id
        if (board[squareIndex] !== '' || winner) return;
        
        console.log(`sqr ${squareIndex}`)

        placePiece(squareIndex);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();

        render();
    }

    function placePiece(index) {
        board[index] = turn
    }

    function checkForWinner() {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = true;
                return;
            }
        }
    }

    function checkForTie() {
        tie = board.every(cell => cell !== '');
    }

    function switchPlayerTurn() {
        if (!winner) {
            turn = turn === 'X' ? 'O' : 'X';
        }
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        turn = 'X';
        winner = false;
        tie = false;
        render();
    }

    /*----------------------------- Event Listeners -----------------------------*/
    squareEls.forEach(sqr => {
        sqr.addEventListener('click', handleClick);
    });
    resetBtnEl.addEventListener('click', resetGame);

    render()

}
document.addEventListener('DOMContentLoaded', init)
