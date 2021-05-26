import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Button, MenuItem } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { validationSchemaEndpoint } from "./validationSchemaEndpoint";
import { TextField } from "formik-material-ui";

const initialValuesForEndpoint = {
	id: 0,
	name: "",
	url: "",
	method: "",
	data: "",
};

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiFormControl-root": {
			width: "100%",
			marginTop: theme.spacing(2),
		},
		padding: theme.spacing(3),
	},
	button: {
		width: "40%",
		border: "1px solid #ef630b",
		padding: 10,
		marginRight: 25,
		marginTop: 25,
	},
	endpointForm: {
		marginBottom: theme.spacing(3),
	},
}));

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function EndpointForm({
	endpointList,
	setEndpointList,
	currentEndpoint,
	setCurrentEndpoint,
	setEndpointListAdded,
	setEndpointListUpdated,
	endpointListAdded,
	endpointListUpdated,
	endpointListDeleted,
}) {
	const classes = useStyles();
	const endpointMethods = [
		{
			value: "GET",
			label: "GET",
			color: "green",
		},
		{
			value: "POST",
			label: "POST",
			color: "orange",
		},
		{
			value: "PUT",
			label: "PUT",
			color: "blue",
		},
		{
			value: "DELETE",
			label: "DELETE",
			color: "red",
		},
	];
	const [update, setUpdate] = useState(false);

	const [formValues, setFormValues] = useState(initialValuesForEndpoint);
	useEffect(() => {
		if (currentEndpoint != null) {
			setFormValues(currentEndpoint);
			setUpdate(true);
		}
	}, [currentEndpoint]);

	const customReset = () => {
		setCurrentEndpoint(null);
		setFormValues(initialValuesForEndpoint);
		setUpdate(false);
	};

	const submitForm = (values, { resetForm }) => {
		if (update) {
			setEndpointList(
				endpointList.map((endpoint) => {
					if (endpoint.id === currentEndpoint.id) {
						return { ...endpoint, ...values };
					} else {
						return endpoint;
					}
				})
			);

			setEndpointListUpdated((endpointListUpdated) => [
				...endpointListUpdated,
				{ ...values },
			]);
			customReset();
		} else {
			const generatedId = getRandomInt(1000);
			setEndpointList((endpointList) => [
				...endpointList,
				{ ...values, id: generatedId },
			]);
			setEndpointListAdded((endpointListAdded) => [
				...endpointListAdded,
				{
					name: values.name,
					method: values.method,
					url: values.url,
					data: values.data,
				},
			]);
			resetForm();
			console.log(endpointList);
		}
	};
	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				validationSchema={validationSchemaEndpoint}
			>
				{({ values, dirty, isValid, resetForm }) => (
					<Form autoComplete="off" id="endpointForm" className={classes.root}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Field
									required
									name="name"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Endpoint Name"
								/>
							</Grid>
							<Grid item xs={4}>
								<Field
									required
									name="method"
									select
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Method"
								>
									{endpointMethods.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}
											style={{ color: option.color }}
										>
											{option.label}
										</MenuItem>
									))}
								</Field>
							</Grid>
							<Grid item xs={8}>
								<Field
									required
									name="url"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Endpoint Url"
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									required
									name="data"
									multiline
									rows={4}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Endpoint Data"
								/>
							</Grid>
							<Grid container justify="center">
								<Button
									variant="contained"
									color="primary"
									id="submitEndpoint"
									disabled={!dirty || !isValid}
									className={classes.button}
									onClick={() => {
										submitForm(values, { resetForm });
									}}
								>
									{update ? "Update" : "Add"}
								</Button>
								{update && (
									<Button
										variant="contained"
										color="primary"
										id="resetForm"
										className={classes.button}
										onClick={() => {
											customReset();
										}}
									>
										Reset Form
									</Button>
								)}
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default EndpointForm;
