import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SelectChangeEvent } from "@mui/material/Select";
import { CustomInputLabel } from "@/utils/CustomComponents/InputLabel";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { exceptThisSymbols, hideArrowUpDown } from "@/utils/validation";

export default function DiscountCalculator({
  amount,
  generalData,
  basicRate,
  setBasicRate,
  discount,
  setDiscount,
}: any) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("xs");
  const [forms, setForms] = React.useState({
    amount: amount,
    discount: 0,
    taxRate: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setForms({
      amount: amount,
      discount: 0,
      taxRate: 0,
    });
    setOpen(false);
  };

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullWidth(event.target.checked);
  };
  const rowTable = [
    {
      Head: "Gross Amount",
      // Rate: generalData?.areaOrDiffArea ? generalData?.areaOrDiffArea : 0,
      Amount: amount,
    },
    {
      Head: "Discounted Price",
      // Rate: "0.00",
      Amount: forms?.discount ? (amount * Number(forms?.discount)) / 100 : 0,
    },
    {
      Head: "Tax Charges",
      // Rate: "0.00",
      Amount: forms?.taxRate ? Number(forms?.taxRate) : 0,
    },
    {
      Head: "Final Gross Amount",
      Amount: (
        amount -
        Number((amount * Number(forms?.discount)) / 100) +
        Number(forms?.taxRate)
      ).toFixed(2),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForms((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // console.log(e.target, "FORM DATA")
    setDiscount({
      ...discount,
      rate: forms?.discount,
      amount: (amount * Number(forms?.discount)) / 100,
    });
    setBasicRate(
      (
        amount -
        Number((amount * Number(forms?.discount)) / 100) +
        Number(forms?.taxRate)
      ).toFixed(2)
    );
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        sx={{ mt: 2 }}
        disabled={basicRate=="0.00"? true:false}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Calculate Discount
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ backgroundColor: "grey", color: "white", mb: 2 }}>
          Discount Calculator
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              alignItems: "left",
              justifyContent: "left",
              //   width: "fit-content",
            }}
          >
            <Box>
              <CustomInputLabel>Amount</CustomInputLabel>
              <TextField
                fullWidth
                type="number"
                size="small"
                name="amount"
                placeholder="Amount"
                value={amount}
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                sx={hideArrowUpDown}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <CustomInputLabel>Discount %</CustomInputLabel>
              <TextField
                fullWidth
                type="number"
                size="small"
                name="discount"
                placeholder="discount"
                value={forms?.discount}
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                sx={hideArrowUpDown}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <CustomInputLabel>Tax</CustomInputLabel>
              <TextField
                fullWidth
                type="number"
                size="small"
                name="taxRate"
                placeholder="Amount"
                value={forms.taxRate}
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                sx={hideArrowUpDown}
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <TableContainer
              sx={{
                maxHeight: 900,
                border: "1px solid #ececec",
                borderRadius: "10px",
                p: "0 10px",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead
                  sx={{
                    width: "100px",
                    padding: "100px 0",
                    height: 60,
                  }}
                >
                  <TableRow>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #ececec",
                        // backgroundColor: "#f9fbfc",
                        // borderTop: "1px solid #0003",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",

                          "&:hover": { color: "black" },
                        }}
                        fontWeight={"bold"}
                      >
                        Heads
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #ececec",
                        // backgroundColor: "#f9fbfc",
                        // borderTop: "1px solid #0003",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          textAlign: "center",
                          "&:hover": { color: "black" },
                        }}
                        fontWeight={"bold"}
                      >
                        Amount
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rowTable.map((row: any, i: number) => (
                    <TableRow key={i} hover>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ececec",
                          height: "40px",
                          fontWeight: 500,
                        }}
                        padding="checkbox"
                      >
                        {row.Head}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ececec",
                          textAlign: "center",
                        }}
                        padding="checkbox"
                      >
                        {row.Amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={handleSave}>
            Save
          </Button>

          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
