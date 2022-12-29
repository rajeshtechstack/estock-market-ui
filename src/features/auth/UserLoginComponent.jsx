import { LockOutlined } from "@mui/icons-material";
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, 
    createTheme, CssBaseline, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material";
import {Component} from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import store from "../../services/store";
import UserService from "../../services/user.service";
import { withRouter } from 'react-router-dom';
import estockmarketlogo from '../../assets/logos/logo-no-background.png';
import Styles from "./userlogin.css"

class UserLoginComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            theme : createTheme(),
            errMsg: '',
            username:'',
            password:'',
            open: false,
            isLogged: false,
            isSnackBarOpened: false,
            responseMsg:'',
 
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount() {
        const { history } = this.props;
        console.log("Test props: ", history);
      }
    handleUserInput(e){
        this.setState({username: e.target.value})
    }
    handlePwdInput(e){
        this.setState({password: e.target.value})
    }
    handleSubmit(e){
        this.setState({open: !this.state.open});
        e.preventDefault()
        //console.log('Test values: ', this.state.username, this.state.password);
        UserService.login({username:this.state.username, password:this.state.password}).then(res =>{
            this.setState({isSnackBarOpened: true})
            this.setState({responseMsg: res?.message})
            
            //console.log("Login response: ", res)
            if(res?.status === 200 && res?.data !== "User authentication Service is taking too long to respond or is down. Please try again later"){
                UserService.getUserToken(res.data, true);
                
                const { history } = this.props
                //console.log("Test props: ", history);
                this.setState({isLogged:true})
            }else{
                this.setState({open: !this.state.open});
                this.setState({isLogged:false})
                this.setState({isSnackBarOpened: true})
                this.setState({responseMsg: res?.message})
            }
            //store.dispatch({ type: 'authReducer', payload: res })
           

        }).catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the 
                // browser and an instance of
                // http.ClientRequest in node.js
               // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
    }
    handleClose(){
        this.setState({open: false})
        this.setState({isSnackBarOpened: false})
    }

    render(){
        
        const avatarBackgroundStyle = {
            width: '100%',
            height: 'auto',
            overflow:'visible'
          };
        return(
            <ThemeProvider theme={this.state.theme}>
            <Container component="main" maxWidth="xs">
            {this.state.isLogged ? '' : <Avatar  src={estockmarketlogo} sx={avatarBackgroundStyle}
            variant="square">
            </Avatar>}
                <CssBaseline />
               
                {this.state.isLogged && (
          <Navigate to="/dashboard" replace={true} />
        )}
        {this.state.isLogged  === false ? (
          <Navigate to="/" replace={true} />
        ): ''}
                {this.state.isLogged === true ? '' : (<Box sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
            
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {this.state.errMsg? <Typography component="h1" variant="h5" >
                       {this.state.errMsg}
                    </Typography> : ''}

                    <Box component="form" onSubmit={this.handleSubmit}  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={this.state.username}
                            onChange={this.handleUserInput}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handlePwdInput}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={this.state.open}
                            onClick={this.handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Snackbar
                            open={this.state.isSnackBarOpened}
                                autoHideDuration={6000}
                                onClose={this.handleClose}
                                message={this.state.responseMsg}
                                anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                  }}
                        />
                    </Box>
                </Box>)}

            </Container>
        </ThemeProvider>
        )
    }

}

export default UserLoginComponent;