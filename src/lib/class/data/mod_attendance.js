class mod_attendance {
  constructor(params = null) {
    if (params == null) {
      this.studentID = "";
      this.date = new Date();
      this.attended = false;
      this.authorized_absence = false;
    } else this.set(params);
  }

  set(params) {
    this.studentID = params.studentID;
    this.date = params.date;
    this.attended = params.attended;
    this.authorized_absence = params.authorized_absence;
  }
}

export default mod_attendance;
