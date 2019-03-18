import React, { Component } from "react";
import api from "../../services/Api";
import './style.css';

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
       console.log(evento.target.value);
    }

    onChangeSeason = (evento) => {
        this.setState({seasonCurrent: evento.target.value});
        console.log(evento.target.value);
    }

    onSubmit = async (evento) => {
        var objSerie = {};
        //console.log(JSON.parse(evento.target.value).ids);
        const serieUpdate = JSON.parse(evento.target.value);
        //console.log(serieUpdate);
        var epCurr = serieUpdate.epCurrent;
        var seasonCurr = serieUpdate.seasonCurrent;
        var objSerie = {epCurr, seasonCurr};
        console.log(JSON.stringify(objSerie));
        const url = serieUpdate.ids;
        console.log(url);
        evento.preventDefault();
        await api.put(`/series/${url}`, objSerie);
        this.props.history.push("/");
    }

    destroy = async (evento) => {
        var r = window.confirm("Deseja realmente apagar o item?");
        if (r == true) {
            const url =JSON.parse(evento.target.value).id;
            await api.delete(`/series/${url}`);
            this.props.history.push("/");
        }
        
    }
    render() {
        const { series, epCurrent, seasonCurrent, id } = this.state;
        const ids= id.id;
        const obj = { ids, epCurrent,  seasonCurrent};

        return (
            <div className="serie-info">
                <strong>Título: {series.title}</strong>
                <p>Sinopse: {series.sinopse}</p>
                <p>Quantidade de Temporadas: {series.seasons}</p>
                <p>Episódio Atual: {series.epCurr}</p>
                
                <input type="number" value={epCurrent} onChange={this.onChangeEp}/>
                <p>Temporada Atual: {series.seasonCurr}</p>
                <input type="number" value={seasonCurrent} onChange={this.onChangeSeason}/>
                <br/>
                <div className="actions">
                    <button onClick={this.onSubmit} type="submit" value={JSON.stringify(obj)}>Salvar</button>
                    <button onClick={this.destroy} value={JSON.stringify(id)}>Apagar</button>
                </div>
            </div>
        );
    }
}