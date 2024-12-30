import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TableContainer,
  TextField,
  useTheme,
} from "@mui/material";
import {
  CustomPagination,
  CustomPaginationNumber,
} from "../DynamicTable/TablePagination";

import {
  IconEyeFilled,
  IconEdit,
  IconPointFilled,
  IconBaselineDensitySmall,
  IconBaselineDensityMedium,
  IconFilter,
} from "@tabler/icons-react";
import Grid from "@mui/material/Grid2";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import EditUser from "@/app/(DashboardLayout)/admin/users/EditUser";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import InputAdornment from "@mui/material/InputAdornment";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";

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
  userListDialog: any;
  setUserListDialog: any;
  selectedUser: any;
  setSelectedUser: any;
  editUser: any;
  setEditUser: any;
  openEditdialog: any;
  setOpenEditdialog: any;
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

  const theme = useTheme();

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

              // borderTop: "1px solid #0003",
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

function RolesTable<T extends { [key: string]: string | number }>({
  rows,
  headCells,
  title = "Table",
  enableSelect = false,
  enablePagination = true,
  enableSorting = true,
  userListDialog,
  setUserListDialog,
  selectedUser,
  setSelectedUser,
  editUser,
  setEditUser,
  openEditdialog,
  setOpenEditdialog,
}: ReusableTableProps<T>) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>(headCells[0].id);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(""); // New state for search term

  const [filterType, setFilterType] = React.useState<string>(""); // Filter type dropdown
  const [filterValue, setFilterValue] = React.useState<string>(""); // Filter value

  const handleFilterTypeChange = (event: any) => {
    setFilterType(event.target.value as string);
    setFilterValue(""); // Reset filter value on filter type change
  };

  const handleFilterValueChange = (event: any) => {
    setFilterValue(event.target.value.toLowerCase());
    setPage(0); // Reset to the first page on new filter
  };

  const router = useRouter();
  const startEntry = page * rowsPerPage + 1;
  const endEntry = Math.min(rows.length, (page + 1) * rowsPerPage);

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
      case "active":
        return (
          <Chip
            label="Active"
            sx={{ backgroundColor: "#022213", color: "white" }}
            icon={<IconPointFilled style={{ color: "#adde34" }} />}
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

  const handleShowUser = (userID: any) => {
    setUserListDialog((prev: boolean) => !prev);

    const filterUserData = rows.filter((el) => el._id === userID);

    setSelectedUser(filterUserData);
  };

  const handleEditUser = (userID: any) => {
    setOpenEditdialog((prev: boolean) => !prev);

    const filterUserData = rows.filter((el) => el._id === userID);
    setEditUser(filterUserData);
  };

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <Box sx={{ width: "100%", padding: 0 }}>
      {enablePagination && (
        <Grid container mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomPagination
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>

          <Grid textAlign={"right"} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
                gap: 1,
              }}
            >
              <Grid textAlign={"center"} size={{ xs: 12, sm: 4 }}>
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
                      <MenuItem value="roleName">Role</MenuItem>
                      <MenuItem value="description">Description</MenuItem>
                    </Select>
                  </FormControl>

                  {filterType &&
                    (filterType !== "status" ? (
                      <TextField
                        size="small"
                        placeholder={`Filter by ${filterType}`}
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        sx={{ minWidth: 200 }}
                      />
                    ) : (
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        {/* <InputLabel>Lead Approval Status</InputLabel> */}
                        <Select
                          value={filterValue}
                          onChange={handleFilterValueChange}
                          displayEmpty
                        >
                          <MenuItem value="">Select Status</MenuItem>
                          <MenuItem value="1">Active</MenuItem>
                          <MenuItem value="0">InActive</MenuItem>
                        </Select>
                      </FormControl>
                    ))}
                </Box>
              </Grid>

              <Button
                sx={{ ml: 2 }}
                onClick={() => setOpenEditdialog(true)}
                variant="contained"
                startIcon={<IconPlus />}
                size="small"
              >
                Add New Role
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      <TableContainer
        sx={{
          // maxHeight: 540,
          border: "1px solid #ececec",
          borderRadius: "10px",
        }}
        className="custom-scrollbar"
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
            rowCount={filteredRows.length}
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
              Showing {startEntry} to {endEntry} of {filteredRows.length}{" "}
              entries
            </Typography>
          </Box>
          <CustomPaginationNumber
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}

      <Dialog
        open={openEditdialog}
        onClose={() => setOpenEditdialog(false)}
        aria-labelledby="scroll-dialog-title"
        maxWidth="xs"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h4">Creare New Role</Typography>
        </DialogTitle>

        <DialogContent>
          <List>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12 }}>
                {/* <CustomInputLabel reqiredField={true}>
                  Role Name
                </CustomInputLabel> */}
                <TextField name="roleName" label="Role Name *" size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }}>
                {/* <CustomInputLabel reqiredField={true}>
                  Description
                </CustomInputLabel> */}

                <TextField
                  name="description"
                  label="Description *"
                  size="small"
                />
              </Grid>

              <Grid mt={2} size={{ xs: 6, sm: 6 }}>
                <Button sx={{ mr: 2 }} variant="contained">
                  Add
                </Button>
                <Button variant="outlined">Cancel</Button>
              </Grid>
            </Grid>
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default RolesTable;
