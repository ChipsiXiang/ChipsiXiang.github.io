import React, { ReactNode, useEffect, useState } from 'react'
import './App.css'
import {
	alpha, Button, createTheme,
	Divider, GlobalStyles,
	Grid,
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
			color: mainWhite
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					border: `1px solid ${mainWhite}`,
					borderRadius: '4px',
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
		[' ', 0, ' | ']
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
	const [splitCipher, setSplitCipher] = useState<string[]>(cipher.match(/.{1,100}/g) ?? [])
	const [splitDeciphered, setSplitDeciphered] = useState<string[]>(deciphered.match(/.{1,100}/g) ?? [])


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
				}
			}
		}
		setDeciphered(newMessage)
	}, [alphabet])

	useEffect(() => {
		setSplitDeciphered(deciphered.match(/.{1,100}/g) ?? [])
	}, [deciphered])

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
					<Typography variant='h4'>
						CIPHER
						<br />
						<br />
						{cipher}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h4'>
					DECODING
						<br />
						<br />
						{spacedCipher}
						<br />
						{deciphered}
					</Typography>
				</Grid>
				<Grid
					item
					direction='column'
					xs={12}
				>
					<Table sx={{ width: '100%' }}>
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
						sx={{ fontSize: '1.75rem', mt: '2rem' }}
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
