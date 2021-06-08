import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Controls } from "../controls/controls";
import * as AiIcons from "react-icons/ai";

function TestTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
}) {
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((test, index) => (
				<TableRow key={test.id}>
					{/* <TableCell>{team.id}</TableCell> */}
					<TableCell>{test.name}</TableCell>
					<TableCell>{test.interval} minutes</TableCell>
					<TableCell>{test.listAPIs ? test.listAPIs.length : 0} APIs</TableCell>
					<TableCell>
						<Controls.ActionButton
							id={`update`}
							text={"Edit"}
							color="primary"
							onClick={() => {
								openInPopup(test);
							}}
						>
							<AiIcons.AiOutlineEdit fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							id={`delete${index}`}
							text={"Delete"}
							color="secondary"
							onClick={() => {
								setConfirmDialog({
									isOpen: true,
									title: "Are you sure to delete this record?",
									subTitle: "You can't undo this operation",
									onConfirm: () => {
										onDelete(test.id);
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

export default TestTable;
