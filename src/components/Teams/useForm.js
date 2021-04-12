import React, { useState } from "react";

function useForm(initialValues) {
	const [values, setValues] = useState(initialValues);
	const resetForm = () => {
		setValues(initialValues);
		setErrors({});
	};
	return {
		values,
		setValues,
		// errors,
		// setErrors,
		// handleInputChange,
		resetForm,
	};
}

export default useForm;
