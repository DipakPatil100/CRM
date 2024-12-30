// // FILE: General.test.tsx
// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import General from "../component/General";
// import { enqueueSnackbar } from "notistack";
// import { postData } from "@/services/apiService";
// import {describe, expect, test} from '@jest/globals';

// jest.mock("notistack", () => ({
//   enqueueSnackbar: jest.fn(),
// }));

// jest.mock("@/services/apiService", () => ({
//   postData: jest.fn(),
// }));

// const mockProps = {
//   leadData: {},
//   generalData: {},
//   setGeneralData: jest.fn(),
//   propertyData: { data: [] },
//   finalData: {},
//   setFinalData: jest.fn(),
//   setTabIndex: jest.fn(),
//   tabIndex: 0,
//   setDiscount: jest.fn(),
//   discount: {},
//   setBasicRate: jest.fn(),
//   basicRate: 0,
//   rate: 0,
//   setRate: jest.fn(),
//   netAmount: 0,
// };

// describe("General Component", () => {
//   it("renders the General component", () => {
//     render(<General {...mockProps} />);
//     expect(screen.getByText("General Details")).toBeInTheDocument();
//   });

//   it("handles input changes", () => {
//     render(<General {...mockProps} />);
//     const input = screen.getByPlaceholderText("Unit Code");
//     fireEvent.change(input, { target: { value: "123" } });
//     expect(mockProps.setGeneralData).toHaveBeenCalled();
//   });

//   it("submits the form", async () => {
//     render(<General {...mockProps} />);
//     const button = screen.getByText("Save");
//     fireEvent.click(button);
//     expect(postData).toHaveBeenCalled();
//   });

//   it("makes table cells editable on double-click", () => {
//     render(<General {...mockProps} />);
//     const cell = screen.getByText("Gross Amount");
//     fireEvent.doubleClick(cell);
//     expect(cell).toContainHTML("input");
//   });
// });