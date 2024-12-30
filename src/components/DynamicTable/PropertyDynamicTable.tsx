/* eslint-disable prefer-const */
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  TableContainer,
  TextField,
} from "@mui/material";
import { CustomPagination, CustomPaginationNumber } from "./TablePagination";
import {
  IconEyeFilled,
  IconEdit,
  IconPointFilled,
  IconBaselineDensitySmall,
  IconBaselineDensityMedium,
  IconDownload,
  IconPlus,
  IconFilter,
} from "@tabler/icons-react";
import Grid from "@mui/material/Grid2";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import EditPopupForm from "../LeadCreation/EditLeads";
import EditProperty from "@/app/(DashboardLayout)/admin/propertyListing/EditProperty";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { enqueueSnackbar } from "notistack";
import { exportToPdf, exportdataExcel } from "@/utils/exportDoc";
import { useRouter } from "next/navigation";

type Order = "asc" | "desc";

interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface ReusableTableProps<T> {
  rows: T[];
  headCells: HeadCell<T>[];
  title?: string;
  enableSelect?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  setOpenLeadDialog: any;
  openLeadDialog: any;
  setSingleLead: any;
  singleLead: any;
  editDialog: any;
  setEditDialog: any;
  setEditData: any;
  editData: any;
}

function descendingComparator<T extends { [key: string]: string | number }>(
  a: T,
  b: T,
  orderBy: keyof T
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: string | number },
  b: { [key in Key]: string | number }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead<T>({
  headCells,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  enableSelect = false,
  enableSorting = false,
}: {
  headCells: HeadCell<T>[];
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof T;
  numSelected: number;
  rowCount: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  enableSelect?: boolean;
  enableSorting?: boolean;
}) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ width: "30px", height: 60 }}>
      <TableRow>
        {enableSelect && (
          <TableCell
            sx={{
              borderBottom: "1px solid #ececec",
              backgroundColor: "#ececec",
              color: "black",
              // borderTop: "1px solid #0003",
            }}
            padding="checkbox"
          >
            <Checkbox
              sx={{ color: "#0003" }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.numeric ? "left" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              borderBottom: "1px solid #ececec",
              backgroundColor: "#ececec",
              color: "black",
            }}
          >
            {enableSorting ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    "&:hover": { color: "black" },
                  }}
                  fontWeight={"bold"}
                >
                  {headCell.label}
                </Typography>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// const ExportdataExcel = async (
//   data: any[],
//   format: "excel",
//   title?: string,
//   worksheetname?: string
// ) => {
//   try {
//     if (format === "excel") {
//       // Prepare the data to be exported
//       const dataToExport = data.map((item, index) => {
//         const exportItem: any = {};
//         exportItem["ID"] = index + 1;

//         Object.keys(item).forEach((key) => {
//           if (key !== "_id") {
//             const humanReadableKey = key
//               .replace(/([A-Z])/g, " $1")
//               .replace(/^./, (str) => str.toUpperCase());
//             let value = item[key] || "";
//             if (Array.isArray(item[key]) && item[key].length > 0) {
//               value = item[key].join(", ");
//             }
//             exportItem[humanReadableKey] = value;
//           }
//         });
//         return exportItem;
//       });
//       const workbook = XLSX.utils.book_new();
//       const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//       XLSX.utils.book_append_sheet(
//         workbook,
//         worksheet,
//         worksheetname || "Sheet1"
//       );
//       const exportTitle = title ? `${title}.xlsx` : "Export.xlsx";
//       XLSX.writeFile(workbook, exportTitle);
//     }
//   } catch (error) {
//     console.log("error:", error);
//   }
// };

