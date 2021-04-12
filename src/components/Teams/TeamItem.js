import React from "react";
import {
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
} from "@material-ui/core";
function TeamItem({ team, index }) {
	return (
		<div>
			<ListItem key={index}>
				<ListItemAvatar></ListItemAvatar>
				<ListItemText primary={team.name} />
				<ListItemSecondaryAction>a</ListItemSecondaryAction>
			</ListItem>
		</div>
	);
}

export default TeamItem;
