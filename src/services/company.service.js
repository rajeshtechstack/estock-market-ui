import React from "react";
import instance from "../axiosInstace";
import { ADD_COMPANY_API, GET_COMPANIES_API } from "./urlUtils";

class CompanyService {
  getCompanies() {
    return instance.get(GET_COMPANIES_API).then((res) => res);
  }

  addCompany(company) {
    return instance.post(ADD_COMPANY_API, company);
  }
}

export default new CompanyService();
