import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
import { registerUser } from '../utilities/tools';
import useToken from '../utilities/useToken';
import { useNavigate } from 'react-router';

function RegisterForm() {
  const registerForm = useRef(null);
  const emptyErrorForm = {
    email:"",
    password:"",
    repeatPass:""
  };
  const [formError, setFormError] = useState(emptyErrorForm);
  const {token, setToken} = useToken();
  const navigate = useNavigate();

  const handleSubmit = e => {
      e.preventDefault();
      const formFields = registerForm.current.elements;
      if(validateForm(formFields)){
        console.log("send request and if status is ok redirect");
        registerUser(formFields["formEmail"].value, formFields["formPass"].value).then((token) =>{
          if (token) {
            //alert("Login & Password are correct! Token:\n" + token);
            setToken(token);
            navigate("/"); //redirect to another page (previous page?)
          }
          else{
            setFormError((prevFormError) => ({
              ...prevFormError,
              email: "This email was already taken!"
            }));
          }
        })  
      }
  };

  function validateForm(form) {
    const email = form["formEmail"];
    const password = form["formPass"];
    const repeatPass = form["formRepeatPass"];
  
    const newError = {
      email: email.validity.valid ? "" : 
      email.validity.valueMissing ? "Field required" : 
      "Entered text is not a proper email",

      password: password.validity.valid ? "" :
      "Field required",

      repeatPass: ((repeatPass.value === password.value)) ? "" : 
      "Field doesn't match password"
    };
    setFormError(newError);
    return (!newError.email && !newError.password && !newError.repeatPass);
  }

  function FormField({ label, controlId, type, placeholder, name, required, pattern, error, minLength, maxLength}) {
    return (
      <FloatingLabel className="mb-3" label={label} controlId={controlId}>
        <Form.Control type={type} placeholder={placeholder} name={name} required={required} pattern={pattern} minLength={minLength} maxLength={maxLength} />
        <Form.Text className="small text-danger">
          {error}
        </Form.Text>
      </FloatingLabel>
    );
  }
  
    return (
      <Form className='mb-3' onSubmit={handleSubmit} ref={registerForm} noValidate>
        <FormField
        label="Email"
        controlId="registerEmail"
        type="email"
        placeholder="Enter email"
        name="formEmail"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        error={formError.email}
      />

      <FormField
        label="Password"
        controlId="registerPassword"
        type="password"
        placeholder="Password"
        name="formPass"
        required
        minLength={6}
        maxLength={40}
        error={formError.password}
      />

      <FormField
        label="Repeat Password"
        controlId="registerRepeat"
        type="password"
        placeholder="Repeat Password"
        name="formRepeatPass"
        required
        minLength={6}
        maxLength={40}
        error={formError.repeatPass}
      />
        <Button variant="primary" type="submit" className='float-end'>
          Submit
        </Button>
      </Form>
    );
  }
  
  export default RegisterForm;