import { useCallback } from 'react'
import { FORM_INPUT_UPDATE } from '../store/reducers/formReducer'


export const inputChangeHandler = useCallback((
        inputIdentifier, 
        inputValue, 
        inputValidity,
        dispatchFormState
    ) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);