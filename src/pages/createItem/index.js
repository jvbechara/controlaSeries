import React, { Component } from "react";
import api from "../../services/Api";
import './styles.css';
import Select from 'react-select';

export default class Serie extends Component {
    state = {
        newTitle: '',
        newSinopse: '',
        newSeasons: 1,
        newEpCurr: 1,
        newSeasonCurr: 1,
        selectedOption: null,
        options: [
            { value: 0, label: 'Minha Lista' },
            { value: 1, label: 'Em Andamento' },
            { value: 2, label: 'Assistidas' }
          ]
    };

    // async componentDidMount() {
       
    // }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

    onSubmit = async (evento) => {
        //console.log("eou" + evento.target.value);
        const objNewSerie = JSON.parse(evento.target.value);
        //console.log(objNewSerie);

        var title = objNewSerie.newTitle;
        var sinopse = objNewSerie.newSinopse;
        var seasons = objNewSerie.newSeasons;
        var status = objNewSerie.selectedOption.value;
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
        console.log(evento.target.value);
    }

    onChangeStatus = (evento) => {
        this.setState({newStatus: evento.target.value});
        console.log(evento.target.value);
    }

    render() {
        const { selectedOption } = this.state;

        const { newTitle,
        newSinopse,
        newSeasons,
        newEpCurr,
        newSeasonCurr,
        newStatus,
        options } = this.state;

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
                <strong>Título: </strong>
                <input type="text" onChange={this.onChangeTitle} value={newTitle}/>
                <p>Sinopse: </p>
                <input type="text" onChange={this.onChangeSinopse} value={newSinopse}/>
                <p>Quantidade de Temporadas: </p>
                <input type="Number" onChange={this.onChangeMaxSeason} value={newSeasons}/>
                <p>Episódio Atual: </p>
                <input type="Number" onChange={this.onChangeEp} value={newEpCurr}/>
                <p>Temporada Atual: </p>
                <input type="Number" onChange={this.onChangeSeason} value={newSeasonCurr}/>
                <p>Status: </p>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
                <br/>
                <div className="actions">
                    <button onClick={this.onSubmit} type="submit" value={JSON.stringify(objNewSerie)}>Adicionar</button>
                </div>
            </div>
        );
    }
}