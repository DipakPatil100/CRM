"use client";
import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs, Card, CardContent, Typography } from "@mui/material";
import General from "./component/General";
import PaymentSchedule from "./component/Payment/PaymentSchedule";
import CoApplicant from "./component/CoApplicant";
import UnitBookingStepper from "./component/StepperUnitBooking";

const generalFields = {
  unitDescription: "",
  unitCode: "",
  unitCategory: "",
  location: "",
  floor: "",
  areaOrDiffArea: "",
  phase: "",
  selectArea: "",
  priceList: "",
  basicRate: "",
  // saleRate: "",
  // unitCost: "",
  loanFromBank: "",
  bankName: "",
  loanAmount: "",
  loanPaperSubmitDate: "",
  issueDate: "",
  possessionDate: "",
  psnNo: "",
  transferable: "",
  unitType: "",
  paymentPlan: "",
  taxStructure: "",
  gst: "18%",
  gstStructure: "",
  remark: "",
};

interface RowTable {
  stage: string;
  overHead: string;
  date: string;
  percentage: string;
  baseAmount: string;
  taxAmount: string;
  netAmount: string;
  adjustedAmount: string;
  remark: string;
}

const rowTable: RowTable[] = [
  // {
  //   stage: "At the time of booking",
  //   overHead: "Basic sale rate",
  //   date: "",
  //   baseAmount: "220000",
  //   taxAmount: "2290",
  //   percentage: "",
  //   netAmount: "230000",
  //   adjustedAmount: "0.00",
  //   remark: "",
  // },
];
const personalData = {
  applicationNo: "",
  applicantName: "",
  fatherName: "",
  address: "",
  mobileNo: "",
  cityName: "",
  customerEmail: "",
  panNo: "",
  aadharNo: "",
};

const UnitBooking = ({ leadData, propertyData }: any) => {
  console.log(propertyData, "propertyData");
  const [tabIndex, setTabIndex] = useState(
    () => JSON.parse(localStorage.getItem("unitStepper") as any) || 0
  );
  const [inputData, setInputData] = useState<any>(personalData);
  const [members, setMembers] = useState<any>([]);
  const [generalData, setGeneralData] = useState<any>(generalFields);
  const [tabledata, setTabledata] = useState(rowTable);
  const [isPreviousApplicant, setIsPreviousApplicant] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [discount, setDiscount] = useState({
    rate: "0.00",
    amount: "0.00",
  });
  const [basicRate, setBasicRate] = useState<number>(0.0);

  console.log(basicRate, "BASIC RATE");
  const [rate, setRate] = useState<number>(0);
  const [netAmount, setNetAmount] = useState(
    (Number(basicRate) + 95000).toFixed(2)
  );
  const [finalData, setFinalData] = useState({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    localStorage.setItem("unitStepper", JSON.stringify(tabIndex));
  }, [tabIndex]);

  return (
    <Box>
      <UnitBookingStepper tabIndex={tabIndex} />
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent sx={{ p: "10px 30px" }}>
          <Box
            sx={{
              width: "100%",
              mb: 4,
              textAlign: "left",
              display: "flex",
              justifyContent: "left",
            }}
          >
            {/* <Tabs
                textColor="inherit"
                value={tabIndex}
                onChange={handleTabChange}
                centered
              >
                <Tab
                  sx={{ width: "500px", fontWeight: "600" }}
                  label="Personal Details"
                />
                <Tab
                  sx={{ width: "500px", fontWeight: "600" }}
                  label="General"
                  // disabled={Object.keys(errors).length === 0}
                />
                <Tab
                  sx={{ width: "500px", fontWeight: "600" }}
                  label="Payment Schedule"
                  // disabled={Object.keys(errors).length === 0 && Object.keys(generrors).length === 0}
                />
              </Tabs> */}
          </Box>

          <Box role="tabpanel" hidden={tabIndex !== 0}>
            {tabIndex === 0 && (
              <CoApplicant
                leadData={leadData}
                inputData={inputData}
                setInputData={setInputData}
                isPreviousApplicant={isPreviousApplicant}
                setIsPreviousApplicant={setIsPreviousApplicant}
                setMembers={setMembers}
                members={members}
                setTabIndex={setTabIndex}
                tabIndex={tabIndex}
                finalData={finalData}
                setFinalData={setFinalData}
                coAppError={errors}
                setcoAppError={setErrors}
              />
            )}
          </Box>

          <Box role="tabpanel" hidden={tabIndex !== 1}>
            {tabIndex === 1 && (
              <General
                leadData={leadData}
                generalData={generalData}
                setGeneralData={setGeneralData}
                propertyData={propertyData}
                setFinalData={setFinalData}
                finalData={finalData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                discount={discount}
                setDiscount={setDiscount}
                setBasicRate={setBasicRate}
                basicRate={basicRate}
                rate={rate}
                setRate={setRate}
                netAmount={netAmount}
              />
            )}
          </Box>

          <Box role="tabpanel" hidden={tabIndex !== 2}>
            {tabIndex === 2 && (
              <PaymentSchedule
                tabledata={tabledata}
                setTabledata={setTabledata}
                setFinalData={setFinalData}
                finalData={finalData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UnitBooking;
