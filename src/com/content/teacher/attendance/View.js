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
    this.toDate = null;
    this.fromDate = null;

    this.dateRange = [];
    this.state = { students: [], dateRange: [] };

    this.toDate = new Date();
    this.fromDate = new Date();

    this.toDate = moment(this.toDate).format("YYYY-MM-DD");
    this.fromDate.setDate(this.fromDate.getDate() - 7);
    this.fromDate = moment(this.fromDate).format("YYYY-MM-DD");
    this.props.dispatch(
      initialize(formName, { fromDate: this.fromDate, toDate: this.toDate })
    );

    this.months = new Array(12);
    this.months[0] = "Jan";
    this.months[1] = "Feb";
    this.months[2] = "Mar";
    this.months[3] = "Apr";
    this.months[4] = "May";
    this.months[5] = "Jun";
    this.months[6] = "Jul";
    this.months[7] = "Aug";
    this.months[8] = "Sep";
    this.months[9] = "Oct";
    this.months[10] = "Nov";
    this.months[11] = "Dec";

    this.attendance = [1, 0];
  }

  componentDidMount() {
    this.loadAttendance();
    this.iterateDates();
  }

  loadAttendance = () => {
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

  toDateChanged = (event) => {
    this.toDate = event.target.value;
    this.toDate = moment(this.toDate).format("YYYY-MM-DD");
    this.iterateDates();
  };

  fromDateChanged = (event) => {
    this.fromDate = event.target.value;
    this.fromDate = moment(this.fromDate).format("YYYY-MM-DD");
    this.iterateDates();
  };

  iterateDates = () => {
    var dates = [];
    for (
      var d = new Date(this.fromDate);
      d <= new Date(this.toDate);
      d.setDate(d.getDate() + 1)
    ) {
      var date = new Date(d);
      if (date.getDay() == 6 || date.getDay() == 0 || date > new Date()) {
      } else dates.push(new Date(d));
    }
    this.setState({ dateRange: dates });
    console.log(this.state.dateRange);
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
          Attendance
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              View Attendance
            </Card.Subtitle>
            <Card.Text>Students attendance is shown below</Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              View Attendance
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row mb="4">
                <Col col="sm-12 lg-4">
                  <Field
                    name="fromDate"
                    id="txtFromDate"
                    type="date"
                    label="Select from Date"
                    onChange={this.fromDateChanged.bind(this)}
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 lg-4">
                  <Field
                    name="toDate"
                    id="txtToDate"
                    type="date"
                    label="Select to Date"
                    onChange={this.toDateChanged.bind(this)}
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 ">
                  <Button
                    disabled={submitting}
                    primary
                    type="submit"
                    color="primary"
                    mr={2}
                    mt={2}
                  >
                    Search Attendance
                  </Button>
                </Col>
              </Row>
              <div class="table-responsive result-table-box">
                <table class="table display data-table text-nowrap">
                  <thead>
                    <tr>
                      <th>Name</th>
                      {this.state.dateRange.map((row, i) => (
                        <th>
                          {this.months[row.getMonth()] + " " + row.getDate()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.students.map((student, index) => (
                      <tr key={index}>
                        <td>
                          <strong>
                            {index + 1} .{" "}
                            {student.first_name + " " + student.last_name}
                          </strong>
                        </td>
                        {this.state.dateRange.map((row, i) => (
                          <td className="text-center">
                            {
                              this.attendance[
                                Math.floor(
                                  Math.random() * this.attendance.length
                                )
                              ]
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
})(withStyles(styles)(View));
