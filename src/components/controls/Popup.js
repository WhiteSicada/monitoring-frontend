import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	makeStyles,
	Typography,
} from "@material-ui/core";
import ActionButton from "./ActionButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		padding: theme.spacing(2),
		position: "absolute",
		top: theme.spacing(5),
	},
	dialogTitle: {
		paddingRight: "0px",
	},
}));

export default function Popup(props) {
	const { title, children, openPopup, setOpenPopup, maxWidth } = props;
	const classes = useStyles();

	return (
		<Dialog
			open={openPopup}
			onClose={() => {
				setOpenPopup(false);
			}}
			maxWidth={maxWidth ? maxWidth : "md"}
			fullWidth
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle className={classes.dialogTitle}>
				<div style={{ display: "flex" }}>
					<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
						{title}
					</Typography>
					<ActionButton
						text="Close"
						color="secondary"
						onClick={() => {
							setOpenPopup(false);
						}}
					>
						<CloseIcon />
					</ActionButton>
				</div>
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
}
