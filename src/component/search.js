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
        axios.get(URL_API + '/produk/searchproduk/' + this.props.search)
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

    renderSearch = () => {
        const showproduk = this.state.produklist.map((item) => {
                // console.log(`${item.image}`)
            return (
                <div onClick={() => this.onItemClick(item)} className="produkitem col-sm-6 col-md-3" >
                    <Link to='/detail'>    
                    <CardImg src={`${URL_API}${item.image}`} alt={item.nama} width="100%"/>
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
            <h2>Search Result for "{this.props.search}"</h2>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Product</BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    {this.renderSearch()}
                </div>
            </div>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
      search : state.produk.search
    }
}

export default connect(mapStateToProps , { DetailProductOnClick })(ps4game);