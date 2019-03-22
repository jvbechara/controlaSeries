import React, { Component } from 'react';
import api from '../../services/Api';
import './style.css';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';

export default class Main extends Component {
    state = {
        series: [],
        seriesInfo: {},
        stat: ['Minha Lista', 'Em Andamento', 'Finalizada'],
        page: 1,
        status: undefined,
        searchText: undefined
    };

    componentDidMount() {
        const {status, title} = this.props.match.params;
        if (status !== undefined){
            this.loadSeriesByStatus(status);
        }
        else if(title !== undefined){
            this.loadSeriesSearch(title);
        } else{
            this.loadSeries();
        }
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

    newLoadSeries = async (page) => {
        //const url = window.location.href;
        //console.log(url);
        const response = await api.get(`/series?page=${page}`);
        const { docs, ...seriesInfo } = response.data;
        //console.log(response.data);
        console.log(response.data.docs);
        this.setState({ series: docs, seriesInfo, page });
    }

    loadSeriesSearch = async (searchText) => {
        const response = await api.get(`/series-search/${searchText}`);
        const { docs, ...seriesInfo } = response.data;
        this.setState({ series: docs, seriesInfo, searchText});
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

    navbarPaginate = () => {
        const {page, seriesInfo} = this.state;
        let active = page;
        let items = [];
        
        items.push(
             <Pagination.Prev key={0} disabled={page === 1} onClick={this.prevPage} ></Pagination.Prev>
        )
        for (let number = 1; number <= seriesInfo.pages; number++) {
            items.push(
                <Pagination.Item key={number} value={number} onClick={() => this.newLoadSeries(number)} active={number === page} >
                    {number}
                </Pagination.Item>,
            )
        }
        items.push(
             <Pagination.Next key={9999} onClick={this.nextPage} disabled={page === seriesInfo.pages}></Pagination.Next>
        )
        
        return (
            <Container>
                <Pagination className="justify-content-md-center">{items}</Pagination>
            </Container>
        )
    };

    redirectSerie(id){
        this.props.history.push('/series/'+id);
    }

    render() {
        const { series, page, seriesInfo, stat } = this.state;
        //console.log(seriesInfo);
        return(
            <div className="crd">
                <Container>
                    <Row className="justify-content-md-center">
                        {series.map(serie => (
                            <article key={serie._id}>
                                <Card bg="white">
                                    <Card.Body>
                                        <div className="titulo">
                                            <Card.Header><Card.Title>{serie.title}</Card.Title></Card.Header>
                                        </div>
                                        <Card.Text>Sinopse: {serie.sinopse}</Card.Text>
                                        <Card.Text>Status: {stat[serie.status]}</Card.Text>
                                        <Card.Text>Quantidade de Temporadas: {serie.seasons}</Card.Text>
                                        <Card.Text>Episódio Atual: {serie.epCurr}</Card.Text>
                                        <Card.Text>Temporada Atual: {serie.seasonCurr}</Card.Text>
                                        <div className="btn-update">
                                        <Button onClick={() => this.redirectSerie(serie._id)} variant="outline-primary">Atualizar</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </article>
                        ))}
                    </Row> 
                </Container>
                <Container className="pg">
                    {this.navbarPaginate()}
                </Container>
            </div>
        );
    }
}