import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Controls } from "../controls/controls";

export default function workResponsableTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
}) {
  return (
    <TableBody>
			{recordsAfterPadingAndSorting().map((workResponsable) => (
				<TableRow key={workResponsable.id}>
					<TableCell>{workResponsable.id}</TableCell>
					<TableCell>{workResponsable.name}</TableCell>
					<TableCell>{workResponsable.email}</TableCell>
					<TableCell>
						<Controls.ActionButton
							color="primary"
							onClick={() => {
								openInPopup(workResponsable);
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
										onDelete(workResponsable.id);
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
  )
}
