import * as React from "react";
import DailogBox from "../../components/DailogBox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useMemo } from "react";

import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import Stock from "./Stock";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { styled } from "@mui/material/styles";
import { AutoComplete } from "primereact/autocomplete";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import CompanyService from "../../services/company.service";
import StockService from "../../services/stock.service";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const validationSchema = yup.object({
  dates: yup.array().of(yup.string().required()),
  companyCode: yup.string("select company").required("Company is required"),
});

const Stocks = () => {
  const [stocks, setStocks] = React.useState([]);
  const [companies, setCompanies] = React.useState([{}]);
  const [dates, setDates] = React.useState(null);
  const [companyCode, setCompanyCode] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [companyInfo, setCompanyInfo] = React.useState([]);
  let [responseMsg, setResponseMsg] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isSnackBarOpened, setIsSnackBarOpened] = React.useState(false);
  const [openStockModal, setOpenStockModal] = React.useState(false);
  const [value, setValue] = React.useState("");

  let [dynamicColumns, setDynamicColumns] = React.useState([]);
  const [filteredCompanies, setFilteredCompanies] = React.useState([]);
  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [min, setMin] = React.useState(null);
  const [max, setMax] = React.useState(null);
  const [average, setAverage] = React.useState(null);

  const getCompanies = React.useCallback(() => {
    CompanyService.getCompanies()
      .then((res) => {
        // console.log("comapnies response: ", res?.data)
        let result = res?.data?.data;
        if (res?.status === 200) {
          setTimeout(() => {
            setOpen(false);
            setCompanies(result);
          }, 2000);
        } else {
          setIsSnackBarOpened(true);
          setResponseMsg(
            "Service is taking too long to respond or is down. Please try again later."
          );
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }
      })
      .catch((error) => {
        // Error
        if (error.response) {
        }
      });
  }, []);
  useEffect(() => {
    setOpen(true);
    getCompanies();
  }, [min, max, average]);

  const handleClickOpen = () => {
    debugger;
    setOpenStockModal(true);
  };
  const handleClose = () => setOpenStockModal(false);
  const handleCloseBackDrop = () => setOpen(false);
  const handleCloseSnackBar = () => setIsSnackBarOpened(false);
  const handleDateRange = (e) => {
    setDates(e.value);
  };
  const searchCompany = (event) => {
    setTimeout(() => {
      let _filteredCompanies;
      if (!event.query.trim().length) {
        _filteredCompanies = [...companies];
      } else {
        _filteredCompanies = companies.filter((company) => {
          return company.companyName
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredCompanies(_filteredCompanies);
    }, 250);
  };

  /*const [result, setResult] = React.useState([{"id":"b534bf26-e2c6-46b3-976b-f12de110e9e5","stockPrice":977799.0,"date":"2022-06-19T14:34:54.241Z"
        ,"time":null,"companyCode":"YES00088559"}]) ;*/

  const formik = useFormik({
    initialValues: {
      dates: [],
      companyCode: "",
    },
    onSubmit: (values) => {
      debugger;
      if (values.companyCode === "") {
      }
      //  console.log("Values :", values)

      //alert(JSON.stringify(values, null, 2));
    },
  });

  const searchFilter = () => {
    setOpen(true);
    //console.log("Test Dates: ", dates);
    // console.log("Before From Date: ", dates[0]);
    let fromDate = moment(dates[0]).utc().format();
    setStartDate(moment(dates[0]).utc().format());
    setStartDate(fromDate);
    // console.log("After From Date: ", fromDate);
    // console.log("Before to Date: ", dates[1]);
    let toDate = moment(dates[1]).utc().format();
    setEndDate(toDate);
    //console.log("After to Date: ", toDate);
    //console.log("Test companyCode", selectedCompany)
    setCompanyCode(selectedCompany);
    //console.log("After setting all : ", selectedCompany, fromDate, toDate);
    debugger;
    StockService.getStocks(selectedCompany, fromDate, toDate)
      .then((res) => {
        //   console.log("stocks response: ", res)
        let result = res?.data?.data;
        if (res?.status === 200) {
          setTimeout(() => {
            setOpen(false);
            setStocks(result);
            const priceArray = result?.map((stock) => stock.stockPrice);
            //console.log("priceArray response: ", priceArray);
            setMax(Math.max.apply(Math, priceArray));
            setMin(Math.min.apply(Math, priceArray));

            const averagePrice = (data) =>
              data.reduce((a, b) => a + b) / data.length;
            averagePrice(priceArray);
            setAverage(averagePrice(priceArray));
            //console.log("max response: ", max);
            //console.log("min response: ", min);
            //console.log("average response: ", average);
          }, 500);
        } else if (res?.status === 204) {
          setMax(null);
          setMin(null);
          setAverage(null);
          setIsSnackBarOpened(true);
          setResponseMsg(`No stocks found for ${selectedCompany}`);
          setTimeout(() => {
            setOpen(false);
            setStocks([]);
          }, 1000);
        } else {
          setIsSnackBarOpened(true);
          setResponseMsg(
            "Service is taking too long to respond or is down. Please try again later."
          );
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }
      })
      .catch((error) => {
        // Error
        if (error.response) {
        }
      });
    //setStocks([result?.data, ...stocks])
  };

  const columns = [
    { field: "stockPrice", header: "Stock Price" },
    { field: "date", header: "Date" },
    { field: "time", header: "Time" },
    { field: "companyCode", header: "Company code" },
  ];
  const dateTemplate = (rowData, column) => {
    //debugger;
    //console.log("Date format :", rowData["date"]);
    return moment(rowData["date"]).format("DD/MM/YYYY");
  };

  dynamicColumns = columns.map((col, i) => {
    if (col.field === "date") {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={dateTemplate}
        ></Column>
      );
    } else {
      return (
        <Column key={col.field} field={col.field} header={col.header}></Column>
      );
    }
  });

  return (
    <Grid container spacing={3}>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        style={{ margin: "10px 5px 0 5px" }}
      >
        <Grid style={{ margin: "0 5px 0 0" }}>
          <Calendar
            value={dates}
            onChange={(e) => handleDateRange(e)}
            selectionMode="range"
            placeholder="Select date range"
            showTime
            showSeconds
          />
        </Grid>
        <Grid style={{ margin: "0 5px 0 5px" }}>
          <AutoComplete
            value={selectedCompany}
            name="companyName"
            suggestions={filteredCompanies}
            completeMethod={searchCompany}
            dropdown
            field="companyCode"
            onChange={(e) => setSelectedCompany(e.value.companyCode)}
            dropdownAriaLabel="Select company"
          />
        </Grid>
        <Grid style={{ margin: "0 5px 0 5px" }}>
          <Button variant="contained" sx={{ m: 1 }} onClick={searchFilter}>
            Search
          </Button>
        </Grid>

        {/*<Stack direction="row" spacing={2}>*/}
        {/*    <Button variant="contained" sx={{ m: 1 }} onClick={handleClickOpen}>Add</Button>*/}
        {/*</Stack>*/}
      </Grid>

      <Grid item xs={9} md={9}>
        <DataTable
          value={stocks}
          responsiveLayout="scroll"
          stripedRows
          resizableColumns
          size="small"
          style={{ width: "100%" }}
          emptyMessage="No stocks found."
        >
          {dynamicColumns}
        </DataTable>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleCloseBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          open={isSnackBarOpened}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
          message={responseMsg}
          anchorOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
        />

        <Stock
          openStockPopup={openStockModal}
          onCloseStockPopup={handleClose}
        />
      </Grid>
      <Grid item xs={3} md={3}>
        <Stack direction="column" spacing={1} justifyContent="center">
          {max ? (
            <Item>
              <span>
                <span style={{ "font-weight": "bold" }}>Max: </span>
                <br />
                <span>{max}</span>{" "}
              </span>
            </Item>
          ) : (
            ""
          )}
          {min ? (
            <Item>
              <span>
                <span style={{ "font-weight": "bold" }}>Min: </span> <br />
                <span>{min}</span>
              </span>
            </Item>
          ) : (
            ""
          )}
          {average ? (
            <Item>
              <span>
                <span style={{ "font-weight": "bold" }}>Average: </span> <br />
                <span>{average.toFixed(2)}</span>
              </span>
            </Item>
          ) : (
            ""
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Stocks;
