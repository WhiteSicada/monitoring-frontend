import React, { useState } from "react";
import { FaCubes } from "react-icons/fa";
import PageHeader from "../Header/PageHeader";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import { Controls } from "../controls/controls";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "50%",
		marginLeft: "15%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

export function Main() {
	const classes = useStyles();
	const [filterFn, setFilterFn] = useState({
		fn: (anomalies) => {
			return anomalies;
		},
	});
	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (anomalies) => {
				if (target.value == "") return anomalies;
				else return anomalies.filter((x) => x.name.includes(target.value));
			},
		});
	};
	return (
		<div>
			<PageHeader
				title="Anomaly Section"
				subTitle="Manage your Anomalies"
				icon={<FaCubes />}
			/>
			<Paper className={classes.pageContent}>
				{/* <EmployeeForm /> */}
				<Toolbar>
					<Controls.Input
						label="Select API"
						className={classes.searchInput}
						id="search"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/>
				</Toolbar>
				{/* <TblContainer>
					<TblHead />
					<ApiTable
						recordsAfterPadingAndSorting={recordsAfterPadingAndSorting}
						openInPopup={openInPopup}
						openInViewPopup={openInViewPopup}
						onDelete={onDelete}
						setConfirmDialog={setConfirmDialog}
					/>
				</TblContainer>
				<TblPagination /> */}
			</Paper>
		</div>
	);
}
