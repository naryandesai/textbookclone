import React from "react";
import { loadStripe } from '@stripe/stripe-js';

// reactstrap components
// import {
// } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import  CognitoAuth  from "cognito/index.js";

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

let amount = 0;


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
    console.log(process.env)
  fetch("https://api.stripe.com/v1/checkout/sessions", {
    body: "success_url="+window.location+"&cancel_url="+window.location+"&payment_method_types[0]=card&line_items[0][name]='Online edition of book '&line_items[0][currency]=usd&line_items[0][amount]=9900&line_items[0][quantity]=1&mode=payment",
    headers: {
      Authorization: "Bearer "+process.env.REACT_APP_SESSION_KEY,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  }).then((session) => {
      console.log("stripe response ", session)
      return session.json()}).then((session) => {
      console.log("stripe response ", session)
      const stripePromise = loadStripe(process.env.REACT_APP_CHECKOUT_KEY)
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
  try{
    let user = (CognitoAuth.getCurrentUser())
    let email = '';
    console.log(user)
    let user_attributes = JSON.parse(user.storage['CognitoIdentityServiceProvider.4hj4872ba7c14i22oe9k5304mv.'+user.username+'.userData'])['UserAttributes']
    for(var attribute in user_attributes) {
        console.log(user_attributes[attribute])
        if(user_attributes[attribute].Name == 'email') {
            email = user_attributes[attribute].Value
        }
    }
    const url = "https://api.stripe.com/v1/customers?email="+email;

    const options = {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_SESSION_KEY
      }
    };

    fetch(url, options)
      .then( res => res.json() )
      .then( data =>  {
        console.log(data)
        var id = (data.data[0].id)
        console.log('CHARGE', id)
        fetch("https://api.stripe.com/v1/charges?customer="+id+"&limit=20", options)
          .then( res => res.json() )
          .then( data =>  {
            console.log('data', data)
            let found = false
            for(var charge in (data.data)) {
                var charge = data.data[charge]
                console.log('CHARGE ', charge)
                console.log('charge ', charge)
                var potential_amount = charge.amount - charge.amount_refunded
                if((potential_amount == 9900 || potential_amount == 4000)) {
                    amount = potential_amount
                    found = true
                }
                if((potential_amount == 4000)) {
                    document.getElementById("purchase").style.display = "block";
                }
            }
            console.log('charge ', found)
            if(!found) {
                document.getElementById("read").style.display = "none";
                document.getElementById("purchase").style.display = "block";
            } else {
                     console.log('hidin ')

                document.getElementById("read").style.display = "block";
                document.getElementById("purchase").style.display = "none";
                }})})
    } catch (err) {
      console.log(err)
    }

  return (
    <>
    <div style={{backgroundColor: "#FFFFFF"}}>
    <ExamplesNavbar />
    <div className="wrapper" style={{backgroundColor: "#FFFFFF"}}>
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
          id="purchase"
          className="btn-round"
          align-items="center"
          onClick={startPurchase}
          color="info"
          size="lg"
        >
          Purchase
        </Button>
        <Button
          block
          id='read'
          style ={{display:'none'}}
          className="btn-round"
          align-items="center"
          href='/pdf-file#/pdf-file'
          color="info"
          size="lg"
        >
          Read
        </Button>
      </div>
    </Col>
    </Row>
    </div>
  </>
);
}

export default Bioprocess;
