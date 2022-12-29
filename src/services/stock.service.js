import React from "react";
import instance from "../axiosInstace";
import { ADD_STOCK_API, GET_STOCKS_API } from "./urlUtils";

class StockService {
  getStocks(companyCode, fromDate, toDate) {
    //console.log("Stocks url: ",GET_STOCKS_API+`${companyCode}/`+`${fromDate}/`+`${toDate}`);
    return instance
      .get(GET_STOCKS_API + `${companyCode}/` + `${fromDate}/` + `${toDate}`)
      .then((res) => res);
  }

  addStock(stock, companyCode) {
    //console.log("Add Stock url: ",ADD_STOCK_API+`${companyCode}`);
    return instance.post(ADD_STOCK_API + `${companyCode}`, stock);
  }
}

export default new StockService();
