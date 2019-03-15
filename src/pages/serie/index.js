import React, { Component } from "react";
import api from "../../services/Api";
import './style.css';

export default class Serie extends Component {
    state = {
        series: {}
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/series/${id}`);
        this.setState({ series: response.data});
    }

    render() {
        const { series } = this.state;
        return (
            <div className="serie-info">
                <strong>Título: {series.title}</strong>
                <p>Sinopse: {series.sinopse}</p>
                <p>Quantidade de Temporadas: {series.seasons}</p>
                <p>Episódio Atual: {series.epCurr}</p>
                <p>Temporada Atual: {series.seasonCurr}</p>            
            </div>
        );
    }
}