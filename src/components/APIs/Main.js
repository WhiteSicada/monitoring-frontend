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
} from "@material-ui/core";
import ApiForm from "../../Forms/Api/ApiForm";
import { deleteAPI, getAPIs } from "../../redux/actions/ApiActions";
import ViewPopup from "./ViewPopup";
import useTable from "../controls/useTable";
import ApiTable from "./ApiTable";
import ManageEndpoints from "./ManageEndpoints";

const useStyles = makeStyles((theme) => ({
	pageContent: {
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

const headCells = [
	// { id: "id", label: "Team Id" },
	{ id: "name", label: "API Name" },
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
	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (apis) => {
				if (target.value == "") return apis;
				else
					return apis.filter((x) =>
						x.name.includes(target.value)
					);
			},
		});
	};
	const [filterFn, setFilterFn] = useState({
		fn: (apis) => {
			return apis;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
	const [openViewPopup, setOpenViewPopup] = useState(false);
	const [apiForEdit, setApiForEdit] = useState(null);
	const [openManageEndpoints, setOpenManageEndpoints] = useState(false);
	const openInPopup = (api) => {
		setApiForEdit(api);
		setOpenPopup(true);
	};
	const openInViewPopup = (api) => {
		setApiForEdit(api);
		setOpenViewPopup(true);
	};
	const openInManageEndpoints = (api) => {
		setApiForEdit(api);
		setOpenManageEndpoints(true);
	};
	const apis = useSelector((state) => state.apiState.apis);
	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPadingAndSorting,
	} = useTable(apis, headCells, filterFn);

	useEffect(() => {
		dispatch(getAPIs());
	}, []);


	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteAPI(id))
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
				<TblContainer>
					<TblHead />
					<ApiTable
						recordsAfterPadingAndSorting={recordsAfterPadingAndSorting}
						openInPopup={openInPopup}
						openInViewPopup={openInViewPopup}
						onDelete={onDelete}
						setConfirmDialog={setConfirmDialog}
						openInManageEndpoints={openInManageEndpoints}
					/>
				</TblContainer>
				<TblPagination />
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
			<Controls.Popup
				title="View Api"
				openPopup={openViewPopup}
				setOpenPopup={setOpenViewPopup}
			>
				<ViewPopup apiForEdit={apiForEdit} />
			</Controls.Popup>
			<Controls.Popup
				title="Manage Endpoints"
				openPopup={openManageEndpoints}
				setOpenPopup={setOpenManageEndpoints}
				maxWidth="xl"
			>
				<ManageEndpoints apiForEdit={apiForEdit} />
			</Controls.Popup>
			<Controls.Notification notify={notify} setNotify={setNotify} />
			<Controls.ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</div>
	);
}
