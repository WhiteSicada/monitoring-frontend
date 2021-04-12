import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 0,
		margin: theme.spacing(0.5),
	},
	secondary: {
		border: "1px solid #ef630b",
		"& .MuiButton-label": {
			color: theme.palette.secondary.main,
		},
	},
	primary: {
		border: "1px solid #ef630b",
		"& .MuiButton-label": {
			color: theme.palette.primary.main,
		},
	},
}));

export default function ActionButton(props) {
	const { color, children, onClick } = props;
	const classes = useStyles();

	return (
		<Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
			{children}
		</Button>
	);
}
