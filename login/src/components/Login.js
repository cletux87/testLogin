import React from 'react';
import { connect } from "react-redux";
import * as AuthService from '../actions/auth-service';
import { withRouter } from "react-router";
import { authenticate } from '../service/api-service';

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      usuario: '',
      password: '',
      userError: '',
      passError: ''
    };
  }


  handleClick = () =>{
      let isError = false;
      let data = {email:this.state.usuario, password:this.state.password}
      this.setState({
        userError: '',
        passError: ''
      });
      if( this.state.usuario.length <= 0 ){
          this.setState({userError:'El usuario no debe estar vacio'});
          isError=true;
      }
      if( this.state.password.length <= 0 ){
        this.setState({passError:'La contraseña no debe estar vacia'});
        isError=true;
    }
    if( !isError ){
        let auth = {
            email: this.state.usuario,
            password: this.state.password
        }
        this.props.loginLoading();
        authenticate( auth )
            .then(response=>{
                auth = {
                    id: response.data.id,
                    jwt: response.data.jwt,
                    isLoading: false,
                    errorMessage: '',
                    isError: false,
                    usuario: this.state.usuario
                };
                this.props.loginUser(auth);
                this.props.history.push("/dashboard");
            })
            .catch(error=>{
                let errorMessage;
                try{
                    errorMessage = error.response.data.errors[0].description;
                }catch(err){
                    errorMessage = 'Error de conexion, intente mas tarde';    
                }
                this.props.loginError(errorMessage);
            });
    }
  }

  handleChange = ( event ) =>{
      this.setState({
          [event.target.name] : event.target.value
      });
  }

  render(){
    return (
        <div id="login">
            <h3 className="text-center text-white pt-5">Login form</h3>
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <div id="login-form" className="form" >
                                <h3 className="text-center text-info">Login</h3>
                                <div className="form-group">
                                    <label  className="text-info">Username:</label><br/>
                                    <input type="text" name="usuario" id="username" className="form-control"  onChange={this.handleChange} value={this.state.usuario}></input>
                                    {this.state.userError}
                                </div>
                                <div className="form-group">
                                    <label className="text-info">Password:</label><br/>
                                    <input type="text" name="password" id="password" className="form-control" onChange={this.handleChange} value={this.state.password}></input>
                                    {this.state.passError}
                                </div>
                                <div className="form-group">
                                    <button onClick={this.handleClick} type="submit" name="submit" className="btn btn-info btn-md" value="submit">Submit</button>
                                    {this.props.errorMessage}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    );
  }

}


export default withRouter(connect(
    state =>{
        return{
            errorMessage: AuthService.State.getErrorMessage(state),
            isLogin: AuthService.State.isLogin(state)
        }

    }, dispatch=>{
        return{
            loginUser: (loginData) => dispatch(AuthService.loginUser(loginData)),
            loginLoading: () => dispatch(AuthService.loginLoading()),
            loginError: (errorMessage) => dispatch(AuthService.loginError(errorMessage)),
        }
    }
)(Login));