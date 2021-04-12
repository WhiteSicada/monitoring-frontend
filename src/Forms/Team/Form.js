import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../../redux/actions/TeamActions";
import { Controls } from "../../components/controls/controls";

const initialValues = {
	id: null,
	name: "",
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

function TeamForm({ teamForEdit, setNotify, setOpenPopup }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	
	const [formValues, setFormValues] = useState(initialValues);

	const submitForm = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		dispatch(createTeam(values))
			.then((response) => {
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
				console.log("error");
			});
	};

	useEffect(() => {
		if (teamForEdit != null) {
			setFormValues(teamForEdit);
		}
	}, [teamForEdit]);

	return (
		<div>
			
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) =>
					submitForm(values, { setSubmitting, resetForm })
				}
			>
				{({ isSubmitting, dirty, isValid, resetForm }) => (
					<Form autoComplete="off" className={classes.root}>
						<Grid container spacing={8}>
							<Grid item xs={12}>
								<Field
									required
									name="name"
									className={classes.field}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Nom de l'équipe"
								/>
							</Grid>
							<Grid container justify="center">
								<Button
									variant="outlined"
									color="primary"
									disabled={isSubmitting || !dirty || !isValid}
									type="submit"
									className={classes.button}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default TeamForm;
