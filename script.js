

const setUpArea = document.getElementById('setuparea');
const newGameButton = document.getElementById('newgamebutton');
const playerChoiceArea = document.querySelector('#playerchoicearea');

const onePlayerButton = document.getElementById('oneplayerbutton');
const onePlayerFormContainer = document.getElementById('oneplayerformcontainer');

const twoPlayerButton = document.getElementById('twoplayerbutton');
const twoPlayerFormContainer = document.getElementById('twoplayerformcontainer');

const startButton1 = document.getElementById('startbutton1');
const startButton2 = document.getElementById('startbutton2');

const gameBoardContainer = document.getElementById('gameboardcontainer');

// UTILITY FUNCTIONS

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
    hideElement(setUpArea);
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

    var gameBoardArray = ['X','O','X','O','X','O','X','O','X'];
    console.log(gameBoardArray.length); 
    let a=1;
    //for each item in gameBoardArray
    gameBoardArray.forEach((i) => {
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id=`cell-${a}`;
        cell.textContent=i;
        gameBoardContainer.appendChild(cell);
        a=a+1;
        // console.log(gameBoardArray[i]);
        
    });
}




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
    //     const getTeam = team => (team = 'x') ? 'x' : 'o';

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

