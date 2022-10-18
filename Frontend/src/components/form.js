import { Component } from "react";

import axios from 'axios'
import swal from "sweetalert";
import gravatar from 'gravatar'

import { Button, Form } from 'react-bootstrap'

import HourGlass from './HourGlass'

export default class FormularioUser extends Component {

    // ESTADOS INICIALES 
    state = {

        Url: "http://localhost:1907/api/users/",
        Hourglass: false,
        validated: false,

        Title: "New User",
        Case: 1,
        Name: "",
        Username: "",
        Email: "",
        Phone: "",
        Website: "",
        Street: "",
        Suite: "",
        City: "",
        Zipcode: "",
        Lat: "",
        Lng: "",
        CompanyName: "",
        Catchphrase: "",
        Bs: "",

        AddressId: "",
        CompanyId: "",
        UserId: "",

        Users: [],
    }

    // SOLICITUD A LA API REST TRAYENDO TODA LA DATA DE CADA USUARIO
    componentWillMount() {
        axios.get(`${this.state.Url}getusers`).then(resp => {
            if (resp.data.Message == "") {
                this.setState({
                    Users: resp.data.Users
                })
            } else {
                swal({
                    title: "WARNING!",
                    text: resp.data.Message,
                    icon: "warning",
                    button: "Ok",
                })
            }
        }).catch(err => {
            console.log(er.message)
        })
    }

    /* CREATE A NEW USER */
    NewUser = (e) => {
        /* VALIDACIÓN DE FORMULARIO LLENO, SIN CAMPOS VACIOS */
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            this.setState({
                validated: true
            })
            return
        } else {
            this.setState({
                validated: false
            })
        }


        /* CONSTRUNCCIÓN Y ENVIO DE PETICION POST A LA API */
        var body = {
            Name: this.state.Name,
            Username: this.state.Username,
            Email: this.state.Email,
            Phone: this.state.Phone,
            Website: this.state.Website,
            Street: this.state.Street,
            Suite: this.state.Suite,
            City: this.state.City,
            Zipcode: this.state.Zipcode,
            Lat: this.state.Lat,
            Lng: this.state.Lng,
            CompanyName: this.state.CompanyName,
            Catchphrase: this.state.Catchphrase,
            Bs: this.state.Bs,
        }

        this.setState({
            Hourglass: true
        })

