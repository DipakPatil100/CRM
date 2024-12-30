import { cookies } from "next/headers";

/* eslint-disable prefer-const */
export const hideArrowUpDown={
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "input[type=number]": {
    MozAppearance: "textfield",
  },
}
export const exceptThisSymbols = ["e", "E", "+", "-", ".", "ArrowDown", "ArrowUp"];

export const validateName = (
    value: string,
    name: string
  ): { isValid: boolean; capitalizedValue: string; errorMessage: string } => {
    if (value.length >= 101) {
      return {
        isValid: false,
        capitalizedValue: value,
        errorMessage:
          "Invalid name. Only letters, dots, hyphens, and one space allowed.",
      };
    }
    const nameRegex = /^[A-Za-z. -]+(\s*[A-Za-z. -]+)*$/;
    if (value === "" || nameRegex.test(value)) {
      const capitalizedValue = value
        .split(" ")
        .map(
          (word: string) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
  
      return { isValid: true, capitalizedValue, errorMessage: "" };
    } else {
      return {
        isValid: false,
        capitalizedValue: value,
        errorMessage:
          "Invalid name. Only letters, dots, hyphens, and one space allowed.",
      };
    }
  };
  
  export const validatePanNumber = (
    value: string,
    name: string
  ): { isValid: boolean; newvalue: string; errorMessage: string } => {
    let panNo = value.toUpperCase();
    let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
    if (value === "" || regex.test(panNo)) {
      return { isValid: true, newvalue: panNo, errorMessage: "" };
    } else {
      return {
        isValid: false,
        newvalue: value.toUpperCase(),
        errorMessage: "Invalid Pan Number.",
      };
    }
  };
  
  export const validateMobileNumber = (
    value: string,
    name: string
  ): { isValid: boolean; newvalue: string; errorMessage: string } => {
    let regex = new RegExp(/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/);
    if (value === "" || regex.test(value)) {
      return { isValid: true, newvalue: value, errorMessage: "" };
    } else {
      return {
        isValid: false,
        newvalue: value,
        errorMessage: "Invalid Mobile Number.",
      };
    }
  };



  // export const handleRemoveCokie =()=>{
  //   cookies().delete("token")
  //   // localStorage.removeItem("user"); // Clear user data from localStorage
  //   // router.push("/"); 
  //   return
  // }