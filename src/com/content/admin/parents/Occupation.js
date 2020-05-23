import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Edit, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
  renderHidden,
} from "../../../../lib/global/helpers";
import df_occupation from "../../../../lib/class/data/df_occupation";
import df_occupation_category from "../../../../lib/class/data/df_occupation_category";
import { occupationCategoryRequest } from "../../../../lib/api/df/OccupationCategoryApi";
import { occupationRequest } from "../../../../lib/api/df/OccupationApi";

const styles = (theme) => ({});
const formName = "occupationForm";

class Occupation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorySelect: [],
      rows: [],
    };

    this.categories = [];
    this.refHeader = React.createRef();

    this.categorySelect = [];
  }

  loadData() {
    this.categorySelect = [];
    occupationCategoryRequest("retrieve")
      .then((response) => {
        this.categories = response.data;
        this.categories.map((row, i) => {
          this.categorySelect.push({ id: row._id, name: row.category });
        });
        this.setState({ categorySelect: this.categorySelect });
        if (this.categories.length == 0) return;
        this.loadOccupation(this.categories[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadOccupation(categoryID) {
    this.props.dispatch(initialize(formName, new df_occupation()));
    let categoryList = [];
    occupationRequest("find", {
      name: "occupation_category_id",
      value: categoryID,
    })
      .then((cresponse) => {
        cresponse.data.map((row, i) => {
          var category = this.categories.filter(
            (val) => val._id == row.class_section_id
          );
          let clss = new df_occupation(row);
          clss.__category = new df_occupation_category(category);
          categoryList.push(clss);
        });

        this.setState({ rows: categoryList });
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
    values.__section = undefined;
    occupationRequest(path, values)
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
    occupationRequest("retrieveByID", { _id: id })
      .then((response) => {
        window.scrollTo(0, this.refHeader.current.offsetTop);
        const data = response.data;
        const initialValues = data;
        this.props.dispatch(initialize(formName, initialValues));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onFilterChange(event) {
    let id = event.target.value;
    this.loadOccupation(id);
  }

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
          Occupations
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
              Edit Occupation
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
                    name="occupation"
                    required="required"
                    type="text"
                    id="txtOccupation"
                    label="Occupation Name"
                    placeholder="Enter Occupation Name"
                    smalltext="Enter the common name of the ocupation"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="occupation_category_id"
                    required="required"
                    type="text"
                    id="txtCategory"
                    label="Occupation Category"
                    placeholder="Select Occupation Category"
                    smalltext="Enter the category of the ocupation"
                    items={this.state.categorySelect}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <Field
                name="is_active"
                id="chkIsActive"
                type="checkbox"
                label="Activate current category"
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
                Save occupation settings
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
              List of available occupations
            </Typography>
          </Col>
          <Col col="sm-12 lg-6" mt={4}>
            <Form.Group>
              <label htmlFor="chkSelectCategry">Select Category</label>
              <Form.Select
                id="chkSelectCategry"
                onChange={this.onFilterChange.bind(this)}
              >
                {this.state.categorySelect.map((item, i) => (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Form.Text text="muted" xs={12} md={6}>
                Select category to load inherited occupations
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
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
                    {row.occupation}
                  </Card.Subtitle>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is category active
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
})(withStyles(styles)(Occupation));
