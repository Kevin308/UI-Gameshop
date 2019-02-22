import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Input,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { onUserLogout } from '../actions'   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faShoppingCart, faSignOutAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class header extends Component {

  onLogoutBtnClick = () => {
    this.props.onUserLogout()
    cookies.remove('datauser')
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    if(this.props.username) {
      return (
        <div>
          <Navbar color="primary" light expand="md">
            <NavbarBrand href="/" style={{color:'white'}}>Gameshop</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <NavbarBrand>
                <Input type="text" />
              </NavbarBrand>
              <NavbarBrand>
                <Button color="white">
                <FontAwesomeIcon icon={faSearch} />
                </Button>
              </NavbarBrand>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{color:'white'}}>
                  Games
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/PS4Game" style={{color:'black'}}>PS4</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/SwitchGame" style={{color:'black'}}>Switch</Link>  
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{color:'white'}}>
                  Welcome, {this.props.username}   
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/cart" style={{color:'black'}}>
                      <FontAwesomeIcon icon={faShoppingCart} /> Cart
                    </Link> 
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/History" style={{color:'black'}}>
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> History
                    </Link>
                  </DropdownItem>
                  <DropdownItem onClick={this.onLogoutBtnClick}>
                    <Link to="/" style={{color:'black'}}>
                      <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Log Out
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> 
            </Nav>
          </Collapse>
        </Navbar>
        </div>
      )
    }
    else {
      return (
        <div>
          <Navbar color="primary" light expand="md">
            <NavbarBrand href="/" style={{color:'white'}}>K's Store</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <NavbarBrand>
                <Input type="text" />
              </NavbarBrand>
              <NavbarBrand>
                <Button color="white">
                <FontAwesomeIcon icon={faSearch} />
                </Button>
              </NavbarBrand>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret style={{color:'white'}}>
                    Games
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/PS4Game" style={{color:'black'}}>PS4</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/SwitchGame" style={{color:'black'}}>Switch</Link>  
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink>
                    <Link to="/login" style={{color:'white'}}>
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>  Account
                    </Link> 
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    
  }
}

const mapStateToProps = (state) => {
  return { username : state.auth.username }
}
export default connect(mapStateToProps, { onUserLogout })(header);