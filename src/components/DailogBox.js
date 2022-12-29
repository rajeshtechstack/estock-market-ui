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
import { useAddCompanyMutation } from "../features/companies/companyApiSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  companyName: yup
    .string("Enter company name")
    .required("Company name is required"),
  companyCode: yup
    .string("Enter company code")
    .required("Company code is required"),
  ceo: yup.string("Enter CEO name").required("CEO name is required"),
  companyWebsite: yup
    .string("Enter company website")
    .required("company website is required"),
  turnOver: yup
    .number("Enter company trunover")
    .required("Password is required"),
  exchangeTypes: yup.array().of(yup.string().required()),
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

export default function DailogBox(props) {
  const { open, onClose } = props;

  const [error, setError] = React.useState(false);
  const [exchangeTypeLength, setExchangeTypeLength] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(props.open);
  const [closePopup, setClosePopup] = React.useState(props.onClose);
  const [fullWidth, setFullWidth] = React.useState(true);
  const theme = useTheme();
  const [addCompany] = useAddCompanyMutation();
  useEffect(() => {
    debugger;
    setOpenPopup(props.open);
    setClosePopup(props.onClose);
  }, [openPopup, closePopup]);
  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyCode: "",
      ceo: "",
      companyWebsite: "",
      turnOver: "",
      exchangeTypes: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      debugger;
      if (values.exchangeTypes.length === 0) {
        setExchangeTypeLength(true);
      }
      console.log("Values :", values);
      const data = addCompany(values);
      closeModalPopup();

      //alert(JSON.stringify(values, null, 2));
    },
  });
  const closeModalPopup = () => {
    setClosePopup(onClose);
    formik.handleReset();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModalPopup}
        fullWidth={fullWidth}
        maxWidth="md"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Add Company</DialogTitle>
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
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.companyName &&
                      Boolean(formik.errors.companyName)
                    }
                    helperText={
                      formik.touched.companyName && formik.errors.companyName
                    }
                    size="small"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="companyCode"
                    label="Company Code"
                    name="companyCode"
                    value={formik.values.companyCode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.companyCode &&
                      Boolean(formik.errors.companyCode)
                    }
                    helperText={
                      formik.touched.companyCode && formik.errors.companyCode
                    }
                    size="small"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="ceo"
                    label="CEO Name"
                    name="ceo"
                    value={formik.values.ceo}
                    onChange={formik.handleChange}
                    error={formik.touched.ceo && Boolean(formik.errors.ceo)}
                    helperText={formik.touched.ceo && formik.errors.ceo}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="companyWebsite"
                    label="Company Website"
                    name="companyWebsite"
                    value={formik.values.companyWebsite}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.companyWebsite &&
                      Boolean(formik.errors.companyWebsite)
                    }
                    helperText={
                      formik.touched.companyWebsite &&
                      formik.errors.companyWebsite
                    }
                    size="small"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="turnOver"
                    label="Trun over"
                    name="turnOver"
                    value={formik.values.turnOver}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.turnOver && Boolean(formik.errors.turnOver)
                    }
                    helperText={
                      formik.touched.turnOver && formik.errors.turnOver
                    }
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Stock exchange
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="exchangeTypes"
                      name="exchangeTypes"
                      multiple
                      label="Stock exchange *"
                      displayEmpty
                      value={formik.values.exchangeTypes}
                      onChange={formik.handleChange}
                      size="small"
                      fullWidth={fullWidth}
                    >
                      <MenuItem disabled value="">
                        <em>Select one stock exchange type</em>
                      </MenuItem>
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, name, theme)}
                        >
                          {name}
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
