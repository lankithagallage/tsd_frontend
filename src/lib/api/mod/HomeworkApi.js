import { axiosCall } from "../apiCall";

export function homeworkRequest(api, data = {}, usetoken = true) {
  let method = "post";
  let url = "";
  let config = {};

  switch (api) {
    //add
    case "upload":
      data._id = undefined;
      method = "post";
      url = "homework/upload";
      data = data;
      usetoken = true;
      break;

    //get by id
    case "download":
      method = "post";
      url = "homework/download";
      data = data;
      usetoken = true;
      break;

    //get list
    case "download":
      method = "post";
      url = "homework/getList";
      data = data;
      usetoken = true;
      break;

    default:
      break;
  }

  return axiosCall(method, url, config, data, usetoken);
}
