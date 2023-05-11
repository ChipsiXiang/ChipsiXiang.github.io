import React, { useEffect, useState } from 'react'
import './App.css'
import {
	Button,
	createTheme,
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
} from '@mui/material'
import theme from './themes/theme'

function App() {

	// ToDo: add custom ciphers (WIP)
	// ToDo: add graph for cipher-distribution
	// ToDo: adjust alphabet table
	// ToDo: make cipher alphabet adjustable


	// Encoded Message
	// const [cipher, setCipher] = useState<string>('PR ERG HRXS SIG HBLHF MRIG LXS ERG HRXS SIG JUUVHBI HBLHF SIH YIHFQBIX FVNRH')
	const [cipher, setCipher] = useState<string>('10S5C60 26X5S7F T16V18U50 29C518 N9M12S15050 C5S7F')


	// defaultAlphabet with pattern:
	// Cipher | #CipherOccurenceInMessage | Decoded Cipher
	// let defaultAlphabet: [string, number, string][] = [
	// 	['H', 0, '_'],
	// 	['I', 0, '_'],
	// 	['R', 0, '_'],
	// 	['S', 0, '_'],
	// 	['G', 0, '_'],
	// 	['X', 0, '_'],
	// 	['B', 0, '_'],
	// 	['F', 0, '_'],
	// 	['L', 0, '_'],
	// 	['U', 0, '_'],
	// 	['V', 0, '_'],
	// 	['E', 0, '_'],
	// 	['P', 0, '_'],
	// 	['Y', 0, '_'],
	// 	['M', 0, '_'],
	// 	['J', 0, '_'],
	// 	['Q', 0, '_'],
	// 	['N', 0, '_'],
	// ]

	let defaultAlphabet: [string, number, string][] = [
		['1', 0, '_'],
		['0', 0, '_'],
		['S', 0, '_'],
		['5', 0, '_'],
		['C', 0, '_'],
		['6', 0, '_'],
		['2', 0, '_'],
		['X', 0, '_'],
		['7', 0, '_'],
		['T', 0, '_'],
		['V', 0, '_'],
		['8', 0, '_'],
		['U', 0, '_'],
		['9', 0, '_'],
		['N', 0, '_'],
		['M', 0, '_'],
		['F', 0, '_'],
	]

	// count occurrences of cipher in message
	for (const lett of defaultAlphabet) {
		for (const ciph of cipher) {
			if(lett[0] === ciph) {
				lett[1]++
			}
		}
	}
	
	const generateNewAlphabet = (newCipher: string): void => {
		
		const newCipherArray = Array.from(newCipher)
		const newAlphabet: [string, number, string][] = []
		
		for(const c of newCipherArray) {
			if(c === ' ') {
				continue
			}

			const a: [string, number, string] = [c, 0, c === ' ' ? ' ' : '_']
			if(!newAlphabet.includes(a)){
				newAlphabet.push(a)
			}
		}

		for(const a of newAlphabet) {
			for(const c of newCipherArray) {
				if(a[0] === c) {
					a[1]++
				}
			}
		}

		newAlphabet.sort((a, b) => b[1] - (a[1]))
		setAlphabet(newAlphabet)
	}

	defaultAlphabet = defaultAlphabet.sort((a, b) => b[1] - (a[1]))

	//other states
	const [deciphered, setDeciphered] = useState<string>('')
	const [alphabet, setAlphabet] = useState<[string, number, string][]>(defaultAlphabet)

	// splitting Message States
	const [splitCipher, setSplitCipher] = useState<string[]>(cipher.split(' '))
	const [showHorizontalAlphabet, setShowHorizontalAlphabet] = useState<boolean>(true)
	const [showVerticalAlphabet, setShowVerticalAlphabet] = useState<boolean>(false)

	const getSplitLines = () => {
		const lines = []
		for(const s of splitCipher) {
			lines.push(
				<Stack
					direction='row'
					p='1rem 1.25rem'
					sx={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					{
						getCipherWithInteractiveTextFields(s)
					}
				</Stack>
			)
		}
		return (
			<Stack
				display='flex'
				direction='row'
				flexWrap='wrap'
				p='4rem 3rem 0'
			>
				{ lines }
			</Stack>)
	}
	const getCipherWithInteractiveTextFields = (s: string) => {
		const textFields = []
		const textAsArray = Array.from(s)
		for(const letter of textAsArray) {
			const decipheredIndex = alphabet.findIndex((a) => a[0] === letter)
			console.log('letter:', letter)
			console.log('index: ', decipheredIndex)
			if(decipheredIndex < 0 || decipheredIndex > alphabet.length) {
				continue
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
								textAlign: 'center',
								fontSize: '1.75rem',
								fontWeight: 'bold'
							},
							width: '3rem',
						}}
						onFocus={(e) => e.target.select()}
						onChange={(e) => handleChange(e.target.value, decipheredIndex)}
					/>
				</Stack>
			)
		}
		return (
			textFields
		)
	}

	const handleChange = (s: string, i: number) => {
		if(s.length > 1) {
			return
		}
		let letter = s
		const tmp = [...alphabet]
		if(letter === '' || letter === ' ') {
			letter = '_'
		}
		tmp[i][2] = letter.toUpperCase()
		setAlphabet(tmp)
	}

	useEffect(() => {
		let newMessage = ''
		for (const c of cipher) {
			for (const a of alphabet) {
				if (c === a[0]) {
					newMessage += a[2]
					break
				}
				else if (c === ' ') {
					newMessage += ' '
					break
				}
			}
		}
		setDeciphered(newMessage)
	}, [alphabet])

	const getDecodedFields = () => {
		return alphabet.map((c, index) => (
			<TableCell key={`hDecoded-${index}`} align='center' sx={{color: 'white'}} >
				<TextField
					value={c[2]}
					sx={{
						input: {
							textAlign: 'center',
							fontSize: '1.75rem',
							fontWeight: 'bold',
						}
					}}
					onFocus={(e) => e.target.select()}
					onChange={(e) => handleChange(e.target.value, index)}
				/>
			</TableCell>
		))
	}

	const getAlphabetRow = (_a: [string, number, string], index: number) => {
		return (
			<TableRow>
				<TableCell
					key={`vOccurance-${index}`}
					align='center'
					sx={{border: '1px solid white'}}
				>
					{`(${alphabet[index][1]})`}
				</TableCell>
				<TableCell
					key={`vCoded-${index}`}
					align='center'
					sx={{border: '1px solid white'}}
				>
					{ alphabet[index][0] }
				</TableCell>
				<TableCell
					key={`vDecoded-${index}`}
					align='center'
					sx={{border: '1px solid white'}}
				>
					<TextField
						value={alphabet[index][2]}
						sx={{
							input: {
								textAlign: 'center',
								fontSize: '1.75rem',
								fontWeight: 'bold'
							}
						}}
						onFocus={(e) => e.target.select()}
						onChange={(e) => handleChange(e.target.value, index)}
					/>
				</TableCell>
			</TableRow>
		)
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid
				container
				direction='row'
				textAlign='center'
				spacing={8}
				height='fit-content'
				sx={{ p: '2.5rem' }}
			>
				<Grid item xs={12}>
					<Typography variant='h2'>
						Leni Decoder Tool
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h4' sx={{textDecoration: 'underline'}} pb='2rem'>
						CIPHER
					</Typography>
					<TextField
						value={ cipher }
						multiline
						sx={{
							width: '100%',
						}}
						onChange={(e) => setCipher(e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h4' sx={{textDecoration: 'underline'}} pb='2rem'>
						DECODING
					</Typography>
					<TextField
						value={ deciphered }
						multiline
						sx={{
							width: '100%',
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<Button
						variant='outlined'
						color='info'
						sx={{ fontSize: '1.75rem', m: '1.5rem' }}
						onClick={() => generateNewAlphabet(cipher)}
					>
						Regenerate Cipher
					</Button>
				</Grid>
				{
					getSplitLines()
				}
				<Grid item xs={12}>
					<Button
						variant='outlined'
						color='info'
						sx={{ fontSize: '1.75rem', m: '1.5rem' }}
						onClick={() => setShowHorizontalAlphabet(!showHorizontalAlphabet)}
					>
						Toggle H-Alphabet
					</Button>
					<Button
						variant='outlined'
						color='info'
						sx={{ fontSize: '1.75rem', m: '1.5rem' }}
						onClick={() => setShowVerticalAlphabet(!showVerticalAlphabet)}
					>
						Toggle V-Alphabet
					</Button>
					<Button
						variant='outlined'
						color='error'
						sx={{ fontSize: '1.75rem', m: '1.5rem' }}
						onClick={() => setAlphabet(defaultAlphabet)}
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
							<Typography variant='h4' sx={{textDecoration: 'underline'}} pb='2rem'>
								ALPHABET
							</Typography>
							<Table sx={{border: '1px solid white'}}>
								<TableHead>
									<TableRow>
										<TableCell align='center' sx={{height:'2rem', border: '1px solid white'}}>
											Occurrence
										</TableCell>
										{defaultAlphabet.map((c, index) => (
											<TableCell
												key={`hOccurence-${index}`}
												align='center'
											>
												{`(${c[1]})`}
											</TableCell>
										))}
									</TableRow>
									<TableRow>
										<TableCell align='center' sx={{height:'2rem', border: '1px solid white'}}>
											Coded
										</TableCell>
										{defaultAlphabet.map((c, index) => (
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
										<TableCell align='center' sx={{height:'2rem', border: '1px solid white'}}>
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
							<Typography variant='h4' sx={{textDecoration: 'underline'}} pb='2rem'>
								ALPHABET
							</Typography>
							<Table sx={{border: '1px solid white'}}>
								<TableHead>
									<TableRow>
										<TableCell align='center' sx={{border: '1px solid white', width: '2rem'}}>
											Occ
										</TableCell>
										<TableCell align='center' sx={{border: '1px solid white'}}>
											Coded
										</TableCell>
										<TableCell align='center' sx={{border: '1px solid white'}}>
											Decoded
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										alphabet.map((a, index) => getAlphabetRow(a, index))
									}
								</TableBody>
							</Table>
						</Grid>
					)
				}
			</Grid>
		</ThemeProvider>
	)
}

export default App
