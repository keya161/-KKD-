import React, { useState } from "react";
import { Link } from "react-router-dom";
import "/Users/kriti.bharadwaj03/dotslash/frontend/kkd/src/styles/login.css";

function Login() {
  const initialValues = { email: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setFormErrors(validate(formData));
  
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
  
      // Simulate successful login
      setTimeout(() => {
        setIsSubmitting(false);
        // Redirect to spinwheel page
        window.location.href = "/spinwheel";
      }, 1000); // Simulate delay for 1 second
    }
  };
  

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
    }

    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="ui divider"></div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.email}</p>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.password}</p>
        <button className="fluid ui button blue" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p>
          Don't have an account? <Link to="/">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
