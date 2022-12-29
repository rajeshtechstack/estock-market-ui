import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, InputLabel, TextField, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import {
  useAddCompanyMutation,
  useGetCompaniesQuery,
} from "../companies/companyApiSlice";
import { useAddStockMutation } from "./stocksApiSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  companyCode: yup
    .string("Enter company code")
    .required("Company code is required"),
  stockPrice: yup
    .number("Enter stock price")
    .required("stock price is required"),
});

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = ["BSE", "NSE"];

export default function Stock(props) {
  // const {
  //     openStockPopup, onCloseStockPopup
  // } = props;
  let [result, setResult] = React.useState([{}]);
  const [error, setError] = React.useState(false);
  const [exchangeTypeLength, setExchangeTypeLength] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(props.openStockPopup);
  const [closePopup, setClosePopup] = React.useState(props.onCloseStockPopup);
  const [fullWidth, setFullWidth] = React.useState(true);
  const theme = useTheme();
  const [addStock] = useAddStockMutation();
  //const {data: companies, isLoading, isFetching, isError} = useGetCompaniesQuery();
  useEffect(() => {
    debugger;
    //console.log("Test Companies", companies)

    //setResult(companies);
    setOpenPopup(props.openStockPopup);
    setClosePopup(props.onCloseStockPopup);
  }, [openPopup, closePopup]);
  const formik = useFormik({
    initialValues: {
      stockPrice: "",
      companyCode: {},
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      debugger;
      if (values.companyCode === "") {
        setExchangeTypeLength(true);
      }
      console.log("Values :", values);
      const {
        data: result,
        isLoading,
        isFetching,
        isError,
      } = addStock(values.companyCode, values);
      //const data = addCompany(values);
      closeModalPopup();

      //alert(JSON.stringify(values, null, 2));
    },
  });
  const closeModalPopup = () => {
    debugger;
    setClosePopup(props.onCloseStockPopup);
    formik.handleReset();
  };

  return (
    <div>
      <Dialog
        open={props.openStockPopup}
        onClose={closeModalPopup}
        fullWidth={fullWidth}
        maxWidth="md"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Add Stock Price</DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& > :not(style)": { m: 1 },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    id="stockPrice"
                    label="Stock Price"
                    name="stockPrice"
                    value={formik.values.stockPrice}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.stockPrice &&
                      Boolean(formik.errors.stockPrice)
                    }
                    helperText={
                      formik.touched.stockPrice && formik.errors.stockPrice
                    }
                    size="small"
                    required
                    fullWidth
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    onKeyPress={(event) => {
                      if (
                        event?.key === "-" ||
                        event?.key === "+" ||
                        event?.key === "E" ||
                        event?.key === "e"
                      ) {
                        event.preventDefault();
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Company *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="companyCode"
                      name="companyCode"
                      label="Company *"
                      displayEmpty
                      value={formik.values.companyCode}
                      onChange={formik.handleChange}
                      size="small"
                      fullWidth={fullWidth}
                    >
                      {result?.map((company) => (
                        <MenuItem
                          key={company.companyCode}
                          value={company.companyCode}
                          style={{
                            fontWeight: theme.typography.fontWeightRegular,
                          }}
                        >
                          {company.companyName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModalPopup}>Cancel</Button>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
