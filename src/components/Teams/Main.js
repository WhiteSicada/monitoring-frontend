import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import * as HiIcons from "react-icons/hi";
import PageHeader from "../Header/PageHeader";
import ListTeams from "./ListTeams";
import { useDispatch, useSelector } from "react-redux";
import useTable from "./useTable";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { deleteTeam, getTeams, setTeam } from "../../redux/actions/TeamActions";
import {
	Paper,
	makeStyles,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	InputAdornment,
} from "@material-ui/core";
import TeamForm from "../../Forms/Team/Form";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		marginTop: theme.spacing(5),
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "75%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

const headCells = [
	{ id: "id", label: "Team Id" },
	{ id: "name", label: "Team Name" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export function Main() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});
	const [teamForEdit, setTeamForEdit] = useState(null);
	const teams = useSelector((state) => state.teamState.teams);
	const [filterFn, setFilterFn] = useState({
		fn: (teams) => {
			return teams;
		},
	});

	const [openPopup, setOpenPopup] = useState(false);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		teamsAfterPadingAndSorting,
	} = useTable(teams, headCells, filterFn);

	const openInPopup = (team) => {
		setTeamForEdit(team);
		setOpenPopup(true);
	};
	useEffect(() => {
		dispatch(getTeams());
	}, []);

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

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (teams) => {
				if (target.value == "") return teams;
				else
					return teams.filter((x) =>
						x.name.toLowerCase().includes(target.value)
					);
			},
		});
	};

	return (
		<div>
			<PageHeader
				title="Team Section"
				subTitle="Manage your teams"
				icon={<HiIcons.HiOutlineUserGroup />}
			/>
			<Paper className={classes.pageContent}>
				{/* <EmployeeForm /> */}
				<Toolbar>
					<Controls.Input
						label="Search Employees"
						className={classes.searchInput}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/>
					<Controls.MuiButton
						text="Add New"
						variant="outlined"
						startIcon={<AddIcon />}
						className={classes.newButton}
						onClick={() => {
							setOpenPopup(true);
							setTeamForEdit(null);
						}}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
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
				</TblContainer>
				<TblPagination />
			</Paper>
			<Controls.Popup
				title="Employee Form"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<TeamForm
					teamForEdit={teamForEdit}
					setOpenPopup={setOpenPopup}
					setNotify={setNotify}
				/>
			</Controls.Popup>
			<Controls.Notification notify={notify} setNotify={setNotify} />
			<Controls.ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</div>
	);
}
