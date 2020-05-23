import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core/";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import {
  renderTextBox,
  renderCheckBox,
  renderHidden,
  renderSelect,
} from "../../../../lib/global/helpers";

const styles = (theme) => ({});
const formName = "notificationsForm";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.refHeader = React.createRef();
    this.selectUserTypes = [
      { id: "admin", name: "admin" },
      { id: "teacher", name: "teacher" },
      { id: "parent", name: "parent" },
      { id: "student", name: "student" },
    ];
  }

  onSubmit = async (values, dispatch) => {
    const FIREBASE_API_KEY =
      "AAAAWU8KgXE:APA91bGKaDTBI4K0y9xtaJjo_n4viExRugOn8INw5axNk6lzul_XGtPnY0a9Bl_1CXT62T0eyKWigOIffQQJWFfVwlRdaVGF7KOELrxJdTM_6YQh_0_N8gnolHqhrKgTM80UInTPw9JK";
    const message = {
      registration_ids: [
        "cdgbEFZkAVuWzSx0K1aTxU:APA91bEAUtRjcmTRVFb68dD9qyIhaQvuI_VMtNtNZdTuFSD9M1tdtHwQcsFFtct0JAzKsLlscZkvgQVoZNH3xDsHxTPQrJhsUpC7aZCBDOXd_gtl15-JX3SuEcblrKwWQ1w4LEQrSlTR",
      ],
      notification: {
        title: values.title,
        body: values.body,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        click_action: values.action,
        priority: "high",
        content_available: true,
      },
      data: {
        body: "Buzz! Buzz!",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
      },
    };

    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "key=" + FIREBASE_API_KEY,
    });

    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    });
    response = await response.json();
    console.log(response.results);
  };

  render() {
    const { classes, handleSubmit, submitting, reset } = this.props;
    return (
      <div>
        <Typography
          component="h1"
          variant="h5"
          align="left"
          ref={this.refHeader}
        >
          Send notifications
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              notifications
            </Card.Subtitle>
            <Card.Text>notifications can be sent to the other users.</Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Message
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="type"
                    required="required"
                    id="cmbUserType"
                    label="Select User Group"
                    smalltext="Select the user group from the list"
                    items={this.selectUserTypes}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="title"
                    required="required"
                    type="text"
                    id="txtTitle"
                    label="Message Title"
                    placeholder="Title"
                    smalltext="Enter the title which needs to be displayed"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="body"
                    required="required"
                    type="text"
                    id="txtMessage"
                    label="Message Body"
                    placeholder="Message"
                    smalltext="Enter the message here"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="click_action"
                    type="text"
                    id="txtAction"
                    label="The action URL"
                    placeholder="Action"
                    smalltext="Enter the URL which needs to opened from message"
                    component={renderTextBox}
                  />
                </Col>
              </Row>

              <Button
                disabled={submitting}
                primary
                type="submit"
                color="primary"
                mr={2}
                mt={2}
              >
                Send Message
              </Button>
              <Button
                secondary
                type="reset"
                color="secondary"
                mr={2}
                mt={2}
                onClick={reset}
              >
                Restart
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  form: formName,
})(withStyles(styles)(Notification));
