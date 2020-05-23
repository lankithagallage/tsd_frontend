import React, { Component } from "react";
import { Grid, Typography, Avatar } from "@material-ui/core/";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="dashboard-page-one">
        <div class="dashboard-content-one">
          <Grid>
            <Row className="gutters-20">
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="dashboard-summery-one mg-b-20">
                  <div class="row align-items-center">
                    <div class="col-6">
                      <div class="item-icon bg-light-green ">
                        <i class="flaticon-classmates text-green"></i>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="item-content">
                        <div class="item-title">Students</div>
                        <div class="item-number">
                          <span class="counter" data-num="25">
                            25
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-sm-6 col-12">
                <div class="dashboard-summery-one mg-b-20">
                  <div class="row align-items-center">
                    <div class="col-6">
                      <div class="item-icon bg-light-blue">
                        <i class="flaticon-multiple-users-silhouette text-blue"></i>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="item-content">
                        <div class="item-title">Teachers</div>
                        <div class="item-number">
                          <span class="counter" data-num="16">
                            16
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-sm-6 col-12">
                <div class="dashboard-summery-one mg-b-20">
                  <div class="row align-items-center">
                    <div class="col-6">
                      <div class="item-icon bg-light-yellow">
                        <i class="flaticon-couple text-orange"></i>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="item-content">
                        <div class="item-title">Parents</div>
                        <div class="item-number">
                          <span class="counter" data-num="8">
                            8
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-sm-6 col-12">
                <div class="dashboard-summery-one mg-b-20">
                  <div class="row align-items-center">
                    <div class="col-6">
                      <div class="item-icon bg-light-red">
                        <i class="flaticon-gear-loading text-red"></i>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="item-content">
                        <div class="item-title">Administrators</div>
                        <div class="item-number">
                          <span class="counter" data-num="2">
                            2
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>

            <Row className="gutters-20">
              <div class="col-12 col-xl-12 col-6-xxxl">
                <div class="card dashboard-card-one pd-b-20">
                  <div class="card-body">
                    <div class="heading-layout1">
                      <div class="item-title">
                        <h3>Registration 2020</h3>
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
                    <div class="earning-report">
                      <div class="item-content">
                        <div class="single-item pseudo-bg-blue">
                          <h4>Total Registrations</h4>
                          <span>105</span>
                        </div>
                        <div class="single-item pseudo-bg-red">
                          <h4>Total Leaves</h4>
                          <span>15</span>
                        </div>
                      </div>
                      <div class="dropdown">
                        <a
                          class="date-dropdown-toggle"
                          href="#"
                          role="button"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Jan 20, 2019
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" href="#">
                            Jan 20, 2019
                          </a>
                          <a class="dropdown-item" href="#">
                            Jan 20, 2021
                          </a>
                          <a class="dropdown-item" href="#">
                            Jan 20, 2020
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="earning-chart-wrap">
                      <canvas
                        id="earning-line-chart"
                        width="660"
                        height="320"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-xl-12 col-3-xxxl">
                <div class="card dashboard-card-two pd-b-20">
                  <div class="card-body">
                    <div class="heading-layout1">
                      <div class="item-title">
                        <h3>Expenses</h3>
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
                    <div class="expense-report">
                      <div class="monthly-expense pseudo-bg-Aquamarine">
                        <div class="expense-date">Jan 2020</div>
                        <div class="expense-amount">
                          <span>LKR</span> 15,000
                        </div>
                      </div>
                      <div class="monthly-expense pseudo-bg-blue">
                        <div class="expense-date">Feb 2020</div>
                        <div class="expense-amount">
                          <span>LKR</span> 10,000
                        </div>
                      </div>
                      <div class="monthly-expense pseudo-bg-yellow">
                        <div class="expense-date">Mar 2020</div>
                        <div class="expense-amount">
                          <span>LKR</span> 8,000
                        </div>
                      </div>
                      <div class="monthly-expense pseudo-bg-pink">
                        <div class="expense-date">Apr 2020</div>
                        <div class="expense-amount">
                          <span>LKR</span> 9,000
                        </div>
                      </div>
                      <div class="monthly-expense pseudo-bg-red">
                        <div class="expense-date">May 2020</div>
                        <div class="expense-amount">
                          <span>LKR</span> 12,000
                        </div>
                      </div>
                    </div>
                    <div class="expense-chart-wrap">
                      <canvas
                        id="expense-bar-chart"
                        width="100"
                        height="300"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-xl-6 col-3-xxxl">
                <div class="card dashboard-card-three pd-b-20">
                  <div class="card-body">
                    <div class="heading-layout1">
                      <div class="item-title">
                        <h3>Students</h3>
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
                        id="student-doughnut-chart"
                        width="100"
                        height="300"
                      ></canvas>
                    </div>
                    <div class="student-report">
                      <div class="student-count pseudo-bg-blue">
                        <h4 class="item-title">Female Students</h4>
                        <div class="item-number">5</div>
                      </div>
                      <div class="student-count pseudo-bg-yellow">
                        <h4 class="item-title">Male Students</h4>
                        <div class="item-number">20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
            </Row>

            <Row className="gutters-20">
              <div class="col-12 col-xl-6 col-4-xxxl">
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

              <div class="col-lg-6 col-xl-6 col-4-xxxl">
                <div class="card dashboard-card-five pd-b-20">
                  <div class="card-body pd-b-14">
                    <div class="heading-layout1">
                      <div class="item-title">
                        <h3>Website Traffic</h3>
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
                    <h6 class="traffic-title">Total Visits Today</h6>
                    <div class="traffic-number">129</div>
                    <div class="traffic-table table-responsive">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td class="t-title pseudo-bg-Aquamarine">Admins</td>
                            <td>129</td>
                            <td>{(129 / 136) * 100}%</td>
                          </tr>
                          <tr>
                            <td class="t-title pseudo-bg-blue">Teachers</td>
                            <td>4</td>
                            <td>{(4 / 136) * 100}%</td>
                          </tr>
                          <tr>
                            <td class="t-title pseudo-bg-yellow">Students</td>
                            <td>2</td>
                            <td>{(2 / 136) * 100}%</td>
                          </tr>
                          <tr>
                            <td class="t-title pseudo-bg-red">Parents</td>
                            <td>1</td>
                            <td>{(1 / 136) * 100}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
