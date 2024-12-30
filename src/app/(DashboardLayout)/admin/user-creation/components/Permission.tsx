// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Tabs,
//   Tab,
//   Typography,
//   Checkbox,
//   Grid,
//   Button,
//   styled,
//   FormControlLabel,
//   Divider,
// } from "@mui/material";
// import WorkIcon from "@mui/icons-material/Work";
// import PeopleIcon from "@mui/icons-material/People"; // Icon for User Management
// import AddIcon from "@mui/icons-material/Add"; // Icon for Add New Role
// import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
// import MuiAccordionSummary, {
//   AccordionSummaryProps,
// } from "@mui/material/AccordionSummary";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import EnablePermission from "./EnablePermission";
// import { configureList } from "./configPermission";

// const Accordion = styled((props: AccordionProps) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }:any) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&::before": {
//     display: "none",
//   },
// }));
// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }:any) => ({
//   backgroundColor: "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
//   ...theme.applyStyles("dark", {
//     backgroundColor: "rgba(255, 255, 255, .05)",
//   }),
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }:any) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

// const PermissionsTable = ({ permissions, formData, setFormData }: any) => {
//   const [expanded, setExpanded] = React.useState<string | false>("panel1");
//   const [formData1, setFormData1] = useState({
//     moduleId: "",
//     moduleName: "",
//     moduleType: "",
//     submodule: [
//       {
//         submoduleId: "",
//         submoduleName: "",
//         permissions: {
//           read: 0,
//           create: 0,
//           edit: 0,
//           delete: 0,
//         },
//       }
//     ],
//   });

//   const handleChange =
//     (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
//       setExpanded(newExpanded ? panel : false);
//     };
//   // return (
//   //   <Box sx={{ mb: 2 }}>
//   //     <Grid container spacing={2} sx={{ mt: 1 }}>
//   //       {permissions.map((perm: any, index: number) => (
//   //         <Grid item xs={6}>
//   //           <Typography>{perm.module}</Typography>
//   //           <Accordion
//   //             expanded={expanded === `panel${index}`}
//   //             onChange={handleChange(`panel${index}`)}
//   //           >
//   //             <AccordionSummary
//   //               aria-controls="panel1d-content"
//   //               id="panel1d-header"
//   //             >
//   //               <Typography>{perm.module}</Typography>
//   //             </AccordionSummary>
//   //             <AccordionDetails>
//   //               <Grid container spacing={1}>
//   //                 {perm.permissions.map((p: any, idx: number) => (
//   //                   <>
//   //                     <Grid container spacing={1}>
//   //                       <Grid item xs={2.4}>
//   //                         <Typography sx={{ fontWeight: "bold" }}>
//   //                           Module
//   //                         </Typography>
//   //                       </Grid>
//   //                       <Grid item xs={2.4}>
//   //                         <Typography sx={{ fontWeight: "bold" }}>
//   //                           View
//   //                         </Typography>
//   //                       </Grid>
//   //                       <Grid item xs={2.4}>
//   //                         <Typography sx={{ fontWeight: "bold" }}>
//   //                           Create
//   //                         </Typography>
//   //                       </Grid>
//   //                       <Grid item xs={2.4}>
//   //                         <Typography sx={{ fontWeight: "bold" }}>
//   //                           Update
//   //                         </Typography>
//   //                       </Grid>
//   //                       <Grid item xs={2.4}>
//   //                         <Typography sx={{ fontWeight: "bold" }}>
//   //                           Delete
//   //                         </Typography>
//   //                       </Grid>
//   //                     </Grid>
//   //                     <Grid container spacing={1}>
//   //                       <Grid item xs={2.4}>
//   //                         <Typography sx={{ fontWeight: "300" }}>
//   //                           {`Module ${idx}`}
//   //                         </Typography>
//   //                       </Grid>
//   //                       <Grid item xs={2.4}>
//   //                         <Checkbox
//   //                           checked={p.checked}
//   //                           onChange={() => perm.togglePermission(p.name)}
//   //                           sx={{ color: "#000" }} // Changed checkbox color to black
//   //                         />
//   //                       </Grid>
//   //                       <Grid item xs={2.4}>
//   //                         <Checkbox
//   //                           checked={p.checked}
//   //                           onChange={() => perm.togglePermission(p.name)}
//   //                           sx={{ color: "#000" }} // Changed checkbox color to black
//   //                         />
//   //                       </Grid>
//   //                       <Grid item xs={2.4}>
//   //                         <Checkbox
//   //                           checked={p.checked}
//   //                           onChange={() => perm.togglePermission(p.name)}
//   //                           sx={{ color: "#000" }} // Changed checkbox color to black
//   //                         />
//   //                       </Grid>
//   //                       <Grid item xs={2.4}>
//   //                         <Checkbox
//   //                           checked={p.checked}
//   //                           onChange={() => perm.togglePermission(p.name)}
//   //                           sx={{ color: "#000" }} // Changed checkbox color to black
//   //                         />
//   //                       </Grid>
//   //                     </Grid>
//   //                     {/* <Grid item xs={2.4} key={idx}>
//   //                       {p.name}
//   //                     </Grid>
//   //                     <Grid item xs={2.4} key={idx}>
//   //                       <Checkbox
//   //                         checked={p.checked}
//   //                         onChange={() => perm.togglePermission(p.name)}
//   //                         sx={{ color: "#000" }} // Changed checkbox color to black
//   //                       />
//   //                     </Grid> */}
//   //                   </>
//   //                 ))}
//   //               </Grid>
//   //             </AccordionDetails>
//   //           </Accordion>
//   //         </Grid>
//   //       ))}
//   //     </Grid>
//   //   </Box>
//   // );

