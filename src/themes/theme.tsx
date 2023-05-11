import {createTheme} from '@mui/material'
import {grey} from '@mui/material/colors'

export const mainWhite = '#FFFFFF'

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
					},
					textArea: {
						display: 'flex',
						textAlign: 'left',
						fontSize: '1.75rem',
						fontWeight: 'bold',
						color: 'white',
						lineHeight: '150%'
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

export default theme