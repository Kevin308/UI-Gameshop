import React , { Component } from 'react';
import { 
    Table,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import {Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { URL_API } from './types';

class historydetail extends Component {
    state = { detail : [] }

    componentDidMount() {
        console.log(this.props.kodeinvoice)
        axios.get(URL_API + '/admin/historydetail/' + this.props.kodeinvoice)
        .then((res) => {
            this.setState({detail : res.data})
            console.log(this.state.detail)
        }).catch((err) => {
            console.log(err)
        })
    }

    renderdetail = () => {
        const renderdetail = this.state.detail.map((item) => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.harga}</td>
                    <td>{item.kuantitas}</td>
                    <td>{item.totalharga}</td>
                </tr>
            )
        })
        return renderdetail;
    }

    render() {
        return (
            <div className="display container">
            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/History'>History</Link></BreadcrumbItem>
                <BreadcrumbItem active>History Detail</BreadcrumbItem>
            </Breadcrumb>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Qty</th>
                        <th>Total Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderdetail()}
                </tbody>
            </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      kodeinvoice : state.history.kodeinvoice,
      username : state.auth.username
    }
  }

export default connect(mapStateToProps)(historydetail);