//   console.log(formData, "FORMDATA");
//   return (
//     <>
//       <Accordion
//         expanded={expanded === "panel2"}
//         onChange={handleChange("panel2")}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2bh-content"
//           id="panel2bh-header"
//         >
//           <Box
//             sx={{
//               borderBottom: expanded === "panel2" ? 1 : 0,
//               width: "100%",
//               borderColor: "divider",
//               px: 2.5,
//               py: 1.5,
//             }}
//           >
//             <Typography variant="h6">Broker</Typography>
//           </Box>
//         </AccordionSummary>
//         <AccordionDetails>
//           <EnablePermission
//             formData={formData1}
//             setFormData={setFormData1}
//             parendFormData={formData}
//             setParentFormData={setFormData}
//             permission={configureList[0]}
//           />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion
//         expanded={expanded === "panel3"}
//         onChange={handleChange("panel3")}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2bh-content"
//           id="panel2bh-header"
//         >
//           <Box
//             sx={{
//               borderBottom: expanded === "panel3" ? 1 : 0,
//               width: "100%",
//               borderColor: "divider",
//               px: 2.5,
//               py: 1.5,
//             }}
//           >
//             <Typography variant="h6">Builder</Typography>
//           </Box>
//         </AccordionSummary>
//         <AccordionDetails>
//           <EnablePermission
//             formData={formData}
//             setFormData={setFormData}
//             permission={configureList[1]}
//           />
//         </AccordionDetails>
//       </Accordion>
//     </>
//   );
// };

// const UserPermission = ({ formData, setFormData }: any) => {
//   const [tabIndex, setTabIndex] = useState(0);

