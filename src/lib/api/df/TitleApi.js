import { axiosCall } from "../apiCall";

export function titleRequest(api, data = {}, usetoken = true) {
  let method = "post";
  let url = "";
  let config = {};

  switch (api) {
    //get all contacts
    case "retrieve":
      method = "post";
      url = "df/title/retrieve";
      data = {};
      usetoken = true;
      break;

    //add
    case "add":
      data._id = undefined;
      method = "post";
      url = "df/title/add";
      data = data;
      usetoken = true;
      break;

    //update
    case "update":
      method = "post";
      url = "df/title/update/" + data._id;
      data = data;
      usetoken = true;
      break;

    //delte
    case "delete":
      method = "post";
      url = "df/title/delete" + data._id;
      usetoken = true;
      break;

    //get by id
    case "retrieveByID":
      method = "post";
      url = "df/title/retrieve/" + data._id;
      data = { id: data._id };
      usetoken = true;
      break;

    default:
      break;
  }

  return axiosCall(method, url, config, data, usetoken);
}
