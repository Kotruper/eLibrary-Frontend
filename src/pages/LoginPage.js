import React, { StrictMode, useState } from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Container, Row, Col } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
//import { AuthContext } from "../utilities/AuthContext";
import bgImage from '../public/bg.jpg';

export default function LoginPage(){

  return(
    //<AuthContext.Provider>
      <Container fluid={true} className="h-100 align-items-center d-flex justify-content-center" 
      style={{
        backgroundImage: "url("+bgImage+")",
        height: "100vh"
      }}>
        <Row className="w-25 border shadow rounded p-3 bg-light">
          <Col>
            <Tabs
            defaultActiveKey="login"
            id="auth-tab"
            className="mb-3"
            fill
            >
              <Tab eventKey="login" title="Login">
                <LoginForm />
              </Tab>
              <Tab eventKey="register" title="Register">
                <RegisterForm />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    //</AuthContext.Provider>
  )
}