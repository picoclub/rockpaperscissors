import {choices} from './config';

export default function getComputerChoice() {
	let minVal = choices[0],
			maxVal = choices[choices.length - 1];
	return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}
