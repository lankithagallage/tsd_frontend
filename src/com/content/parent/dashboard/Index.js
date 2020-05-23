import React, { Component } from "react";
import { Grid, Typography, Avatar } from "@material-ui/core/";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="dashboard-page-one">
          <div class="dashboard-content-one">
            <Grid>
              <Row className="gutters-20">
                <div class="col-lg-6 col-xl-6 col-4-xxxl">
                  <div class="card dashboard-card-six pd-b-20">
                    <div class="card-body">
                      <div class="heading-layout1 mg-b-17">
                        <div class="item-title">
                          <h3>Notice Board</h3>
                        </div>
                        <div class="dropdown">
                          <a
                            class="dropdown-toggle"
                            href="#"
                            role="button"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ...
                          </a>

                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-times text-orange-red"></i>Close
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-cogs text-dark-pastel-green"></i>
                              Edit
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-redo-alt text-orange-peel"></i>
                              Refresh
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="notice-box-wrap">
                        <div class="notice-list">
                          <div class="post-date bg-skyblue">16 March, 2020</div>
                          <h6 class="notice-title">
                            <a href="#">Great School management system</a>
                          </h6>
                          <div class="entry-meta"> Amila Tharanga</div>
                        </div>
                        <div class="notice-list">
                          <div class="post-date bg-yellow">6 April, 2020</div>
                          <h6 class="notice-title">
                            <a href="#">Great School manag printing.</a>
                          </h6>
                          <div class="entry-meta"> King Thissa</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-xl-6 col-4-xxxl">
                  <div class="card dashboard-card-four pd-b-20">
                    <div class="card-body">
                      <div class="heading-layout1">
                        <div class="item-title">
                          <h3>Event Calender</h3>
                        </div>
                        <div class="dropdown">
                          <a
                            class="dropdown-toggle"
                            href="#"
                            role="button"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ...
                          </a>

                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-times text-orange-red"></i>Close
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-cogs text-dark-pastel-green"></i>
                              Edit
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-redo-alt text-orange-peel"></i>
                              Refresh
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="calender-wrap">
                        <div id="fc-calender" class="fc-calender"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>

              <Row className="gutters-20">
                <div class="col-5-xxxl col-12">
                  <div class="card dashboard-card-twelve">
                    <div class="card-body">
                      <div class="heading-layout1">
                        <div class="item-title">
                          <h3>My Kids</h3>
                        </div>
                        <div class="dropdown">
                          <a
                            class="dropdown-toggle"
                            href="#"
                            role="button"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ...
                          </a>

                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-times text-orange-red"></i>Close
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-cogs text-dark-pastel-green"></i>
                              Edit
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="fas fa-redo-alt text-orange-peel"></i>
                              Refresh
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="kids-details-wrap">
                        <div class="row">
                          <div class="col-12-xxxl col-xl-6 col-12">
                            <div class="kids-details-box mb-5">
                              <div class="item-img">
                                <img
                                  src="inc/img/figure/student1.png"
                                  alt="kids"
                                />
                              </div>
                              <div class="item-content table-responsive">
                                <table class="table text-nowrap">
                                  <tbody>
                                    <tr>
                                      <td>Name:</td>
                                      <td>Class Student</td>
                                    </tr>
                                    <tr>
                                      <td>Gender:</td>
                                      <td>Male</td>
                                    </tr>
                                    <tr>
                                      <td>Class:</td>
                                      <td>Geade 1 A</td>
                                    </tr>
                                    <tr>
                                      <td>Admission Id:</td>
                                      <td>#0021</td>
                                    </tr>
                                    <tr>
                                      <td>Admission Date:</td>
                                      <td>07.08.2019</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
