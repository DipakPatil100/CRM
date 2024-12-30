"use server";
import { instance, instanceForFormdata } from "@/api/axios/CRMAxios";
import _ from 'lodash';

export const getData = async (endpoint: any) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const searchData = _.debounce(async (endpoint: any, params:any) => {
  try {
    const response = await instance.get(endpoint, {params});
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}, 500);

export const postData = async (
  endpoint: any,
  data: any,
  header = "application"
) => {
  try {
    let response;
    if (header === "formData") {
      response = await instanceForFormdata.post(endpoint, data);
    } else {
      response = await instance.post(endpoint, data);
    }

    return response.data;
  } catch (error) {
    return error;
  }
};

export const putData = async (endpoint: any, data: any) => {
  try {
    const response = await instance.put(endpoint, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const pathData = async (
  endpoint: any,
  data: any,
  header = "application"
) => {
  try {
    const response =
      header === "formData"
        ? await instanceForFormdata.patch(endpoint, data)
        : await instance.patch(endpoint, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (endpoint: any) => {
  try {
    const response = await instance.delete(endpoint);
    return response.data;
  } catch (error) {
    return error;
  }
};
