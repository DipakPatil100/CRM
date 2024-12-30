"use client";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TableCell,
  Chip,
  Grid2,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Avatar,
  Stack,
  styled,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DynamicTableComponent from "@/components/DynamicTable/Table.component";
import {
  IconEyeFilled,
  IconX,
  IconMessageCircle,
  IconMail,
  IconPhone,
  IconCurrentLocation,
  IconCalendarDue,
} from "@tabler/icons-react";
import React from "react";
import { deepOrange, green } from "@mui/material/colors";
import Image from "next/image";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { fetchUsers } from "@/lib/features/Users/user";
import { useRouter } from "next/navigation";
import RolesTable from "./RolesTable";

interface HeadCell<T> {
  id: any; // This ensures that id is one of the keys in your data type
  numeric: boolean;
  label: string;
}

interface Data {
  id: number;
  name: string;
  price: number;
}

const Root = styled("div")(({ theme }: any) => ({
  width: "100%",
  marginTop: 1,
  color: "#000",
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(1),
  },
}));

const headCells: HeadCell<Data>[] = [
  { id: "id", numeric: true, label: "#" },
  { id: "roleName", numeric: false, label: "Role" },
  { id: "description", numeric: false, label: "Description" },
];

const rows = [
    {
        id:1,
        roleName: "Sales",
        description: "Sales Description"
    },
    {
        id:2,
        roleName: "Tele Caller",
        description: "Tele Caller Description"
    }
]
const ManageRoles = () => {
  const [open, setOpen] = React.useState(false);
  const [signleUser, setSingleUser] = React.useState<any>([]);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [signleUserEdit, setSingleUserEdit] = React.useState<any>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading....</p>;
  }

  console.log(users, "userss");
  return (
    <Box width={"auto"} m={5}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: open ? 8 : 12 }}>
          <RolesTable
            rows={rows}
            headCells={headCells}
            title="User List"
            enableSelect={true}
            enablePagination={true}
            enableSorting={true}
            userListDialog={open}
            setUserListDialog={setOpen}
            selectedUser={signleUser}
            setSelectedUser={setSingleUser}
            editUser={signleUserEdit}
            setEditUser={setSingleUserEdit}
            openEditdialog={openEditDialog}
            setOpenEditdialog={setOpenEditDialog}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ManageRoles;
