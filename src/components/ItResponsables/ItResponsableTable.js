import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Controls } from "../controls/controls";

export default function ItResponsableTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
}) {
  return (
    <TableBody>
			{recordsAfterPadingAndSorting().map((itResponsable) => (
				<TableRow key={itResponsable.id}>
					<TableCell>{itResponsable.id}</TableCell>
					<TableCell>{itResponsable.name}</TableCell>
					<TableCell>{itResponsable.email}</TableCell>
					<TableCell>
						<Controls.ActionButton
							color="primary"
							onClick={() => {
								openInPopup(itResponsable);
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
										onDelete(itResponsable.id);
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
