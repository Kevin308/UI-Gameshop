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
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { URL_API } from './types'
import { DetailHistoryOnClick } from '../actions'

class history extends Component {
    state = { historyListPending : []}
  
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
        axios.get(URL_API + '/admin/historylist/' + this.props.username)
        .then((res) => {
            console.log(this.props.username)
            this.setState({ historyListPending : res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    onDetailBtnClick = (kodeinvoice) => {
      this.props.DetailHistoryOnClick(kodeinvoice)

    }

    // karena ada state lain dari tabs nya... this.state.historyList nya tabrakan
    // kalo dimasukin if jadi bisa dpt dari stackoverflow
    renderPendingHistory = () => {
      if(this.state.historyListPending) {
        const renderPendingHistory = this.state.historyListPending.map((item) => {
          if(this.state.activeTab === '1') {
            // console.log(this.state.activeTab)
            if(item.statusbayar === 'Belum Lunas') {
              console.log(item.kodeinvoice)
              return (    
                <tr>
                    <td>{item.kodeinvoice}</td>
                    <td>{item.date}</td>
                    <td>IDR {item.totalharga}</td>
                    <td>{item.statusbayar}</td>
                    <td>{item.penerima}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jasakirim}</td>
                    <td>
                      <Link to='/Historydetail'>
                        <Button onClick={() => this.onDetailBtnClick(item.kodeinvoice)}>
                          Detail
                        </Button>
                      </Link>
                    </td>
                </tr>
              )
            }
          }
          else if(this.state.activeTab === '2') {
            // console.log(this.state.activeTab)
            if(item.statusbayar === 'Lunas') {
              return (    
                <tr>
                    <td>{item.kodeinvoice}</td>
                    <td>{item.date}</td>
                    <td>IDR {item.totalharga}</td>
                    <td>{item.statusbayar}</td>
                    <td>{item.penerima}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jasakirim}</td>
                    <td>
                      <Link to='/Historydetail'>
                        <Button onClick={() => this.onDetailBtnClick(item.kodeinvoice)}>
                          Detail
                        </Button>
                      </Link>
                    </td>
                </tr>
              )
            }
          }
          // else if(this.state.activeTab === '3') {
          //   // console.log(this.state.activeTab)
          //   if(item.statusbayar === 'Lunas' && item.statuskirim === 'terkirim') {
          //     return (    
          //       <tr>
          //           <td>{item.kodeinvoice}</td>
          //           <td>{item.date}</td>
          //           <td>IDR {item.totalharga}</td>
          //           <td>{item.statusbayar}</td>
          //           <td>
          //             <Link to='/Historydetail'>
          //               <Button onClick={() => this.onDetailBtnClick(item.kodeinvoice)}>
          //                 Detail
          //               </Button>
          //             </Link>
          //           </td>
          //       </tr>
          //     )
          //   }
          // }
          // kalau returnnya di dlm ga ada yg kluar
        })
        return renderPendingHistory;  
      }
    }


  render() {
    return (
      <div className="display container">
        <Breadcrumb>
            <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>History</BreadcrumbItem>
        </Breadcrumb>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Pending
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Pesanan Lunas
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Received Orders
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {/* <ListGroup>
                </ListGroup> */}
                <Table>
                    <thead>
                    <tr>
                        <th>Kode Invoice</th>
                        <th>Tanggal</th>
                        <th>Harga</th>
                        <th>Status</th>
                        <th>Penerima</th>
                        <th>Alamat</th>
                        <th>Jasa Kirim</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderPendingHistory()}
                    </tbody>
                    {this.onDetailBtnClick}
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
                      <th>Status</th>
                      <th>Penerima</th>
                      <th>Alamat</th>
                      <th>Jasa Kirim</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderPendingHistory()}
                    </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          {/* <TabPane tabId="3">
            <Row>
              <Col sm="12">
              <Table>
                    <thead>
                    <tr>
                        <th>Kode Invoice</th>
                        <th>Tanggal</th>
                        <th>Harga</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderPendingHistory()}
                    </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane> */}
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      username : state.auth.username
    }
  }

export default connect(mapStateToProps, { DetailHistoryOnClick })(history);