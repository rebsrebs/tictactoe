// Tic Tac Toe 
// Contents
    // 1 - Display Controls Object
    // 2 - Player Factory Function
    // 3 - Game Board Object
    // 4 - Game Flow Object



// - 1 DISPLAY CONTROLS OBJECT
const displayControls = (() => {

    // DOM VARIABLES

    // buttons to choose one player or two player game 
    const playerChoiceArea = document.querySelector('#playerchoicearea');
    const onePlayerButton = document.getElementById('oneplayerbutton');
    const twoPlayerButton = document.getElementById('twoplayerbutton');

    // section that lists the current player names
    const playerList = document.getElementById('playerlist');

    // displays current player names in the player list area
    const playerOneDisplay = document.getElementById('player1display');
    const playerTwoDisplay = document.getElementById('player2display');

    // shows whose turn it is or results of game
    const messageArea = document.getElementById('messagearea');

    // form containers and forms for one player name, difficulty level, and two player names
    const onePlayerFormContainer = document.getElementById('oneplayerformcontainer');
    const onePlayerForm = document.getElementById('oneplayerform');
    const twoPlayerFormContainer = document.getElementById('twoplayerformcontainer');
    const twoPlayerForm = document.getElementById('twoplayerform');

    // buttons to start one and two player games
    const startButton1 = document.getElementById('startbutton1');
    const startButton2 = document.getElementById('startbutton2');

    // reset button
    const resetButton = document.getElementById('resetbutton');

    // for gameBoard styling
    const gameBoardContainer = document.getElementById('gameboardcontainer');

    // UTILITY FUNCTIONS
    
    // Function to show one element
    function displayElement(element, display){
    element.style.display = display;
    }

    // Function to hide one element
    function hideElement(element){
    element.style.display ='none';
    }

    // EVENT LISTENERS

    // when you load page, create game board but grayed out
    document.addEventListener('DOMContentLoaded', function(){
        gameBoard.createCells();
        gameBoard.fillCells(gameBoard.gameBoardArray);
    });

    // when you click one player button
    onePlayerButton.addEventListener('click', function(){
        if (twoPlayerButton.classList.contains('clicked')) {
            twoPlayerButton.classList.remove('clicked');
            hideElement(twoPlayerFormContainer);
        }
            onePlayerButton.classList.add("clicked");
            displayElement(onePlayerFormContainer,'block');
    });

    // when you click two player button
    twoPlayerButton.addEventListener('click', function(){
        if (onePlayerButton.classList.contains('clicked')) {
            onePlayerButton.classList.remove('clicked');
            hideElement(onePlayerFormContainer);
        }
        twoPlayerButton.classList.add("clicked");
        displayElement(twoPlayerFormContainer,'block');
    });

    return {
        playerChoiceArea,
        onePlayerButton,
        twoPlayerButton,
        playerList,
        playerOneDisplay,
        playerTwoDisplay,
        messageArea,
        onePlayerFormContainer,
        onePlayerForm,
        twoPlayerFormContainer,
        twoPlayerForm,
        startButton1,
        startButton2,
        resetButton,
        gameBoardContainer,
        displayElement,
        hideElement,
    }
})();
// END DISPLAY CONTROLS MODULE


