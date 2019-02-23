import React, { Component } from 'react';
import { 
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink, 
    Button, 
    Row, 
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Table 
} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import { URL_API } from './types';


class adminhome extends Component {
    state = { userlist : [], orderlist : [], produklist: []}

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
        activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
        }
    }

    componentDidMount() {
        axios.get(URL_API + '/admin/userlist')
        .then((res) => {
            this.setState({ userlist : res.data })
        }).catch((err) => {
            console.log(err);
        })
        
        axios.get(URL_API + '/admin/historylistall')
        .then((res) => {
            this.setState({ orderlist : res.data })
        }).catch((err) => {
            console.log(err);
        })

        axios.get(URL_API + '/produk/produklistall')
        .then((res) => {
            this.setState({ produklist : res.data })
        })
    }

    renderadminhome = () => {
        if(this.state.activeTab === '1') {
            // console.log(this.state.activeTab);
            if(this.state.userlist) {
                const renderuser = this.state.userlist.map((item) => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                        </tr>
                    )
                })
                return renderuser;
            }
        }
        else if(this.state.activeTab === '2') {
            // console.log(this.state.activeTab);
            if(this.state.orderlist) {
                const renderuser = this.state.orderlist.map((item) => {
                    return (
                        <tr>
                            <td>{item.kodeinvoice}</td>
                            <td>{item.user}</td>
                            <td>{item.date}</td>
                            <td>{item.statusbayar}</td>
                            <td>{item.statuskirim}</td>
                            <td>{item.totalharga}</td>
                        </tr>
                    )
                })
                return renderuser;
            }
        }
        else if(this.state.activeTab === '3') {
            if(this.state.produklist) {
                const renderuser = this.state.produklist.map((item) => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.nama}</td>
                            <td>{item.konsol}</td>
                            <td>{item.status}</td>
                            <td>{item.harga}</td>
                        </tr>
                    )
                })
                return renderuser;
            }
        }
        
    }

    render() {
        return (
            <div className="display container">
                <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              User List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Order List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Product List
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama User</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderadminhome()}
                    </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              <Table>
                    <thead>
                    <tr>
                        <th>Kode Invoice</th>
                        <th>Tanggal</th>
                        <th>Harga</th>
                        <th>Status Pembayaran</th>
                        <th>Status Pengiriman</th>
                        <th>Total Harga</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderadminhome()}
                    </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
              <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Produk</th>
                        <th>Konsol</th>
                        <th>Status</th>
                        <th>Harga</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderadminhome()}
                    </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
             
            </div>
            
        )
    }
}

export default adminhome;