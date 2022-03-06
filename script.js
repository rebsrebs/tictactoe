

//DOM VARIABLES

const newGameBtnDiv = document.getElementById('newgamebtndiv');
const playerChoiceArea = document.querySelector('#playerchoicearea');

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


// when you click start button 1
startButton1.addEventListener('click', function(){
    hideElement(onePlayerFormContainer);

      //create player1 using form data
    //create bot or game using difficulty level
    //display gameboard

});


  


// when you click start button 2
    //hideElement(twoPlayerFormContainer);
    // playerOne.name = document.getElementById('player1name').value;
    // playerTwo.name = document.getElementById('player2name').value;
    //display gameboard



    



//GAMEBOARD OBJECT

const gameBoard = function() {

    //Filling in default X's and O's for now.
    var gameBoardArray = ['X','O','X','O','X','O','X','O','X'];
    
    //Counting variable for naming the cell ID's
    let a=1;

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


//function to check for winners
const checkForWinners = function() {

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

    //utility function - check if all items in an array are equal
    const allEqual = arr => arr.every(value => value === arr[0]);

    // utlity function - check if all items in array are full
    const allFull = arr => arr.every(value => value === 'X' || value === 'O');

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
            continue;
        }
    });
}
    
    



//Function to let player fill in grid
//when you click on gameBoardContainer
    gameBoardContainer.onclick = function(event) {

        //figure out which cell was clicked
        let target = event.target;

        //if cell is empty and has classname cell
        if (target.innerText='' && event.target.className === 'cell') {

            //put current playerText into the array index 
            //location of that cell
            gameBoardArray[event]='x';
            target.innerText = 'x' ;
            //or should I just run
            //gameBoard() 

        } else {
            return;
        }
    }







//GAME FLOW OBJECT

//when 




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





//FACTORY FUNCTION TO CREATE PLAYERS

    // function playerFactory(name) {

    //     const score = 0;

    //     const winnerMessage = () => `${name} is the winner!`;
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

