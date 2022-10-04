import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';

const btnValues = [
	['X', '+', '-', '/', '.'],
	[7, 8, 9, 'R', 'W'],
	[4, 5, 6, 0, 'C'],
	[1, 2, 3],
	['='],
];

interface CalcState {
	sign: string;
	num: number;
	comma: boolean;
	res: number | string;
}

interface RequestInterface {
	num: number;
}

function App() {
	let [calc, setCalc] = useState<CalcState>({
		sign: '',
		comma: false,
		num: 0,
		res: 0,
	});

	const numClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		const value = (e.target as Element).innerHTML;

		if (calc.num < 10000000) {
			const obj = {
				...calc,
				num:
					calc.num === 0 && value === '0'
						? 0
						: calc.num % 1 === 0
						? Number(calc.num + value)
						: +(calc.num + (calc.comma ? '.' : '') + value),
				res: !calc.sign ? 0 : calc.res,
				comma: false,
			};
			setCalc(obj);
		}
	};

	const signClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		const value = (e.target as Element).innerHTML;

		setCalc({
			...calc,
			sign: value,
			res: !calc.res && calc.num ? calc.num : calc.res,
			num: 0,
		});
	};

	const equalsClickHandler = () => {
		if (calc.num && calc.sign) {
			const math = (a: number, b: number, sign: string) =>
				sign === '+' ? a + b : sign === '-' ? a - b : sign === 'X' ? a * b : a / b;

			setCalc({
				...calc,
				res:
					calc.num === 0 && calc.sign === '/'
						? "Can't divide with 0"
						: math(+calc.res, +calc.num, calc.sign),
				sign: '',
				num: 0,
			});
		}
	};

	const resetClickHandler = () => {
		setCalc({
			...calc,
			sign: '',
			num: 0,
			res: 0,
		});
	};

	const commaClickHandler = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setCalc({
			...calc,
			comma: !calc.num.toString().includes('.'),
		});
	};

	const readClickHandler = (e: React.MouseEvent<HTMLElement>) => {
		fetch('http://localhost:3001/read', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async response => {
				const { num } = (await response.json()) as RequestInterface;
				setCalc({ ...calc, num });
			})
			.catch(err => {
				console.error(err);
			});
	};

	const writeClickHandler = (e: React.MouseEvent<HTMLElement>) => {
		fetch('http://localhost:3001/store', {
			method: 'POST',
			body: JSON.stringify({ num: calc.num } as RequestInterface),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
	};

	return (
		<Wrapper>
			<Screen value={calc.num ? calc.num : calc.res} />
			<ButtonBox>
				{btnValues.flat().map((btn, i) => {
					return (
						<Button
							key={i}
							className={btn === '=' ? 'equals' : ''}
							value={btn}
							onClick={
								btn === 'C'
									? resetClickHandler
									: btn === '='
									? equalsClickHandler
									: btn === '/' || btn === 'X' || btn === '-' || btn === '+'
									? signClickHandler
									: btn === '.'
									? commaClickHandler
									: btn === 'R'
									? readClickHandler
									: btn === 'W'
									? writeClickHandler
									: numClickHandler
							}
						/>
					);
				})}
			</ButtonBox>
		</Wrapper>
	);
}

export default App;
