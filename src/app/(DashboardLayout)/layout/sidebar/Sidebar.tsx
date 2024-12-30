// /* eslint-disable @next/next/no-async-client-component */
// "use client"  

// import {
//   useMediaQuery,
//   Box,
//   Drawer,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import SidebarItems from "./SidebarItems";
// import { Sidebar, Logo } from "react-mui-sidebar";
// import LogoImg from "../../../../../public/images/logos/Vector.png";
// import Image from "next/image";
// import { getData } from "@/services/apiService";

// interface ItemType {
//   isMobileSidebarOpen: boolean;
//   onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
//   isSidebarOpen: boolean;
// }

// // const clr = "black"



// const Sidebarr =async ({

  

//   isMobileSidebarOpen,
//   onSidebarClose,
//   isSidebarOpen,
// }: ItemType) => {
  
//   const theme :any= useTheme();
//   const lgUp = useMediaQuery(theme.breakpoints.up("lg"));


//   const sidebarWidth = "270px";
//   // Custom CSS for short scrollbar
//   const scrollbarStyles = {
//     backgroundColor: theme.palette.primary?.main,
//     // height:"90vh",
//     // width: '270px',

//     "&::-webkit-scrollbar": {
//       width: '10px',
//       // scrollbarWidth: "none",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#47733bbf",
//       borderRadius: "2px",
//     },
//     "&::-webkit-scrollbar-thumb:hover": {
//       backgroundColor: "#64a254bf",
//     },
//   };

//   if (lgUp) {
//     return (
//       <Box
//         sx={{
//           width: sidebarWidth,
//           flexShrink: 0,
//         }}
//       >
//         <Drawer
//           anchor="left"
//           open={isSidebarOpen}
//           variant="permanent"
//           PaperProps={{
//             sx: {
//               boxSizing: "border-box",
//               // margin: "20px",
//               // borderRadius: "12px",
//               // width: "270px",
//               ...scrollbarStyles,
//             },
//           }}
//         >
//           <Box
//             sx={
//               {
//                 // height: "100%",
//               }
//             }
//           >
//             <Sidebar
//               // width={'270px'}
//               collapsewidth="80px"
//               open={isSidebarOpen}
//               themeColor="#5d87ff"
//               themeSecondaryColor="#49beff"
//               showProfile={false}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "1em",
//                   margin: "20px 20px",
//                   paddingBottom: "10px",
//                   fontSize: "14px",
//                   color: "white",
//                   fontWeight: "bold",
//                 }}
//               >
//                 <Image src={LogoImg} alt="LOGO" width={20} height={20} />
//                 <Typography variant="body2" fontSize={"18px"}>
//                   Real Estate Portal
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   height: "100%",
//                 }}
//               >
//                 <SidebarItems />
//               </Box>
//             </Sidebar>
//           </Box>
//         </Drawer>
//       </Box>
//     );
//   }

//   return (
//     <Drawer
//       anchor="left"
//       open={isMobileSidebarOpen}
//       onClose={onSidebarClose}
//       variant="temporary"
//       PaperProps={{
//         sx: {
//           backgroundColor:"#022213",
//           width: sidebarWidth,
//           boxShadow: (theme) => theme.shadows[8],
//         },
//       }}
//     >
//       <Typography
//         sx={{
//           color: "white",
//           fontWeight: "700",
//           fontSize: "16px",
//           cursor: "pointer",
//           letterSpacing: "-0.8px",
//           fontFamily: "Nunito, sans-serif",
//           ml: 4,
//           mt: 2,
//         }}
//       >
//         Real Estate Portal
//       </Typography>
//       <SidebarItems />
//     </Drawer>
//   );
// };

// export default Sidebarr;
