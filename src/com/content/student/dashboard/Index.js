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
                <div class="col-12 col-4-xxxl">
                  <div class="row">
                    <div class="col-6-xxxl col-lg-3 col-sm-6 col-12">
                      <div class="dashboard-summery-two">
                        <div class="item-icon bg-light-magenta">
                          <i class="flaticon-mail text-magenta"></i>
                        </div>
                        <div class="item-content">
                          <div class="item-number">
                            <span class="counter" data-num="25">
                              56
                            </span>
                          </div>
                          <div class="item-title">Days to Next Exam</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6-xxxl col-lg-3 col-sm-6 col-12">
                      <div class="dashboard-summery-two">
                        <div class="item-icon bg-light-yellow">
                          <i class="flaticon-reload text-orange"></i>
                        </div>
                        <div class="item-content">
                          <div class="item-number">
                            <span class="counter" data-num="2">
                              156
                            </span>
                          </div>
                          <div class="item-title">Pending Days 2020</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6-xxxl col-lg-3 col-sm-6 col-12">
                      <div class="dashboard-summery-two">
                        <div class="item-icon bg-light-blue">
                          <i class="flaticon-shopping-list text-blue"></i>
                        </div>
                        <div class="item-content">
                          <div class="item-number">
                            <span class="counter" data-num="0">
                              0
                            </span>
                          </div>
                          <div class="item-title">Absent Days 2020</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6-xxxl col-lg-3 col-sm-6 col-12">
                      <div class="dashboard-summery-two">
                        <div class="item-icon bg-light-red">
                          <i class="flaticon-calendar text-red"></i>
                        </div>
                        <div class="item-content">
                          <div class="item-number">
                            <span class="counter" data-num="0">
                              0
                            </span>
                          </div>
                          <div class="item-title">Pending Events</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>

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
                <div class="col-12 col-xl-6 col-3-xxxl">
                  <div class="card dashboard-card-three pd-b-20">
                    <div class="card-body">
                      <div class="heading-layout1">
                        <div class="item-title">
                          <h3>Attendance 2020</h3>
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
                      <div class="doughnut-chart-wrap">
                        <canvas
                          id="student-attendance-chart"
                          width="100"
                          height="300"
                        ></canvas>
                      </div>
                      <div class="student-report">
                        <div class="student-count pseudo-bg-blue">
                          <h4 class="item-title">Present</h4>
                          <div class="item-number">45</div>
                        </div>
                        <div class="student-count pseudo-bg-red">
                          <h4 class="item-title">Absent</h4>
                          <div class="item-number">2</div>
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
