import React, { Component } from "react";
import Cookies from "js-cookie";
import { decrypt } from "../../../lib/global/helpers";
import AdminDashboard from "./../admin/dashboard/Index";
import TeacherDashboard from "./../teacher/dashboard/Index";
import ParentDashboard from "./../parent/dashboard/Index";
import StudentDashboard from "./../student/dashboard/Index";

export default class Index extends Component {
  constructor(props) {
    super(props);
    let userType = decrypt(Cookies.get("usuario"));
    this.state = { userType: userType };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.state.userType == "admin" && <AdminDashboard />}
        {this.state.userType == "teacher" && <TeacherDashboard />}
        {this.state.userType == "parent" && <ParentDashboard />}
        {this.state.userType == "student" && <StudentDashboard />}
      </div>
    );
  }
}
