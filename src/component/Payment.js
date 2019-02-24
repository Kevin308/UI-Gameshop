import React , { Component } from 'react';
import { 
    Button, 
    Form, 
    FormText, 
    FormGroup, 
    Label,
    Breadcrumb,
    BreadcrumbItem,
    Table
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { URL_API } from './types';
import { onUserOrder } from '../actions'

class payment extends Component {
    state = { status: 'Uncomfirmed', cartItem : [], CartTotal : 0}

    componentDidMount() {
        axios.get(URL_API + '/belanja/getlistcart/' + this.props.username)
            .then((res) => {
                // console.log('masuk getcart')
                var TotalPrice = 0;
                for(var i = 0; i < res.data.length; i++) {
                    TotalPrice = TotalPrice + res.data[i].totalharga
                }
                this.setState({ cartItem : res.data , CartTotal : TotalPrice});
                // console.log(this.state.cartItem)
            }).catch((err) => {
                console.log(err);
            })
    }

    // Kalo di klik dan berhasil.. waktu reset state ada error yg kluar
    OrderConfirm = () => {
        console.log('orderconfirm')
        var penerima = this.refs.nama.value
        var alamat = this.refs.alamat.value
        var jasakirim = this.refs.jasakirim.value
        var user = this.props.username
        var totalharga = this.state.CartTotal
        this.props.onUserOrder({ penerima, alamat, jasakirim, user, totalharga })
        window.alert('Terima Kasih telah berbelanja di Gameshop')
        this.setState({ status: 'Confirmed'})
    }

    rendercartitem = () => {
        const rendercartitem = this.state.cartItem.map((item) => {
            return (
                    <tr>
                        <td>{item.nama} x {item.kuantitas}</td>
                        <td>IDR {item.totalharga}</td>
                    </tr>
            )
        })
        return rendercartitem;
    }

    renderErrorNotice = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }

    render () {
        if(this.state.status === 'Confirmed') {
            this.setState({ status : 'Uncomfirmed'})
            return <Redirect to='/' />
        }
        return(
            <div className="display container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/Cart'>Cart</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Payment</BreadcrumbItem>
                </Breadcrumb>
            <Form>
                <h1><b>Payment</b></h1>
                <div className='produkitem col-sm-8 col-md-5'>
                <FormGroup>
                <Label for="nama">Nama Penerima</Label>
                <input type="text" className="form-input" ref="nama" name="nama" id="nama" />
                </FormGroup>
                <FormGroup>
                <Label for="alamat">Alamat Penerima</Label>
                <input type="text" className="form-input" ref="alamat" name="alamat" id="alamat" />
                </FormGroup>
                <FormGroup>
                <Label for="jasakirim">Jasa Pengiriman</Label>
                <select type="select" className="form-input" ref="jasakirim" name="select" id="jasakirim" defaultValue='JNE'>
                    <option>JNE</option>
                    <option>Tiki</option>
                    <option>Pos Indonesia</option>
                </select>
                </FormGroup>
                {this.renderErrorNotice()}
                </div>
                <div style={{border:'solid 2px', borderColor:'gray'}}className='produkitem col-sm-8 col-md-5'>
                <Table>
                <thead>
                    <tr>
                        <th>Nama Produk</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.rendercartitem()}
                        <tr>
                            <td>Potongan</td>
                            <td>IDR 0</td>
                        </tr>
                        <tr>
                            <td>Sub Total</td>
                            <td>IDR {this.state.CartTotal}</td>
                        </tr>
                    </tbody>
                </Table>
                <hr/>
                <FormText color="muted">
                    <p><b>Transfer Bank</b></p>
                    <p>Bank BCA : a/n Axxxx No Rek 65xxxxxx</p>
                    <p>Bank Mandiri : a/n Bxxxx No Rek 10001xxxxxxxx</p>
                </FormText>
                <hr />
                <Button onClick={this.OrderConfirm} size="lg" block>
                    Order
                </Button>
                <hr />
                </div>
            </Form>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.auth.username,
        error : state.auth.error
    }
}

export default connect(mapStateToProps, { onUserOrder })(payment);