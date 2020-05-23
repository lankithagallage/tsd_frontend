import { axiosCall } from "../apiCall";

export function attendanceRequest(api, data = {}, usetoken = true) {
  let method = "post";
  let url = "";
  let config = {};

  switch (api) {
    //add
    case "add":
      data._id = undefined;
      method = "post";
      url = "class/attendance/add";
      data = data;
      usetoken = true;
      break;

    //get by id
    case "attendanceLookup":
      method = "post";
      url = "class/attendance/lookup";
      data = { studentID: data.studentID, date: data.date };
      usetoken = true;
      break;

    default:
      break;
  }

  return axiosCall(method, url, config, data, usetoken);
}
