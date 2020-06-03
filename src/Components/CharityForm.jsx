import React, { useState } from 'react'
import './CharityForm.css'
import TextField from "@material-ui/core/TextField"
import { db } from '../firebase-config';
import Button from './Widgets/Button'
import { useHistory } from 'react-router-dom'



const CharityForm = () => {
    const [data, setData] = useState({
        Name: '',
        RUT: '',
        Representative: '',
        RepID: '',
        Address: '',
        File: '',
        Email: '',
        Tel: ''
    });
    const history = useHistory();
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault();
        console.log(data)

        // Adding collection in firebase                 
        db.collection("ONG").add({
            name: data.Name,
            RUT: data.RUT,
            Representative: data.Representative,
            RepID: data.RepID,
            Address: data.Address,
            Email: data.Email,
            Tel: data.Tel
        })
            .then((docRef) => {
                console.log(docRef);
                alert('Enviado. Nos contactaremos con ustedes para completar el proceso');
                history.push("/home")
            })
            .catch((error) => {
                console.log('Error ', error);
            });
    }


    return (
        <div>
            <div className="CharityForm-Container">
                <h3>FORMULARIO DE POSTULACIÓN</h3>
                <form className="CharityForm-form" onSubmit={sendData}>
                    <TextField className="CharityForm-text"
                        label="Institución"
                        name="Name"
                        value={data.Name}
                        onChange={handleInputChange}
                        required id="standard-required"
                    />
                    <TextField className="CharityForm-text"
                        label="RUT"
                        name="RUT"
                        value={data.RUT}
                        onChange={handleInputChange}
                        required id="standard-required"
                    />
                    <TextField className="CharityForm-text"
                        label="Representante de institución"
                        name="Representative"
                        value={data.Representative}
                        onChange={handleInputChange}
                        required id="standard-required"
                    />
                    <TextField className="CharityForm-text"
                        label="Run del representante"
                        name="RepID"
                        value={data.RepID}
                        onChange={handleInputChange}
                        required id="standard-required"
                    />
                    <TextField className="CharityForm-text"
                        label="Dirección de Institución"
                        name="Address"
                        value={data.Address}
                        onChange={handleInputChange}
                        required id="standard-required"
                    />
                    <TextField className="CharityForm-text"
                        label="Email"
                        name="Email"
                        value={data.Email}
                        onChange={handleInputChange}
                        required id="standard-required"
                    />
                    <TextField className="CharityForm-text"
                        label="Teléfono"
                        name="Tel"
                        value={data.Tel}
                        onChange={handleInputChange}
                        required id="standard-required"
                    />
                    <div className="CharityForm-buttonDiv">

                        <Button disabled={false} title="Enviar" type="submit" color="#469D8B" />

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CharityForm
