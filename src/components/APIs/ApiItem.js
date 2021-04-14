import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { Controls } from "../controls/controls";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiCardContent-root": {
			padding: 5,
		},
		// border: "1px solid #2c0b06",
		transition: "0.3s",
		boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
		},
	},
	circle: {
		display: "block",
		height: "60px",
		width: "60px",
		borderRadius: "50%",
		background: "#0194c7",
		margin: "10px",
		transition: "5s ease",
		position: "absolute",
		top: "0px",
	},
	content: {
		// textAlign: "left",
		// padding: theme.spacing.unit * 3,
	},
	heading: {
		fontWeight: "bold",
	},
	subheading: {
		lineHeight: 1.8,
	},
	avatar: {
		border: (api) => (api.status ? "2px solid green" : "2px solid red"),
		backgroundColor: "transparent",
		color: (api) => (api.status ? "green" : "red"),
	},
}));

export default function ApiItem({
	api,
	openInPopup,
	setConfirmDialog,
	onDelete,
}) {
	const classes = useStyles(api);

	return (
		<Card className={classes.root}>
			<CardContent className={classes.content}>
				<List>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<FaIcons.FaCube className={"iconStyle"} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={api.name}
							secondary={api.ip + ":" + api.port}
						/>
						<ListItemSecondaryAction>
							<Controls.ActionButton
								text={"Consulter l'erreur"}
								color="primary"
								// onClick={() => {
								// 	openInPopup();
								// }}
							>
								Consulter l'erreur
							</Controls.ActionButton>
							<Controls.ActionButton
								text={"View"}
								color="primary"
								onClick={() => {
									// openInPopup(team);
								}}
							>
								<IoIcons.IoEyeOutline size={"1.2rem"} />
							</Controls.ActionButton>
							<Controls.ActionButton
								text={"Edit"}
								color="primary"
								onClick={() => {
									openInPopup(api);
								}}
							>
								<AiIcons.AiOutlineEdit size={"1.2rem"} />
							</Controls.ActionButton>
							<Controls.ActionButton
								text={"Delete"}
								color="primary"
								onClick={() => {
									setConfirmDialog({
										isOpen: true,
										title: "Are you sure to delete this record?",
										subTitle: "You can't undo this operation",
										onConfirm: () => {
											onDelete(api.id);
										},
									});
								}}
							>
								<AiIcons.AiOutlineDelete size={"1.2rem"} />
							</Controls.ActionButton>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</CardContent>
		</Card>
	);
}
