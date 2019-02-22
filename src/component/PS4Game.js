import React, {Component} from 'react';
import axios from 'axios';
import {URL_API} from './types'
import {
    Breadcrumb,
    BreadcrumbItem,
    CardImg,
    CardBody,
    CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { DetailProductOnClick } from '../actions'
import { connect } from 'react-redux';

class ps4game extends Component {
    state = { produklist : []}

    componentDidMount() {
        axios.get(URL_API + '/produk/produklistPS4')
            .then((res)=> {
                this.setState({produklist : res.data})
            }).catch((err)=> {
                console.log(err)
            })
            
    }

    onItemClick = (item) => {
        this.props.DetailProductOnClick(item)
        //kirim item ke globalstate
    }

    renderPS = () => {
        const showproduk = this.state.produklist.map((item) => {
            return (
                <div onClick={() => this.onItemClick(item)} className="produkitem col-sm-6 col-md-3" >
                    <Link to='/detail'>    
                    <CardImg src={item.img} alt={item.nama} />
                    </Link>
                    <CardBody>
                        <CardTitle>{item.nama}</CardTitle>
                    </CardBody>
                    
                </div>         
            )
        })
        return showproduk
    }
    render() {
        return (    
            <div className="display container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>PS4</BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    {this.renderPS()}
                </div>
            </div>    
        )
    }
}


export default connect(null , { DetailProductOnClick })(ps4game);