import React, { Component } from "react";
import api from "../../services/Api";
import './styles.css';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default class Serie extends Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            newTitle: '',
            newSinopse: '',
            newSeasons: 1,
            newEpCurr: 1,
            newSeasonCurr: 1,
            selectedOption: 0,
            options: [
                { value: 0, label: 'Minha Lista' },
                { value: 1, label: 'Em Andamento' },
                { value: 2, label: 'Assistidas' }
              ]
        };

        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      }

    onSubmit = async(evento) => {
        const {selectedOption} = this.state;
        const objNewSerie = JSON.parse(evento.target.value);

        var title = objNewSerie.newTitle;
        var sinopse = objNewSerie.newSinopse;
        var seasons = objNewSerie.newSeasons;
        var status = selectedOption;
        var epCurr = objNewSerie.newEpCurr;
        var seasonCurr = objNewSerie.newSeasonCurr;
        var objSerie = { title, sinopse, seasons, seasonCurr, epCurr, status};

        await api.post("/series-create/", objSerie);
        this.props.history.push('/');
    }

    onChangeTitle = (evento) => {
        this.setState({newTitle: evento.target.value});
    }

    onChangeSinopse = (evento) => {
        this.setState({newSinopse: evento.target.value});
    }

    onChangeMaxSeason = (evento) => {
        this.setState({newSeasons: evento.target.value});
    }

    onChangeEp = (evento) => {
        this.setState({newEpCurr: evento.target.value});
    }
 
    onChangeSeason = (evento) => {
        this.setState({newSeasonCurr: evento.target.value});
    }

    onChangeStatus = (evento) => {
        this.setState({selectedOption: evento.target.value});
    }

    render() {
        const { selectedOption } = this.state;

        const { newTitle,
        newSinopse,
        newSeasons,
        newEpCurr,
        newSeasonCurr,
        } = this.state;

        const objNewSerie = {
            newTitle,
            newSinopse,
            newSeasons,
            newEpCurr,
            newSeasonCurr,
            selectedOption
        };

        return (
            <div className="serie-info">
                <Container className='container-create'>
                    <Card className='card-create'>
                        <Card.Body >
                            <Form>
                                    
                                    <Form.Label><h5>Título: </h5></Form.Label>
                                    <Form.Control type="text" onChange={this.onChangeTitle} value={newTitle}/>
                                
                                <Form.Label>Sinopse:</Form.Label>
                                <Form.Control type="text" onChange={this.onChangeSinopse} value={newSinopse}/>
                                <Row>
                                    <Col sm>
                                    <Form.Label>Quantidade de Temporadas:</Form.Label>
                                    <Form.Control type="Number" onChange={this.onChangeMaxSeason} value={newSeasons}/>
                                    </Col>
                                    <Col sm>
                                    <Form.Label>Episódio Atual:</Form.Label>
                                    <Form.Control type="Number" onChange={this.onChangeEp} value={newEpCurr}/>
                                    </Col>
                                    <Col sm>
                                    <Form.Label>Temporada Atual:</Form.Label>
                                    <Form.Control type="Number" onChange={this.onChangeSeason} value={newSeasonCurr}/>
                                    </Col>
                                </Row>
                                <Form.Label>Status:</Form.Label>
                                <Form.Control as="select" onChange={this.onChangeStatus}>
                                    {
                                        this.state.options.map((option, index)=>{
                                            return(
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            )
                                        })
                                    }
                                </Form.Control>

                                <Button style={{ marginTop: '1rem'}} block variant='success' onClick={this.onSubmit} value={JSON.stringify(objNewSerie)}>
                                    Adicionar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}