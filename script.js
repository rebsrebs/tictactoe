//Tic Tac Toe 
//Contents
    //1 Display Controls Object
    //2 Player Factory Function
    //3 Game Board Object
    //4 Game Flow Object



//1 DISPLAY CONTROLS OBJECT
const displayControls = (() => {

    //DOM VARIABLES

    //buttons to choose one player or two player game 
    const playerChoiceArea = document.querySelector('#playerchoicearea');
    const onePlayerButton = document.getElementById('oneplayerbutton');
    const twoPlayerButton = document.getElementById('twoplayerbutton');

    //section that lists the current player names
    const playerList = document.getElementById('playerlist');

    //displays current player names in the player list area
    const playerOneDisplay = document.getElementById('player1display');
    const playerTwoDisplay = document.getElementById('player2display');

    //shows whose turn it is or results of game
    const messageArea = document.getElementById('messagearea');

    //form containers and forms for one player name, difficulty level, and two player names
    const onePlayerFormContainer = document.getElementById('oneplayerformcontainer');
    const onePlayerForm = document.getElementById("oneplayerform");
    const twoPlayerFormContainer = document.getElementById('twoplayerformcontainer');
    const twoPlayerForm = document.getElementById("twoplayerform");

    //buttons to start one and two player games
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

    //EVENT LISTENERS

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

    return{
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
//END DISPLAY CONTROLS MODULE


//2 FACTORY FUNCTION TO CREATE PLAYERS
const playerFactory = (name, playerText) => {
    const turnMessage = `${name}'s turn.`; 
    const winnerMessage = `${name} is the winner!`;
    const styleSelector = `${playerText}-style`;
    return {
        name,
        playerText,
        turnMessage,
        winnerMessage,
        styleSelector,
    }
};
//END FACTORY FUNCTION TO CREATE PLAYERS


// 3 GAMEBOARD OBJECT MODULE
const gameBoard = (() => {
    
    //new game button opens div to select further options before starting game
    const newGameBtnDiv = document.getElementById('newgamebtndiv');
    const newGameButton = document.getElementById('newgamebutton');

    //result for checkForWinner fuction
    var resultsValue = '';
        
    //create array with default text
    var gameBoardArray = ['T','I','C','T','A','C','T','O','E'];

    //when you click new game button
    newGameButton.addEventListener('click', function(){
        displayControls.twoPlayerForm.reset();
        displayControls.onePlayerForm.reset();
        displayControls.messageArea.textContent='';
        displayControls.displayElement(displayControls.playerChoiceArea, 'flex');
        displayControls.hideElement(newGameBtnDiv);
        displayControls.hideElement(displayControls.playerList);
        gameBoard.resetCellClass();
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
    });

    // FUNCTIONS

    // Function to create cells in gameBoard grid
    const createCells = function() {
        for (let step = 1; step <= 9; step++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id=`cell-${step}`;
            displayControls.gameBoardContainer.appendChild(cell);
            // console.log(cell.id);
          }
    }

    //Function to remove player classes from cells after game
    const resetCellClass = function() {
        for (let hey = 1; hey <= 9; hey++){
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
        let b=1;
        array.forEach((i) => {
            var currentCell = document.getElementById(`cell-${b}`);
            currentCell.textContent=i;
            b=b+1;
        });
    }

    // FUNCTION to check for winners or tie
    const checkForWinners = function(array) {

        //FUNCTION to check if array contains all X's
        const allXs = arr => arr.every(value => value === arr[0] && arr[0] ==='X');

        //FUNCTION to check if array contains all O's
        const allOs = arr => arr.every(value => value === arr[0] && arr[0] ==='O');

        //FUNCTION to check if all items in array are full
        const allFull = arr => arr.every(value => value === 'X' || value === 'O');
        
        //create arrays of rows to check
        var rowOneArray = gameBoardArray.slice(0,3);
        var rowTwoArray = gameBoardArray.slice(3,6);
        var rowThreeArray = gameBoardArray.slice(6);
        var columnOneArray = [gameBoardArray.at(0), gameBoardArray.at(3), gameBoardArray.at(6)];
        var columnTwoArray = [gameBoardArray.at(1), gameBoardArray.at(4), gameBoardArray.at(7)];
        var columnThreeArray = [gameBoardArray.at(2), gameBoardArray.at(5), gameBoardArray.at(8)];
        var diagonalOneArray = [gameBoardArray.at(0), gameBoardArray.at(4),gameBoardArray.at(8)];
        var diagonalTwoArray = [gameBoardArray.at(2), gameBoardArray.at(4),gameBoardArray.at(6)];

        //create array of arrays to check
        var rowsToCheckArray = [
            rowOneArray,
            rowTwoArray,
            rowThreeArray,
            columnOneArray,
            columnTwoArray,
            columnThreeArray,
            diagonalOneArray,
            diagonalTwoArray,
        ]

        //if X wins
        if (rowsToCheckArray.some(allXs) == true){
            const playerOneName = document.getElementById('player1name2').value;
            displayControls.hideElement(displayControls.playerList);
            //show the New Game Button
            displayControls.displayElement(newGameBtnDiv,'block');
            resultsValue = `${playerOneName} wins!`
            console.log(gameFlow.playerOne.winnerMessage);
            console.log(`${gameFlow.playerOneName} wins!`)
            displayControls.messageArea.textContent = resultsValue;
            displayControls.gameBoardContainer.classList.remove('gameboardcontainer-active');
            gameBoard.resetCellClass();

        //if O wins
        } else if (rowsToCheckArray.some(allOs) == true){
            displayControls.hideElement(displayControls.playerList);
            const playerTwoName = document.getElementById('player2name').value;
            resultsValue = `${playerTwoName} wins!`
            displayControls.messageArea.textContent = resultsValue;
            displayControls.gameBoardContainer.classList.remove('gameboardcontainer-active');
            displayControls.displayElement(newGameBtnDiv,'block');
            gameBoard.resetCellClass();

        //if it's a tie
        } else if (allFull(gameBoardArray) == true){
            displayControls.hideElement(displayControls.playerList);
            console.log('tie');
            resultsValue='It\'s a tie!';
            displayControls.messageArea.textContent = resultsValue;
            //stop background highlighting on gameBoard
            displayControls.gameBoardContainer.classList.remove('gameboardcontainer-active');
            displayControls.displayElement(newGameBtnDiv,'block');
            gameBoard.resetCellClass();

        //if not win or no tie, keep playing
        } else {
            console.log('play');
            resultsValue='play';
            gameFlow.switchPlayers();
            console.log('we have switched players!')
        }
        // return resultsValue;
    }
// END FUNCTION to check for winners

 return {
     gameBoardArray,
     createCells,
     makeArrayBlank,
     fillCells,
     checkForWinners,
     resultsValue,
     resetCellClass,
 } 
})();

//END GAMEBOARD OBJECT MODULE


// 4 GAME FLOW OBJECT MODULE
const gameFlow = (() => {

    let currentPlayer = '';  
    let playerOne = '';
    let playerTwo = '';
    let difficultyLevel = '';

    //FUNCTION to start one player game
    const startOnePlayerGame = function(){
        console.log('start 2 player game button was pushed');
        //hide the form you just filled out
        displayControls.onePlayerButton.classList.remove('clicked');
        displayControls.hideElement(displayControls.playerChoiceArea);
        displayControls.hideElement(displayControls.onePlayerFormContainer);
        //get name of playerOne from the form input
        const playerOneName = document.getElementById('player1name2').value;
        const playerTwoName = 'Computer';

        if (document.getElementById('easy').checked) {
            console.log('easy radio button is checked');
           difficultyLevel = 'easy';
           }else if (document.getElementById('hard').checked) {
            console.log('hard radio button is checked');
           difficultyLevel = 'hard';
           } else if (document.getElementById('impossible').checked) {
           console.log('impossible radio button is checked');
           difficultyLevel = 'impossible';
           }
    }
    //end one player game

    //FUNCTION to start two player game
    const startTwoPlayerGame = function(){
        console.log('start 2 player game button was pushed');
        //hide the form you just filled out
        displayControls.twoPlayerButton.classList.remove('clicked');
        displayControls.hideElement(displayControls.playerChoiceArea);
        displayControls.hideElement(displayControls.twoPlayerFormContainer);
        //get name of playerOne from the form input
        const playerOneName = document.getElementById('player1name2').value;
        //get name of playerTwo from the form input
        const playerTwoName = document.getElementById('player2name').value;
        //create playerOne using factory function and assign to X
        playerOne = playerFactory(playerOneName,'X');
        console.log(`Player One is named ${playerOne.name} and text is ${playerOne.playerText}`);
        //create playerTwo using factory function and assign to O
        playerTwo = playerFactory(playerTwoName,'O');
        console.log(`Player Two is named ${playerTwo.name} and text is ${playerTwo.playerText}`);
        //display player names
        displayControls.playerOneDisplay.textContent=`${playerOne.name}`;
        displayControls.textContent=`${playerTwo.name}`;
        displayControls.displayElement(displayControls.playerList,'flex');
        
        //set first turn at player one's turn
        currentPlayer = playerOne;
        console.log(`current player is ${currentPlayer.name} and their style is ${currentPlayer.styleSelector}`);
        displayControls.messageArea.textContent=playerOne.turnMessage;
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        displayControls.gameBoardContainer.classList.add('gameboardcontainer-active');
        displayControls.gameBoardContainer.addEventListener('click', makeAMove);
        return{
            playerOne,
            playerTwo
        }
    }
    // End startTwoPlayerGame

    // FUNCTION to reset game
    const resetGame = function(){
        currentPlayer = playerOne;
        displayControls.messageArea.textContent=currentPlayer.turnMessage;
        gameBoard.resetCellClass();
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        displayControls.gameBoardContainer.classList.add('gameboardcontainer-active');
        displayControls.gameBoardContainer.addEventListener('click', makeAMove);
    }

    // FUNCTION to switch players
    const switchPlayers = function(){
        if (currentPlayer === playerOne) {
            console.log(`Current player is 1 and switching from ${currentPlayer.name}`);
            currentPlayer = playerTwo;
                console.log(`to ${currentPlayer.name}`);
                displayControls.messageArea.textContent = currentPlayer.turnMessage;
                
            } else if (currentPlayer === playerTwo) {
                console.log(`Current player is 2 and switching from ${currentPlayer.name}`);
                currentPlayer = playerOne;
                console.log(`to ${currentPlayer.name}`);
                displayControls.messageArea.textContent = currentPlayer.turnMessage;
            }
            return;
        }

     // FUNCTION to make a move
     const makeAMove = function(event){

        let target = event.target;
        
        //if cell is empty and has classname cell
        if (target.innerText == '' && target.classList.contains('cell') && displayControls.gameBoardContainer.classList.contains('gameboardcontainer-active')) {
            console.log(`target class list is ${target.classList} and we can make an ${currentPlayer.playerText}`);
            //styling
            target.classList.add(currentPlayer.styleSelector);
            //get corresponding index number for gameBoardArray by finding cell ID name number minus one
            indexNum = Number(target.id.slice(-1))-1;
            //put current player text into the corresponding index in the array
            gameBoard.gameBoardArray[indexNum] = currentPlayer.playerText;
                console.log(gameBoard.gameBoardArray[indexNum]);
            //put current player text into game board grid cell
            target.textContent = currentPlayer.playerText;
                // console.log(`Player One text is ${playerOne.playerText} and Player Two text is ${playerTwo.playerText} and current player text is ${currentPlayer.playerText}`);
            //check to see if there's a winner
           gameBoard.checkForWinners();
        }else {
            console.log(`target class list is ${target.classList} and i cannot make a move`);
        }
    }
    //end make a move function

    displayControls.startButton1.addEventListener('click', startOnePlayerGame);
    displayControls.startButton2.addEventListener('click', startTwoPlayerGame);
    displayControls.resetButton.addEventListener('click', resetGame);

    return {
        playerOne,
        playerTwo,
        currentPlayer,
        switchPlayers,
        difficultyLevel,
    }
})();

//END GAME FLOW OBJECT MODULE