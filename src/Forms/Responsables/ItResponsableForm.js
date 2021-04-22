import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CircleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import {
	createItResponsable,
	getItResponsables,
	updateItResponsable,
} from "../../redux/actions/ItResponsablesActions";

const initialValues = {
	id: null,
	name: "",
	email: "",
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

function ItResponsableForm({ ItResponsableForEdit, setNotify, setOpenPopup }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState(initialValues);
	const [update, setUpdate] = useState(false);

	const submitForm = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		if (update) {
			dispatch(updateItResponsable(values.id, values)).then((response) => {
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
			dispatch(createItResponsable(values))
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
		if (ItResponsableForEdit != null) {
			setFormValues(ItResponsableForEdit);
			setUpdate(true);
		}
	}, [ItResponsableForEdit]);

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
									autoFocus={true}
									name="name"
									className={classes.field}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Name of It Responsable"
								/>
							</Grid>
              <Grid item xs={12}>
								<Field
									required
									name="email"
									className={classes.field}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Email of It Responsable"
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
										<CircleLoader size={10} color="#ef630b" />
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

export default ItResponsableForm;