        axios.post(`${this.state.Url}newuser`, body).then(resp => {
            if (resp.data.Message === "") {
                swal({
                    title: "ATTENTION",
                    text: `User created successfully.`,
                    icon: "success",
                    timer: 1500,
                    button: false,
                    closeOnClickOutside: false
                })
                /* SI LA RESPUESTA ES CORRECTA SE ACTUALIZA LA VISTA CON LOS DATOS ALMACENADOS. */
                this.setState({
                    UserId: resp.data.userid,
                    AddressId: resp.data.addressid,
                    CompanyId: resp.data.companyid,
                })

                // EL TIMEOUT ES PARA ESPERAR A QUE SE ACTUALICEN LOS ESTADOS DE LOS ID Y ASÍ TENGAN VALOR AL ACTUALIZAR LA DATA QUE SE VE
                setTimeout(() => {
                    this.UpdateData();
                }, 200);
            } else {
                swal({
                    title: "WARNING",
                    text: resp.data.Message,
                    icon: "warning",
                    button: "Ok",
                })
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    /*DELETE USER */
    DeleteUser = (userid, addressid, companyid, name) => {
        /* SE PREGUNTA SI ESTA SEGURO */
        var body = {
            UserId: userid,
            AddressId: addressid,
            CompanyId: companyid,
        }
        swal({
            title: "WARNING",
            text: `Are you sure you want to delete the user: ${name}?`,
            icon: "warning",
            buttons: ["CANCEL", "ACEPT"],
        }).then((result) => {
            /* SI ESTA SEGURO SE PROCEDE A CREAR Y HACER LA PETICION POST PARA LA ELIMINACION DEL USUARIO */
            if (result === true) {
                this.setState({
                    Hourglass: true
                })
                axios.post(`${this.state.Url}deleteusers`, body).then(resp => {
                    if (resp.data.Message === "") {
                        swal({
                            title: "ATTENTION",
                            text: `User Deleted`,
                            icon: "success",
                            timer: 1500,
                            button: false,
                            closeOnClickOutside: false
                        })

                        /* SI EL USUARIO FUE ELIMINADO SE ELIMINA DEL ARRAYT DE DATA QUE SE MUESTRA  */
                        var temUsers = this.state.Users
                        var index = this.SearchIndexCambio(userid, temUsers)
                        temUsers.splice(index, 1)

                        this.setState({
                            Users: temUsers,
                            Hourglass: false
                        })
                    } else {
                        swal({
                            title: "WARNING",
                            text: resp.data.Message,
                            icon: "warning",
                            button: "OK",
                        })
                    }
                }).catch(err => {
                    console.log(err.message)
                })
            }
        })
    }

    /* EDIT USER AND UPDATE DATA */
    Edit = (data) => {
        /* SE PONE EN LOS ESTADOS LOS DATOS A EDITAR PARA MOSTRAR EN EL FORMULARIO */
        this.setState({
            Title: "User Edition",
            Case: 0,
            Name: data.name,
            Username: data.username,
            Email: data.email,
            Phone: data.phone,
            Website: data.website,
            Street: data.street,
            Suite: data.suite,
            City: data.city,
            Zipcode: data.zipcode,
            Lat: data.lat,
            Lng: data.lng,
            CompanyName: data.companyname,
            Catchphrase: data.catchphrase,
            Bs: data.bs,

            AddressId: data.addressid,
            CompanyId: data.companyid,
            UserId: data.userid,
        })
    }

    UpdateUser = (e) => {
        /* VALIDACIÓN DE FORMULARIO LLENO, SIN CAMPOS VACIOS */
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            this.setState({
                validated: true
            })
            return
        } else {
            this.setState({
                validated: false
            })
        }

        /* CONSTRUNCCIÓN Y ENVIO DE PETICION POST A LA API */
        var body = {
            UserId: this.state.UserId,
            AddressId: this.state.AddressId,
            CompanyId: this.state.CompanyId,
            Name: this.state.Name,
            Username: this.state.Username,
            Email: this.state.Email,
            Phone: this.state.Phone,
            Website: this.state.Website,
            Street: this.state.Street,
            Suite: this.state.Suite,
            City: this.state.City,
            Zipcode: this.state.Zipcode,
            Lat: this.state.Lat,
            Lng: this.state.Lng,
            CompanyName: this.state.CompanyName,
            Catchphrase: this.state.Catchphrase,
            Bs: this.state.Bs,
        }

        this.setState({
            Hourglass: true
        })

        axios.post(`${this.state.Url}updateuser`, body).then(resp => {
            if (resp.data.Message === "") {
                swal({
                    title: "ATTENTION",
                    text: `User updated successfully`,
                    icon: "success",
                    timer: 1500,
                    button: false,
                    closeOnClickOutside: false
                })

                // SE ACTUALIZA LA DATA DE LA VISTA CON LOS CAMBIOS ACTUALIZADOS EN LA BASE DE DATOS
                this.UpdateData();
            } else {
                swal({
                    title: "WARNING",
                    text: resp.data.Message,
                    icon: "warning",
                    button: "Ok",
                })
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    /* LIMPIA TODOS LOS CAMPOS DEL FORMULARIO Y LOS PONE PARA QUE QUEDE NUEVAMENTE EN CREAR USUARIO */
    ResetData = () => {
        this.setState({
            Title: "New User",
            Case: 1,
            Name: "",
            Username: "",
            Email: "",
            Phone: "",
            Website: "",
            Street: "",
            Suite: "",
            City: "",
            Zipcode: "",
            Lat: "",
            Lng: "",
            CompanyName: "",
            Catchphrase: "",
            Bs: "",

            AddressId: "",
            CompanyId: "",
            UserId: "",
        })
    }

    /* FUNCTIONS */
    //RECIBE OMO PROP LA LLAVE DEL ESTADO, Y EN EVENT EL EVENTO DEL HANDLECHANGE EN CADA INPUT
    handleChange = (prop) => (event) => {
        this.setState((state) => ({
            ...state,
            [prop]: event.target.value,
        }));
    };

    SearchIndexCambio = (UserId, temRows) => {
        // BUSCA EL INDICE DEL ARREGLO PASADO (temRows) EN BASE AL UserId, 
        const findIndexArray = (element) => parseInt(element.userid) === parseInt(UserId);
        return temRows.findIndex(findIndexArray)
    }

    /*  ACTUALIZA EL ARRAY QUE CONTIENE CADA UNO DE LOS DATOS DE LOS USUARIOS */
    UpdateData = () => {
        var temUsers = this.state.Users
        if (this.state.Case === 0) {
            var index = this.SearchIndexCambio(this.state.UserId, temUsers)
            temUsers[index] = {
                userid: this.state.UserId,
                addressid: this.state.AddressId,
                companyid: this.state.CompanyId,
                name: this.state.Name,
                username: this.state.Username,
                email: this.state.Email,
                phone: this.state.Phone,
                website: this.state.Website,
                street: this.state.Street,
                suite: this.state.Suite,
                city: this.state.City,
                zipcode: this.state.Zipcode,
                lat: this.state.Lat,
                lng: this.state.Lng,
                companyname: this.state.CompanyName,
                catchphrase: this.state.Catchphrase,
                bs: this.state.Bs,
            }
        } else {
            temUsers.push({
                userid: this.state.UserId,
                addressid: this.state.AddressId,
                companyid: this.state.CompanyId,
                name: this.state.Name,
                username: this.state.Username,
                email: this.state.Email,
                phone: this.state.Phone,
                website: this.state.Website,
                street: this.state.Street,
                suite: this.state.Suite,
                city: this.state.City,
                zipcode: this.state.Zipcode,
                lat: this.state.Lat,
                lng: this.state.Lng,
                companyname: this.state.CompanyName,
                catchphrase: this.state.Catchphrase,
                bs: this.state.Bs,
            })
        }

        this.setState({
            Users: temUsers,
            Hourglass: false
        })

        setTimeout(() => {
            this.ResetData()
        }, 100);
    }

    render() {
        return (
            <div className='row row-cols-2 h-100' >

                <HourGlass show={this.state.Hourglass} />

                {/* FORMULARIO */}
                <div className="col gy-3 justify-content-left h-100">
                    <div className='row row-cols-2' style={{ paddingLeft: "0.5rem" }}>
                        <h4 className="col">{this.state.Title}</h4>
                        {(this.state.Case === 0) ? <Button variant="primary" type="submit" className="col" onClick={this.ResetData}>
                            Create User
                        </Button> : ""
                        }
                    </div>
                    <div className="col gy-3">
                        <Form noValidate validated={this.state.validated} onSubmit={(this.state.Case === 0) ? (this.UpdateUser) : (this.NewUser)} className="row gy-3">
                            <div className="row row-cols-2" style={{ paddingLeft: "1.5rem" }}>
                                <h5 className="col-12 gy-3">User</h5>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Name")} value={this.state.Name}
                                        placeholder="Enter your full name" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>UserName:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Username")} value={this.state.Username}
                                        placeholder="Enter your username" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" onChange={this.handleChange("Email")} value={this.state.Email}
                                        placeholder="Enter your email address" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Phone:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Phone")} value={this.state.Phone}
                                        placeholder="Enter your phone" required />
                                </Form.Group>
                                <Form.Group className="col-12 gy-2 text-center">
                                    <Form.Label>Web-Site:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Website")} value={this.state.Website}
                                        placeholder="Enter your web-site" required />
                                </Form.Group>
                            </div>
                            <hr
                                className="mt-3 mb-1"
                                style={{ height: "0.1rem" }}
                            />
                            <div className="row row-cols-2" style={{ paddingLeft: "1.5rem" }}>
                                <h5 className="col-12 gy-3">Address</h5>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Street:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Street")} value={this.state.Street}
                                        placeholder="Enter your street" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Suite:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Suite")} value={this.state.Suite}
                                        placeholder="Enter your suite" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>City:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("City")} value={this.state.City}
                                        placeholder="Enter your city" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>ZipCode:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Zipcode")} value={this.state.Zipcode}
                                        placeholder="Enter your zip-code" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Lat:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Lat")} value={this.state.Lat}
                                        placeholder="Enter your lat" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Lng:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Lng")} value={this.state.Lng}
                                        placeholder="Enter your lng" required />
                                </Form.Group>
                            </div>
                            <hr
                                className="mt-3 mb-1"
                                style={{ height: "0.1rem" }}
                            />
                            <div className="row row-cols-2" style={{ paddingLeft: "1.5rem" }}>
                                <h5 className="col-12 gy-3">Company</h5>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Company Name:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("CompanyName")} value={this.state.CompanyName}
                                        placeholder="Enter your  company name" required />
                                </Form.Group>
                                <Form.Group className="col gy-2">
                                    <Form.Label>Company BS:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Catchphrase")} value={this.state.Catchphrase}
                                        placeholder="Enter your company bs" required />
                                </Form.Group>
                                <Form.Group className="col-12 gy-2 text-center">
                                    <Form.Label>Company CatchPhrase:</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange("Bs")} value={this.state.Bs}
                                        placeholder="Enter your company catchphrase" required />
                                </Form.Group>

                            </div>
                            <hr
                                className="mt-4 mb-3"
                                style={{ height: "0.1rem" }}
                            />
                            <div className="row justify-content-center">
                                <Button variant="success" type="submit" className="col-9" >
                                    {(this.state.Case === 0) ? ("Save changes") : ("Create new user")}
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div >
                <div className="col gy-3 justify-content-left h-100">
                    <div className="row">
                        <div className="col">
                            <div className="card my-2 p-2">
                                <div className="card-header bg-secondary bg-opacity-25">
                                    <div className="row gx-1 align-items-center">
                                        <span className="col-1" style={{ "font-weight": "bold" }}>
                                            PIC
                                        </span>
                                        <span className="col-3" style={{ "font-weight": "bold" }}>
                                            NAME
                                        </span>
                                        <span className="col" style={{ "font-weight": "bold" }}>
                                            EMAIL
                                        </span>
                                        <span className="col-2" style={{ "font-weight": "bold" }}>
                                            CITY
                                        </span>
                                        <span className="col" style={{ "font-weight": "bold" }}>
                                            COMPANY NAME
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* TARJETA QUE SE REPLICA PARA CADA USUARIO */}
                    {this.state.Users.map((data) => (

                        <div className="row" key={data.userid}>
                            <div className="col">
                                <div className="card my-2 p-2">
                                    <div className="card-header bg-secondary bg-opacity-25">
                                        <div className="row gx-1 align-items-center">
                                            <div className="col-1">
                                                <img src={gravatar.url(data.email, { protocol: 'https', s: '40' })} />
                                            </div>
                                            <span className="col-3">
                                                {data.name}
                                            </span>
                                            <span className="col">
                                                {data.email}
                                            </span>
                                            <span className="col-2">
                                                {data.city}
                                            </span>
                                            <span className="col">
                                                {data.companyname}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body py-1">
                                        <div className="row">
                                            <div className="row col-12 ">
                                                <div className="row row-cols-2 col-12 pt-2 pt-lg-0 px-0 justify-content-center">
                                                    <div className="col row gx-1 h-100 ">
                                                        <button className="col mx-1 btn btn-info" onClick={() => { this.Edit(data) }}>
                                                            Edit
                                                        </button>
                                                        <button className="col mx-1 btn btn-danger" onClick={() => {
                                                            this.DeleteUser(data.userid, data.addressid, data.companyid, data.name)
                                                        }}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div >
        )
    }
}

