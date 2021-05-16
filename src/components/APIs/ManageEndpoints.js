import React, { useState, useDebugValue } from "react";
import {
	Grid,
	Typography,
	makeStyles,
	Divider,
	Button,
} from "@material-ui/core";
import EndpointForm from "../../Forms/Api/EndpointForm";
import ListEndpoints from "./ListEndpoints";

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
		marginTop: 25,
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
function ManageEndpoints({ apiForEdit }) {
	const classes = useStyles();
	const [endpointList, setEndpointList] = useState(apiForEdit.endpoints);
	const [currentEndpoint, setCurrentEndpoint] = useState(null);
	const [endpointListAdded, setEndpointListAdded] = useStateWithLabel(
		[],
		"endpointListAdded"
	);
	const [endpointListUpdated, setEndpointListUpdated] = useState([]);
	const [endpointListDeleted, setEndpointListDeleted] = useStateWithLabel(
		[],
		"endpointListDeleted"
	);
	const submit = () => {
		alert("hn");
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
					<div className={classes.center}>
						<Button
							variant="contained"
							color="primary"
							id="submit"
							className={classes.button}
							onClick={() => {
								submit();
							}}
						>
							Submit
						</Button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export default ManageEndpoints;
