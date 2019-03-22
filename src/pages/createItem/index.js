import React, { Component } from "react";
import api from "../../services/Api";
import './styles.css';
import Select from 'react-select';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

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

    // async componentDidMount() {
       
    // }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

    onSubmit = async(evento) => {
        //console.log("eou" + evento.target.value);
        const {selectedOption} = this.state;
        const objNewSerie = JSON.parse(evento.target.value);
        //console.log(objNewSerie);

        var title = objNewSerie.newTitle;
        var sinopse = objNewSerie.newSinopse;
        var seasons = objNewSerie.newSeasons;
        var status = selectedOption;
        var epCurr = objNewSerie.newEpCurr;
        var seasonCurr = objNewSerie.newSeasonCurr;
        var objSerie = { title, sinopse, seasons, seasonCurr, epCurr, status};

        console.log(objSerie);

        await api.post("/series-create/", objSerie);
        this.props.history.push('/');
    }

    onChangeTitle = (evento) => {
        this.setState({newTitle: evento.target.value});
        console.log(evento.target.value);
    }

    onChangeSinopse = (evento) => {
        this.setState({newSinopse: evento.target.value});
        console.log(evento.target.value);
    }

    onChangeMaxSeason = (evento) => {
        this.setState({newSeasons: evento.target.value});
        console.log(evento.target.value);
    }

    onChangeEp = (evento) => {
        this.setState({newEpCurr: evento.target.value});
        console.log(evento.target.value);
    }
 
    onChangeSeason = (evento) => {
        this.setState({newSeasonCurr: evento.target.value});
        console.log(this.state.newSeasonCurr);
    }

    onChangeStatus = (evento) => {
        console.log(evento.target.value);
        this.setState({selectedOption: evento.target.value});
        //console.log(evento.target.value);
        console.log(this.state.selectedOption);
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