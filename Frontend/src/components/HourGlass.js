import { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class HourGlass extends Component {
    // HOURGLASS PARA SER MOSTRADO AL DARLE A UNA ACCIÓN QUE CONSUMA LA API REST EVITANDO ASÍ SE ENVIE EL FORMULARIO O SOLICITUD MAS DE UNA VEZ.
    render() {
        return (
            <Modal show={this.props.show} backdrop='static' centered>
                <Modal.Body>
                    <div className="d-flex justify-content-center flex-column align-items-center text-center">
                        <div className="spinner-grow text-info" role="status" style={{ width: '5rem', height: '5rem' }} />
                        <span className="my-2 ">Wait a moment, please...</span>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}