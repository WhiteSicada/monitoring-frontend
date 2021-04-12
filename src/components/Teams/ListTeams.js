import { Grid, Table, makeStyles } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam, getTeams, setTeam } from "../../redux/actions/TeamActions";
import TeamItem from "./TeamItem";
import Paper from "@material-ui/core/Paper";
import useTable from "./useTable";
import { Controls } from "../controls/controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

const headCells = [
	{ id: "id", label: "Team Id" },
	{ id: "name", label: "Team Name" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function ListTeams({ setTeamForEdit }) {
	const teams = useSelector((state) => state.teamState.teams);
	const team = useSelector((state) => state.teamState.team);
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const dispatch = useDispatch();
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});
	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPadingAndSorting,
	} = useTable(teams, headCells, filterFn);

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteTeam(id))
			.then((response) => {
				setNotify({
					isOpen: true,
					message: "Deleted Successfully",
					type: "warning",
				});
			})
			.catch((error) => {
				console.log("error");
				console.log(error);
			});
	};

	const onPreUpdate = (teamObject) => {
		setTeamForEdit(teamObject);
		// dispatch(setTeam(teamObject));
	};

	useEffect(() => {
		dispatch(getTeams());
	}, []);
	return (
		<div>
			<Controls.Notification notify={notify} setNotify={setNotify} />
			<Controls.ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<TblContainer>
				<TblHead />
				<TableBody>
					{recordsAfterPadingAndSorting().map((team) => (
						<TableRow key={team.id}>
							<TableCell>{team.id}</TableCell>
							<TableCell>{team.name}</TableCell>
							<TableCell>
								<Controls.ActionButton
									color="primary"
									onClick={() => {
										onPreUpdate(team);
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
			</TblContainer>
			<TblPagination />
		</div>
	);
}

export default ListTeams;
