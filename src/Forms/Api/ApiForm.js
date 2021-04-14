import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { createAPI, getAPIs, updateAPI } from "../../redux/actions/ApiActions";

const initialValues = {
	id: null,
	name: "",
	description: "",
	ip: "",
	port: 0,
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

export default function ApiForm({ apiForEdit, setNotify, setOpenPopup }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [formValues, setFormValues] = useState(initialValues);
	const [update, setUpdate] = useState(false);
	const submitForm = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		if (update) {
			dispatch(updateAPI(values.id, values)).then((response) => {
				resetForm();
				setSubmitting(false);
				setOpenPopup(false);
				setNotify({
					isOpen: true,
					message: "Updated Successfully",
					type: "success",
				});
			});
		} else {
			dispatch(createAPI(values))
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
		}
	};

	useEffect(() => {
		if (apiForEdit != null) {
			setFormValues(apiForEdit);
			setUpdate(true);
		}
	}, [apiForEdit]);
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
						<Grid container spacing={5}>
							<Grid item xs={12}>
								<Field
									required
									autoFocus={true}
									name="name"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="API Name"
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									required
									name="ip"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="API Ip Adress"
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									required
									name="port"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="API Port"
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									required
									multiline
									rows={3}
									name="description"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="API Description"
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
									{isSubmitting ? (
										<BeatLoader size={10} color="#ef630b" />
									) : (
										"Submit"
									)}
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
}
