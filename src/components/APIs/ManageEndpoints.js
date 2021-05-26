import React, { useState, useDebugValue } from "react";
import {
	Grid,
	Typography,
	makeStyles,
	Divider,
	Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import EndpointForm from "../../Forms/Api/EndpointForm";
import ListEndpoints from "./ListEndpoints";
import {
	removeEndpointsToApi,
	addEndpointToApi,
	updateEndpointsForApi,
} from "../../redux/actions/ApiActions";

const useStyles = makeStyles((theme) => ({
	title: {
		textDecoration: "underline",
		textAlign: "center",
		textDecorationColor: "#ef630b",
		textDecorationThickness: 2,
	},
	border: {
		borderRight: "1px solid #ef630b",
	},
	button: {
		width: "20%",
		border: "1px solid #ef630b",
		padding: 10,
	},
	listendpoint: {
		paddingLeft: 20,
		height: 320,
	},
	container: {
		height: 500,
	},
	center: { textAlign: "center" },
}));

function useStateWithLabel(initialValue, name) {
	const [value, setValue] = useState(initialValue);
	useDebugValue(`${name}: ${value}`);
	return [value, setValue];
}
function ManageEndpoints({ apiForEdit, setNotify }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [endpointList, setEndpointList] = useState(apiForEdit.endpoints);
	const [currentEndpoint, setCurrentEndpoint] = useState(null);
	const [endpointListAdded, setEndpointListAdded] = useStateWithLabel(
		[],
		"endpointListAdded"
	);
	const [endpointListUpdated, setEndpointListUpdated] = useStateWithLabel(
		[],
		"endpointListUpdated"
	);
	const [endpointListDeleted, setEndpointListDeleted] = useStateWithLabel(
		[],
		"endpointListDeleted"
	);
	const submit = () => {
		if (endpointListDeleted.length > 0) {
			dispatch(
				removeEndpointsToApi(apiForEdit.id, { endpoints: endpointListDeleted })
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setEndpointListDeleted([]);
		}
		if (endpointListAdded.length > 0) {
			dispatch(
				addEndpointToApi(apiForEdit.id, { endpoints: endpointListAdded })
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setEndpointListAdded([]);
		}
		if (endpointListUpdated.length > 0) {
			dispatch(
				updateEndpointsForApi(apiForEdit.id, { endpoints: endpointListUpdated })
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setEndpointListUpdated([]);
		}
	};
	return (
		<div>
			<Grid
				container
				justify="center"
				direction="row"
				className={classes.container}
			>
				<Grid item xs={3} className={classes.border}>
					<Typography variant="h6" component="div" className={classes.title}>
						Endpoint Form
					</Typography>
					<EndpointForm
						endpointList={endpointList}
						currentEndpoint={currentEndpoint}
						setEndpointList={setEndpointList}
						setCurrentEndpoint={setCurrentEndpoint}
						setEndpointListAdded={setEndpointListAdded}
						setEndpointListUpdated={setEndpointListUpdated}
						endpointListAdded={endpointListAdded}
						endpointListUpdated={endpointListUpdated}
						endpointListDeleted={endpointListDeleted}
					/>
				</Grid>
				<Grid item xs={9}>
					<Typography variant="h6" component="div" className={classes.title}>
						List Of Endoints
					</Typography>
					<div className={classes.listendpoint}>
						<ListEndpoints
							endpointList={endpointList}
							setCurrentEndpoint={setCurrentEndpoint}
							setEndpointList={setEndpointList}
							setEndpointListAdded={setEndpointListAdded}
							endpointListAdded={endpointListAdded}
							setEndpointListDeleted={setEndpointListDeleted}
						/>
					</div>
					<Grid container spacing={5} alignItems="center">
						<Grid item xs={6} className={classes.center}>
							<Button
								variant="contained"
								color="primary"
								id="submitAllEndpoints"
								className={classes.button}
								onClick={() => {
									submit();
								}}
							>
								Submit
							</Button>
						</Grid>
						<Grid item xs={6}>
							{endpointListAdded.length} endpoints Added ,{" "}
							{endpointListUpdated.length} endpoints Updated ,{" "}
							{endpointListDeleted.length} endpoints Deleted.
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default ManageEndpoints;