// 2 - FACTORY FUNCTION TO CREATE PLAYERS
const playerFactory = (name, playerText, type) => {
    const turnMessage = `${name}'s turn.`; 
    const winnerMessage = `${name} is the winner!`;
    const styleSelector = `${playerText}-style`;
    let makeAMove = '';

    const makeAMoveHuman = function(event){
        console.log('BEGIN MAKEAMOVEHUAMN FUNCTION');
        let target = event.target;
        console.log(`Clicked cell ID is ${target.getAttribute('id')} and pre-existing classes are ${target.classList}`);
        console.log(`currentPLayer's name is ${gameFlow.getCurrentPlayer().name}`);
        // This is coming back wrong
        console.log(`styleSelector is ${styleSelector} and player text is ${playerText}`)
        if (target.innerText === '' && target.classList.contains('cell') && displayControls.gameBoardContainer.classList.contains('gameboardcontainer-active')) {
            target.classList.add(styleSelector);
            console.log(`Clicked cell's new class list is ${target.classList}`)
            console.log(`Game board container class list is ${displayControls.gameBoardContainer.classList}`);
            let indexNum = target.id.slice(-1);
            gameBoard.gameBoardArray[indexNum] = playerText;
            target.textContent = playerText;
            // console.log('end makeAMoveHuman function');
            gameBoard.checkForWinners();
        } else {
            console.log(`target class list is ${target.classList} and i cannot make a move`);
        } // end if statement
        
    } // end makeAMove function

    const makeAMoveEasyAI = function(){
        console.log('BEGIN MAKEAMOVEEASYAI FUNCTION');
        // console.log(`${gameFlow.currentPlayer} begins makeAMoveEasyAI function`);
        let emptyCells = gameBoard.gameBoardArray.map((element,index) => element === ''?  index : '').filter(String);
        console.log(emptyCells);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMoveLocation = emptyCells[randomIndex];
        console.log(computerMoveLocation);
        //put playerText in that index number of the gameboard array
        gameBoard.gameBoardArray[computerMoveLocation]=playerText;
        //and put playerText in that cell ID number
        var cellTarget = document.getElementById(`cell-${computerMoveLocation}`);
        console.log(`Now we will make an ${playerText} in cell-${computerMoveLocation}`);
        cellTarget.classList.add(styleSelector);
        cellTarget.textContent = playerText;
        console.log('end makeAMoveEasyAI function');
        gameBoard.checkForWinners();
    } // end makeAMoveEasyAI function

    if (type==='human'){
        makeAMove = makeAMoveHuman;
    } else if (type==='easy'){
        makeAMove = makeAMoveEasyAI;

    } // end type if statement

    return {
        name,
        playerText,
        turnMessage,
        winnerMessage,
        styleSelector,
        makeAMove,
        makeAMoveHuman,
        makeAMoveEasyAI,
        type,
    }
};
// END FACTORY FUNCTION TO CREATE PLAYERS


