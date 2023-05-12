import {TableCell, TableRow, TextField} from "@mui/material";
import {AlphabetTuple} from "../App";
import PropTypes from "prop-types";
import React from "react";

interface AlphabetRowInterface {
	alphabet: AlphabetTuple[],
	setAlphabet: (tmp: AlphabetTuple[]) => void,
	index: number
}
const AlphabetRow: React.FC<AlphabetRowInterface> = ({
	alphabet,
	setAlphabet,
	index
}) => {
	const handleCipherInput = (s: string, i: number) => {
		if(s.length > 1) {
			return;
		}
		let letter = s;
		const tmp: AlphabetTuple[] = [...alphabet];
		if(letter === " ") {
			letter = "_";
		}
		tmp[i][2] = letter.toUpperCase();
		setAlphabet(tmp);
	};

	return (
		<TableRow>
			<TableCell
				key={`vOccurance-${index}`}
				align='center'
				sx={{border: "1px solid white"}}
			>
				{`(${alphabet[index][1]})`}
			</TableCell>
			<TableCell
				key={`vCoded-${index}`}
				align='center'
				sx={{border: "1px solid white"}}
			>
				{ alphabet[index][0] }
			</TableCell>
			<TableCell
				key={`vDecoded-${index}`}
				align='center'
				sx={{border: "1px solid white"}}
			>
				<TextField
					value={alphabet[index][2]}
					sx={{
						input: {
							textAlign: "center",
							fontSize: "1.75rem",
							fontWeight: "bold"
						}
					}}
					onFocus={(e) => e.target.select()}
					onChange={(e) => handleCipherInput(e.target.value, index)}
				/>
			</TableCell>
		</TableRow>
	);
};

AlphabetRow.propTypes = {
	alphabet: PropTypes.array.isRequired,
	setAlphabet: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};

export default AlphabetRow;