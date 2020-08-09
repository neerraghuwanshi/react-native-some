import React, { useReducer, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { windowHeight } from "../constants/screenSize";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        errorText: action.errorText
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {

  const { onInputChange, id, touched, initialValue, initiallyValid, label, labelStyle, style, required, email, min, max, minLength, maxLength } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid,
    touched: false,
    errorText:''
  });

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    let errorText = '';
    if (required && text.trim().length === 0) {
      isValid = false;
      errorText = `${label} cannot be empty`
    }
    else if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
      errorText = 'Invalid E-mail'
    }
    else if (min != null && +text < min) {
      isValid = false;
      errorText= `${label} should be greater than ${min}`
    }
    else if (max != null && +text > max) {
      isValid = false;
      errorText= `${label} should not smaller than ${max}`
    }
    else if (minLength != null && text.length < minLength) {
      isValid = false;
      errorText = `${label} should be at least of ${minLength} characters`
    }
    else if(maxLength != null && text.length > maxLength) {
      isValid = false;
      errorText = `${label} should be at most of ${minLength} characters`
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid,errorText:errorText });
  };

  useEffect(() => {
    textChangeHandler(initialValue ? initialValue : '')
  }, [])

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid);
  },[inputState, onInputChange, id]);

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      {label &&
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>}
      <TextInput
        {...props}
        style={{...styles.input, ...style}}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && (touched || inputState.touched) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText ? props.errorText : inputState.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    fontSize:windowHeight/50,
    marginTop:windowHeight/100
  },
  input: {
    paddingHorizontal: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontFamily:'open-sans',
    fontSize:windowHeight/50,
  },
  errorContainer: {
    marginVertical: windowHeight/200,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: windowHeight/70
  }
});

export default React.memo(Input);
