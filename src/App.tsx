import React, { useEffect, useState } from "react";
import "./App.css";
import {
	Button,
	Grid,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	ThemeProvider,
	Typography
} from "@mui/material";
import theme from "./themes/theme";
import AlphabetRow from "./components/alphabet-row";
import CipherPairField from "./components/cipherPairField";

function App() {

	// ToDo: add custom ciphers (WIP)
	// ToDo: add graph for cipher-distribution
	// ToDo: adjust alphabet table
	// ToDo: make cipher alphabet adjustable

	const defaultCipher = "10S5C60 26X5S7F T16V18U50 29C518 N9M12S15050 C5S7F";
	const [cipher, setCipher] = useState<string>(defaultCipher);
	const [deciphered, setDeciphered] = useState<string>("");

	const defaultAlphabet: [string, number, string][] = [];
	const [alphabet, setAlphabet] = useState<[string, number, string][]>(defaultAlphabet);

	const [splitCipher, setSplitCipher] = useState<string[]>(cipher.split(" "));

	const [showHorizontalAlphabet, setShowHorizontalAlphabet] = useState<boolean>(true);
	const [showVerticalAlphabet, setShowVerticalAlphabet] = useState<boolean>(false);
	
	const generateNewAlphabet = (newCipher: string): void => {
		
		const newCipherArray = Array.from(newCipher);
		const uniqueLetters: string[] = [];
		const newAlphabet: [string, number, string][] = [];
		
		for(const c of newCipherArray) {
			if(!uniqueLetters.includes(c) && c !== " "){
				uniqueLetters.push(c);
			}
		}
		
		
		for(const uniqueLetter of uniqueLetters) {
			let count = 0;
			for(const cipherLetter of newCipherArray) {
				if(uniqueLetter === cipherLetter) {
					count++;
				}
			}
			newAlphabet.push([uniqueLetter, count, "_"]);
		}


		newAlphabet.sort((a, b) => b[1] - (a[1]));
		setSplitCipher(cipher.split(" "));
		setAlphabet(newAlphabet);
	};

	const getCipherTextFields = (cipher: string) => {
		const textFields = [];
		const textAsArray = Array.from(cipher);

		for(const letter of textAsArray) {

			const decipheredIndex = alphabet.findIndex((a) => a[0] === letter);

			if(decipheredIndex < 0 || decipheredIndex > alphabet.length) {
				continue;
			}

			textFields.push(
				<Stack direction='column'>
					<Typography variant='h4'>
						{letter}
					</Typography>
					<TextField
						value={alphabet[decipheredIndex][2]}
						sx={{
							input: {
								textAlign: "center",
								fontSize: "1.75rem",
								fontWeight: "bold"
							},
							width: "3rem",
						}}
						onFocus={(e) => e.target.select()}
						onChange={(e) => handleCipherInput(e.target.value, decipheredIndex)}
					/>
				</Stack>
			);
		}
		return (
			textFields
		);
	};

	const getSplitLines = () => {
		const lines = [];
		for(const s of splitCipher) {
			lines.push(
				<Stack
					direction='row'
					p='1rem 1.25rem'
					sx={{
						display: "flex",
						alignItems: "center"
					}}
				>
					{ getCipherTextFields(s) }
				</Stack>
			);
		}
		return (
			<Stack
				display='flex'
				direction='row'
				flexWrap='wrap'
			>
				{ lines }
			</Stack>
		);
	};

	const handleCipherInput = (s: string, i: number) => {
		let letter = s;
		const tmp = [...alphabet];
		if(letter === " ") {
			letter = "_";
		}
		tmp[i][2] = letter.toUpperCase();
		setAlphabet(tmp);
	};

	// replace deciphered by new alphabet
	useEffect(() => {
		let newMessage = "";
		for (const c of cipher) {
			for (const a of alphabet) {
				if (c === a[0]) {
					newMessage += a[2];
					break;
				}
				else if (c === " ") {
					newMessage += " ";
					break;
				}
			}
		}
		setDeciphered(newMessage);
	}, [alphabet]);

	const getDecodedFields = () => {
		return alphabet.map((c, index) => (
			<TableCell key={`hDecoded-${index}`} align='center' sx={{color: "white"}} >
				<TextField
					value={c[2]}
					sx={{
						input: {
							textAlign: "center",
							fontSize: "1.75rem",
							fontWeight: "bold",
						}
					}}
					onFocus={(e) => e.target.select()}
					onChange={(e) => handleCipherInput(e.target.value, index)}
				/>
			</TableCell>
		));
	};

	const resetAlphabet = () => {
		const tmpAlphabet = [...alphabet];
		for(const a of tmpAlphabet) {
			a[2] = "_";
		}
		setAlphabet(tmpAlphabet)
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid
				container
				direction='row'
				textAlign='center'
				spacing={8}
				height='fit-content'
				sx={{ p: "2rem" }}
			>
				<Grid item xs={12}>
					<Typography variant='h2'>
						Leni Decoder Tool
					</Typography>
				</Grid>
				<CipherPairField
					title={"CIPHER"}
					content={cipher}
					setContent={setCipher}
				/>
				<CipherPairField
					title={"DECIPHERED"}
					content={deciphered}
					setContent={setDeciphered}
				/>
				<Grid item xs={12} sm={6}>
					<Button
						variant='outlined'
						color='info'
						sx={{ fontSize: "1.75rem", m: "1.5rem" }}
						onClick={() => generateNewAlphabet(cipher)}
					>
						Generate Decipher
					</Button>
				</Grid>
				<Grid item xs={12}>
					{
						getSplitLines()
					}
				</Grid>
				<Grid item xs={12}>
					<Button
						variant='outlined'
						color='info'
						sx={{ fontSize: "1.75rem", m: "1.5rem" }}
						onClick={() => setShowHorizontalAlphabet(!showHorizontalAlphabet)}
					>
						Toggle H-Alphabet
					</Button>
					<Button
						variant='outlined'
						color='info'
						sx={{ fontSize: "1.75rem", m: "1.5rem" }}
						onClick={() => setShowVerticalAlphabet(!showVerticalAlphabet)}
					>
						Toggle V-Alphabet
					</Button>
					<Button
						variant='outlined'
						color='error'
						sx={{ fontSize: "1.75rem", m: "1.5rem" }}
						onClick={() => {
							resetAlphabet();
						}}
					>
						Reset Alphabet
					</Button>
				</Grid>
				{
					showHorizontalAlphabet
					&& (
						<Grid
							item
							direction='column'
							xs={12}
							overflow='auto'
						>
							<Typography variant='h4' sx={{textDecoration: "underline"}} pb='2rem'>
								ALPHABET
							</Typography>
							<Table sx={{border: "1px solid white"}}>
								<TableHead>
									<TableRow>
										<TableCell align='center' sx={{height:"2rem", border: "1px solid white"}}>
											Occurrence
										</TableCell>
										{alphabet.map((c, index) => (
											<TableCell
												key={`hOccurence-${index}`}
												align='center'
											>
												{`(${c[1]})`}
											</TableCell>
										))}
									</TableRow>
									<TableRow>
										<TableCell align='center' sx={{height:"2rem", border: "1px solid white"}}>
											Coded
										</TableCell>
										{alphabet.map((c, index) => (
											<TableCell
												key={`hCoded-${index}`}
												align='center'
											>
												{c[0]}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell align='center' sx={{height:"2rem", border: "1px solid white"}}>
											Decoded
										</TableCell>
										{
											getDecodedFields()
										}
									</TableRow>
								</TableBody>
							</Table>
						</Grid>
					)
				}
				{
					showVerticalAlphabet
					&& (
						<Grid
							item
							textAlign='center'
							direction='column'
							xs={12} sm={3}
						>
							<Typography variant='h4' sx={{textDecoration: "underline"}} pb='2rem'>
								ALPHABET
							</Typography>
							<Table sx={{border: "1px solid white"}}>
								<TableHead>
									<TableRow>
										<TableCell align='center' sx={{border: "1px solid white", width: "2rem"}}>
											Occ
										</TableCell>
										<TableCell align='center' sx={{border: "1px solid white"}}>
											Coded
										</TableCell>
										<TableCell align='center' sx={{border: "1px solid white"}}>
											Decoded
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										alphabet.map((a, index) => (
											<AlphabetRow
												alphabet={alphabet}
												setAlphabet={setAlphabet}
												index={index}
												key={`${a[0]}-${index}`}
											/>
										))
									}
								</TableBody>
							</Table>
						</Grid>
					)
				}
			</Grid>
		</ThemeProvider>
	);
}

export default App;
export type AlphabetTuple = [string, number, string];
