import {createTheme, Theme} from "@mui/material";
import {grey} from "@mui/material/colors";

export const mainWhite = "#FFFFFF";
const theme = createTheme ({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	palette: {
		primary: {
			main: mainWhite
		},
		secondary: {
			main: grey[500]
		}
	},
	typography: {
		fontFamily: "monospace",
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
					borderRadius: "4px",
					input: {
						color: mainWhite
					},
					textArea: {
						display: "flex",
						textAlign: "left",
						fontSize: "1.75rem",
						fontWeight: "bold",
						color: "white",
						lineHeight: "150%",
					}
				}
			}
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					input: {
						color: mainWhite,
						fontSize: "1.75rem",

					},
					color: mainWhite,
					fontWeight: "bold",
					fontSize: "1.5rem",
					textAlign: "center"
				}
			}
		}
	}
});
export default theme;