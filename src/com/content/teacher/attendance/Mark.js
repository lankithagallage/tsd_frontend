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

import {
  renderCheckBox,
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

class Mark extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents = () => {
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

  onSubmit = (values, dispatch) => {
    var date = new Date();
    for (var prop in values) {
      var record = values[prop];
      var att = new mod_attendance();
      att.date = date;
      att.studentID = prop;
      att.attended = record.attended;
      att.authorized_absence = record.authorized_absence;
      attendanceRequest("add", att);
    }
    alert("Attendance Added for Today");
    window.location.reload();
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
          Attendance
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              Mark Attendance{" "}
              <strong>
                (
                {new Date().getDate() +
                  "-" +
                  new Date().getMonth() +
                  "-" +
                  new Date().getFullYear()}
                )
              </strong>
            </Card.Subtitle>
            <Card.Text>mark atendacne of class students</Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <div class="item-title">
              <h3>My Students</h3>
            </div>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <ListGroup mb="3">
                {this.state.students.map((student, index) => (
                  <ListGroup.Item
                    key={index}
                    display="flex"
                    justifyContent="between"
                  >
                    <strong>
                      {index + 1} .{" "}
                      {student.first_name + " " + student.last_name}
                    </strong>
                    <Row style={{ float: "right" }}>
                      <Col>
                        <Field
                          name={student._id + "[attended]"}
                          id={"chkAtt-" + student._id}
                          type="checkbox"
                          label="Present"
                          component={renderCheckBox}
                        />
                      </Col>
                      <Col>
                        <Field
                          name={student._id + "[authorized_absence]"}
                          id={"chkAuth-" + student._id}
                          type="checkbox"
                          label="Is Auth"
                          component={renderCheckBox}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Button
                disabled={submitting}
                primary
                type="submit"
                color="primary"
                mr={2}
                mt={2}
              >
                Save Attendance for today
              </Button>
              <Button
                secondary
                type="reset"
                color="secondary"
                mt={2}
                onClick={reset}
              >
                Clear changes
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
})(withStyles(styles)(Mark));
