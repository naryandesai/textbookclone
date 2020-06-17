import React from "react";

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

// sections for this page

function Bioprocess() {
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
    <ExamplesNavbar />
    <div className="wrapper">
      <div className="section section-about-us">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">Chemical and Bio-Process Control</h2>
              <h4 className="description">
                by Jim Riggs
              </h4>
              <h4 className="title">ISBN: 978-0-0966 9601-4-3</h4>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    <TabPane tabId="pills2">
      <Col className="ml-auto mr-auto text-center" md="7">
        <Row className="collections">
            <img
              alt="..."
              className="img-raised"
              href = "https://www.ferretpublish.com/chemical-and-bio-process-control.html"
              src={require("assets/img/process.jpg")}
            ></img>
          </Row>
          </Col>
    </TabPane>
    <Row>
      <Col className="ml-auto mr-auto text-center" md="8">
        <h4 className="title">Retail Price: $95</h4>
        <h3 align="center" className="title">Key Features</h3>
      </Col>
      <Col className="ml-auto mr-auto text-center" md="8">
      <img
        alt="..."
        align = "center"
        href = "https://www.ferretpublish.com/chemical-and-bio-process-control.html"
        src={require("assets/img/biotext.png")}
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
      src={require("assets/img/biotoc.png")}
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
  </>
);
}

export default Bioprocess;
