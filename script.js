

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
// document.addEventListener('DOMContentLoaded', function(){
//     fillGameBoard();
// });

//when you click new game
newGameButton.addEventListener('click', function(){
    displayElement(playerChoiceArea, 'block');
    hideElement(newGameBtnArea);
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
const playerFactory = (name,letter) => {
    const playerText = letter;
    const turnMessage = () => `${name}'s turn`; 
    const winnerMessage = () => `${name} is the winner!`;
    return {
        name,
        playerText,
        turnMessage,
        winnerMessage,
    }
}






  



//GAMEBOARD OBJECT

const gameBoard = (() => {

    const createCells = function() {
        for (let step = 1; step <= 9; step++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id=`cell-${step}`;
          }
    }

    // var tttArray = ['T','I','C','T','A','C','T','O','E'];
    var blankArray = [' ',' ',' ',' ',' ',' ',' ',' ',' '];




    //create array with default text
    var gameBoardArray = ['T','I','C','T','A','C','T','O','E'];
    //Counting variable for naming the cell ID's
    let a=1;

    


    const createInitial = function() {
    //for each item in gameBoardArray
    gameBoardArray.forEach((i) => {
        //create a div and give it class and ID
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id=`cell-${a}`;

        //put the current array item in each cell
        cell.textContent=i;

        //add the div as a cell to the game board grid
        gameBoardContainer.appendChild(cell);

        //increase counting variable
        a=a+1;
    });
}

    const makeArrayBlank = function(array) {
    array.fill(' ');
    }

    return {
        gameBoardArray,
        blankArray,
        createCells,
        createInitial,
        makeArrayBlank,
    }
    
})();






//function to check for winners
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

    
    // when you click start button 2
        //hideElement(twoPlayerFormContainer);
        // playerOne.name = document.getElementById('player1name').value;
        // playerTwo.name = document.getElementById('player2name').value;
        //display gameboard



    //FOR EACH LOOP
    //for every stretch of gameboard where someone could win
    rowsToCheckArray.forEach((array) => {

        //if there are three x's or three o's in a row there's a winner 
        if (allEqual(array) == true) {
            console.log('There is a winner');

        //if the gameboard is full and there are not three in a row it's a tie
        } else if (allFull(array) == true && allEqual(array) == false) {
            console.log('It\'s a tie!');

        //otherwise keep playing
        } else {
            // continue;
        }
    });
}
    
    



//Function to let player fill in grid
// //when you click on gameBoardContainer
//     gameBoardContainer.addEventListener("click",makeAMove) 

//     const makeAMove = function(event) {
//         //figure out which cell was clicked
//         let target = event.target;
//         //if cell is empty and has classname cell
//         if (target.innerText='' && event.target.className === 'cell') {
//             //put current playerText into the array index 
//             //location of that cell
//             gameBoardArray[event]='x';
//             target.innerText = 'x' ;
//             //or should I just run
//             //gameBoard() 
//         } else {
//             return;
//         }
//     }



// GAME FLOW
    //start button 2 event listener 
        //call playerFactory with names from input form for two player
//         - set player1 text to X and player2 text to 0
//         - set playerTurn to player 1
//     - map over gamebaord array and makes the all just have ' ' - 
//there should be clear gameboard function for that.

// when you click start button 1
startButton2.addEventListener('click', function(){
    hideElement(onePlayerFormContainer);
    const playerTurn = playerOneName; //??

var playerOneName =  document.getElementById('player1name').value;
var playerTwoName = document.getElementById('player2name').value;

const player1 = playerFactory(playerOneName,'X');
const player2 = playerFactory(playerTwoName,'O');

    //create bot or game using difficulty level
    //display gameboard
});




//GAME FLOW OBJECT

//when you press start game
    //playerTurn = player one
    //display it's player one's tur


//play game fuctiom    
    
    //when you click a square, get the id of that square

    //player.turnMessage();

    //if playerTurn is playerOne
    // if (playerTurn = player1){
    //     console.log(playerTurn);
    //     whoseTurn.textContent=`${player2}'\s turn.`;
   
    //     // input X to the gameboard array and 
    //     // input x to cell's textCotetn
    //     //check if there's a winner or tie
    //     //if game is still going
    //         //playerTurn = player two
    //         //display it's player two's turn
    //         //return
    //   //else if playerTurn is playerTwo
    // } else if (playerTurn = player2) {
    //     console.log(playerTurn);
    //     whoseTurn.textContent=`${player1}'\s turn.`;
   
  
        // input O to the gameboard array and 
        // input O to cell's textCotetn
        //check if there's a winner or tie
        //if game is still going
            //playerTurn = player one
            //display it's player two's turn
            //return
    // }







// const fillGameBoard = function (){

//     for (let i = 1; i <= 9; i++){
//         var cell = document.createElement('div');
//         cell.classList.add('cell');
//         cell.id=`cell-${i}`;
//         gameBoardContainer.appendChild(cell);
//     };

//     const gameBoardCells = [] 

//     for (var i=0; i<9; i++) {
//         gameBoardCells[i] = {
//             name: "square-" + i+1,
//             squareText: "P",
//             fillText: function(i){
//                 document.getElementById(`cell-${i}`).textContent = squareText;
//             }

//         };
//     }

// }







    // function playerFactory() {

    


    //     const score = 0;

    
    //     const scorePlusOne = () => score += 1;
    //     const getTeamValue = team => (team = 'x') ? 'x' : 'o';

    //     return {
    //         name, // this is shorthand for name: name
    //         score,
    //         winnerMessage,
    //         scorePlusOne,
    //     }
    // }







// NOT USING AT THE MOMENT


// when you press start, create gameboard, or create it at the beginning.



//modules - one of something
    //gameboard
    //displayController







//gameboard array lives inside gameboard object
// const gameBoard = (() => {

//     const cellBottomLeftText = null;
//     const cellBottomCenterText = null;
//     const cellBottomRightText = null;

//     const cellMiddleLeftText = null;
//     const cellMiddleCenterText = null;
//     const cellMiddleRightText = null;

//     const cellTopLeftText = null;
//     const cellTopCenterText = null;
//     const cellTopRightText = null;

//     //or

//     let gameBoardArray = [
//         {
//             "color": "purple",
//              "type": "minivan",
//             "registration": new Date('2017-01-03'),
//             "capacity": 7
//         },
//         {
//             "color": "purple",
//              "type": "minivan",
//             "registration": new Date('2017-01-03'),
//             "capacity": 7
//         }
//     ]
    


// }
// )();





// const playerChoiceArea = document.createElement("div");
// playerChoiceArea.classList.add( "playerChoiceArea");
// playerChoiceArea.textContent = 'Choose';



// const twoPlayerButton = document.createElement("button");
// twoPlayerButton.classList.add( "twoplayerbutton", "button");
// twoPlayerButton.textContent = '2 Players';



// const onePlayerButton = document.createElement("button");
// onePlayerButton.classList.add( "oneplayerbutton", "button");
// onePlayerButton.textContent = '1 Player';

