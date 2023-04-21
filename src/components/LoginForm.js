import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
import { loginUser } from '../utilities/tools';
import useToken from '../utilities/useToken';

function LoginForm() {
  const loginForm = useRef(null);
  const emptyErrorForm = {
    email:"",
    password:""
  };
  const [formError, setFormError] = useState(emptyErrorForm);
  const {token, setToken} = useToken();

  const handleSubmit = e => {
      e.preventDefault();
      const formFields = loginForm.current.elements;
      if(validateForm(formFields)){
        console.log("Form is OK. Send request and if status is ok redirect");

        loginUser(formFields["formEmail"].value, formFields["formPass"].value).then((token) =>{
          if (token) {
            //alert("Login & Password are correct! Token:\n" + token);
            setToken(token);
            //redirect to another page (previous page?)
          }
          else{
            const newFormError = {
              ...formError,
              email: "Email or password are not correct."
            };
            setFormError(newFormError);
          }
        })  
      }
      else{
        console.log("Form is not OK.");
      }
  };

  function validateForm(form){ //returns if form is valid, as a side effect updates form error messages
    let newError = {
      ...formError
    };

    const email = form["formEmail"];
    if(email.validity.valid){
      newError.email="";
    }
    else if(email.validity.valueMissing){
      newError.email="Field required";
    }
    else if(email.validity.patternMismatch){
      newError.email="Entered text is not a proper email";
    }

    const password = form["formPass"];
    if(password.validity.valid){
      newError.password="";
    }
    else if(password.validity.valueMissing){
      newError.password="Field required";
    }

    setFormError(newError);
    return (!newError.email && !newError.password); //TODO
  }
  
    return (
      <Form className='mb-3' onSubmit={handleSubmit} ref={loginForm} noValidate>
        <FloatingLabel className="mb-3" label="Email" controlId="loginEmail">
          <Form.Control type="email" placeholder="Enter email" name='formEmail' required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'/>
          <Form.Text className="small text-danger">
            {formError.email}
          </Form.Text>
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Password" controlId="loginPassword">
          <Form.Control type="password" placeholder="Password" name='formPass' required/>
          <Form.Text className="text-danger small">
            {formError.password}
          </Form.Text>
        </FloatingLabel>
        <Button variant="primary" type="submit" className='float-end'>
          Submit
        </Button>
      </Form>
    );
  }
  
  export default LoginForm;