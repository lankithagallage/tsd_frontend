import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
  renderHidden,
} from "../../../../lib/global/helpers";
import df_relation_type from "../../../../lib/class/data/df_relation_type";
import { relationTypeRequest } from "../../../../lib/api/df/RelationTypeApi";

const styles = (theme) => ({});
const formName = "relationForm";

class Grades extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
  }

  loadData() {
    relationTypeRequest("retrieve")
      .then((response) => {
        this.setState({ rows: response.data });
        this.props.dispatch(initialize(formName, new df_relation_type()));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  onSubmit = (values, dispatch) => {
    console.log(values);
    let path = values._id !== "" ? "update" : "add";
    relationTypeRequest(path, values)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
        dispatch(reset(formName));
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onEditClick(id) {
    relationTypeRequest("retrieveByID", { _id: id })
      .then((response) => {
        const data = response.data;
        const initialValues = data;
        this.props.dispatch(initialize(formName, initialValues));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { classes, handleSubmit, submitting, reset } = this.props;
    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Relationship
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              parent occupations
            </Card.Subtitle>
            <Card.Text>Manage the occupations of the parents.</Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Relationship
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="_id"
                id="txtID"
                type="hidden"
                component={renderHidden}
              />
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="relation"
                    required="required"
                    type="text"
                    id="txtRelation"
                    label="Relationship Name"
                    placeholder="Enter Relationship Name"
                    smalltext="Enter the name of the relationship"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_parent"
                id="chkIsPatent"
                type="checkbox"
                label="This relationship is a parent"
                component={renderCheckBox}
              />
              <Field
                name="is_active"
                id="chkIsActive"
                type="checkbox"
                label="Activate current relatioship"
                component={renderCheckBox}
              />

              <Button
                disabled={submitting}
                primary
                type="submit"
                color="primary"
                mr={2}
                mt={2}
              >
                Save relationship settings
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
        <Row>
          <Col col="sm-12" mt={4}>
            <Typography component="h2" variant="h6" align="left">
              List of available relationships
            </Typography>
          </Col>

          {this.state.rows.map((row, i) => (
            <Col col="sm-12 md-6 lg-6 xl-4" key={i}>
              <Card mt={4} id={row._id}>
                <Card.Body>
                  <Card.Title>
                    {row._id}
                    <Edit
                      style={{ float: "right", cursor: "pointer" }}
                      onClick={this.onEditClick.bind(this, row._id)}
                    />
                  </Card.Title>
                  <Card.Subtitle mb="2" text="muted">
                    {row.relation}
                  </Card.Subtitle>
                  <Typography mb={2}>
                    {row.is_parent
                      ? "This is a parent relationship"
                      : "This is not a parent relationship"}
                  </Typography>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is relationship active
                    </Form.CustomCheckbox>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  form: formName,
})(withStyles(styles)(Grades));
