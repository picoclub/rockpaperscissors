import {choices} from './config';

export var score = [0, 0];


export function reset(){
	score = [0,0];
	//trigger the view to refresh
	window.postMessage({
		type: 'score:reset'
	}, window.location.origin);
}

export function updateScore(winner){
	//Update the model
	if(winner >= 0){
		score[winner] += 1;
	}
	//trigger the view to refresh
	window.postMessage({
		type: 'score:update',
		winner: winner
	}, window.location.origin);
}

//Game logic
export function playAGame(player1, player2){

	//trigger the view to refresh
	window.postMessage({
		type: 'play:game',
		player1: player1,
		player2: player2
	}, window.location.origin);

	let score = (choices.length + player1 - player2) % choices.length;

	if(score === 0){
		//tie
		return -1;
	}else if(score % 2 === 0) {
		//player1 won
		return 0;
	}else{
		//player1 lost
		return 1;
	}
}