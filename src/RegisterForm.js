import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postJSON } from './tools';
import { useRef, useState } from 'react';

function RegisterForm() {
  const registerForm = useRef(null);
  const emptyErrorForm = {
    email:"",
    password:"",
    repeatPass:""
  };
  const [formError, setFormError] = useState(emptyErrorForm);

  const handleSubmit = e => {
      e.preventDefault();
      const form = registerForm.current;
      if(validateForm(form)){
        console.log("send request and if status is ok redirect");
      }
  };

  function validateForm(form){
    let newError = {
      ...formError
    };

    const email = form.elements["formEmail"];
    if(email.validity.valid){
      newError.email = "";
    }
    else if(email.validity.valueMissing){
      newError.email = "Field required";
    }
    else if(email.validity.patternMismatch){
      newError.email = "Entered text is not a proper email";
    }

    const password = form.elements["formPass"];
    if(password.validity.valid){
      newError.password = "";
    }
    else if(password.validity.valueMissing){
      newError.password = "Field required";
    }

    const repeatPass = form.elements["formRepeatPass"];
    if(!(repeatPass.value === password.value)){
      newError.repeatPass = "Field doesn't match password";
    }
    else if(repeatPass.validity.valid){
      newError.repeatPass = ""
    }

    setFormError(newError);
    return (!newError.email && !newError.password && !newError.repeatPass); //TODO
  }
  
    return (
      <Form className='mb-3' onSubmit={handleSubmit} ref={registerForm} noValidate>
        <FloatingLabel className="mb-3" label="Email" controlId="registerEmail">
          <Form.Control type="email" placeholder="Enter email" name='formEmail' required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' maxLength={40}/>
          <Form.Text className="text-danger small">
            {formError.email}
          </Form.Text>
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Password" controlId="registerPassword">
          <Form.Control type="password" placeholder="Password" name='formPass' required minLength={6} maxLength={40}/>
          <Form.Text className="text-danger small">
            {formError.password}
          </Form.Text>
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Repeat Password" controlId="registerRepeat">
          <Form.Control type="password" placeholder="Repeat Password" name='formRepeatPass' required/>
          <Form.Text className="text-danger small">
            {formError.repeatPass}
          </Form.Text>
        </FloatingLabel>
        <Button variant="primary" type="submit" className='float-end'>
          Submit
        </Button>
      </Form>
    );
  }
  
  export default RegisterForm;