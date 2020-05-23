import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Edit, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button, Grid } from "bootstrap-4-react";

import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
  renderHidden,
} from "../../../../lib/global/helpers";

const styles = (theme) => ({});
const formName = "gradeForm";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  componentDidMount() {
    this.loadSections();
  }

  onSubmit = (values, dispatch) => {};

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
          Grades
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              Mark Attendance
            </Card.Subtitle>
            <Card.Text>
              All the usable sujects for the specified grades are listed below.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Grade
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}></form>
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
})(withStyles(styles)(View));
