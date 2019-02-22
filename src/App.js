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
import Adminpage from './component/Adminpage';
import './App.css';
import './support/css/tampilan.css';

const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
    const username = cookies.get('datauser')
    if(username !== undefined) {
      this.props.onAppRefresh(username);
    }
    else {
      this.props.onAppRender();
    }
  }

  render() {
    if(this.props.cookie) {
      // console.log(this.props.role)
      return (
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/PS4Game" component={Ps4game} />
          <Route path="/SwitchGame" component={NintendoSWgame} />
          {/* <Route path="/Adminpage" component={Adminpage} /> */}
          <div className="alignleft" style={{textAlign:"left"}}>
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
        <Adminpage />
      </div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return { 
    cookie: state.auth.cookie
  };
}

export default withRouter(connect(mapStateToProps, { onAppRefresh, onAppRender })(App));
