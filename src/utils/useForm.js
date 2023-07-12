import { useCallback, useState } from "react";


export default function useForm() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const setBeginingValues = useCallback((name, value) => {
        setValues(outdatedValues => {
          return {...outdatedValues, [name]: value}
        }) 
        }, [])
    
      function handleChange(e) {
        const {name, value} = e.target;
        const errorMessage = e.target.validationMessage;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: errorMessage});  
      }
    
      function reset(data = {}) {
        setValues(data);
        setErrors({});
      }

      return { values, setBeginingValues, errors, handleChange, reset }
}