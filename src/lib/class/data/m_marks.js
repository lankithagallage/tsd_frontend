import m_class_section from "./m_class_section";
import m_student from "./m_student";
import m_class from "./m_class";
import df_subject from "./df_subject";

class m_marks {
  constructor() {
    this._id = "";
    this.student_id = "";
    this.class_id = "";
    this.subject_id = "";
    this.marks = "";
    this.term = "";
    this.date = null;
    this.grade_id = "";
    this.created_date = new Date();
    this.created_user_id = "";
    this.modified_date = new Date();
    this.modified_user_id = "";

    this.__student = new m_student();
    this.__class = new m_class();
    this.__subject = new df_subject();
    this.__class_section = new m_class_section();
  }

  set(values) {
    this._id = values._id;
    this.student_id = values.student_id;
    this.class_id = values.class_id;
    this.subject_id = values.id;
    this.marks = values.marks;
    this.term = values.term;
    this.date = values.date;
    this.grade_id = values.grade_id;
    this.created_date = values.created_date;
    this.created_user_id = values.created_user_id;
    this.modified_date = values.modified_date;
    this.modified_user_id = values.modified_user_id;

    this.__student = values.__student;
    this.__class = values.__class;
    this.__subject = values.__subject;
    this.__class_section = values.__class_section;
  }
}

export default m_marks;
