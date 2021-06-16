import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Controls } from "../controls/controls";
import { BiCube } from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { useHistory } from "react-router-dom";

function TestTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
	openInTransferListPopup,
	// openInListScan
}) {
	const history = useHistory();
	function goToScanList(test) {
		history.push(`/tests/${test.id}`);
	}
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((test, index) => (
				<TableRow key={test.id}>
					<TableCell>{test.name}</TableCell>
					<TableCell>{test.interval} minutes</TableCell>
					<TableCell>
						{test.listAPIs
							? test.listAPIs.length > 1
								? test.listAPIs.length + " APIs"
								: test.listAPIs.length + " API"
							: "0 API"}
					</TableCell>
					<TableCell>
						{test.listAPIs
							? test.listAPIs.map((api) => <span>{api.name},</span>)
							: "No API found !"}
					</TableCell>
					<TableCell>
						<Controls.ActionButton
							text={"List of Scans"}
							color="primary"
							onClick={() => {
								goToScanList(test);
							}}
						>
							<FaTasks fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"Manage Endpoints"}
							color="primary"
							onClick={() => {
								openInTransferListPopup(test);
							}}
						>
							<BiCube fontSize="large" />
						</Controls.ActionButton>
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
							color="primary"
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
