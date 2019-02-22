import React, { Component } from 'react';
import { 
  Breadcrumb, 
  BreadcrumbItem,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  InputGroup,
  InputGroupAddon,
  Button
} from 'reactstrap';
import { Link , Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { URL_API } from './types';


class produk extends Component {

    ButtonRender = () => {
        return (
          <InputGroup>
            <select className="selectqty" ref="qty" defaultValue="1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <InputGroupAddon addonType="append">
            <Button className="button" onClick={this.onBtnAddClick}>Add to Cart</Button>
            </InputGroupAddon>
          </InputGroup>
        )
    }

    onBtnAddClick = () => {
      if(this.props.username) {
        var nama = this.props.produk.nama;
        var image = this.props.produk.image;
        var user = this.props.username;
        var harga = parseInt(this.props.produk.harga);
        var kuantitas = parseInt(this.refs.qty.value);
        var totalharga = parseInt(harga * kuantitas);
        console.log(totalharga)
        axios.post(URL_API + '/belanja/addtocart', {
          nama,
          harga,
          image,
          user,
          kuantitas,
          totalharga
          }).then((res)=> {
            console.log(res)
            window.alert('Item added to cart')
          }).catch((err)=> {
            console.log(err);
            console.log('gagal');
          })  
      }
      else {
        return alert('Please Login as User to start shopping')
      }
          
    }

    render() {
      var { nama, harga, description, img, konsol } = this.props.produk
      if(konsol === 'PS4') {
        return (
          <div className="display container">
          <Breadcrumb>
              <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to='/PS4Game'>{konsol}</Link></BreadcrumbItem>
          </Breadcrumb>
          <div className="produkitem container col-4">
          <CardImg top width="100%" src={img} alt="Card image cap" />
          </div>
          <div className="produkitem container col-8">
            <CardBody>
              <CardTitle>{nama}</CardTitle>
              <hr/>
              <CardSubtitle>Harga   : {harga}</CardSubtitle>
              <br />
              <b>Description :</b>
              <CardText>{description}</CardText>
              {this.ButtonRender()}
            </CardBody>
          </div>
          </div>
        );
      }
      else if(konsol === 'NSW') {
        return (
          <div className="display container">
          <Breadcrumb>
              <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to='/SwitchGame'>{konsol}</Link></BreadcrumbItem>
          </Breadcrumb>
          <div className="produkitem container col-4">
          <CardImg top width="100%" src={img} alt="Card image cap" />
          </div>
          <div className="produkitem container col-8">
            <CardBody>
              <CardTitle>{nama}</CardTitle>
              <hr/>
              <CardSubtitle>Harga   : {harga}</CardSubtitle>
              <br />
              <b>Description :</b>
              <CardText>{description}</CardText>
              {this.ButtonRender()}
            </CardBody>
          </div>
          </div>
        );
      }
      return <Redirect to='/' />
      
      
    }
  };

const mapStateToProps = (state) => {
  return {
    produk : state.produk,
    username : state.auth.username
  }
}

export default connect(mapStateToProps)(produk);