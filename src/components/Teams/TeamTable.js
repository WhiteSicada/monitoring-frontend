import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Controls } from "../controls/controls";

function TeamTable({
	teamsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
}) {
	return (
		<TableBody>
			{teamsAfterPadingAndSorting().map((team) => (
				<TableRow key={team.id}>
					<TableCell>{team.id}</TableCell>
					<TableCell>{team.name}</TableCell>
					<TableCell>
						<Controls.ActionButton
							color="primary"
							onClick={() => {
								openInPopup(team);
							}}
						>
							<EditOutlinedIcon fontSize="small" />
						</Controls.ActionButton>
						<Controls.ActionButton
							color="secondary"
							onClick={() => {
								setConfirmDialog({
									isOpen: true,
									title: "Are you sure to delete this record?",
									subTitle: "You can't undo this operation",
									onConfirm: () => {
										onDelete(team.id);
									},
								});
							}}
						>
							<CloseIcon fontSize="small" />
						</Controls.ActionButton>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default TeamTable;
