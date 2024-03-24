import React, { useState, useEffect } from "react";
import "/Users/kriti.bharadwaj03/dotslash/frontend/kkd/src/styles/register.css";
import Login from "./Login"; // Import the Login component

function Register() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track registration success
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true); // Set loading state to true
      setIsSubmit(true);
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error("Failed to register user");
        }

        const data = await response.json();
        console.log("Registration successful:", data);
        // Optionally reset formValues to clear the form
        setFormValues(initialValues);
        // Introduce a delay before redirecting to login page
        setTimeout(() => {
          setRegistrationSuccess(true); // Set registration success state to true
          setIsLoading(false); // Set loading state to false
        }, 2000); // Adjust delay as needed (2000 milliseconds = 2 seconds)
      } catch (error) {
        console.error("Error during registration:", error);
        setIsLoading(false); // Set loading state to false in case of error
        // Handle errors (e.g., display user-friendly message)
      }
    }
  };
  var un;
  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);
  
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed 20 characters";
    }
    window.location.href = `http://localhost:4000?username=${values.username}`;
    return errors;
  };

  // Render the login page if registration is successful
  
    
      
      
    
  
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
            <p>{formErrors.username}</p>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
            <p>{formErrors.email}</p>
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p>{formErrors.password}</p>
          </div>
          <button className="fluid ui button blue" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
