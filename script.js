

const setUpArea = document.getElementById('setuparea');
const newGameButton = document.getElementById('newgamebutton');
const playerChoiceArea = document.querySelector('#playerchoicearea');

const onePlayerButton = document.getElementById('oneplayerbutton');
const onePlayerFormContainer = document.getElementById('oneplayerformcontainer');

const twoPlayerButton = document.getElementById('twoplayerbutton');
const twoPlayerFormContainer = document.getElementById('twoplayerformcontainer');

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

//when you click new game
newGameButton.addEventListener('click', function(){
    displayElement(playerChoiceArea, 'block');
    hideElement(setUpArea);
});

// when you click one player button
onePlayerButton.addEventListener('click', function(){
    displayElement(onePlayerFormContainer,'grid');
});





















// NOT USING AT THE MOMENT


// when you press start, create gameboard, or create it at the beginning.



//modules - one of something
    //gameboard
    //displayController

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

