

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
    return {
        name,
        playerText,
        turnMessage,
        winnerMessage,
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

    //function to let a user place a letter
    const makeAMove = function(event){

        let target = event.target;
        console.log(target);
        //if cell is empty and has classname cell
        if (target.innerText=' ' && event.target.className === 'cell') {
            //put current playerText into the array index 
            indexNum = Number(target.id.slice(-1))-1;
            console.log(gameBoard.gameBoardArray[indexNum]);

            //later change to 
            //gameBoard.gameBoardArray[indexNum] = currentPlayer.playerText;
            gameBoard.gameBoardArray[indexNum] = 'X';
            console.log(gameBoard.gameBoardArray[indexNum]);

            //later change to
            //target.innerText = currentPlayer.playerText;
            target.innerText = 'X' ;
            switchPlayers();
        } else {
            return;
        }
    }

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
        const playerOne = playerFactory(playerOneName,'X');
        console.log(`Player One is named ${playerOne.name}`)
        //create playerTwo using factory function and assign to O
        const playerTwo = playerFactory(playerTwoName,'O');
        console.log(`Player Two is named ${playerTwo.name}`)
        //set first turn at player one's turn
        const currentPlayer = playerOne;
        //write that it's playerOne's turn
        whoseTurn.textContent=playerOne.turnMessage;
        // whoseTurn.textContent=`${playerOneName}'s turn.`;
        gameBoard.makeArrayBlank(gameBoard.gameBoardArray);
        gameBoard.fillCells(gameBoard.gameBoardArray);
        gameBoardContainer.classList.add('gameboardcontainer-active');
        gameBoardContainer.addEventListener('click', makeAMove);
        // switchPlayers;
        // whoseTurn.textContent=playerTwo.turnMessage;
    }

    startButton2.addEventListener('click', startTwoPlayerGame);

    gameBoardContainer.addEventListener('click', makeAMove);

     //function to switch players
     const switchPlayers = function(){
        if (currentPlayer = playerOne) {
            currentPlayer = playerTwo;
        } else if (currentPlayer = playerTwo) {
            currentPlayer = playerOne;
        }
        console.log(currentPlayer.turnMessage);
    }

    return{
        playerOne,
        playerTwo,
    }

})();

   

// //DISPLAY CONTROLS OBJECT
// const displayControls = (() => {
// });