//   const [permissions, setPermissions] = useState([
//     {
//       module: "Pre-Sales",
//       permissions: [
//         { name: "view", checked: false },
//         { name: "create", checked: false },
//         { name: "update", checked: false },
//         { name: "delete", checked: false },
//       ],
//       togglePermission(name: string) {
//         this.permissions = this.permissions.map((perm: any) =>
//           perm.name === name ? { ...perm, checked: !perm.checked } : perm
//         );
//         setPermissions([...permissions]);
//       },
//     },
//     {
//       module: "Pre-Sales and Call Center",
//       permissions: [
//         { name: "view", checked: false },
//         { name: "create", checked: false },
//         { name: "update", checked: false },
//         { name: "delete", checked: false },
//       ],
//       togglePermission(name: string) {
//         this.permissions = this.permissions.map((perm: any) =>
//           perm.name === name ? { ...perm, checked: !perm.checked } : perm
//         );
//         setPermissions([...permissions]);
//       },
//     },
//     {
//       module: "Lead Routing",
//       permissions: [
//         { name: "view", checked: false },
//         { name: "create", checked: false },
//         { name: "update", checked: false },
//         { name: "delete", checked: false },
//       ],
//       togglePermission(name: string) {
//         this.permissions = this.permissions.map((perm: any) =>
//           perm.name === name ? { ...perm, checked: !perm.checked } : perm
//         );
//         setPermissions([...permissions]);
//       },
//     },
//   ]);

//   return (
//     <Box sx={{ p: 2, border: "1px solid #ececec", borderRadius: "5px" }}>
//       <PermissionsTable
//         permissions={permissions}
//         formData={formData}
//         setFormData={setFormData}
//       />
//       {/* <Box sx={{ mt: 2 }}>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#000", color: "#fff" }}
//         >
//           Submit
//         </Button>
//       </Box> */}
//     </Box>
//   );
// };

// export default UserPermission;

import { useEffect, useState } from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import {
  IconMoodDollar,
  IconBuilding,
  IconChartHistogram,
} from "@tabler/icons-react";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";

