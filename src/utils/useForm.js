import { useCallback, useState } from "react";

export default function useForm() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const errorMessage = e.target.validationMessage;

        setValues((outdatedValues) => {
            return {...outdatedValues, [name]: value}
        })

        setErrors((outdatedErrors) => {
            return {...outdatedErrors, [name]:  errorMessage}
        })
    }

    function reset(data = {}) {
        setValues(data);
        setErrors({});
    }

    const setBeginingValues = useCallback((name, value) => {
        setValues((outdatedValues) => {
            return {...outdatedValues, [name]: value}
        }) 
    }, [])

    return { values, errors, handleChange, reset, setBeginingValues }
}