function PropertyDynamicTable<T extends { [key: string]: string | number }>({
  rows,
  headCells,
  title = "Table",
  enableSelect = false,
  enablePagination = true,
  enableSorting = true,
  setOpenLeadDialog,
  openLeadDialog,
  setSingleLead,
  singleLead,
  setEditDialog,
  editDialog,
  editData,
  setEditData,
}: ReusableTableProps<T>) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>(headCells[0].id);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(true);

  const startEntry = page * rowsPerPage + 1;
  const endEntry = Math.min(rows.length, (page + 1) * rowsPerPage);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(""); // New state for search term

  const [filterType, setFilterType] = React.useState<string>(""); // Filter type dropdown
  const [filterValue, setFilterValue] = React.useState<string>(""); // Filter value

  const handleFilterTypeChange = (event: any) => {
    setFilterType(event.target.value as string);
    setFilterValue(""); // Reset filter value on filter type change
  };

  const router = useRouter();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((_, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
    setPage(0);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Open":
        return (
          <Chip
            label={status}
            color="primary"
            sx={{ color: "white" }}
            icon={<IconPointFilled style={{ color: "#000" }} />}
          />
        );
      case "offline":
        return (
          <Chip
            label="Offline"
            sx={{
              border: "1px solid #022213",
              backgroundColor: "white",
              fontWeight: "bold",
              color: "#022213",
            }}
            icon={<IconPointFilled style={{ color: "red" }} />}
          />
        );

      default:
        return <Chip label="Unknown" />;
    }
  };

  const filteredRows = React.useMemo(() => {
    let tempRows = rows;

    if (searchTerm) {
      tempRows = tempRows.filter((row) =>
        headCells.some((cell) =>
          row[cell.id]?.toString().toLowerCase().includes(searchTerm)
        )
      );
    }

    if (filterType && filterValue) {
      tempRows = tempRows.filter((row) =>
        row[filterType]?.toString().toLowerCase().includes(filterValue)
      );
    }

    return tempRows;
  }, [rows, searchTerm, filterType, filterValue, headCells]);

  const rowsWithChips = filteredRows.map((row: any) => ({
    ...row,
    status: getStatusChip(row?.status),
  }));

  const handleShowUser = (userID: any) => {
    setOpenLeadDialog((prev: boolean) => !prev);

    const filterUserData = rows.filter((el) => el._id === userID);

    setSingleLead(filterUserData);
  };

  const handleEditUser = (userID: any) => {
    setEditDialog((prev: boolean) => !prev);

    const filterUserData = rows.filter((el) => el._id === userID);
    setEditData(filterUserData);
  };

  const icon = rowsWithChips.map((icon, index) => ({
    ...icon,
    id: index + 1,
    action: (
      <>
        <IconButton
          sx={{ border: "1px solid #ececec", borderRadius: "10px", mr: 1 }}
        >
          <IconEyeFilled onClick={() => handleShowUser(icon._id)} />
        </IconButton>
        <IconButton sx={{ border: "1px solid #ececec", borderRadius: "10px" }}>
          <IconEdit onClick={() => handleEditUser(icon._id)} />
        </IconButton>
      </>
    ),
  }));

  const visibleRows = React.useMemo(
    () =>
      [...icon]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rowsWithChips]
  );

  // const editOpenPopup = (item: any) => {
  //   setOpen(true);
  //   setEditRow(item);
  // };
  // const viewDetails = (item: any) => {
  //   // setViewPageOpen(true)
  //   setViewItem(item);
  //   console.log("viewlist--->", item);
  // };
  // console.log("----editRow", editRow);
  // const editClosePopup = () => {
  //   setOpen(false);
  // };

  // const icon = rowsWithChips.map((icon) => ({
  //   ...icon,
  //   action: (
  //     <Stack
  //       direction="row"
  //       justifyContent="center"
  //       alignItems="center"
  //       spacing={1}
  //     >
  //       <Button variant="outlined" sx={{ mr: 2 }}>
  //         <EditIcon onClick={() => editOpenPopup(icon)} />
  //       </Button>

  //       <Button
  //         onClick={() => {
  //           viewDetails(icon);
  //           setDisplayViewItem(!displayViewItem);
  //         }}
  //         variant="outlined"
  //         sx={{ color: "gray" }}
  //       >
  //         <IconEyeFilled />
  //       </Button>
  //     </Stack>
  //   ),
  // }));

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
    setIsOpen((isOpen: any) => !isOpen);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const GeneratePDF = async (headers: string[], fileName: string) => {
    setLoading(true);
    try {
      if (Array.isArray(rows) && rows.length > 0) {
        await exportToPdf(rows, "pdf", headers, fileName);
      } else {
        enqueueSnackbar("No data Available", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const ExportDataIntoExcel = async (
    title?: string,
    worksheetname?: string
  ) => {
    setLoading(true);
    try {
      if (Array.isArray(rows) && rows.length > 0) {
        exportdataExcel(rows, "excel", title, worksheetname);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
 

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValue(event.target.value.toLowerCase());
    setPage(0); // Reset to the first page on new filter
  };

  return (
    <Box sx={{  padding: 0 }}>
      {/* Custom Pagination at the Top (for Rows Per Page) */}
      {enablePagination && (
        <Grid container mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomPagination
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>

          <Grid textAlign={"right"} size={{ xs: 12, sm: 6 }}>
            <Grid container>
              <Grid textAlign={"center"} size={{xs:12, sm: 6}}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    gap: 1,
                  }}
                >
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Filter By</InputLabel>
                    <Select
                      value={filterType}
                      onChange={handleFilterTypeChange}
                      displayEmpty
                      input={
                        <OutlinedInput
                          startAdornment={
                            <InputAdornment position="start">
                              <IconFilter />
                            </InputAdornment>
                          }
                          label="Filter By"
                        />
                      }
                    >
                      <MenuItem value="">Filter By</MenuItem>
                      <MenuItem value="projectName">Project Name</MenuItem>
                      <MenuItem value="ownership">Status</MenuItem>
                      <MenuItem value="location">Location</MenuItem>
                    </Select>
                  </FormControl>

                  {filterType && (
                    <TextField
                      size="small"
                      placeholder={`Filter by ${filterType}`}
                      value={filterValue}
                      onChange={handleFilterValueChange}
                      sx={{ minWidth: 200 }}
                    />
                  )}
                </Box>
              </Grid>
              <Grid size={{xs:12, sm: 6}}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    gap: 1,
                  }}
                >
                  <Box sx={{ marginRight: "10px" }}>
                    <IconDownload
                      onClick={handleClick2}
                      style={{ cursor: "pointer" }}
                    />

                    {isOpen && (
                      <Menu
                        id="msgs-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={Boolean(anchorEl2)}
                        onClose={handleClose2}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        sx={{
                          "& .MuiMenu-paper": {
                            width: "200px",
                            color: "#131121",
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() =>
                            GeneratePDF(
                              [
                                "Id",
                                "projectName",
                                "location",
                                "propertyType",
                                "ownership",
                                "possessionStatus",
                                "unit",
                                "amenities",
                                "bathroom",
                                "balcony",
                              ],
                              "propert list"
                            )
                          }
                        >
                          <ListItemText> Export to Pdf </ListItemText>
                        </MenuItem>
                        <MenuItem
                          onClick={(event) =>
                            ExportDataIntoExcel(
                              "Property List",
                              "property sheet"
                            )
                          }
                        >
                          <ListItemText> Export To excel </ListItemText>
                        </MenuItem>
                      </Menu>
                    )}
                  </Box>
                  <Button
                    sx={{ ml: 2 }}
                    onClick={() => router.push("/admin/propertyManagement")}
                    variant="contained"
                    startIcon={<IconPlus />}
                    size="small"
                  >
                    Add Property
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <TableContainer
        sx={{
          maxHeight: 440,
          border: "1px solid #ececec",
          borderRadius: "10px",
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            headCells={headCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            enableSelect={enableSelect}
            enableSorting={enableSorting}
          />
          <TableBody>
            {visibleRows.map((row, index) => (
              <TableRow
                hover
                key={index}
                selected={selected.includes(index)}
                onClick={(event) => handleClick(event, index)}
              >
                {enableSelect && (
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ececec",
                    }}
                    padding="checkbox"
                  >
                    <Checkbox
                      sx={{ color: "#0003" }}
                      checked={selected.includes(index)}
                    />
                  </TableCell>
                )}
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id as string}
                    sx={{
                      fontWeight: "500",
                      fontSize: "12px",
                      borderBottom: "1px solid #ececec",
                    }}
                    align={headCell.numeric ? "left" : "left"}
                  >
                    {row[headCell.id as keyof T]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {enableSorting && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            <Typography>
              Showing {startEntry} to {endEntry} of {rows.length} entries
            </Typography>
          </Box>
          <CustomPaginationNumber
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}

      {/* {true && ( */}
      <Grid size={{ md: 3 }}>
        <EditPopupForm />
      </Grid>
      {/* )} */}

      <Dialog
        open={editDialog}
        maxWidth={"md"}
        onClose={() => setEditDialog(false)}
        aria-labelledby="scroll-dialog-title"
        fullWidth
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h4">Edit Property Details</Typography>
        </DialogTitle>

        <DialogContent>
          <List>
            <EditProperty editData={editData} close={setEditDialog} />
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default PropertyDynamicTable;
