import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Table
 } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { URL_API } from './types';

class cart extends Component {
    state = { cartItem : [], CartTotal : 0}

    GetCartList = () => {
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

    componentDidMount () {
        // console.log('masuk did mount')
        this.GetCartList();
    }

    CartRender = () => {
        const Cartrender = this.state.cartItem.map((item) => {
            return (    
                <tr>
                    <td>
                        <button type="button" onClick={() => this.onDeleteBtnClick(item.id)}>
                            <FontAwesomeIcon icon={faMinusCircle}/>
                        </button>
                    </td>
                    <td>
                        <div>
                        <img width="70%"src={item.image} alt={item.nama} />
                        </div>
                        <div>
                        <p className='produkitem'>{item.nama}</p>
                        </div>
                    </td>
                    <td>{item.harga}</td>
                    <td>{item.kuantitas}</td>
                    <td>{item.totalharga}</td>
                </tr>
            )
        })
        return Cartrender;
    }

    onDeleteBtnClick = (id) => {
        if(window.confirm('Are you sure?')) {
            axios.delete(URL_API + '/belanja/deletelistcart/' + id)
                .then((res) => {
                    console.log(res)
                    this.GetCartList();
                }).catch((err) => {
                    console.log(err);
                }) 
        }
    }

    CheckoutBtnRender = () => {
        return (
            <div>
            <Link to='/Payment'>
            <Button color="primary" size="lg" block>Checkout</Button>
            </Link>
            </div>
        )
    }

    render() {
        if(this.state.cartItem.length > 0) {
            return (
                <div className="display container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Cart</BreadcrumbItem>
                </Breadcrumb>
                    <div>
                        <div className='produkitem col-md-6'>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.CartRender()}
                            </tbody>
                        </Table>
                        </div>
                        <div className="produkitem col-sm-8 col-md-6">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Cart Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Harga</td>
                                    <td style={{textAlign:"right"}}>{this.state.CartTotal}</td>
                                </tr>
                            </tbody>
                        </Table>
                        {this.CheckoutBtnRender()}       
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="display container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Cart</BreadcrumbItem>
                </Breadcrumb>
                    <div>
                        <div className='produkitem col-md-6'>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                        </Table>
                        <p>Your Cart is Currently Empty</p>
                        </div>
                        <div className="produkitem col-sm-8 col-md-6">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Cart Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Harga</td>
                                    <td style={{textAlign:"right"}}>{this.state.CartTotal}</td>
                                </tr>
                            </tbody>
                        </Table>
                        </div>
                    </div>
                </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
}
export default connect(mapStateToProps)(cart);