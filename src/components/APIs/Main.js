import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import PageHeader from "../Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";

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

export function Main() {
	const classes = useStyles();
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
	useEffect(() => {}, []);
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
			</Paper>
		</div>
	);
}
