

const newGameButton = document.getElementById('newgamebutton');
const playerChoiceArea = document.querySelector('#playerChoiceArea');

const onePlayerButton = document.getElementById('#oneplayerbutton');
const onePlayerFormContainer = document.getElementById('#oneplayerformcontainer');

const twoPlayerButton = document.getElementById('#twoplayerbutton');
const twoPlayerFormContainer = document.getElementById('#twoplayerformcontainer');

//and have form for player names

// Function to display one element
function displayElement(ID){
    document.getElementById(ID).style.display ='block';
}

// Function to hide element one element
function hideElement(ID){
    document.getElementById(ID).style.display ='none';
}

// Function to remove all children elements
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


//EVENT LISTENERS
// window.onload=function(){

// when you click one player button
onePlayerButton.addEventListener('click', function(){
    displayElement('onePlayerFormContainer');
});

//when you click new game
newGameButton.addEventListener('click', function(){
    displayElement('playerChoiceArea');
    // hideElement('newgamebutton');
});


// }

// when you press start, create gameboard, or create it at the beginning.


//show div with option for 1 or 2 player
    //choose 1 player or 2 player
    //if you choose 1 player
        //form for player 1 name
        //choose bot difficulty level
    //if you choose 2 player
        //form for player 1 name
        //and player 2 name
            //Once form is validated
            //user can press start button


//modules - one of something
    //gameboard
    //displayController

//factories
    //players

    function playerFactory(name) {

        const score = 0;

        const winnerMessage = () => `${name} is the winner!`;
        const scorePlusOne = () => score += 1;
        const getTeam = team => (team = 'x') ? 'x' : 'o';

        return {
            name, // this is shorthand for name: name
            score,
            winnerMessage,
            scorePlusOne,
        }
    }





//gameboard array lives inside gameboard object
const gameBoard = (() => {

    const cellBottomLeftText = null;
    const cellBottomCenterText = null;
    const cellBottomRightText = null;

    const cellMiddleLeftText = null;
    const cellMiddleCenterText = null;
    const cellMiddleRightText = null;

    const cellTopLeftText = null;
    const cellTopCenterText = null;
    const cellTopRightText = null;

    //or

    let gameBoardArray = [
        {
            "color": "purple",
             "type": "minivan",
            "registration": new Date('2017-01-03'),
            "capacity": 7
        },
        {
            "color": "purple",
             "type": "minivan",
            "registration": new Date('2017-01-03'),
            "capacity": 7
        }
    ]
    


}
)();





// const playerChoiceArea = document.createElement("div");
// playerChoiceArea.classList.add( "playerChoiceArea");
// playerChoiceArea.textContent = 'Choose';

// const onePlayerButton = document.createElement("button");
// onePlayerButton.classList.add( "oneplayerbutton", "button");
// onePlayerButton.textContent = '1 Player';

// const twoPlayerButton = document.createElement("button");
// twoPlayerButton.classList.add( "twoplayerbutton", "button");
// twoPlayerButton.textContent = '2 Players';