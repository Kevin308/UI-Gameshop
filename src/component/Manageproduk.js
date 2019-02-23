import React , { Component } from 'react'
import { 
    Table,
    CustomInput 
} from 'reactstrap';
// import axios from 'axios';

class manageproduk extends Component {

    // onBtnAddClick = () => {
    //     console.log('masuk')
    //     if(document.getElementById("AddBrandImage").files[0] !== undefined) {
    //         var formData = new FormData()
    //         var headers = {
    //             headers: 
    //             {'Content-Type': 'multipart/form-data'}
    //             // content type ini dipakai cuman kalau mau kirim
    //             // data yg ada filenya, kalau string semua
    //             // ga usah pake content typenya
    //         }

    //         var data = {
    //             nama: this.refs.AddBrandName.value,
    //         }

    //         if(document.getElementById('AddBrandImage')){
    //             formData.append('image', document.getElementById('AddBrandImage').files[0])
    //         }
    //         formData.append('data', JSON.stringify(data))

    //         axios.post("https://eui-api-kevin.herokuapp.com/brand/addbrand", formData, headers)
    //         .then((res) => {
    //             alert("Add Brand Success")
    //             this.setState({ brandList: res.data })
    //         })
    //         .catch((err) =>{
    //             console.log(err)
    //         })
    //     }
    //     else {
    //         alert('Image harus diisi!')
    //     }
    // }

    // onAddFileImageChange = () => {
    //     if(document.getElementById("AddBrandImage").files[0] !== undefined) {
    //         this.setState({AddBrandImage: document.getElementById("AddBrandImage").files[0].name})
    //     }
    //     else {
    //         this.setState({AddBrandImage: 'Pilih Gambar'})
    //     }
    // }

    // onEditFileImageChange = () => {
    //     if(document.getElementById("EditBrandImage").files[0] !== undefined) {
    //         this.setState({EditBrandImage: document.getElementById("EditBrandImage").files[0].name})
    //     }
    //     else {
    //         this.setState({EditBrandImage: 'Pilih Gambar'})
    //     }
    // }

    render () {
        return (
            <div className="display container">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Konsol </th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="AddBrandName" /></td>
                            <td><input type="text" ref="AddBrandkonsol" /></td>
                            <td><input type="text" ref="AddBrandstatus" /></td>
                            <td><CustomInput type="file" id="AddBrandImage" name="AddBrandImage"  /></td>
                            <td><input type="text" ref="AddBrandharga" /></td>
                            <td><input type="text" ref="AddBranddescription" /></td>
                            <td><input type="button" class="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                        </tr>
                    </tbody>    
                </Table>
            </div>
        )
    }
}

export default manageproduk;