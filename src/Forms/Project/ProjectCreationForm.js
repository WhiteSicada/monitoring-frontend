import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import {
	makeStyles,
	Typography,
	Stepper,
	Step,
	StepLabel,
	MenuItem,
} from "@material-ui/core";
import { CircleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import {
	createProject,
	addApiToProject,
	updateProject,
} from "../../redux/actions/ProjectActions";
import { ApiCards } from "./ApiCards";

const initialValues = {
	id: null,
	name: "aa",
	responsableIt: "",
	responsableMetier: "",
	equipe: "",
	description: "aaa",
	apis: [],
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
	},
}));

function getSteps() {
	return ["Project Infos", "Select Project Members", "Select APIs"];
}

export default function ProjectCreationForm({
	teams,
	itResponsables,
	workResponsables,
	apis,
	setNotify,
	setOpenPopup,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const [formValues, setFormValues] = useState(initialValues);
	// const [apiItems, setApiItems] = useState([]);

	const submitForm = (values, { setSubmitting, resetForm }) => {
		// console.log(values.id + " " + values.apis);
		setSubmitting(true);
		dispatch(createProject(values))
			.then((response) => {
				if (values.apis.length !== 0) {
					dispatch(addApiToProject(response.id, { apis: values.apis }))
						.then((e) => {
							resetForm();
							setSubmitting(false);
							setOpenPopup(false);
							setNotify({
								isOpen: true,
								message: "Created Successfully",
								type: "success",
							});
						})
						.catch((error) => {
							resetForm();
							setSubmitting(false);
							console.log(error);
						});
				} else {
					resetForm();
					setSubmitting(false);
					setOpenPopup(false);
					setNotify({
						isOpen: true,
						message: "Created Successfully",
						type: "success",
					});
				}
			})
			.catch((error) => {
				resetForm();
				setSubmitting(false);
				console.log(error);
			});
	};

	const itResponsableItems = itResponsables.map((itResponsable) => {
		return {
			value: itResponsable.name,
			label: itResponsable.name,
		};
	});
	const workResponsableItems = workResponsables.map((workResponsable) => {
		return {
			value: workResponsable.name,
			label: workResponsable.name,
		};
	});
	const teamsItems = teams.map((teamsItem) => {
		return {
			value: teamsItem.name,
			label: teamsItem.name,
		};
	});

	return (
		<div>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					return (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<div>
				<Formik
					enableReinitialize={true}
					initialValues={formValues}
					validationSchema={validationSchema}
				>
					{({
						values,
						isSubmitting,
						dirty,
						isValid,
						setSubmitting,
						resetForm,
					}) => (
						<Form autoComplete="off" className={classes.root}>
							<Grid container spacing={8}>
								{activeStep === 0 && (
									<Grid item xs={12}>
										<Field
											required
											name="name"
											component={TextField}
											variant="outlined"
											InputLabelProps={{ shrink: true }}
											label="Name of Project"
										/>
										<Field
											required
											name="description"
											component={TextField}
											multiline
											rows={4}
											variant="outlined"
											InputLabelProps={{ shrink: true }}
											label="Description"
										/>
									</Grid>
								)}

								{activeStep === 1 && (
									<Grid item xs={12}>
										<Field
											required
											name="responsableIt"
											type="text"
											select
											component={TextField}
											label="Select It Responsable"
											variant="outlined"
										>
											{itResponsableItems.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</Field>
										<Field
											required
											name="responsableMetier"
											type="text"
											select
											component={TextField}
											label="Select Work Responsable"
											variant="outlined"
										>
											{workResponsableItems.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</Field>
										<Field
											required
											name="equipe"
											type="text"
											select
											component={TextField}
											label="Select Team"
											variant="outlined"
										>
											{teamsItems.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</Field>
									</Grid>
								)}

								{activeStep === 2 && (
									<Grid item container xs={12} spacing={4}>
										{apis.map((api) => (
											<Grid item key={api.id} xs={6}>
												<Field
													component={CheckboxWithLabel}
													type="checkbox"
													name="apis"
													Label={{ label: api.name }}
													value={api.name}
												/>
											</Grid>
										))}
									</Grid>
								)}

								<Grid container justify="center">
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										className={classes.button}
									>
										Back
									</Button>
									{activeStep === steps.length - 1 ? (
										<Button
											variant="outlined"
											color="primary"
											disabled={!isValid}
											onClick={() => {
												submitForm(values, { setSubmitting, resetForm });
											}}
										>
											{isSubmitting ? (
												<CircleLoader size={10} color="#ef630b" />
											) : (
												"Submit"
											)}
										</Button>
									) : (
										<Button
											size="small"
											variant="contained"
											color="primary"
											onClick={handleNext}
											className={classes.button}
										>
											Next
										</Button>
									)}
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
