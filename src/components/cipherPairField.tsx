import {Grid, TextField, Typography} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

interface CipherPairFieldInterface {
	title: string
	content: string,
	setContent: (s: string) => void,
}

const CipherPairField: React.FC<CipherPairFieldInterface> = ({
	title,
	content,
	setContent
}) => {
	return (
		<Grid item xs={12} md={6}>
			<Typography variant='h4' sx={{textDecoration: "underline"}} pb='2rem'>
				{ title }
			</Typography>
			<TextField
				value={ content }
				multiline
				sx={{
					width: "100%",
				}}
				onChange={(e) => setContent(e.target.value)}
			/>
		</Grid>
	);
};

CipherPairField.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	setContent: PropTypes.func.isRequired,
};

export default CipherPairField;