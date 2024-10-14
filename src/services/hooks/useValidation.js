import { useState } from 'react';

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (name, value, data = {}) => {
    let error = "";
    //console.log("Inside useValidation =>",data)
  
    // Validation logic
    switch (name) {
      case "fName":
      case "lName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          error = `This field must contain alphabets only.`;
        }
        if (!value) {
          error = "This field cannot be empty.";
        }
        break;
        
      case "email":
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Please enter a valid email address.";
        }
        if (!value) {
          error = "Email cannot be empty.";
        }
        break;
        
      case "mobile":
        if (!/^\d+$/.test(value)) {
          error = "Mobile number must contain only numbers.";
        }
        if (value.length < 7 || value.length > 15) {
          error = "Mobile number must be between 7 and 15 digits.";
        }
        if (!value) {
          error = "Mobile cannot be empty.";
        }
        break;
        
      case "message":
        if (!value) {
          error = "Message cannot be empty.";
        }
        break;
      
      case "password":
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
          error = "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.";
        }
        if (!value) {
          error = "Password cannot be empty.";
        }
        break;
  
      case "confirmPassword":
        if (value !== data.password) {  // Compare with password field
          error = "Passwords do not match.";
        }
        if (!value) {
          error = "Confirm Password cannot be empty.";
        }
        break;
        
      case "username":
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "Username can only contain letters, numbers, and underscores.";
        }
        if (value.length < 5 || value.length > 20) {
          error = "Username must be between 5 and 20 characters.";
        }
        if (!value) {
          error = "Username cannot be empty.";
        }
        break;
  
      case "zipcode":
        if (!/^\d{5}(?:[-\s]\d{4})?$/.test(value)) {
          error = "Please enter a valid ZIP code.";
        }
        if (!value) {
          error = "ZIP code cannot be empty.";
        }
        break;
  
      case "website":
        if (!/^(https?:\/\/)?([\w\d-]+\.){1,}[a-zA-Z]{2,}(\/.*)?$/.test(value)) {
          error = "Please enter a valid URL.";
        }
        break;
  
      default:
        break;
    }
    return error;
  };

  const validateAll = (data) => {
    //console.log("Inside validateAll =>",data)
    const newErrors = {};
    for (let key in data) {
        //console.log("Key =>",key," Data =>",data[key])
      const error = validate(key, data[key],data);
      if (error) {
        newErrors[key] = error;
      }
    }
    setErrors(newErrors);
    return newErrors;
  };

  return { validate, validateAll, errors, setErrors };
};

export default useValidation;
