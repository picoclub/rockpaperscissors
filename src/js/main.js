require('../css/main.scss');

import {defaultGame, uiChoices} from './config';
import {updateScore, playAGame, reset, score} from './games';
import getComputerChoice from './computer';

var game = defaultGame;
var computerGameUI,
		humanGameUI,
		scoreUI,
		matchUI,
		resultUI;
window.addEventListener('load', function(){

	computerGameUI = document.querySelector('#computer-game');
	humanGameUI = document.querySelector('#human-game');
	scoreUI = document.querySelector('#score');
	matchUI = document.querySelector('#match');
	resultUI = document.querySelector('#result');

	//init the games
	let gameType = document.querySelector('#gameType');
	gameType.value = defaultGame;
	gameType.addEventListener('change', function(){
		game = this.options[this.selectedIndex].value;
		reset();
		setGame(game);
	});

	let resetButton = document.querySelector('#reset button');
	resetButton.addEventListener('click', function(){
		reset();
	});

	updateScoreView();
	initCvC();
	initHvC();
	setGame(game);
});

//initialise the Human vs Computer game
export function initHvC(){
	let humanChoiceEntries = document.querySelectorAll('.humanChoiceEntries');
	humanChoiceEntries.forEach(function(humanChoiceEntry){
		humanChoiceEntry.addEventListener('click', function(event){
			let computerChoice = getComputerChoice(),
					humanChoice = parseInt(event.currentTarget.value);

			humanChoiceEntries.forEach(function(humanChoice){
				humanChoice.className = 'humanChoiceEntries is-hidden';
			});
			event.currentTarget.className += ' selected';

			updateScore(playAGame(humanChoice, computerChoice));
		});
	});
}

//initialise the Computer vs Computer game
export function initCvC(){
	let playButton = document.querySelector('#computer-game button');
	playButton.addEventListener('click', function(){
		let computerOneChoice = getComputerChoice(),
				computerTwoChoice = getComputerChoice();
		updateScore(playAGame(computerOneChoice, computerTwoChoice));
	});
}

//Update the view when the score updates
window.addEventListener('message', function(event){
	if (event.origin !== window.location.origin){
    return;
	}

	switch(event.data.type){
		case 'score:update':
			updateScoreView(event.data.winner);
			break;
		case 'score:reset':
			updateScoreView();
			clearMatchView();
			break;
		case 'play:game':
			updateMatchView(event.data.player1, event.data.player2);
			break;
		default: 
			break;
	}
}, false);

function updateScoreView(winner){
	let result = '';
	if(typeof winner !== 'undefined'){
		switch(winner){
			case -1: 
				result = 'It\'s a tie 👔';
				break;
			case 0:
				if(game === 'HvC'){
					result = 'You won';
				}else{
					result = 'Player 1 won';
				}
				break;
			case 1:
				if(game === 'HvC'){
					result = 'You lost';
				}else{
					result = 'Player 2 won';
				}
				break;
			default:
				break;
		}
	}
	resultUI.textContent = result;
	scoreUI.textContent = 'Current score is ' + score[0] + ' - ' + score[1];
}
function clearMatchView(){
	matchUI.textContent = '';
}
function updateMatchView(player1, player2){
	matchUI.textContent = uiChoices[player1] + ' VS ' + uiChoices[player2];
}

function setGame(game){
	switch(game){
		case 'HvC':
			computerGameUI.className = 'game is-hidden';
			humanGameUI.className = 'game';
			break;
		case 'CvC':
			computerGameUI.className = 'game';
			humanGameUI.className = 'game is-hidden';
			break;
		default:
			break;
	}
}



