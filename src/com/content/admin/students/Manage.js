import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";
import { Field, reduxForm, reset, initialize, FormSection } from "redux-form";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
  renderRadio,
  renderHidden,
} from "../../../../lib/global/helpers";
import m_student from "../../../../lib/class/data/m_student";
import Contact from "../__common/Contact";
import { contactRequest } from "../../../../lib/api/m/ContactApi";

const styles = (theme) => ({});
const formName = "studentsForm";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, rows: [], filter: "reg_no" };
    this.refHeader = React.createRef();
    this.refSearch = React.createRef();
    const student = new m_student();
    this.props.dispatch(initialize(formName, student));
  }

  onSearch = (value) => {
    let students = [];
    this.setState({ isLoading: true });
    if (value.length < 4) return;
    contactRequest("find", {
      userType: "student",
      name: this.state.filter,
      value: value,
    })
      .then((response) => {
        response.data.map((row, i) => {
          students.push({
            id: row._id,
            filter: row[this.state.filter],
            name: row.first_name,
          });
        });
        console.log(students);
        this.setState({ rows: students, isLoading: false });
      })
      .catch((error) => {
        throw error;
      });
  };

  searchSelect = (values) => {
    if (values === undefined) return;
    contactRequest("retrieveByID", { userType: "student", _id: values[0].id })
      .then((response) => {
        const data = response.data;
        const student = new m_student(data);
        this.props.dispatch(initialize(formName, student));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeFilter = (event) => {
    console.log(event.target.value);

    this.setState({ filter: event.target.value });
  };

  onSubmit = (values, dispatch) => {
    values.userType = "student";
    let path = values._id !== "" ? "update" : "add";
    contactRequest(path, values)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);

        dispatch(reset(formName));
        this.refSearch.current.clear();
        const student = new m_student();
        this.props.dispatch(initialize(formName, student));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes, handleSubmit, submitting, reset } = this.props;

    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Studetns
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              student accounts
            </Card.Subtitle>
            <Card.Text>
              The students are listed below, the users who have the student
              privileges.
            </Card.Text>
            <Row>
              <Col col="sm-10 md-6">
                <AsyncTypeahead
                  id="typeSearch"
                  isLoading={this.state.isLoading}
                  onSearch={this.onSearch}
                  onChange={this.searchSelect}
                  labelKey={(option) => `(${option.filter}) ${option.name}`}
                  ref={this.refSearch}
                  options={this.state.rows}
                  placeholder="who do you want to search?"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col col="sm-12">
                <Form.Group>
                  <Form.Check inline>
                    <Form.Radio
                      id="radioRegNo"
                      name="search_filter"
                      value="reg_no"
                      checked={
                        this.state.filter === "reg_no" ? "checked" : null
                      }
                      onChange={this.changeFilter.bind(this)}
                    />
                    <Form.CheckLabel htmlFor="radioRegNo">
                      Reg #
                    </Form.CheckLabel>
                  </Form.Check>
                  <Form.Check inline>
                    <Form.Radio
                      id="radioNIC"
                      name="search_filter"
                      value="nic"
                      checked={this.state.filter === "nic" ? "checked" : null}
                      onChange={this.changeFilter.bind(this)}
                    />
                    <Form.CheckLabel htmlFor="radioNIC">NIC</Form.CheckLabel>
                  </Form.Check>
                  <Form.Check inline>
                    <Form.Radio
                      id="radioPhone"
                      name="search_filter"
                      value="phone"
                      checked={this.state.filter === "phone" ? "checked" : null}
                      onChange={this.changeFilter.bind(this)}
                    />
                    <Form.CheckLabel htmlFor="radioPhone">
                      Phone
                    </Form.CheckLabel>
                  </Form.Check>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Student
            </Card.Title>
            <hr />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row mb="2">
                <Col col="sm-12">
                  <Typography component="h6" variant="h6" align="left">
                    Identification
                  </Typography>
                </Col>
              </Row>

              <Field
                name="_id"
                id="txtID"
                type="hidden"
                component={renderHidden}
              />

              <FormSection name="">
                <Contact type="student" />
              </FormSection>

              <Row>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="reg_no"
                    type="text"
                    required="required"
                    id="txtRegno"
                    label="Registration Number"
                    placeholder="Registration Number"
                    smalltext="Enter the registration number of the student"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="reg_date"
                    type="date"
                    required="required"
                    id="txtRegistrationDate"
                    label="Registration Date"
                    placeholder="Registration Date"
                    smalltext="Enter date of registration"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="end_date"
                    type="date"
                    id="txtRegistrationEnd"
                    label="Registration End Date"
                    placeholder="Registration End Date"
                    smalltext="Enter date of registration ended"
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
                Save student settings
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
})(withStyles(styles)(Student));
