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
  renderSelect,
  decrypt,
} from "../../../../lib/global/helpers";
import { contactRequest } from "../../../../lib/api/m/ContactApi";
import { classRequest } from "../../../../lib/api/m/ClassApi";
import { teacherClassRequest } from "../../../../lib/api/rel/TeacherClassApi";
import { studentClassRequest } from "../../../../lib/api/rel/StudentClassApi";
import { attendanceRequest } from "../../../../lib/api/mod/AttendanceApi";
import { subjectRequest } from "../../../../lib/api/m/SubjectApi";
import { classSectionRequest } from "../../../../lib/api/m/ClassSectionApi";
import { marksRequest } from "../../../../lib/api/m/MarksApi";

import m_class_section from "../../../../lib/class/data/m_class_section";
import df_subject from "../../../../lib/class/data/df_subject";
import m_student from "../../../../lib/class/data/m_student";
import mod_attendance from "../../../../lib/class/data/mod_attendance";
import m_marks from "../../../../lib/class/data/m_marks";

const styles = (theme) => ({});
const formName = "gradeForm";

class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [], subjectSelect: [] };

    this.terms = [
      { id: "1", name: "Term 1" },
      { id: "2", name: "Term 2" },
      { id: "3", name: "Term 3" },
    ];
  }

  componentDidMount() {
    this.loadSubjects();
  }

  loadSubjects = () => {
    var teacher = decrypt(Cookies.get("embose"));
    var classID = "";
    var tclass = null;
    var sectionID = "";
    var subList = [];

    subjectRequest("retrieve")
      .then((response) => {
        response.data.map((row, i) => {
          subList.push({ id: row._id, name: row.subject });
        });
        this.setState({ subjectSelect: subList });
        console.log(this.state.subjectSelect);
      })
      .catch((error) => console.log(error));

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

        this.subjects = [];
        let subList = [];

        classSectionRequest("find", {
          name: "class_id",
          value: classID,
        })
          .then((response) => {
            subjectRequest("find", {
              name: "class_section_id",
              value: sectionID,
            })
              .then((response) => {
                response.data.map((row, i) => {
                  var section = this.sections.filter(
                    (val) => val._id == row.class_section_id
                  );
                  let clss = new df_subject(row);
                  clss.__section = section[0];
                  this.subjects.push(clss);
                  subList.push({ id: row._id, name: row.subject });
                });

                if (this.subjects.length == 0) return;
                this.loadGrades(this.subjects[0]._id);
              })
              .catch((error) => {
                throw error;
              });
          })
          .catch((error) => {
            throw error;
          });
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
    console.log(values);
    var date = new Date();
    for (var prop in values.marks) {
      var record = values.marks[prop];
      var marks = new m_marks();

      marks.student_id = prop;
      marks.class_id = "";
      marks.subject_id = values.subject_id;
      marks.marks = record.marks;
      marks.term = values.term;
      marks.date = new Date();
      marks.grade_id = "";
      marks.created_date = new Date();
      marks.created_user_id = "";
      marks.modified_date = new Date();
      marks.modified_user_id = "";

      marksRequest("add", marks);
    }

    alert("marks are saved");
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
          Student Marks
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              Enter Student Marks
            </Card.Subtitle>
            <Card.Text>Students marks are shown below</Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Enter Marks
            </Card.Title>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6" mt={2}>
                  <Field
                    name="term"
                    required="required"
                    type="text"
                    id="cmbTerm"
                    label="Select Term"
                    smalltext="Select the term for this marks"
                    items={this.terms}
                    component={renderSelect}
                  />
                </Col>
                <Col col="sm-12 md-10 lg-6" mt={2}>
                  <Field
                    name="subject_id"
                    required="required"
                    type="text"
                    id="cmbSubject"
                    label="Select Subject"
                    smalltext="Select subject from desired section"
                    items={this.state.subjectSelect}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <hr />
              <h5>Students</h5>
              <Row>
                <Col col="sm-12 md-10 lg-6">
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
                              name={"marks[" + student._id + "][marks]"}
                              id={"chkMarks-" + student._id}
                              type="number"
                              required="required"
                              min="0"
                              max="100"
                              label="Enter Marks"
                              component={renderTextBox}
                            />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
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
                Save Marks
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
})(withStyles(styles)(Enter));
