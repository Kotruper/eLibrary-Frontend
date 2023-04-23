import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
import { loginUser } from '../utilities/tools';
import useToken from '../utilities/useToken';
import { redirect, useNavigate } from 'react-router';

function LoginForm() {
  const loginForm = useRef(null);
  const emptyErrorForm = {
    email:"",
    password:""
  };
  const [formError, setFormError] = useState(emptyErrorForm);
  const {token, setToken} = useToken();
  const navigate = useNavigate();

  const handleSubmit = e => {
      e.preventDefault();
      const formFields = loginForm.current.elements;
      if(validateForm(formFields)){
        console.log("Form is OK. Send request and if status is ok redirect");

        loginUser(formFields["formEmail"].value, formFields["formPass"].value).then((token) =>{
          if (token) {
            setToken(token);
            navigate("/"); //redirect to another page (previous page?)
          }
          else{
            setFormError((prevFormError) => ({
              ...prevFormError,
              email: "Email or password are not correct"
            }));
          }
        })  
      }
      else{
        console.log("Form is not OK.");
      }
  };

  function validateForm(form) {
    const email = form["formEmail"];
    const password = form["formPass"];
  
    const newError = {
      email: email.validity.valid ? "" : 
      email.validity.valueMissing ? "Field required" : 
      "Entered text is not a proper email",

      password: password.validity.valid ? "" : "Field required"
    };
  
    setFormError(newError);
    return !newError.email && !newError.password;
  }

  function FormField({ label, controlId, type, placeholder, name, required, pattern, error }) {
    return (
      <FloatingLabel className="mb-3" label={label} controlId={controlId}>
        <Form.Control type={type} placeholder={placeholder} name={name} required={required} pattern={pattern} />
        <Form.Text className="small text-danger">
          {error}
        </Form.Text>
      </FloatingLabel>
    );
  }
  
    return (
      <Form className='mb-3' onSubmit={handleSubmit} ref={loginForm} noValidate>
        <FormField
        label="Email"
        controlId="loginEmail"
        type="email"
        placeholder="Enter email"
        name="formEmail"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        error={formError.email}
      />

      <FormField
        label="Password"
        controlId="loginPassword"
        type="password"
        placeholder="Password"
        name="formPass"
        required
        error={formError.password}
      />
        <Button variant="primary" type="submit" className='float-end'>
          Submit
        </Button>
      </Form>
    );
  }
  
  export default LoginForm;