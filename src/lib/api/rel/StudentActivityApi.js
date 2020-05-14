import { axiosCall } from "../apiCall";

export function studentActivityRequest(api, data = {}, usetoken = true) {
  let method = "post";
  let url = "";
  let config = {};

  switch (api) {
    //get all contacts
    case "retrieve":
      method = "post";
      url = "rel/studentActivity/retrieve";
      data = {};
      usetoken = true;
      break;

    //add
    case "add":
      data._id = undefined;
      method = "post";
      url = "rel/studentActivity/add";
      data = data;
      usetoken = true;
      break;

    //update
    case "update":
      method = "post";
      url = "rel/studentActivity/update/" + data._id;
      data = data;
      usetoken = true;
      break;

    //delte
    case "delete":
      method = "post";
      url = "rel/studentActivity/delete" + data._id;
      usetoken = true;
      break;

    //get by id
    case "retrieveByID":
      method = "post";
      url = "rel/studentActivity/retrieve/" + data._id;
      data = { id: data._id };
      usetoken = true;
      break;

    default:
      break;
  }

  return axiosCall(method, url, config, data, usetoken);
}
