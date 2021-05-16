import React from "react";
import {
	TableBody,
	TableRow,
	TableCell,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	makeStyles,
	ListItemText,
} from "@material-ui/core";
import { BiCube } from "react-icons/bi";
import { FaCube } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Controls } from "../controls/controls";
import * as AiIcons from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
	td: {
		padding: 2,
	},
}));

function ApiTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
	openInViewPopup,
	openInManageEndpoints
}) {
	const classes = useStyles();
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((api, index) => (
				<TableRow key={api.id}>
					<TableCell className={classes.td}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<FaCube />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={api.name}
									secondary={api.ip + ":" + api.port}
								/>
							</ListItem>
						</List>
					</TableCell>
					<TableCell>
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
							text={"Manage Endponts"}
							color="primary"
							onClick={() => {
								openInManageEndpoints(api);
							}}
						>
							<BiCube fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"View"}
							color="primary"
							onClick={() => {
								openInViewPopup(api);
							}}
						>
							<IoEyeOutline size={"1.2rem"} />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"Edit"}
							color="primary"
							onClick={() => {
								openInPopup(api);
							}}
						>
							<AiIcons.AiOutlineEdit fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"Delete"}
							color="secondary"
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
							<AiIcons.AiOutlineDelete fontSize="large" />
						</Controls.ActionButton>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default ApiTable;
