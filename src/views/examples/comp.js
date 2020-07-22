import React from "react";
import { loadStripe } from '@stripe/stripe-js';
// reactstrap components
// import {
// } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";


let PRICE_ID = 'price_1H57JJLmMd2Skqx8f9Qi9hwK'

let SESSION_KEY = 'sk_test_51H4CPrLmMd2Skqx8VlOUBga8au0hNma6U5IKugedWAxARQ50F7CR9wXWraFY6U66PLlj1jnKqRKrHUfLO0VGiIBm00kHEV4zmk'

let CHECKOUT_KEY = 'pk_test_51H4CPrLmMd2Skqx8QxO2kAZdbdhmqeHHG99wLpEFXZbsCBIsALzsIP5SViqcwA2JXEjqvEGAHp4339oNvo6TkrCO00a4nPvFbc'

function startPurchase() {
  console.log('Start purchase!')
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: "Bearer "
    },
    body: JSON.stringify({payment_method_types:['card']})
  };
fetch("https://api.stripe.com/v1/checkout/sessions", {
  body: "success_url="+window.location+"&cancel_url="+window.location+"&payment_method_types[0]=card&line_items[0][price]="+PRICE_ID+"&line_items[0][quantity]=1&mode=payment",
  headers: {
    Authorization: "Bearer "+SESSION_KEY,
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST"
}).then((session) => {
    console.log("stripe response ", session)
    return session.json()}).then((session) => {
    console.log("stripe response ", session)
    const stripePromise = loadStripe(CHECKOUT_KEY)
    .then((stripe) => {
        console.log('requesting stripe redirect', session)
        let sessionId = session.id
        const { error } = stripe.redirectToCheckout({
          sessionId,
        }).catch((error) =>
        console.log(error))}).catch((error) =>
        console.log(error));
    }).catch(console.log)
}

// sections for this page

function Comp() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
    <div style={{backgroundColor: "#FFFFFF"}}>
    <ExamplesNavbar />
    <div className="wrapper">
      <div className="section section-about-us">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">Computational Methods for Engineers with MATLAB Applications</h2>
              <h4 className="title">ISBN: 978-0-9669601-5-7</h4>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    <TabPane tabId="pills2">
      <Col className="ml-auto mr-auto" md="8">
        <Row className="collections">
            <img
              alt="..."
              className="img-raised"
              href = "https://www.ferretpublish.com/computational-methods-for-engineers.html"
              src={require("assets/img/comp.jpg")}
            ></img>
          </Row>
          </Col>
    </TabPane>
    <Row>
      <Col className="ml-auto mr-auto text-center" md="8">
        <h3 align="center" className="title">Prices</h3>
        <h4 className="title">e-book $80</h4>
        <h4 className="title">Hard copy plus e-book $119.00</h4>
        <h3 className="title">Key Features</h3>
      </Col>
      <Col className="ml-auto mr-auto text-center" md="8">
      <img
        alt="..."
        align = "center"
        href = "https://www.ferretpublish.com/chemical-and-bio-process-control.html"
        src={require("assets/img/comptext.png")}
      ></img>
      </Col>
      </Row>
      <Row>
      <Col className="ml-auto mr-auto text-center" md="5">
      <h3 className="title">Table of Contents</h3>
      <img
        alt="..."
        align = "center"
        href = "https://www.ferretpublish.com/chemical-and-bio-process-control.html"
        src={require("assets/img/comptoc2.png")}
      ></img>
      </Col>
    </Row>
    <Row>
    <Col className="text-center ml-auto mr-auto" md = "2">
      <div className="send-button">
        <Button
          block
          className="btn-round"
          align-items="center"
          color="info"
          href="http://www.ferretpublish.com/"
          size="lg"
        >
          Purchase
        </Button>
      </div>
    </Col>
    </Row>
    </div>
  </>
);
}

export default Comp;
