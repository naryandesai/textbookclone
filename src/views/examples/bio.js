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
  Card,
  CardBody,
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
        <h4 className="title">Retail Price: $95.00</h4>
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
  <Col className="text-center ml-auto mr-auto" md = "8">
  <h3 className="title">Testimonials</h3>
  <Card>
        <CardBody>
          <blockquote>
            <p>
            "We have used Chemical and Bio-Process Control by Riggs and Karim for
            several years for our senior course in Process Dynamics and Control at
            Iowa.  Both the students and the instructors have appreciated the book
            for its straightforward and practical presentation of control theory and
            application.  The sections on hardware and PID tuning tie in nicely with
            our laboratory.  The well-written prose and simple, yet effective graphs
            of system dynamical responses are strengths of the book.  Finally,
            teaching feedforward and combined feedforward-feedback control is much
            more effective using the excel simulator provided with the textbook."
            </p>
            <footer>
              Charles Stanier, <cite title="Source Title">University of Iowa</cite>
            </footer>
          </blockquote>
        </CardBody>
      </Card>
      <Card>
            <CardBody>
              <blockquote>
                <p>
                "This book is written for the Chemical Engineer that needs to learn
                Process Control for a future career working with Control in an
                industrial facility.   The text has an excellent mix of the
                theoretical and practical.  The provided Powerpoint slides also are
                an excellent basis for giving lectures with this textbook as the
                required text."
                </p>
                <footer>
                  Brian P. Grady, <cite title="Source Title">University of Oklahoma</cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
          <Card>
                <CardBody>
                  <blockquote>
                    <p>
                    “Chemical and Bio-Process Control provides a good balance of industrially relevant practical and theoretical concepts, providing the foundation for teaching undergraduates the fundamentals of process dynamics and control.
                    The textbook is filled with examples of classic chemical process control and bio-process control problems to help engage students with different career interests.”
                    </p>
                    <footer>
                      Delmar Timms, <cite title="Source Title">University of Nebraska, Lincoln</cite>
                    </footer>
                  </blockquote>
                </CardBody>
              </Card>
              <Card>
                    <CardBody>
                      <blockquote>
                        <p>
                        “I have taught a course on process controls four times using your text. I like the logical organization, clear writing, and a nicely balanced coverage of topics. These latter include the history of process control, key technologies such as the control valve, a reasonable coverage of Laplace transforms and a very insightful coverage of dynamic responses with PID control.
                        The structure of the text and supporting material help both the instructor and student.
                        I give it very strong recommendation.
                        I plan to continue using the text and want to do an online version.”
                        </p>
                        <footer>
                          Clint Williford, <cite title="Source Title">University of Mississippi</cite>
                        </footer>
                      </blockquote>
                    </CardBody>
                  </Card>
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
