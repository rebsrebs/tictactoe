

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

//reset button
const resetButton = document.getElementById('resetbutton');

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
    gameBoard.resetCellClass();
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
    //this does not work yet!
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
        //show the New Game Button
        displayElement(newGameButton,'block');
        resultsValue = `${playerOneName} wins!`
        whoseTurn.textContent = resultsValue;
        gameBoardContainer.classList.remove('gameboardcontainer-active');
        gameBoard.resetCellClass();
    } else if (rowsToCheckArray.some(allOs) == true){
        const playerTwoName = document.getElementById('player2name').value;
        resultsValue = `${playerTwoName} wins!`
        whoseTurn.textContent = resultsValue;
        gameBoardContainer.classList.remove('gameboardcontainer-active');
        displayElement(newGameButton,'block');
        gameBoard.resetCellClass();
    } else if (allFull(gameBoardArray) == true){
        console.log('tie');
        resultsValue='tie';
        whoseTurn.textContent = resultsValue;
        //stop background highlighting on gameBoard
        gameBoardContainer.classList.remove('gameboardcontainer-active');
        // displayElement(newGameBtnDiv,'block');
        displayElement(newGameButton,'block');
        gameBoard.resetCellClass();
    } else {
        console.log('play');
        resultsValue='play';
        gameFlow.switchPlayers();
        console.log('we have switched players!')
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
     resetCellClass,
 } 
})();



// GAME FLOW OBJECT
const gameFlow = (() => {

let playerOne = '';
let playerTwo = '';
let currentPlayer = '';

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
        onePlayerForm.reset();
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
        // gameBoardContainer.classList.add(currentPlayer.styleSelector);
        console.log(`current player is ${currentPlayer.name} and their style is ${currentPlayer.styleSelector}`);
        // gameBoardContainer.classList.add('playeronestyling');
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


    
//something still not working - colors after starting over is messed up - i think it's not just from this
//it's something in the whole game, happens on third game sometimes second
    const resetGame = function(){
        currentPlayer = playerOne;
        whoseTurn.textContent=currentPlayer.turnMessage;
        gameBoard.resetCellClass();
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        gameBoardContainer.classList.add('gameboardcontainer-active');
        gameBoardContainer.addEventListener('click', makeAMove);
    }

         //function to switch players
         const switchPlayers = function(){
            if (currentPlayer === playerOne) {
                console.log(`Current player is 1 and switching from ${currentPlayer.name}`);
                currentPlayer = playerTwo;
                console.log(`to ${currentPlayer.name}`);
                whoseTurn.textContent = currentPlayer.turnMessage;
                
            } else if (currentPlayer === playerTwo) {
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
    resetButton.addEventListener('click', resetGame);

    

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

