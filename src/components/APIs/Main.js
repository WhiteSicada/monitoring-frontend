import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import PageHeader from "../Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import {
	Paper,
	makeStyles,
	Toolbar,
	InputAdornment,
	Grid,
} from "@material-ui/core";
import ApiForm from "../../Forms/Api/ApiForm";
import { getAPIs } from "../../redux/actions/ApiActions";
import ApiItem from "./ApiItem";

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
	apiSection: {
		marginTop: theme.spacing(4),
	},
}));

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
	const handleSearch = (e) => {
		let target = e.target;
		// setFilterFn({
		// 	fn: (teams) => {
		// 		if (target.value == "") return teams;
		// 		else
		// 			return teams.filter((x) =>
		// 				x.name.toLowerCase().includes(target.value)
		// 			);
		// 	},
		// });
	};
	const [openPopup, setOpenPopup] = useState(false);
	const [apiForEdit, setApiForEdit] = useState(null);
	const openInPopup = (api) => {
		setApiForEdit(api);
		setOpenPopup(true);
	};
	const apis = useSelector((state) => state.apiState.apis);
	useEffect(() => {
		dispatch(getAPIs());
	}, []);
	return (
		<div>
			<PageHeader
				title="API Section"
				subTitle="Manage your APIs"
				icon={<FaIcons.FaCubes />}
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
							setApiForEdit(null);
						}}
					/>
				</Toolbar>
				<Grid container spacing={4} className={classes.apiSection}>
					{apis.map((api) => (
						<Grid item xs={6}>
							<ApiItem api={api} />
						</Grid>
					))}
				</Grid>
			</Paper>
			<Controls.Popup
				title="Api Form"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<ApiForm
					apiForEdit={apiForEdit}
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
