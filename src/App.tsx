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
import {grey} from '@mui/material/colors'

const mainWhite = '#FFFFFF'

const theme = createTheme({
	palette: {
		primary: {
			main: mainWhite
		},
		secondary: {
			main: grey[500]
		}
	},
	typography: {
		fontFamily: 'monospace',
		allVariants: {
			color: mainWhite,
			letterSpacing: 4
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					border: `1px solid ${mainWhite}`,
					borderRadius: '4px',
					input: {
						color: mainWhite
					}
				}
			}
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					input: {
						color: mainWhite,
						fontSize: '1.75rem',

					},
					color: mainWhite,
					fontWeight: 'bold',
					fontSize: '1.75rem',
					textAlign: 'center'
				}
			}
		}
	}
})

function App() {

	// ToDo:
	// add custom ciphers
	// add graph for cipher-distribution
	// adjust alphabet table


	// Encoded Message
	const [cipher, setCipher] = useState<string>('PR ERG HRXS SIG HBLHF MRIG LXS ERG HRXS SIG JUUVHBI HBLHF SIH YIHFQBIX FVNRH')

	// defaultAlphabet with pattern:
	// Cipher | #CipherOccurenceInMessage | Decoded Cipher
	let defaultAlphabet: [string, number, string][] = [
		['H', 0, '_'],
		['I', 0, '_'],
		['R', 0, '_'],
		['S', 0, '_'],
		['G', 0, '_'],
		['X', 0, '_'],
		['B', 0, '_'],
		['F', 0, '_'],
		['L', 0, '_'],
		['U', 0, '_'],
		['V', 0, '_'],
		['E', 0, '_'],
		['P', 0, '_'],
		['Y', 0, '_'],
		['M', 0, '_'],
		['J', 0, '_'],
		['Q', 0, '_'],
		['N', 0, '_'],
	]

	// count occurrences of cipher in message
	for (let i = 0; i < defaultAlphabet.length; i++) {
		for (let k = 0; k < cipher.length; k++) {
			if (defaultAlphabet[i][0] === cipher[k]) {
				defaultAlphabet[i][1]++
			}
		}
	}
	defaultAlphabet = defaultAlphabet.sort((a, b) => b[1] - (a[1]))

	//other states
	const [deciphered, setDeciphered] = useState<string>('')
	const [alphabet, setAlphabet] = useState<[string, number, string][]>(defaultAlphabet)

	// splitting Message States
	const [splitCipher, setSplitCipher] = useState<string[]>(cipher.split(' '))
	const [showAlphabet, setShowAlphabet] = useState<boolean>(true)

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
				{lines}
			</Stack>)
	}
	const getCipherWithInteractiveTextFields = (s: string) => {
		const textFields = []
		for(let i = 0; i < s.length; i++) {
			const decipheredIndex = alphabet.findIndex((a) => a[0] === s[i])
			textFields.push(
				<Stack direction='column'>
					<Typography variant='h4'>
						{s[i]}
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
		const tmp = [...alphabet]
		tmp[i][2] = s.toUpperCase()
		setAlphabet(tmp)
	}

	useEffect(() => {
		let newMessage = ''
		for (let i = 0; i < cipher.length; i++) {
			for (let k = 0; k < alphabet.length; k++) {
				if (cipher[i] === alphabet[k][0]) {
					newMessage += alphabet[k][2]
					break
				} else if (cipher[i] === ' ') {
					newMessage += ' '
					break
				}
			}
		}
		setDeciphered(newMessage)
	}, [alphabet])

	const getDecodedFields = () => {
		return alphabet.map((c, index) => (
			<TableCell key={`decode-${index}`} align='center' >
				<TextField
					value={c[2]}
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
		))
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
					<Typography variant='h4' textAlign='left'>
						{cipher}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h4' sx={{textDecoration: 'underline'}} pb='2rem'>
						DECODING
					</Typography>
					<Typography variant='h4' textAlign='left'>
						{deciphered}
					</Typography>
				</Grid>
				{
					getSplitLines()
				}
				<Grid item xs={12}>
					<Button
						variant='outlined'
						color='info'
						sx={{ fontSize: '1.75rem', m: '1.5rem' }}
						onClick={() => setShowAlphabet(!showAlphabet)}
					>
						{ showAlphabet ? 'Hide Alphabet' : 'Show Alphabet' }
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
				{ showAlphabet
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
											Occurance
										</TableCell>
										{defaultAlphabet.map((c, index) => (
											<TableCell
												key={`cAlphabetOccurance-${index}`}
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
												key={`cAlphabet-${index}`}
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
			</Grid>
		</ThemeProvider>
	)
}

export default App
