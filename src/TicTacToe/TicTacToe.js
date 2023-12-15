import React, { useState } from 'react';
import './TicTacToe.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const TicTacToe = () => {
	const [turn, setTurn] = useState('x');  /* le premier utiliser x pour demarrer le jeux */
	const [cells, setCells] = useState(Array(9).fill('')); /*crée un tableau (Array) de longueur 9, où chaque élément du tableau est rempli avec une chaîne vide (''). */
	const [winner, setWinner] = useState();

	const checkForWinner = (squares /*carré */) => { /* le gagnant il ya 3 facon pour gagner */
		let combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
			],
		
		};

		for (let combo in combos) {
			combos[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === '' ||  /* or  */
					squares[pattern[1]] === '' ||
					squares[pattern[2]] === ''
				) {
					// do nothing
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
				}
			});
		}
	};

	const handleClick = (num) => {
		if (cells[num] !== '') {  /* ila kant les cellule le numero makhawich  */
			alert('Already Clicked'); /* donc hna kandiro que deja clickete donc deja kayn un num */
			return;
		}

		let squares = [...cells];

		if (turn === 'x') {
			squares[num] = 'x'; /* ila ktbna flwl x lokhra khas ikon fiha o,  */
			setTurn('o');
		} else {
			squares[num] = 'o'; /* le meme  */
			setTurn('x');
		}

		checkForWinner(squares);
		setCells(squares);
	};

	const handleRestart = () => {
		setWinner(null);
		setCells(Array(9).fill(''));
	};

	const Cell = ({ num }) => {
		return <td style={{ textAlign: 'center' }} onClick={() => handleClick(num)}>{cells[num]}</td>; /* hadi bash f dik td ibqa iban lina num ya x ya o */
	};

	return (
		<section className='header'>
		<div className='container'>
			<table >
				<br></br>
				<h3>Turn: {turn}</h3>
				
				<br></br>
					<tr>
						<Cell num={0} />
						<Cell num={1}  />
						<Cell num={2}  />
					</tr>
					<tr>
						<Cell num={3} />
						<Cell num={4} />
						<Cell num={5} />
					</tr>
					<tr>
						<Cell num={6} />
						<Cell num={7} />
						<Cell num={8} />
					</tr>
				
			</table>
			{winner && (     /*si il ya un gagnant  */
				<>
					<p>{winner} is the winner!</p>
					<Button variant="outline-primary" onClick={handleRestart}>Play Again</Button>
				</>
			)}
		</div>
		</section>
	);
};

export default TicTacToe;