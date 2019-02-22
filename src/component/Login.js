import React, {Component} from 'react';
import {Link , Redirect} from 'react-router-dom';
import { onUserLogin } from '../actions';
import {connect} from 'react-redux' 
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class login extends Component {

    componentWillReceiveProps(newProp) {
        if(newProp !== '') {
            cookies.set('datauser',newProp.username,{ path: "/" })
            console.log(newProp.username)
        }
    }

    onLoginBtnClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        this.props.onUserLogin({username,password});
    }

    renderErrorNotice = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }

    render() {
        // console.log(this.props.username)
        if(this.props.username === "")
        {
            return (
                <div className="main">
                    <section className="signup">
                        <div className="container">
                            <div className="signup-content">
                            <form method="POST" id="signup-form" className="signup-form">
                                <h2 className="form-title">Login</h2>
                                <div className="form-group">
                                <input type="text" ref="username" className="form-input" name="name" id="name" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                <input type="password" ref="password" className="form-input" name="password" id="password" placeholder="Password" />
                                <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password" />
                                </div>
                                {this.renderErrorNotice()}
                                <div className="form-group">
                                <input type="button" name="Login" id="Login" className="form-submit" defaultValue="Login" onClick={this.onLoginBtnClick}/>
                                </div>
                            </form>
                            <p className="registerhere">
                                Don't have an account?  <Link to="/register">Register here</Link>
                            </p>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
        else if(this.props.username) {
            return <Redirect to="/" />
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.auth.username,
        error: state.auth.error
    }
}
export default connect(mapStateToProps, { onUserLogin })(login);