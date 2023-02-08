import React, { ReactNode, useEffect, useState } from 'react'
import './App.css'
import {
	alpha, Button, createTheme,
	Divider, GlobalStyles,
	Grid, Stack,
	styled,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField, ThemeProvider,
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


	// Encoded Message
	const [cipher, setCipher] = useState<string>('PR ERG HRXS SIG HBLHF MRIG LXS ERG HRXS SIG JUUVHBI HBLHF SIH YIHFQBIX FVNRH')
	const [spacedCipher, setSpacedCipher] = useState<string>(cipher.split(' ').join(' | '))

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
	const [showSplitDeciphered, setShowSplitDeciphered] = useState<boolean>(true)

	const getSplitLines = () => {
		const lines = []
		for(const s of splitCipher) {
			lines.push(
				<Stack
					direction='row'
					p='1rem 0 0 2rem'
				>
					{
						getCipherTextFields(s)
					}
				</Stack>
			)
		}
		return (
			<Stack
				display='flex'
				direction='row'
				flexWrap='wrap'
				p='0 3rem'
			>
				{lines}
			</Stack>)
	}
	const getCipherTextFields = (s: string) => {
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
		let newMessageWithoutPipes = ''
		for (let i = 0; i < cipher.length; i++) {
			for (let k = 0; k < alphabet.length; k++) {
				if (cipher[i] === alphabet[k][0]) {
					newMessage += alphabet[k][2]
					newMessageWithoutPipes += alphabet[k][2]
					break
				} else if (cipher[i] === ' ') {
					newMessage += ' | '
					newMessageWithoutPipes += ' '
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
				<Grid item xs={12}>
					<Typography variant='h4' sx={{textDecoration: 'underline'}}>
						CIPHER
					</Typography>
					<Typography variant='h4' pt='2rem'>
						{cipher}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h4' sx={{textDecoration: 'underline'}}>
						DECODING
					</Typography>
					<Button
						variant='outlined'
						color='info'
						sx={{ fontSize: '1.75rem', m: '2rem' }}
						onClick={() => setShowSplitDeciphered(!showSplitDeciphered)}
					>
						Toggle Text
					</Button>
				</Grid>
				{ showSplitDeciphered
					&& (
						<Grid item xs={12} pb={'4rem'}>
							<Typography variant='h4' alignSelf='center'>
								{/*{spacedCipher}*/}
								{/*<br />*/}
								{deciphered}
							</Typography>
						</Grid>
					)
				}
				{
					getSplitLines()
				}
				<Grid
					item
					direction='column'
					xs={12}
					overflow='auto'
				>
					<Typography variant='h4' sx={{textDecoration: 'underline'}} pb='2rem'>
						ALPHABET
					</Typography>
					<Table>
						<TableHead>
							<TableRow>
								{defaultAlphabet.map((c, index) => (
									<TableCell
										key={`cAlphabet-${index}`}
										align='center'
									>
										{`${c[0]} (${c[1]})`}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								{
									getDecodedFields()
								}
							</TableRow>
						</TableBody>
					</Table>
					<Button
						variant='outlined'
						color='error'
						sx={{ fontSize: '1.75rem', m: '2rem' }}
						onClick={() => setAlphabet(defaultAlphabet)}
					>
						Reset Alphabet
					</Button>
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}

export default App