// 3 - GAMEBOARD OBJECT MODULE
const gameBoard = (() => {

        var rowOneArray = [];
        var rowTwoArray = [];
        var rowThreeArray = [];
        var columnOneArray = [];
        var columnTwoArray = [];
        var columnThreeArray = [];
        var diagonalOneArray = [];
        var diagonalTwoArray = [];
        var rowsToCheckArray = [];
    
    //new game button opens div to select further options before starting game
    const newGameBtnDiv = document.getElementById('newgamebtndiv');
    const newGameButton = document.getElementById('newgamebutton');
        
    //create array with default text
    var gameBoardArray = ['T','I','C','T','A','C','T','O','E'];

    //when you click new game button
    newGameButton.addEventListener('click', function(){
        displayControls.gameBoardContainer.removeEventListener('click', gameFlow.getCurrentPlayer().makeAMove);
        displayControls.twoPlayerForm.reset();
        displayControls.onePlayerForm.reset();
        displayControls.messageArea.textContent='';
        displayControls.displayElement(displayControls.playerChoiceArea, 'flex');
        displayControls.hideElement(newGameBtnDiv);
        displayControls.hideElement(displayControls.playerList);
        resetCellClass();
        makeArrayBlank(gameBoardArray);
        fillCells(gameBoardArray);
    });

    // FUNCTIONS

    // Function to create cells in gameBoard grid
    const createCells = function() {
        for (let step = 0; step <= 8; step++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id=`cell-${step}`;
            // cell.addEventListener('click', playerFactory.currentPlayer.makeAMove);
            displayControls.gameBoardContainer.appendChild(cell);
            // console.log(cell.id);
          }
    }

    // Function to remove player classes from cells after game
    const resetCellClass = function() {
        console.log('Reset cell classes.');
        for (let hey = 0; hey <= 8; hey++){
            var theCell = document.getElementById(`cell-${hey}`);
            theCell.classList.remove('X-style');
            theCell.classList.remove('O-style');
        }
    }

    // FUNCTION to make an array blank
    const makeArrayBlank = function(array) {
        array.fill('');
        }

    // FUNCTION to fill textContent of game board cells with array
    const fillCells = function(array) {
        let b=0;
        array.forEach((i) => {
            var currentCell = document.getElementById(`cell-${b}`);
            currentCell.textContent=i;
            b=b+1;
        });
    }

    // FUNCTION to check for winners or tie
    const checkForWinners = function(array) {
        console.log('BEGIN CHECKFORWINNERS FUNCTION')

        //FUNCTION to check if array contains all X's
        const allXs = arr => arr.every(value => value === arr[0] && arr[0] ==='X');

        //FUNCTION to check if array contains all O's
        const allOs = arr => arr.every(value => value === arr[0] && arr[0] ==='O');

        // FUNCTION to check if all items in array are full
        const allFull = arr => arr.every(value => value === 'X' || value === 'O');

        // create arrays of rows to check
        rowOneArray = gameBoardArray.slice(0,3);
        rowTwoArray = gameBoardArray.slice(3,6);
        rowThreeArray = gameBoardArray.slice(6);
        columnOneArray = [gameBoardArray.at(0), gameBoardArray.at(3), gameBoardArray.at(6)];
        columnTwoArray = [gameBoardArray.at(1), gameBoardArray.at(4), gameBoardArray.at(7)];
        columnThreeArray = [gameBoardArray.at(2), gameBoardArray.at(5), gameBoardArray.at(8)];
        diagonalOneArray = [gameBoardArray.at(0), gameBoardArray.at(4),gameBoardArray.at(8)];
        diagonalTwoArray = [gameBoardArray.at(2), gameBoardArray.at(4),gameBoardArray.at(6)];

        // create array of arrays to check
        rowsToCheckArray = [
            rowOneArray,
            rowTwoArray,
            rowThreeArray,
            columnOneArray,
            columnTwoArray,
            columnThreeArray,
            diagonalOneArray,
            diagonalTwoArray,
        ]

        // if X wins
        if (rowsToCheckArray.some(allXs) == true){
            console.log('X won');
            displayControls.messageArea.textContent = gameFlow.getPlayerOne().winnerMessage;
            displayControls.hideElement(displayControls.playerList);
            displayControls.displayElement(newGameBtnDiv,'block');
            // stop background highlighting on gameBoard
            displayControls.gameBoardContainer.classList.remove('gameboardcontainer-active');
            displayControls.gameBoardContainer.removeEventListener('click', gameFlow.playerOne.makeAMove);
            displayControls.gameBoardContainer.removeEventListener('click', gameFlow.playerTwo.makeAMove);

        // if O wins
        } else if (rowsToCheckArray.some(allOs) == true){
            console.log('O won');
            displayControls.messageArea.textContent = gameFlow.getPlayerTwo().winnerMessage;
            displayControls.hideElement(displayControls.playerList);
            displayControls.displayElement(newGameBtnDiv,'block');
            displayControls.gameBoardContainer.classList.remove('gameboardcontainer-active');
            displayControls.gameBoardContainer.removeEventListener('click', gameFlow.playerOne.makeAMove);
            displayControls.gameBoardContainer.removeEventListener('click', gameFlow.playerTwo.makeAMove);

        // if it's a tie
        } else if (allFull(gameBoardArray) == true){
            console.log('tie');
            displayControls.hideElement(displayControls.playerList);
            displayControls.displayElement(newGameBtnDiv,'block');
            displayControls.messageArea.textContent = 'It\'s a tie!';
            displayControls.gameBoardContainer.classList.remove('gameboardcontainer-active');
            displayControls.gameBoardContainer.removeEventListener('click', gameFlow.playerOne.makeAMove);
            displayControls.gameBoardContainer.removeEventListener('click', gameFlow.playerTwo.makeAMove);

        // if no winner and no tie, keep playing
        } else {
            console.log('Keep playing');
            gameFlow.togglePlayers();
            //gameFlow.updateUI
        }
    }
// end function to check for winners


 return {
     gameBoardArray,
     createCells,
     makeArrayBlank,
     fillCells,
     checkForWinners,
     resetCellClass,
 } 
})();

// END GAMEBOARD OBJECT MODULE


