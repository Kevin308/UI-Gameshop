import React , { Component } from 'react'
import { 
    Breadcrumb,
    BreadcrumbItem,
    // CustomInput,
    Table,
    // Form,
    // FormGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from './types';

class manageorder extends Component {
    state= { historylist: [] }

    componentDidMount() {
        axios.get(URL_API + '/admin/historylistall')
        .then((res) => {
            this.setState({historylist: res.data })
        })
    }

    onBtnConfirmOrderClick = (id) => {
        axios.post(URL_API + '/admin/updatehistory/' + id)
        .then((res) => {
            alert('Payment Confirmed');
            this.setState({ historylist : res.data })
        }).catch((err) => {
            alert('Error');
            console.log(err);
        })
    }

    onBtnDeleteOrderClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            axios.delete(URL_API + '/admin/deletehistory/' + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ historylist: res.data })
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    renderorderlist = () => {
        const renderorderlist = this.state.historylist.map((item) => {
            if(item.statusbayar === 'Belum Lunas') {
                return (
                    <tr>
                        <td>{item.kodeinvoice}</td>
                        <td>{item.user}</td>
                        <td>{item.date}</td>
                        <td>{item.penerima}</td>
                        <td>{item.alamat}</td>
                        <td>{item.jasakirim}</td>
                        <td>{item.statusbayar}</td>
                        <td>{item.totalharga}</td>
                        <td><input type="button" class="btn btn-primary" value="Confirm" onClick={() => this.onBtnConfirmOrderClick(item.id)} /></td>
                        <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteOrderClick(item.id)} /></td>                    
                    </tr>
                )
                // return renderorderlist
            }
            
        })
        return renderorderlist;
    }

    render () {
        return (
            <div className="display container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/Adminhome'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Manage Order</BreadcrumbItem>
                </Breadcrumb>
                <Table>
                    <thead>
                        <tr>
                            <th>Kode Invoice</th>
                            <th>User</th>
                            <th>Tanggal</th>
                            <th>Penerima</th>
                            <th>Alamat</th>
                            <th>Jasa Kirim</th>
                            <th>Status Bayar</th>
                            <th>Total Harga</th>
                            <th>Button Confirm</th>
                            <th>Button Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderorderlist()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default manageorder;