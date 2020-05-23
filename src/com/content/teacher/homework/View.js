import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Edit, DeleteOutline } from "@material-ui/icons";
import Cookies from "js-cookie";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Grid,
  ListGroup,
  Box,
} from "bootstrap-4-react";
import moment from "moment";

import {
  renderCheckBox,
  renderTextBox,
  renderRadio,
  renderHidden,
  decrypt,
} from "../../../../lib/global/helpers";
import { contactRequest } from "../../../../lib/api/m/ContactApi";
import { classRequest } from "../../../../lib/api/m/ClassApi";
import { teacherClassRequest } from "../../../../lib/api/rel/TeacherClassApi";
import { studentClassRequest } from "../../../../lib/api/rel/StudentClassApi";
import { attendanceRequest } from "../../../../lib/api/mod/AttendanceApi";

import m_student from "../../../../lib/class/data/m_student";
import mod_attendance from "../../../../lib/class/data/mod_attendance";

const styles = (theme) => ({});
const formName = "gradeForm";

class View extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadSubjects();
  }

  loadSubjects = () => {
    var teacher = decrypt(Cookies.get("embose"));
    var classID = "";
    var tclass = null;

    teacherClassRequest("find", {
      name: "teacher_id",
      value: teacher._id,
    })
      .then((response) => {
        if (response.data.length == 0) {
          //alert("you dont have a class linked to you");
          //return false;
        }
        classID = response.data.class_id;
      })
      .then(() => {
        classRequest("retrieve", classID).then((response) => {
          tclass = response.data;
        });
      })
      .then(() => {
        contactRequest("retrieve", { userType: "student" }).then((response) => {
          let students = [];
          response.data.map((row, i) => {
            students.push(new m_student(row));
          });

          this.setState({ students: students });
        });
      })

      .catch((error) => console.log(error));
  };

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
          Student Marks
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              View Student Marks
            </Card.Subtitle>
            <Card.Text>Students marks are shown below</Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              View Marks
            </Card.Title>{" "}
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
