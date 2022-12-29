import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Welcome from "./features/companies/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import AppLayout from "./components/AppLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container, Grid, Toolbar } from "@mui/material";
import Stocks from "./features/stocks/Stocks";
import UserLoginComponent from "./features/auth/UserLoginComponent";
import { getGlobal } from "./services/global";

const mdTheme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            textTransform: "none",
          },
        },
      ],
    },
  },
});
function App() {
  
  const navigate = useNavigate();
  const isLoggedIn = getGlobal("isLoggedIn") ? true : false;
  //console.log("Test is logged in: ", isLoggedIn)
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {isLoggedIn ? <AppLayout /> : ""}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container fixed sx={{ mt: 4, mb: 4 }}>
            <Grid container direction="row">
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* public routes */}

                  <Route index path="/" element={<UserLoginComponent />} />
                  {/* <Route index path="/" element={<Login />} /> */}
                  {/* protected routes */}
                  {/*element={<RequireAuth />}*/}
                  {/*element={<RequireAuth />}*/}
                  <Route element={<RequireAuth />}>
                    {/*<Route path="/" exact element={<Welcome />}>*/}
                    <Route path="dashboard/*" element={<Welcome />} />
                    <Route path="stocks" element={<Stocks />} />
                  </Route>
                </Route>
              </Routes>
              {/* Chart */}
              {/*<div className="field col-12 md:col-3">
                            <label htmlFor="integeronly">Integer Only</label>
                            <InputNumber inputId="integeronly" value={value}
                                         onValueChange={(e) => setValue(e.value)} />
                            </div>*/}
              {/* Recent Deposits */}
              {/*<Routes>*/}
              {/*<Route path="/" exact element={<Welcome />}>*/}

              {/*</Route>*/}
              {/*<Route path="/stocks"  element={<UsersList />}>*/}

              {/*</Route>*/}
              {/*</Routes>*/}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
