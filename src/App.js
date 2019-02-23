import React, { Component } from 'react';
import {Route,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onAppRefresh, onAppRender } from './actions';
import Home from './component/Home';
import Header from './component/Header';
import Register from './component/Register';
import Login from './component/Login';
import Ps4game from './component/PS4Game';
import NintendoSWgame from './component/NintendoSWGame';
import Produk from './component/ProdukDetail';
import Cart from './component/Cart';
import Payment from './component/Payment';
import History from './component/History';
import Historydetail from './component/Historydetail';
import Adminhome from './component/Adminhome';
// import Manageproduk from './component/Manageproduk';
import './App.css';
import './support/css/tampilan.css';

const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
    const username = cookies.get('datauser')
    if(username !== undefined) {
      this.props.onAppRefresh(username);
      console.log(username)
    }
    else {
      this.props.onAppRender();
    }
  }

  render() {
    if(this.props.cookie) {
      
      return (
        <div>
          <div className="App">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/Adminhome" component={Adminhome} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/PS4Game" component={Ps4game} />
            <Route path="/SwitchGame" component={NintendoSWgame} />
          </div>
          <div className="table">
            <Route path="/detail" component={Produk} />
            <Route path="/cart" component={Cart} />
            <Route path="/Payment" component={Payment} />
            <Route path="/History" component={History} />
            <Route path="/Historydetail" component={Historydetail} />
          </div>
      </div>
      );
    }
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return { 
    cookie: state.auth.cookie,
    role: state.auth.role
  };
}

export default withRouter(connect(mapStateToProps, { onAppRefresh, onAppRender })(App));
