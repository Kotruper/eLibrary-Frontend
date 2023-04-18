import React, { StrictMode, useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Container, Row, Col } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

export default function LoginPage(){

  return(
    <AuthContext.Provider>
      <Container fluid={true} className="h-100 align-items-center d-flex justify-content-center" 
      style={{
        backgroundImage: "url('/bg.jpg'))", //czemu to nie działa
        height: "100vh"
      }}>
        <Row className="w-25 border shadow rounded p-3">
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
    </AuthContext.Provider>
  )
}