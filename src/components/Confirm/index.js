import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/Api';
import { withRouter } from "react-router-dom";

class Confirm extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
      };
    }
  
    handleClose() {
      this.setState({ show: false });
      return false;
    }
  
    handleShow() {
      this.setState({ show: true });
      return true;
    }

    destroy = async() => {

        const tam = window.location.href.split('/').length;
        const id = window.location.href.split('/')[tam-1];

        // const url =JSON.parse(evento.target.value).id;
        await api.delete(`/series/${id}`);
        this.props.history.push("/");
    }
  
    render() {
      return (
        <>
          <Button style={{ marginTop: '1rem'}} size="lg"  block variant="danger" onClick={this.handleShow}>
            Apagar
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Atenção</Modal.Title>
            </Modal.Header>
            <Modal.Body>Você deseja realmente apagar a Série da sua Lista? </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Fechar
              </Button>
              <Button variant="primary" onClick={this.destroy}>
                Apagar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

  export default withRouter(Confirm);