import React, { Component } from "react";
import api from "../../services/Api";
import './style.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Confirm from '../../components/Confirm';

export default class Serie extends Component {
    state = {
        series: {},
        epCurrent: 1,
        seasonCurrent: 1,
        id: '',
    };

    async componentDidMount() {
        // const { id } = this.props.match.params;
        this.setState({ id: this.props.match.params})

        //this.setState({id: this.props.match.params})
        const idSerie = this.props.match.params.id;
        const response = await api.get(`/series/${idSerie}`);
        this.setState({ series: response.data});
        this.setState({epCurrent:response.data.epCurr, seasonCurrent: response.data.seasonCurr});
    }

    onChangeEp = (evento) => {
       this.setState({epCurrent: evento.target.value});
    }

    onChangeSeason = (evento) => {
        this.setState({seasonCurrent: evento.target.value});
    }

    onSubmit = async (evento) => {
        var objSerie = {};
        const serieUpdate = JSON.parse(evento.target.value);
        var epCurr = serieUpdate.epCurrent;
        var seasonCurr = serieUpdate.seasonCurrent;
        objSerie = {epCurr, seasonCurr};
        const url = serieUpdate.ids;
        evento.preventDefault();
        await api.put(`/series/${url}`, objSerie);
        this.props.history.push("/");
    }

    render() {
        const { series, epCurrent, seasonCurrent, id } = this.state;
        const ids= id.id;
        const obj = { ids, epCurrent,  seasonCurrent};

        return (
            <div className='container-atualizar'>
                <Container>
                    <Card className='card-atualizar'>
                        <Card.Body >
                            <Card.Title> {series.title}</Card.Title>
                            <Card.Text> Sinopse: {series.sinopse}</Card.Text>
                            <Card.Text> Quantidade de Temporadas: {series.seasons}</Card.Text>
                            <Form >
                                <Form.Group controlId="formBasicEmail">
                                    <Row>
                                        <Col>
                                            <Form.Label>Episódio Atual: {series.epCurr}</Form.Label>
                                            <Form.Control type="number" value={epCurrent} onChange={this.onChangeEp} />
                                        </Col>
                                        <Col>
                                            <Form.Label >Temporada Atual: {series.seasonCurr}</Form.Label>
                                            <Form.Control type="number" value={seasonCurrent} onChange={this.onChangeSeason} />
                                        </Col>
                                    </Row>
                                        <ButtonToolbar className='toolbar-atualizar'>
                                            <Row>
                                                <Col>
                                                    <div className='btn-atualizar'>
                                                        <Button size="lg" block variant="primary" onClick={this.onSubmit} type="submit" value={JSON.stringify(obj)}>
                                                            Atualizar
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Confirm className="btn-confirma"/>
                                                </Col>
                                            </Row>
                                        </ButtonToolbar>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>                
        );
    }
}