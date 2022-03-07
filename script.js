

//DOM VARIABLES

const newGameBtnDiv = document.getElementById('newgamebtndiv');
const playerChoiceArea = document.querySelector('#playerchoicearea');
const whoseTurn = document.getElementById('whoseturn');

//new game button opens div to select further options before starting game
const newGameButton = document.getElementById('newgamebutton');

//buttons to choose one player or two player game 
const onePlayerButton = document.getElementById('oneplayerbutton');
const twoPlayerButton = document.getElementById('twoplayerbutton');

//forms for one player name and difficulty level, and two player names
const onePlayerFormContainer = document.getElementById('oneplayerformcontainer');
const twoPlayerFormContainer = document.getElementById('twoplayerformcontainer');

//buttons to start one and two player games
const startButton1 = document.getElementById('startbutton1');
const startButton2 = document.getElementById('startbutton2');

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
    displayElement(playerChoiceArea, 'block');
    hideElement(newGameBtnDiv);
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
        array.fill(' ');
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
const checkForWinners = function() {

    //utility function - check if all items in an array are equal
    const allEqual = arr => arr.every(value => value === arr[0]);

    // utlity function - check if all items in array are full
    const allFull = arr => arr.every(value => value === 'X' || value === 'O');
     
   //create arrays of rows to check
   const rowOneArray = gameBoardArray.slice(0,3);
   const rowTwoArray = gameBoardArray.slice(3,6);
   const rowThreeArray = gameBoardArray.slice(6);
   const columnOneArray = [gameBoardArray.at(0), gameBoardArray.at(3), gameBoardArray.at(6)];
   const columnTwoArray = [gameBoardArray.at(1), gameBoardArray.at(4), gameBoardArray.at(7)];
   const columnThreeArray = [gameBoardArray.at(2), gameBoardArray.at(5), gameBoardArray.at(8)];
   const diagonalOneArray = [gameBoardArray.at(0), gameBoardArray.at(4),gameBoardArray.at(8)];
   const diagonalTwoArray = [gameBoardArray.at(2), gameBoardArray.at(4),gameBoardArray.at(6)];

   //should I then make an array of these arrays?
   const rowsToCheckArray = [
       rowOneArray,
       rowTwoArray,
       rowThreeArray,
       columnOneArray,
       columnTwoArray,
       columnThreeArray,
       diagonalOneArray,
       diagonalTwoArray,
   ]

   //FOR EACH LOOP
   //for every stretch of gameboard where someone could win
   rowsToCheckArray.forEach((array) => {

       //if there are three x's or three o's in a row there's a winner 
       if (allEqual(array) == true) {
           console.log('There is a winner');
           //will fill in later how to check who won

       //if the gameboard is full and there are not three in a row it's a tie
       } else if (allFull(array) == true && allEqual(array) == false) {
           console.log('It\'s a tie!');

       //otherwise keep playing
       } else {
           return;
       }
   });
}

    return {
        gameBoardArray,
        createCells,
        makeArrayBlank,
        fillCells,
        checkForWinners,
    }  
})();



// GAME FLOW
const gameFlow = (() => {

let playerOne = '';
let playerTwo = '';
let currentPlayer = '';

    const startTwoPlayerGame = function(){
        //hide the form you just filled out
        hideElement(twoPlayerFormContainer);
        //get name of playerOne from the form input
        const playerOneName = document.getElementById('player1name2').value;
        console.log(playerOneName);
        //get name of playerTwo from the form input
        const playerTwoName = document.getElementById('player2name').value;
        console.log(playerTwoName);
        //create playerOne using factory function and assign to X
        playerOne = playerFactory(playerOneName,'X');
        console.log(`Player One is named ${playerOne.name} andtext is ${playerOne.playerText}`);
        //create playerTwo using factory function and assign to O
        playerTwo = playerFactory(playerTwoName,'O');
        console.log(`Player Two is named ${playerTwo.name} and text is ${playerTwo.playerText}`);
        //set first turn at player one's turn
        currentPlayer = playerOne;
        gameBoardContainer.classList.add('playeronestyling');
        //write that it's playerOne's turn
        whoseTurn.textContent=playerOne.turnMessage;
        // whoseTurn.textContent=`${playerOneName}'s turn.`;
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
        if (target.innerText=' ' && event.target.className === 'cell') {
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
            //run switch players function to change who the current player is and 
            //display whose turn it is 
            switchPlayers();
        } else {
            return;
        }
    }

    startButton2.addEventListener('click', startTwoPlayerGame);
    gameBoardContainer.addEventListener('click', makeAMove);

    return {
        playerOne,
        playerTwo,
        currentPlayer,
    }

})();

   

// //DISPLAY CONTROLS OBJECT
// const displayControls = (() => {
// });

