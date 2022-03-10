

//DOM VARIABLES


const playerChoiceArea = document.querySelector('#playerchoicearea');
const playerList = document.getElementById('playerlist');
const playerOneDisplay = document.getElementById('player1display');
const playerTwoDisplay = document.getElementById('player2display');
const messageArea = document.getElementById('messagearea');



//buttons to choose one player or two player game 
const onePlayerButton = document.getElementById('oneplayerbutton');
const twoPlayerButton = document.getElementById('twoplayerbutton');

//forms and form containersfor one player name and difficulty level, and two player names
const onePlayerFormContainer = document.getElementById('oneplayerformcontainer');
const onePlayerForm = document.getElementById("oneplayerform");
const twoPlayerFormContainer = document.getElementById('twoplayerformcontainer');
const twoPlayerForm = document.getElementById("twoplayerform");

//buttons to start one and two player games
const startButton1 = document.getElementById('startbutton1');
const startButton2 = document.getElementById('startbutton2');

//reset button
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

//when you load page, create game board but grayed out
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




// //DISPLAY CONTROLS OBJECT
// const displayControls = (() => {
// });




















//FACTORY FUNCTION TO CREATE PLAYERS
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
























// GAMEBOARD OBJECT
const gameBoard = (() => {
    
//new game button opens div to select further options before starting game
const newGameBtnDiv = document.getElementById('newgamebtndiv');
const newGameButton = document.getElementById('newgamebutton');

    //when you click new game button
newGameButton.addEventListener('click', function(){
    console.log('New Game Button was pushed');
    messageArea.textContent='';
    displayElement(playerChoiceArea, 'flex');
    hideElement(newGameBtnDiv);
    hideElement(playerList);
    gameBoard.resetCellClass();
    gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
    gameBoard.fillCells(gameBoard.gameBoardArray);
});
    //result for checkForWinner fuction
    var resultsValue = '';
    //create array with default text
    var gameBoardArray = ['T','I','C','T','A','C','T','O','E'];
    // Function to create cells in gameBoard grid
    const createCells = function() {
        //Counting variable for naming the cell ID's
        // let a=1;
        for (let step = 1; step <= 9; step++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id=`cell-${step}`;
            gameBoardContainer.appendChild(cell);
            // console.log(cell.id);
          }
    }
    //Function to remove player classes from cells after game
    const resetCellClass = function() {
        for (let hey = 1; hey <= 9; hey++){
            var theCell = document.getElementById(`cell-${hey}`);
            // console.log(`${theCell} class list was ${theCell.classList} `);
            theCell.classList.remove('X-style');
            theCell.classList.remove('O-style');
            // console.log(`Now ${theCell} class list is ${theCell.classList} `);
            // console.log(`we have removed player styles from cell-${hey}`)
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
            // console.log(`a is ${b} and i is ${i}`)
            // console.log(currentCell.id);
            currentCell.textContent=i;
            b=b+1;
        });
    }

// FUNCTION to check for winners or tie
const checkForWinners = function(array) {

    //check if array contains all X's
    const allXs = arr => arr.every(value => value === arr[0] && arr[0] ==='X');

    //check if array contains all O's
    const allOs = arr => arr.every(value => value === arr[0] && arr[0] ==='O');

    // utlity function - check if all items in array are full
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

   //should I then make an array of these arrays?
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
   console.log('Below is the rowsToCheckArray');
   console.log(rowsToCheckArray);

//if one of the arrays to check has all X's
    if (rowsToCheckArray.some(allXs) == true){
        const playerOneName = document.getElementById('player1name2').value;
        hideElement(playerList);
        //show the New Game Button
        displayElement(newGameBtnDiv,'block');
        resultsValue = `${playerOneName} wins!`
        messageArea.textContent = resultsValue;
        gameBoardContainer.classList.remove('gameboardcontainer-active');
        gameBoard.resetCellClass();
    } else if (rowsToCheckArray.some(allOs) == true){
        hideElement(playerList);
        const playerTwoName = document.getElementById('player2name').value;
        resultsValue = `${playerTwoName} wins!`
        messageArea.textContent = resultsValue;
        gameBoardContainer.classList.remove('gameboardcontainer-active');
        displayElement(newGameBtnDiv,'block');
        gameBoard.resetCellClass();
    } else if (allFull(gameBoardArray) == true){
        hideElement(playerList);
        console.log('tie');
        resultsValue='It\'s a tie!';
        messageArea.textContent = resultsValue;
        //stop background highlighting on gameBoard
        gameBoardContainer.classList.remove('gameboardcontainer-active');
        displayElement(newGameBtnDiv,'block');
        gameBoard.resetCellClass();
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























// GAME FLOW OBJECT
const gameFlow = (() => {

let playerOne = '';
let playerTwo = '';
let currentPlayer = '';

    //FUNCTION to start two player game
    const startTwoPlayerGame = function(){
        console.log('start 2 player game button was pushed');
        //hide the form you just filled out
        twoPlayerButton.classList.remove('clicked');
        hideElement(twoPlayerFormContainer);
        hideElement(playerChoiceArea);
        //get name of playerOne from the form input
        const playerOneName = document.getElementById('player1name2').value;
        //get name of playerTwo from the form input
        const playerTwoName = document.getElementById('player2name').value;
        twoPlayerForm.reset();
        //display player names
        playerOneDisplay.textContent=`${playerOneName}`;
        playerTwoDisplay.textContent=`${playerTwoName}`;
        displayElement(playerList,'flex');
        //create playerOne using factory function and assign to X
        playerOne = playerFactory(playerOneName,'X');
        console.log(`Player One is named ${playerOne.name} and text is ${playerOne.playerText}`);
        //create playerTwo using factory function and assign to O
        playerTwo = playerFactory(playerTwoName,'O');
        console.log(`Player Two is named ${playerTwo.name} and text is ${playerTwo.playerText}`);
        //set first turn at player one's turn
        currentPlayer = playerOne;
        console.log(`current player is ${currentPlayer.name} and their style is ${currentPlayer.styleSelector}`);
        messageArea.textContent=playerOne.turnMessage;
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        gameBoardContainer.classList.add('gameboardcontainer-active');
        gameBoardContainer.addEventListener('click', makeAMove);
        return{
            playerOne,
            playerTwo
        }
    }

    // FUNCTION to reset game
    const resetGame = function(){
        currentPlayer = playerOne;
        messageArea.textContent=currentPlayer.turnMessage;
        gameBoard.resetCellClass();
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        gameBoardContainer.classList.add('gameboardcontainer-active');
        gameBoardContainer.addEventListener('click', makeAMove);
    }

    // FUNCTION to switch players
    const switchPlayers = function(){
        if (currentPlayer === playerOne) {
            console.log(`Current player is 1 and switching from ${currentPlayer.name}`);
            currentPlayer = playerTwo;
                console.log(`to ${currentPlayer.name}`);
                messageArea.textContent = currentPlayer.turnMessage;
                
            } else if (currentPlayer === playerTwo) {
                console.log(`Current player is 2 and switching from ${currentPlayer.name}`);
                currentPlayer = playerOne;
                console.log(`to ${currentPlayer.name}`);
                messageArea.textContent = currentPlayer.turnMessage;
            }
            return;
        }

     // FUNCTION to make a move
     const makeAMove = function(event){

        let target = event.target;
        //styling
        target.classList.add(currentPlayer.styleSelector);
        //if cell is empty and has classname cell
        if (target.innerText == '' && target.classList.contains('cell') && gameBoardContainer.classList.contains('gameboardcontainer-active')) {
            console.log(`target class list is ${target.classList} and we can make an ${currentPlayer.playerText}`);
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

    startButton2.addEventListener('click', startTwoPlayerGame);
    resetButton.addEventListener('click', resetGame);

    return {
        playerOne,
        playerTwo,
        currentPlayer,
        switchPlayers,
    }
})();

   


