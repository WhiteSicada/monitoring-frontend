import React from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	Grid,
	IconButton,
	Avatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { Controls } from "../controls/controls";
import { RiRemoteControlLine } from "react-icons/ri";
import DeleteIcon from "@material-ui/icons/Delete";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
	root: { marginTop: 31 },
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
	endpointStyle: {
		border: "1px solid #ef630b",
	},
}));

function ListEndpoints({
	endpointList,
	setCurrentEndpoint,
	setEndpointList,
	setEndpointListAdded,
	endpointListAdded,
	setEndpointListDeleted,
}) {
	const classes = useStyles();
	const methodColor = (type) => {
		switch (type) {
			case "POST":
				return "orange";
			case "GET":
				return "green";
			case "PUT":
				return "blue";
			case "DELETE":
				return "red";
			default:
				break;
		}
	};
	const deleteEndpoint = (endpoint) => {
		if (
			endpointListAdded.filter((item) => item.name === endpoint.name).length > 0
		) {
			setEndpointListAdded(
				endpointListAdded.filter((item) => item.name !== endpoint.name)
			);
			
		} else {
			setEndpointListDeleted((endpointListDeleted) => [
				...endpointListDeleted,
				endpoint,
			]);
		}
		setEndpointList(endpointList.filter((item) => item.id !== endpoint.id));
	};
	return (
		<div className={classes.root}>
			<List dense>
				<Grid container spacing={2}>
					{endpointList.map((endpoint, index) => (
						<Grid item xs={3} key={index}>
							<ListItem className={classes.endpointStyle}>
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<RiRemoteControlLine />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={endpoint.name}
									secondary={
										<Typography
											type="body2"
											style={{ color: methodColor(endpoint.method) }}
										>
											{endpoint.method}
										</Typography>
									}
								/>
								<ListItemSecondaryAction>
									<Controls.ActionButton
										text={"Edit"}
										color="secondary"
										onClick={() => {
											setCurrentEndpoint(endpoint);
										}}
									>
										<AiOutlineEdit fontSize="large" />
									</Controls.ActionButton>
									<Controls.ActionButton
										text={"Delete"}
										color="secondary"
										onClick={() => {
											deleteEndpoint(endpoint);
										}}
									>
										<AiOutlineDelete fontSize="large" />
									</Controls.ActionButton>
								</ListItemSecondaryAction>
							</ListItem>
						</Grid>
					))}
				</Grid>
			</List>
		</div>
	);
}

export default ListEndpoints;
