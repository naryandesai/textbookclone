import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row
} from "reactstrap";
import  CognitoAuth  from "../../cognito/index.js";

// core components

function register() {
  var email = document.getElementById("email").value
  var login = document.getElementById("login").value
  var password = document.getElementById("password").value
  console.log(email, login, password)
  CognitoAuth.signup(login, email, password, e => console.log(e));
  document.getElementById("confirmation").style.visibility = "visible";
  document.getElementById("confirmationbutton").style.visibility = "visible";
}

function status_confirmation(e) {
  if(!e){
  document.getElementById("confstatus").innerHTML = "Confirmed!"}
  else{
  document.getElementById("confstatus").innerHTML = JSON.stringify(e)}
}

function confirm() {
  var confirmation = document.getElementById("confirmation").value
  var login = document.getElementById("login").value
  console.log(confirmation, login)
  CognitoAuth.confirmRegistration(login, confirmation, e => status_confirmation(e));

}

function SignUp() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  return (
    <>
      <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="blue">
              <Form action="" className="form" method="">
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Sign Up
                  </CardTitle>
                  <div className="social-line">

                  </div>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Login..."
                      id="login"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password..."
                      type="password"
                      id="password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email..."
                      type="text"
                      id="email"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    color="info"
                    onClick={e => register()}
                    size="lg"
                  >
                    Get Started
                  </Button>
                  <Input
                      placeholder="Confirmation code..."
                      type="text"
                      style={{
                        visibility: "hidden"
                      }}
                      id="confirmation"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    ></Input>
                  <Button
                    className="btn-neutral btn-round"
                    id="confirmationbutton"
                    color="info"
                      style={{
                        visibility: "hidden"
                      }}
                    onClick={e => confirm()}
                    size="lg"
                  >
                    Confirm account
                  </Button>
                  <div id="confstatus"> </div>
                </CardFooter>
              </Form>
            </Card>
          </Row>
          <div className="col text-center">
            <Button
              className="btn-round btn-white"
              color="default"
              to="/login-page"
              outline
              size="lg"
              tag={Link}
            >
              View Login Page
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SignUp;
