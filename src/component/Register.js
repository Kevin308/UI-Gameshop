import React,{Component} from 'react';
import { connect } from 'react-redux';
import { onUserRegister } from '../actions'; 
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class register extends Component {

    componentWillReceiveProps(newProp) {
        if(newProp !== '') {
            cookies.set('datauser',newProp.username,{ path: "/" })
        }
    }

    onRegisterBtnClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        this.props.onUserRegister({username,email,password});
    }

    renderErrorNotice = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }

    render() {
        if(this.props.username === '') {
            return (
                <div className="main">
                    <section className="signup">
                        <div className="container">
                            <div className="signup-content">
                            <form method="POST" id="signup-form" className="signup-form">
                                <h2 className="form-title">Register</h2>
                                <div className="form-group">
                                <input type="text" ref="username" className="form-input" name="name" id="name" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                <input type="email" ref="email" className="form-input" name="email" id="email" placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                <input type="password" ref="password" className="form-input" name="password" id="password" placeholder="Password" />
                                <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password" />
                                </div>
                                {this.renderErrorNotice()}
                                <div className="form-group">
                                <input type="button" name="Register" id="Register" className="form-submit" defaultValue="Register" onClick={this.onRegisterBtnClick}/>
                                </div>
                            </form>
                            </div>
                        </div>
                    </section>
                </div>
              );
        }
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return { 
        username : state.auth.username,
        error : state.auth.error
    }
}

export default connect(mapStateToProps, { onUserRegister })(register);