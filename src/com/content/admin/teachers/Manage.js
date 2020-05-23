import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, Grid } from "@material-ui/core";
import { Field, reduxForm, reset, initialize, FormSection } from "redux-form";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Badge,
  Box,
} from "bootstrap-4-react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import {
  renderHidden,
  renderSelect,
  renderTextBox,
  renderCheckBox,
} from "../../../../lib/global/helpers";
import m_teacher from "../../../../lib/class/data/m_teacher";
import Contact from "../__common/Contact";
import { contactRequest } from "../../../../lib/api/m/ContactApi";

import df_teacher_grade from "../../../../lib/class/data/df_teacher_grade";
import df_marital_status from "../../../../lib/class/data/df_marital_status";

const styles = (theme) => ({});
const formName = "teacherForm";

class Manage extends Component {
  constructor(props) {
    super(props);
    this.selectGrade = [];
    this.selectMaritial = [];

    this.selectQualification = [];
    this.selectSpeciality = [];
    this.selectInstitute = [];

    this.grades.map((row, i) => {
      this.selectGrade.push({ id: row.id, name: row.level });
    });

    this.status.map((row, i) => {
      this.selectMaritial.push({ id: row.id, name: row.status });
    });

    this.state = { isLoading: false, rows: [] };
    this.refHeader = React.createRef();
    this.refSearch = React.createRef();
    const teacher = new m_teacher();
    this.props.dispatch(initialize(formName, teacher));
  }

  onSearch = (value) => {
    let teachers = [];
    this.setState({ isLoading: true });
    if (value.length < 4) return;
    contactRequest("find", {
      userType: "teacher",
      name: "nic",
      value: value,
    })
      .then((response) => {
        response.data.map((row, i) => {
          teachers.push({
            id: row._id,
            nic: row.nic,
            title: row.title,
            name: row.first_name,
          });
        });
        this.setState({ rows: teachers, isLoading: false });
      })
      .catch((error) => {
        throw error;
      });
  };

  searchSelect = (values) => {
    contactRequest("retrieveByID", { userType: "teacher", _id: values[0].id })
      .then((response) => {
        window.scrollTo(0, this.refHeader.current.offsetTop);
        const data = response.data;
        const teacher = new m_teacher(data);
        this.props.dispatch(initialize(formName, teacher));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSubmit = (values, dispatch) => {
    console.log(values);
    values.userType = "teacher";
    let path = values._id == "" || values._id == undefined ? "add" : "update";
    console.log(values._id);
    values.__access_level = undefined;
    values.__marital_status = undefined;
    values.__teacher_grade = undefined;
    values.__title = undefined;
    values.__user_type = undefined;

    contactRequest(path, values)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);

        dispatch(reset(formName));
        this.refSearch.current.clear();
        const teacher = new m_teacher();
        this.props.dispatch(initialize(formName, teacher));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  grades = [
    new df_teacher_grade({
      id: "214as5d4as65d",
      level: "Grade 1",
      is_active: true,
    }),
    new df_teacher_grade({
      id: "214as5d4as65d",
      level: "Grade 2",
      is_active: true,
    }),
  ];

  status = [
    new df_marital_status({ id: "a2s1d2asd3546asd", status: "Married" }),
    new df_marital_status({ id: "524a6s5d46a1sdsa", status: "Widowed" }),
    new df_marital_status({ id: "524a6s5dsda1sd21", status: "Separated" }),
    new df_marital_status({ id: "524a6s5d46a1ssdf", status: "Divorced" }),
    new df_marital_status({ id: "524a6s5d46a1fsdd", status: "Single" }),
  ];

  render() {
    const { classes, handleSubmit, submitting, reset } = this.props;
    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Teachers
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              teacher accounts
            </Card.Subtitle>
            <Card.Text>
              All teachers, of the organization and their poersonal information
              are listed here.
            </Card.Text>
            <Row>
              <Col col="sm-10 md-6">
                <AsyncTypeahead
                  id="typeSearch"
                  isLoading={this.state.isLoading}
                  onSearch={this.onSearch}
                  onChange={this.searchSelect}
                  labelKey={(option) => `(${option.nic}) ${option.name}`}
                  ref={this.refSearch}
                  options={this.state.rows}
                  placeholder="who do you want to search?"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted" ref={this.refHeader}>
              Edit Teachers
            </Card.Title>
            <hr />
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
                <Contact type="teacher" />
              </FormSection>

              <Row mb="2">
                <Col col="sm-12">
                  <Typography component="h6" variant="h6" align="left">
                    Registration
                  </Typography>
                </Col>
              </Row>

              <hr />
              <Row>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="reg_no"
                    type="text"
                    required="required"
                    id="txtRegno"
                    label="Registration Number"
                    placeholder="Registration Number"
                    smalltext="Enter the registration number of the teacher"
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

              <Row mb="2">
                <Col col="sm-12">
                  <Typography component="h6" variant="h6" align="left">
                    Information
                  </Typography>
                </Col>
              </Row>
              <hr />
              <Row mb="2">
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="teacher_grade_id"
                    id="cmbTeacherGrade"
                    label="Select Grade"
                    smalltext="Select grade of the teacher"
                    items={this.selectGrade}
                    component={renderSelect}
                  />
                </Col>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="marital_status_id"
                    id="cmbMaritialStatus"
                    label="Select Maritial Status"
                    smalltext="Select status of the teacher"
                    items={this.selectMaritial}
                    component={renderSelect}
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
                Save teacher settings
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
            </Form>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Header>Teacher Qualifications</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="Institute_id"
                    id="cmbInstitute"
                    label="Institute"
                    items={this.selectInstitute}
                    component={renderSelect}
                  />
                </Col>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="ed_spacility_id"
                    id="cmbSpeciality"
                    label="Speciality"
                    items={this.selectSpeciality}
                    component={renderSelect}
                  />
                </Col>{" "}
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="ed_qualification_id"
                    id="cmbQualification"
                    label="Qualification"
                    items={this.selectSpeciality}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="reg_no"
                    type="text"
                    required="required"
                    id="txtRegno"
                    label="Registration Number"
                    placeholder="Registration Number"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="started_date"
                    type="date"
                    required="required"
                    id="txtStartedDate"
                    label="Started Date"
                    placeholder="Started Date"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="finished_date"
                    type="date"
                    id="txtFinishedDate"
                    label="Finished Date"
                    placeholder="Finished Date"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12">
                  <Field
                    name="completed"
                    id="chkIsCompleted"
                    label="Completed"
                    type="checkbox"
                    component={renderCheckBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12">
                  <Button
                    disabled={submitting}
                    success
                    type="submit"
                    color="primary"
                    mr={2}
                    mt={2}
                  >
                    Save qualification
                  </Button>
                  <Button info type="reset" color="secondary" mt={2}>
                    Clear changes
                  </Button>
                </Col>
              </Row>
            </Form>

            <ListGroup mt={4}>
              <ListGroup.Item>
                <Badge success mr={2}>
                  Y
                </Badge>
                Moratuwa University - (BSc.) - Physical Science on 2006-2009
                <Grid style={{ float: "right" }}>
                  <EditOutlined />
                  <DeleteOutline />
                </Grid>
              </ListGroup.Item>
              <ListGroup.Item>
                <Badge warning mr={2}>
                  N
                </Badge>
                Peradeniya University - (MSc.) - Physical Science on 2009-2011
                <Grid style={{ float: "right" }}>
                  <EditOutlined />
                  <DeleteOutline />
                </Grid>
              </ListGroup.Item>
            </ListGroup>
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
})(withStyles(styles)(Manage));
