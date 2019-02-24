import React , { Component } from 'react'
import { 
    Breadcrumb,
    BreadcrumbItem,
    CustomInput,
    Table,
    Form,
    FormGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from './types';

class manageproduk extends Component {
    state= { brandList: [], AddBrandImage: 'Pilih Gambar', EditBrandImage: 'Pilih Gambar', selectedEditBrandId: 0 }

    componentDidMount() {
        axios.get(URL_API + '/produk/produklistall')
        .then((res) => {
            this.setState({ brandList: res.data })
        })
    }

    onBtnAddClick = () => {
        console.log('masuk')
        if(document.getElementById("AddBrandImage").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
                // content type ini dipakai cuman kalau mau kirim
                // data yg ada filenya, kalau string semua
                // ga usah pake content typenya
            }
            var data = {
                nama: this.refs.AddBrandName.value,
                konsol: this.refs.AddBrandkonsol.value,
                status: this.refs.AddBrandstatus.value,
                harga: this.refs.AddBrandharga.value,
                description: this.refs.AddBranddescription.value,
            }

            if(document.getElementById('AddBrandImage')){
                console.log(document.getElementById('AddBrandImage').files[0])
                formData.append('image', document.getElementById('AddBrandImage').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post(URL_API + '/produk/addproduk', formData, headers)
            .then((res) => {
                alert("Add Brand Success")
                this.setState({ brandList: res.data })
            })
            .catch((err) =>{
                console.log('gagal')
                console.log(err)
            })
        }
        else {
            alert('Image harus diisi!')
        }
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            axios.delete(URL_API + '/produk/deleteproduk/' + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ brandList: res.data })
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    onBtnUpdateClick = (id) => {
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            nama: this.refs.EditBrandName.value,
            konsol: this.refs.EditBrandkonsol.value,
            status: this.refs.EditBrandstatus.value,
            harga: this.refs.EditBrandharga.value,
            description: this.refs.EditBranddescription.value,
        }

        if(document.getElementById('EditBrandImage')){
            formData.append('image', document.getElementById('EditBrandImage').files[0])
        }
        formData.append('data', JSON.stringify(data))

        axios.put(URL_API + '/produk/editproduk/' + id, formData, headers)
        .then((res) => {
            alert("Edit Brand Success")
            this.setState({ brandList: res.data, selectedEditBrandId: 0 })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onAddFileImageChange = () => {
        if(document.getElementById("AddBrandImage").files[0] !== undefined) {
            this.setState({AddBrandImage: document.getElementById("AddBrandImage").files[0].name})
        }
        else {
            this.setState({AddBrandImage: 'Pilih Gambar'})
        }
    }

    onEditFileImageChange = () => {
        if(document.getElementById("EditBrandImage").files[0] !== undefined) {
            this.setState({EditBrandImage: document.getElementById("EditBrandImage").files[0].name})
        }
        else {
            this.setState({EditBrandImage: 'Pilih Gambar'})
        }
    }

    renderproduk = () => {
        const renderproduk = this.state.brandList.map((item) => {
            if(item.id === this.state.selectedEditBrandId) {
                return (
                    <tr>
                        <td><input type="text" ref="EditBrandName" defaultValue={item.nama} /></td>
                        <td><input type="text" ref="EditBrandkonsol" defaultValue={item.konsol} /></td>
                        <td><input type="text" ref="EditBrandstatus" defaultValue={item.status} /></td>
                        <td><CustomInput type="file" id="EditBrandImage" name="EditBrandImage" label={this.state.EditBrandImage} onChange={this.onEditFileImageChange}/></td>
                        <td><input type="text" ref="EditBrandharga" defaultValue={item.harga} /></td>
                        <td><input type="textarea" ref="EditBranddescription" defaultValue={item.description} /></td>
                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditBrandId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{item.nama}</td>
                    <td>{item.konsol}</td>
                    <td>{item.status}</td>
                    <td><img src={`${URL_API}${item.image}`} alt={item.nama} width={100} /></td>
                    <td>{item.harga}</td>
                    <td>{item.description}</td>
                    <td><input type="button" class="btn btn-primary" value="Edit" onClick={() => this.setState({selectedEditBrandId:item.id})} /></td>
                    <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                </tr>
            )
        })
        return renderproduk;
    }

    render () {
        return (
            <div className="display container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/Adminhome'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Manage Produk</BreadcrumbItem>
                </Breadcrumb>
                <Table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Konsol </th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderproduk()}
                    </tbody>
                    
                </Table>
                <Form>
                    <h1>Add Product Form</h1>
                    <FormGroup>
                        <td><input type="text" className="form-input" ref="AddBrandName" placeholder="Nama Produk"/></td>
                    </FormGroup>
                    <FormGroup>
                        <td><input type="text" className="form-input" ref="AddBrandkonsol" placeholder="Konsol Produk" /></td>
                    </FormGroup>
                    <FormGroup>
                        <td><input type="text" className="form-input" ref="AddBrandstatus" placeholder="Status Produk" /></td>
                    </FormGroup>
                    <FormGroup>
                        <td><input type="text" className="form-input" ref="AddBrandharga" placeholder="Harga Produk" /></td>
                    </FormGroup>
                    <FormGroup>
                        <td><input type="text" className="form-input" ref="AddBranddescription" placeholder="Deskripsi Produk" /></td>                        
                    </FormGroup>
                    <FormGroup>
                        <td><CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.AddBrandImage} onChange={this.onAddFileImageChange} /></td>
                    </FormGroup>
                    <FormGroup>
                        <td><input type="button" class="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default manageproduk;