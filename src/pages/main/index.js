import React, { Component } from 'react';
import api from '../../services/Api';
import './style.css';
import { Link } from 'react-router-dom'; 

export default class Main extends Component {
    state = {
        series: [],
        seriesInfo: {},
        stat: ['Minha Lista', 'Em Andamento', 'Finalizada'],
        page: 1,
        status: 0
    };

    componentDidMount() {
        const {status} = this.props.match.params;
        if (status !== undefined){
            this.loadSeriesByStatus(status);
        }else{
            this.loadSeries();
        }
        //this.setState({stat: ['Minha Lista', 'Em Andamento', 'Finalizada']});
        //console.log(this.state.stat[0]);
    }

    loadSeries = async (page=1) => {
        const response = await api.get(`/series?page=${page}`);
        const { docs, ...seriesInfo } = response.data;       
        this.setState({ series: docs, seriesInfo, page });
    }
    loadSeriesByStatus = async (status=0) => {
        const response = await api.get(`/series-status/${status}`);
        const { docs, ...seriesInfo } = response.data;       
        this.setState({ series: docs, seriesInfo, status });
    }

    prevPage = () => {
        const { page } = this.state;
        if(page === 1) return;
        const pageNumber = page - 1;
        this.loadSeries(pageNumber);
    };

    nextPage = () => {
        const { page, seriesInfo } = this.state;
        if(page === seriesInfo.pages) return;
        const pageNumber = page + 1;
        this.loadSeries(pageNumber);
    };

    render() {
        const { series, page, seriesInfo, stat } = this.state;
        return(
            <div className="series-list">
                {series.map(serie => (
                    <article key={serie._id}>
                        <strong>{serie.title}</strong>
                        <p>Sinopse: {serie.sinopse}</p>
                        <p>Status: {stat[serie.status]}</p>
                        <p>Quantidade de Temporadas: {serie.seasons}</p>
                        <p>Episódio Atual: {serie.epCurr}</p>
                        <p>Temporada Atual: {serie.seasonCurr}</p>
                        <Link to={`/series/${serie._id}`}>Atualizar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === seriesInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        );
    }
}