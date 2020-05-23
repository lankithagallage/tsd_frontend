import m_contact from "./m_contact";

class m_student extends m_contact {
  constructor(params = null) {
    super();
    if (params == null) {
      this._id = "";
      this.reg_no = "";
      this.reg_date = null;
      this.end_date = null;
    } else {
      super.set(params);
      this.set(params);
    }
  }

  set(values) {
    this._id = values._id;
    this.reg_no = values.reg_no;
    this.reg_date = values.reg_date;
    this.end_date = values.end_date;
  }
}

export default m_student;