const PermissionTable = ({
  permissions,
  setPermissions,
  resetPermissions,
}: any) => {
  const [tabValue, setTabValue] = useState(0);
  const [permissionType, setPermissionType] = useState();
  const [user, setUser] = useState<any>({});

  // Handle switching tabs
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCheckboxChange = (
    moduleId: number,
    submoduleId: number,
    permissionType: any
  ) => {
    setPermissions((prevPermissions: any) =>
      prevPermissions.map((module: any) => {
        if (module.moduleId === moduleId) {
          return {
            ...module,
            submodule: module.submodule.map((submodule: any) => {
              if (submodule.submoduleId === submoduleId) {
                return {
                  ...submodule,
                  permissions: {
                    ...submodule.permissions,
                    [permissionType]: submodule.permissions[permissionType]
                      ? 0
                      : 1,
                  },
                };
              }
              return submodule;
            }),
          };
        }
        return module;
      })
    );
  };

  const handleSelectAllChange = (moduleId: number, submoduleId: number) => {
    setPermissions((prevPermissions: any) =>
      prevPermissions.map((module: any) => {
        if (module.moduleId === moduleId) {
          return {
            ...module,
            submodule: module.submodule.map((submodule: any) => {
              if (submodule.submoduleId === submoduleId) {
                const allSelected =
                  submodule.permissions.read &&
                  submodule.permissions.create &&
                  submodule.permissions.edit &&
                  submodule.permissions.delete;

                return {
                  ...submodule,
                  permissions: {
                    read: allSelected ? 0 : 1,
                    create: allSelected ? 0 : 1,
                    edit: allSelected ? 0 : 1,
                    delete: allSelected ? 0 : 1,
                  },
                };
              }
              return submodule;
            }),
          };
        }
        return module;
      })
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data: any = localStorage.getItem("user");

      if (data) {
        try {
          setUser(JSON.parse(data));
        } catch (error) {
          console.error("Error", error);
        }
      }
    }
  }, []);
  console.log(user, "user");
  const filteredPermissions = permissions.filter((module: any) => {
    if (tabValue === 2) {
      return module.moduleType === "tenantAdmin";
    } else if (tabValue === 0) {
      return module.moduleType === "broker";
    } else {
      return module.moduleType === "builder";
    }
  });

  return (
    <>
      <Box my={5}>
        <CustomInputLabel>Select Permission Type</CustomInputLabel>
        <Select
          onChange={(e: any) => {
            const value = e.target.value;
            setTabValue(
              value === "Broker"
                ? 0
                : value === "Builder"
                ? 1
                : value === "Tenant Admin"
                ? 2
                : 0
            );
            setPermissionType(value);
            resetPermissions();
          }}
          sx={{ width: "20%" }}
          size="small"
        >
          {(
            [
              "Broker",
              "Builder",
              user?.sub?.roleId === "1" && "Tenant Admin",
            ].filter(Boolean) as string[]
          ).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {permissionType && (
        <Box
          p={4}
          mt={2}
          sx={{ border: "1px  solid  #ececec", borderRadius: "10px" }}
        >
          <Typography variant="h6" gutterBottom>
            Permission Management
          </Typography>

          {/* Tabs for selecting Broker or Builder */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Permission Tabs"
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
              width: "100%",
              borderTop: "1px  solid  #ececec",
              borderLeft: "1px  solid  #ececec",
              borderRight: "1px  solid  #ececec",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <Tab
              sx={{
                width: "100%",
                display: permissionType != "Broker" ? "none" : "",
                "&.Mui-selected": {
                  color: "#000",

                  backgroundColor: "#c2c5bc3d",
                },
              }}
              disabled={permissionType != "Broker"}
              icon={<IconChartHistogram />}
              label="Broker"
            />
            <Tab
              sx={{
                width: "100%",
                display: permissionType != "Builder" ? "none" : "",

                "&.Mui-selected": {
                  color: "#000",
                  backgroundColor: "#c2c5bc3d",
                },
              }}
              icon={<IconBuilding />}
              disabled={permissionType != "Builder"}
              label="Builder"
            />
            {user?.sub?.roleId && user?.sub?.roleId === "1" && (
              <Tab
                sx={{
                  width: "100%",
                  display: permissionType != "Tenant Admin" ? "none" : "",
                  "&.Mui-selected": {
                    color: "#000",

                    backgroundColor: "#c2c5bc3d",
                  },
                }}
                icon={<IconChartHistogram />}
                disabled={permissionType != "Tenant Admin"}
                label="Tenant Admin"
              />
            )}
          </Tabs>

          <TableContainer
            sx={{
              border: "1px  solid  #ececec",
              borderRadius: "0 0 10px 10px",
              boxShadow: "none",
            }}
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& > th": { fontWeight: "bold", fontSize: "15px" }, // Targets all TableCell elements within this TableRow
                  }}
                >
                  <TableCell>Modules</TableCell>
                  <TableCell>Create</TableCell>
                  <TableCell>Read</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Select All</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPermissions.map((module: any) => (
                  <React.Fragment key={module.moduleId}>
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        <Typography
                          fontSize={"13px"}
                          fontWeight={"500"}
                          variant="body2"
                        >
                          {module.moduleName}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {module.submodule.map((submodule: any) => (
                      <TableRow key={submodule.submoduleId}>
                        <TableCell>{submodule.submoduleName}</TableCell>
                        <TableCell>
                          <Checkbox
                            sx={{ color: "black" }}
                            checked={!!submodule.permissions.create}
                            onChange={() =>
                              handleCheckboxChange(
                                module.moduleId,
                                submodule.submoduleId,
                                "create"
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            sx={{ color: "black" }}
                            checked={!!submodule.permissions.read}
                            onChange={() =>
                              handleCheckboxChange(
                                module.moduleId,
                                submodule.submoduleId,
                                "read"
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            sx={{ color: "black" }}
                            checked={!!submodule.permissions.edit}
                            onChange={() =>
                              handleCheckboxChange(
                                module.moduleId,
                                submodule.submoduleId,
                                "edit"
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            sx={{ color: "black" }}
                            checked={!!submodule.permissions.delete}
                            onChange={() =>
                              handleCheckboxChange(
                                module.moduleId,
                                submodule.submoduleId,
                                "delete"
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            sx={{ color: "black" }}
                            checked={
                              !!submodule.permissions.read &&
                              !!submodule.permissions.create &&
                              !!submodule.permissions.edit &&
                              !!submodule.permissions.delete
                            }
                            onChange={() =>
                              handleSelectAllChange(
                                module.moduleId,
                                submodule.submoduleId
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default PermissionTable;
