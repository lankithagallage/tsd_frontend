class mod_homework {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.class_id = "";
      this.file_id = "";
      this.file_extension = "";
      this.date = Date();
    } else this.set(params);
  }

  set(params) {
    this._id = params._id;
    this.class_id = params.class_id;
    this.file_id = params.file_id;
    this.file_extension = params.file_extension;
    this.date = params.date;
  }
}

export default mod_homework;
