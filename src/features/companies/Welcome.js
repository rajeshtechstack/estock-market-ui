import * as React from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  styled,
} from "@mui/material";
import { useGetCompaniesQuery } from "../companies/companyApiSlice";
import DailogBox from "../../components/DailogBox";
import CompanyService from "../../services/company.service";
import UserService from "../../services/user.service";

const Item = styled(Paper)(({ theme }) => ({
  
  padding: theme.spacing(1),
  textAlign: "center",
  
}));

const Welcome = () => {
  let [result, setResult] = React.useState(null);
  let [responseMsg, setResponseMsg] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isSnackBarOpened, setIsSnackBarOpened] = React.useState(false);

  //const {data: companies, isLoading, isFetching, isError} = useGetCompaniesQuery();

  const getCompanies = useCallback(() => {
    CompanyService.getCompanies()
      .then((res) => {
        let result = res?.data?.data;
        //console.log("Companies Info: ", res);

        if (res?.status === 200) {
          setTimeout(() => {
            setOpen(false);
            setResult(result);
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
    
  }, []);

  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleClickOpen = () => {
    debugger;
    setOpenModal(true);
  };
  const handleCloseBackDrop = () => setOpen(false);
  const handleClose = () => setOpenModal(false);
  const handleCloseSnackBar = () => setIsSnackBarOpened(false);
  //const [getStocks] =  useGetStocksQuery();

  /*const [result, setResult] = React.useState([{"id":"b534bf26-e2c6-46b3-976b-f12de110e9e5","stockPrice":977799.0,"date":"2022-06-19T14:34:54.241Z"
        ,"time":null,"companyCode":"YES00088559"}]) ;*/
  const columns = [
    { field: "companyCode", header: "Company Code" },
    { field: "companyName", header: "Company Name" },
    { field: "companyWebsite", header: "Company Website" },
    { field: "turnOver", header: "Turn Over" },
    { field: "ceo", header: "CEO" },
    { field: "exchangeTypes", header: "Exchange Types" },
  ];
  const exchangeTypeTemplate = (rowData, column) => {
    //debugger;
    console.log("Date format :", rowData["exchangeTypes"].length);
    if(rowData["exchangeTypes"]?.length>0){
      return (<div><span>{rowData["exchangeTypes"][0]}</span>, <span>{rowData["exchangeTypes"][1]}</span></div>)
      
    }else{
      return <span>{rowData["exchangeTypes"]}</span>
    }
    
  };
  const dynamicColumns = columns.map((col, i) => {
    if(col.field === 'exchangeTypes'){
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={exchangeTypeTemplate}
        ></Column>
      );
    }else{
      return (
        <Column key={col.field} field={col.field} header={col.header}></Column>
      );
    }
    
  });

  return (
    <Grid container direction="row">
      <Grid item xs={4}>
        {/*<Stack direction="row" spacing={2}>*/}
        <Button variant="contained" sx={{ m: 1 }} onClick={handleClickOpen}>
          Add
        </Button>
        {/*</Stack>*/}
      </Grid>
      <DataTable
        value={result}
        responsiveLayout="scroll"
        showGridlines
        size="small"
        stripedRows
        resizableColumns
        style={{ width: "100%" }}
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
      <DailogBox open={openModal} onClose={handleClose} />
    </Grid>
  );
};

export default Welcome;