// 4 - GAME FLOW OBJECT MODULE
const gameFlow = (() => {

    let currentPlayer = '';  
    let playerOne = '';
    let playerTwo = '';

    //FUNCTION to start two player game
    const startGame = function(event){
        console.log('BEGIN STARTGAME FUNCTION.');
        let target = event.target;

        //hide forms and buttons
        displayControls.onePlayerButton.classList.remove('clicked');
        displayControls.twoPlayerButton.classList.remove('clicked');
        displayControls.hideElement(displayControls.playerChoiceArea);
        displayControls.hideElement(displayControls.twoPlayerFormContainer);
        displayControls.hideElement(displayControls.onePlayerFormContainer);

        //if two player game selected
        if (target.id === 'startbutton2') {
            console.log('Two player game selected');
            //get player names from form inputs
            const playerOneName = document.getElementById('player1name2').value;
            const playerTwoName = document.getElementById('player2name').value;
            //create players and assign letters
            playerOne = playerFactory(playerOneName,'X','human');
            console.log(`Player One is named ${playerOne.name} and text is ${playerOne.playerText} and type is ${playerOne.type}`);
            playerTwo = playerFactory(playerTwoName,'O','human');
            console.log(`Player Two is named ${playerTwo.name} and text is ${playerTwo.playerText} and type is ${playerTwo.type}`);
        //if one player game selected
        } else if (target.id === 'startbutton1') {
            console.log('start one player was pushed');
            const playerOneName = document.getElementById('player1name1').value;
            playerOne = playerFactory(playerOneName,'X','human');
            console.log(`Player One is named ${playerOne.name} and text is ${playerOne.playerText}`);
            playerTwo = playerFactory('Computer','O','easy');
            console.log(`Player Two is named ${playerTwo.name} and text is ${playerTwo.playerText}`);
        }

        //display player names
        displayControls.playerOneDisplay.textContent=`${playerOne.name}`;
        displayControls.playerTwoDisplay.textContent=`${playerTwo.name}`;
        displayControls.displayElement(displayControls.playerList,'flex');

        // Make array blank and fill cells with it
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        
        // Change gameboard style to active and make clickable
        displayControls.gameBoardContainer.classList.add('gameboardcontainer-active');

        // Set first turn to player one's turn and display turn message
        currentPlayer = playerOne;
        console.log(`Set current player to Player One: ${currentPlayer.name}`);
        displayControls.messageArea.textContent=playerOne.turnMessage;

        if (currentPlayer.type === 'human'){
        displayControls.gameBoardContainer.addEventListener('click', currentPlayer.makeAMove);
        } else if (currentPlayer.type === 'easy'){
            currentPlayer.makeAMove();
        }
    }
    // End startGame

       //getter functions
       const getPlayerOne = () => playerOne;
       const getPlayerTwo = () => playerTwo;
       const getCurrentPlayer = () => currentPlayer;
   
    // FUNCTION to reset game
    const resetGame = function(){
        currentPlayer = playerOne;
        displayControls.messageArea.textContent=currentPlayer.turnMessage;
        gameBoard.resetCellClass();
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        displayControls.gameBoardContainer.classList.add('gameboardcontainer-active');
        displayControls.gameBoardContainer.removeEventListener('click', getPlayerTwo().makeAMove);
        displayControls.gameBoardContainer.addEventListener('click', getCurrentPlayer().makeAMove);
    }

    // FUNCTION to update UI
    const updateUI = function(){
        console.log('BEGIN UPDATEUI FUNCTION');
        if (currentPlayer.type === 'human'){
            displayControls.gameBoardContainer.addEventListener('click', getCurrentPlayer().makeAMove);
        } else if (currentPlayer.type === 'easy'){
            currentPlayer.makeAMoveEasyAI();
        }      
    }

    // FUNCTION to toggle players
    const togglePlayers = function(){
        console.log('BEGIN TOGGLEPLAYERS FUNCTION');
        console.log(`Old currentPlayer was ${currentPlayer.name}.`);
        // remove old event handler
        displayControls.gameBoardContainer.removeEventListener('click', getCurrentPlayer().makeAMove);
        // switch the players
        currentPlayer === playerOne? currentPlayer = playerTwo : currentPlayer = playerOne;
        displayControls.messageArea.textContent = currentPlayer.turnMessage;
        console.log(`New currentPlayer is ${currentPlayer.name}.`);
        updateUI();
    }

    displayControls.startButton1.addEventListener('click', startGame);
    displayControls.startButton2.addEventListener('click', startGame);
    displayControls.resetButton.addEventListener('click', resetGame);

    return {
        getPlayerOne,
        getPlayerTwo,
        getCurrentPlayer,
        playerOne,
        playerTwo,
        currentPlayer,
        togglePlayers,
    }
})();

//END GAME FLOW OBJECT MODULE