

//DOM VARIABLES

// const newGameBtnDiv = document.getElementById('newgamebtndiv');
const playerChoiceArea = document.querySelector('#playerchoicearea');
const playerList = document.getElementById('playerlist');
const playerOneDisplay = document.getElementById('player1display');
const playerTwoDisplay = document.getElementById('player2display');
const whoseTurn = document.getElementById('whoseturn');

//new game button opens div to select further options before starting game
const newGameButton = document.getElementById('newgamebutton');

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

// //reset button
// const resetButton = document.getElementById('resetbutton');

//gameBoard styling
const gameBoardContainer = document.getElementById('gameboardcontainer');
// const cells = document.querySelectorAll('.cell');




// UTILITY FUNCTIONS

// Function to show one element
function displayElement(element, display){
    element.style.display = display;
}

// Function to hide one element
function hideElement(element){
    element.style.display ='none';
}

// Function to remove all children elements
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}




//EVENT LISTENERS

//when you load page, create game board but grayed out
document.addEventListener('DOMContentLoaded', function(){
    gameBoard.createCells();
    gameBoard.fillCells(gameBoard.gameBoardArray);
});

//when you click new game
newGameButton.addEventListener('click', function(){
    console.log('New Game Button was pushed');
    whoseTurn.textContent='';
    displayElement(playerChoiceArea, 'block');
    // hideElement(newGameBtnDiv);
    hideElement(newGameButton);
    hideElement(playerList);
    gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
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




//FACTORY FUNCTION TO CREATE PLAYERS
const playerFactory = (name, playerText) => {
    const turnMessage = `${name}'s turn`; 
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




//GAMEBOARD OBJECT
const gameBoard = (() => {

    //result for checkForWinner fuction
    var resultsValue = '';

    //create array with default text
    var gameBoardArray = ['T','I','C','T','A','C','T','O','E'];

    // Function to create cells in gameBoard grid
    const createCells = function() {
        //Counting variable for naming the cell ID's
        let a=1;
        for (let step = 1; step <= 9; step++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id=`cell-${step}`;
            gameBoardContainer.appendChild(cell);
            // console.log(cell.id);
          }
    }

    //function to make an array blank
    const makeArrayBlank = function(array) {
        array.fill('');
        }

    //function to fill textContent of game board cells with array
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

//function to check for winners or tie
const checkForWinners = function(array) {

    //utility function - check if all items in an array are equal
    const allEqual = arr => arr.every(value => value === arr[0] && arr[0] !== '');

    const allXs = arr => arr.every(value => value === arr[0] && arr[0] ==='X');

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

//checking
    if (rowsToCheckArray.some(allXs) == true){
        const playerOneName = document.getElementById('player1name2').value;
        // displayElement(newGameBtnDiv,'block');
        displayElement(newGameButton,'block');
        console.log('did i display the button?');
        resultsValue = `${playerOneName} wins!`
        whoseTurn.textContent = resultsValue;
        gameBoardContainer.classList.remove('gameboardcontainer-active');
    } else if (rowsToCheckArray.some(allOs) == true){
        const playerTwoName = document.getElementById('player2name').value;
        resultsValue = `${playerTwoName} wins!`
        whoseTurn.textContent = resultsValue;
        //stop background highlighting on gameBoard
        gameBoardContainer.classList.remove('gameboardcontainer-active');
        // displayElement(newGameBtnDiv,'block');
        displayElement(newGameButton,'block');
    } else if (allFull(gameBoardArray) == true){
        console.log('tie');
        resultsValue='tie';
        whoseTurn.textContent = resultsValue;
        //stop background highlighting on gameBoard
        gameBoardContainer.classList.remove('gameboardcontainer-active');
        // displayElement(newGameBtnDiv,'block');
        displayElement(newGameButton,'block');
    } else {
        console.log('play');
        resultsValue='play';
        gameFlow.switchPlayers();
    }
    return resultsValue;
    }



 return {
     gameBoardArray,
     createCells,
     makeArrayBlank,
     fillCells,
     checkForWinners,
     resultsValue,
 } 
})();



// GAME FLOW OBJECT
const gameFlow = (() => {

let playerOne = '';
let playerTwo = '';
let currentPlayer = '';

    const startTwoPlayerGame = function(){
        //hide the form you just filled out
        hideElement(twoPlayerFormContainer);
        hideElement(playerChoiceArea);
        //get name of playerOne from the form input
        const playerOneName = document.getElementById('player1name2').value;
        console.log(playerOneName);
        //get name of playerTwo from the form input
        const playerTwoName = document.getElementById('player2name').value;
        onePlayerForm.reset();
        console.log(playerTwoName);
        //display player names
        playerOneDisplay.textContent=`${playerOneName}`;
        playerTwoDisplay.textContent=`${playerTwoName}`;
        displayElement(playerList,'flex');
        console.log('did i show the player list?')
        //create playerOne using factory function and assign to X
        playerOne = playerFactory(playerOneName,'X');
        console.log(`Player One is named ${playerOne.name} andtext is ${playerOne.playerText}`);
        //create playerTwo using factory function and assign to O
        playerTwo = playerFactory(playerTwoName,'O');
        console.log(`Player Two is named ${playerTwo.name} and text is ${playerTwo.playerText}`);
        //set first turn at player one's turn
        currentPlayer = playerOne;
        console.log(currentPlayer.name);
        gameBoardContainer.classList.add(currentPlayer.styleSelector);
        console.log(currentPlayer.styleSelector);
        // gameBoardContainer.classList.add('playeronestyling');
        //write that it's playerOne's turn
        whoseTurn.textContent=playerOne.turnMessage;
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        gameBoardContainer.classList.add('gameboardcontainer-active');
        gameBoardContainer.addEventListener('click', makeAMove);
        // switchPlayers;
        // whoseTurn.textContent=playerTwo.turnMessage;
        return{
            playerOne,
            playerTwo
        }
    }


    

    // const resetGame = function(){
    //     currentPlayer = playerOne;
    //     gameBoardContainer.classList.add('playeronestyling');
    //     //write that it's playerOne's turn
    //     whoseTurn.textContent=playerOne.turnMessage;
    //     // whoseTurn.textContent=`${playerOneName}'s turn.`;
    //     gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
    //     gameBoard.fillCells(gameBoard.gameBoardArray);
    //     gameBoardContainer.classList.add('gameboardcontainer-active');
    //     gameBoardContainer.addEventListener('click', makeAMove);
    //     //something is not wokring in this yet.
    // }

         //function to switch players
         const switchPlayers = function(){
            if (currentPlayer == playerOne) {
                console.log(`Current player is 1 and switching from ${currentPlayer.name}`);
                currentPlayer = playerTwo;
                console.log(`to ${currentPlayer.name}`);
                whoseTurn.textContent = currentPlayer.turnMessage;
                
            } else if (currentPlayer == playerTwo) {
                console.log(`Current player is 2 and switching from ${currentPlayer.name}`);
                currentPlayer = playerOne;
                console.log(`to ${currentPlayer.name}`);
                whoseTurn.textContent = currentPlayer.turnMessage;
                
            }
            return;
        }

     //function to let a user place a letter
     const makeAMove = function(event){

        let target = event.target;
        console.log(target);
        //if cell is empty and has classname cell
        if (target.innerText == '' && target.classList.contains('cell') && gameBoardContainer.classList.contains('gameboardcontainer-active')) {
            console.log(`target class list is ${target.classList} and we can make a mark`);
            //get corresponding index number for gameBoardArray by finding cell ID name number minus one
            indexNum = Number(target.id.slice(-1))-1;
                console.log(gameBoard.gameBoardArray[indexNum]);
            //put current player text into the corresponding index in the array
            gameBoard.gameBoardArray[indexNum] = currentPlayer.playerText;
                console.log(gameBoard.gameBoardArray[indexNum]);
            
            //styling
            target.classList.add(currentPlayer.styleSelector);

            //put current player text into game board grid cell
            target.textContent = currentPlayer.playerText;
                console.log(`Player One text is ${playerOne.playerText} and Player Two text is ${playerTwo.playerText} and current player text is ${currentPlayer.playerText}`);

            //check to see if there's a winner
           gameBoard.checkForWinners();

           //somehow things are not coming back here.
           //why didn't this version work?
           
            // if (gameBoard.resultsValue === 'winner') {
            //     whoseTurn.textContent = 'Winner!';
            // } else if (gameBoard.resultsValue === 'tie') {
            //     whoseTurn.textContent = 'Tie!';
            // } else if (gameBoard.resultsValue === 'play') {
            //     console.log('keep playing');
            //     console.log('did I switch players?');
            // }
           
        // } else if (target.innerText !== '' && event.target.className === 'cell'){
        //     console.log('cannot make a move')
        }else {
            console.log(`target class list is ${target.classList} and i cannot make a move`);
        }
    }
    //end make a move function




    startButton2.addEventListener('click', startTwoPlayerGame);
    // resetButton.addEventListener('click', resetGame);

    return {
        playerOne,
        playerTwo,
        currentPlayer,
        switchPlayers,
    }

})();

   

// //DISPLAY CONTROLS OBJECT
// const displayControls = (() => {
// });

