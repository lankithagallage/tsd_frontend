import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";
import { Field, reduxForm, reset, initialize, FormSection } from "redux-form";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  InputGroup,
} from "bootstrap-4-react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Edit, DeleteOutline, ThreeDRotationSharp } from "@material-ui/icons";

import m_class_section from "../../../../lib/class/data/m_class_section";
import m_class from "../../../../lib/class/data/m_class";
import m_student from "../../../../lib/class/data/m_student";
import m_teacher from "../../../../lib/class/data/m_teacher";
import rel_teacher_class from "../../../../lib/class/data/rel_teacher_class";
import rel_student_class from "../../../../lib/class/data/rel_student_class";

import { classSectionRequest } from "../../../../lib/api/m/ClassSectionApi";
import { classRequest } from "../../../../lib/api/m/ClassApi";
import { teacherClassRequest } from "../../../../lib/api/rel/TeacherClassApi";
import { studentClassRequest } from "../../../../lib/api/rel/StudentClassApi";
import { contactRequest } from "../../../../lib/api/m/ContactApi";

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionSelect: [],
      classSelect: [],
      teacherSelect: [],
      studentSelect: [],
      classStudents: [],
      classTeacher: new rel_teacher_class(),
      selectedClass: null,
    };

    this.sections = [];
    this.classes = [];
    this.teachers = [];
  }

  loadData() {
    let sectionSelect = [];
    this.sections = [];
    classSectionRequest("retrieve")
      .then((response) => {
        this.sections = response.data;
        this.sections.map((row, i) => {
          sectionSelect.push({ id: row._id, name: row.grade });
        });

        this.setState({ sectionSelect: sectionSelect });

        if (this.sections.length == 0) return;
        this.loadClasses(this.sections[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });

    let teacherSelect = [];
    this.teachers = [];
    contactRequest("retrieve", { userType: "teacher" })
      .then((response) => {
        this.teachers = response.data;
        this.teachers.map((row, i) => {
          teacherSelect.push({
            id: row._id,
            name: row.first_name + " " + row.last_name,
          });
        });
        this.setState({ teacherSelect: teacherSelect });
      })
      .catch((error) => {
        console.log(error);
      });

    let studentSelect = [];
    this.students = [];
    contactRequest("retrieve", { userType: "student" })
      .then((response) => {
        this.students = response.data;
        this.students.map((row, i) => {
          studentSelect.push({
            id: row._id,
            name:
              "(Reg#:" +
              row.reg_no +
              ") " +
              row.first_name +
              " " +
              row.last_name,
          });
        });
        this.setState({ studentSelect: studentSelect });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  onSectionChange = (event) => {
    let id = event.target.value;
    this.loadClasses(id);
  };

  onClassChange = (event) => {
    let id = event.target.value;
    this.loadClassData(id);
  };

  loadClasses(sectionID) {
    let classSelect = [];
    this.classes = [];
    classRequest("find", {
      name: "class_section_id",
      value: sectionID,
    })
      .then((cresponse) => {
        cresponse.data.map((row, i) => {
          var section = this.sections.filter(
            (val) => val._id == row.class_section_id
          );
          let clss = new m_class(row);
          clss.__section = new m_class_section(section);
          classSelect.push({ id: row._id, name: row.class_name });
          this.classes.push(clss);
        });

        this.setState({ classSelect: classSelect });
        if (this.classes.length == 0) return;
        this.loadClassData(this.classes[0]._id);
      })
      .catch((error) => {
        throw error;
      });
  }

  loadClassData(classID) {
    var selClass = this.classes.filter((val) => val._id == classID);
    this.setState({ selectedClass: selClass[0] });
    studentClassRequest("find", {
      name: "class_id",
      value: classID,
    })
      .then((response) => {
        let students = [];
        response.data.map((row, i) => {
          let st = new rel_student_class(row);
          let s = this.students.filter((s) => s._id === row.student_id)[0];
          st.__student = new m_student(s);
          console.log(s);
          students.push(st);
        });
        this.setState({ classStudents: students });
      })
      .catch((error) => {
        console.log(error);
      });

    teacherClassRequest("find", {
      name: "class_id",
      value: classID,
    })
      .then((response) => {
        let teachers = [];
        response.data.map((row, i) => {
          teachers.push(new rel_teacher_class(row));
        });
        let teacher =
          teachers.length > 0 ? teachers[0] : new rel_teacher_class();
        this.setState({ classTeacher: teacher });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onClassTeacherChange(values) {
    let id = values.target.value;

    let selTecher = this.state.classTeacher;
    console.log(this.state.selectedClass);
    selTecher.teacher_id = id;
    selTecher.class_id = this.state.selectedClass._id;
    console.log(selTecher);
    this.setState({ classTeacher: selTecher });
  }

  addStudentToList(values) {
    let select = document.getElementById("chkSelectClassStudent");
    let selectd = this.state.classStudents;
    var found = selectd.filter((val) => val.student_id === select.value);
    if (found == null || found.length == 0) {
      selectd.push(
        new rel_student_class({
          student_id: select.value,
          class_id: this.state.selectedClass._id,
          reg_date: Date(),
          end_date: null,
          __student: this.students.filter((s) => s._id === select.value)[0],
        })
      );
      this.setState({ classStudents: selectd });
    }
  }

  removeStudent(value) {
    console.log(value);
    let selectd = this.state.classStudents;
    var found = selectd.filter((val) => val.student_id == value);
    if (found.length > 0) {
      if (found[0]._id != "" && found[0]._id != undefined) {
        found[0].end_date = Date();
      } else {
        let index = this.students.findIndex((val) => val._id == value);
        if (index == null || index != -1) selectd.splice(index, 1);
      }
    }

    this.setState({ classStudents: selectd });
  }

  onSubmit = () => {
    if (this.state.classStudents.length == 0) alert("Please select a students");
    else if (this.state.classTeacher == undefined)
      alert("Please select a class teacher");
    else {
      let path = this.state.classTeacher._id !== "" ? "update" : "add";
      teacherClassRequest(path, this.state.classTeacher)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));

      this.state.classStudents.map((student) => {
        let p =
          student._id !== "" && student._id != undefined ? "update" : "add";
        studentClassRequest(p, student)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      });
    }
  };

  render() {
    const { classes, handleSubmit, submitting, reset } = this.props;

    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Enroll students to classes
        </Typography>

        <Card mt={4}>
          <Card.Body>
            <Row>
              <Col col="sm-12 md-6">
                <Form.Group>
                  <label htmlFor="chkSelectSection">Select Section</label>
                  <Form.Select
                    id="chkSelectSection"
                    onChange={this.onSectionChange.bind(this)}
                  >
                    {this.state.sectionSelect.map((item, i) => (
                      <option value={item.id} key={i}>
                        {item.name}
                      </option>
                    ))}
                    ;
                  </Form.Select>
                  <Form.Text text="muted" xs={12} md={6}>
                    Select section to load inherited classes
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col col="sm-12 md-6">
                <Form.Group>
                  <label htmlFor="chkSelectClass">Select a class</label>
                  <Form.Select
                    id="chkSelectClass"
                    onChange={this.onClassChange.bind(this)}
                  >
                    {this.state.classSelect.map((item, i) => (
                      <option value={item.id} key={i}>
                        {item.name}
                      </option>
                    ))}
                    ;
                  </Form.Select>
                  <Form.Text text="muted" xs={12} md={6}>
                    Select class to load inherited students
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Typography component="h4" variant="h4">
              2020
            </Typography>
            <Card.Subtitle mb="2" text="muted">
              Class Information
            </Card.Subtitle>
            <Row>
              <Col col="sm-12 md-6">
                <Form.Group>
                  <label htmlFor="chkSelectClasTeacher">Class Teacher</label>
                  <Form.Select
                    id="chkSelectClasTeacher"
                    onChange={this.onClassTeacherChange.bind(this)}
                  >
                    {this.state.teacherSelect.map((item, i) => (
                      <option
                        value={item.id}
                        key={i}
                        selected={
                          item.id === this.state.classTeacher.teacher_id
                            ? "selected"
                            : ""
                        }
                      >
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col col="sm-12 md-6">
                <Form.Group>
                  <label htmlFor="chkSelectClasTeacher">Add Student</label>
                  <InputGroup mb="3">
                    <Form.Select id="chkSelectClassStudent">
                      {this.state.studentSelect.map((item, i) => (
                        <option value={item.id} key={i}>
                          {item.name}
                        </option>
                      ))}
                      ;
                    </Form.Select>
                    <InputGroup.Append>
                      <Button
                        primary
                        onClick={this.addStudentToList.bind(this)}
                      >
                        + add
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col col="sm-12 md-6 lg-3">
                <Typography variant="h6" component="h6" className="mb-2">
                  Class Students
                </Typography>
                <ListGroup>
                  {this.state.classStudents.map((e, i) =>
                    e.end_date == null ||
                    e.end_date == undefined ||
                    e.end_date > new Date() ? (
                      <ListGroup.Item key={i}>
                        {i + 1}.{" "}
                        {e.__student.first_name + " " + e.__student.last_name}
                        <DeleteOutline
                          className="float-right"
                          onClick={this.removeStudent.bind(this, e.student_id)}
                        />
                      </ListGroup.Item>
                    ) : null
                  )}
                </ListGroup>
              </Col>
            </Row>
            <Button
              disabled={submitting}
              primary
              type="submit"
              color="primary"
              onClick={this.onSubmit.bind(this)}
              mr={2}
              mt={2}
            >
              Save class detais
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Classes;
