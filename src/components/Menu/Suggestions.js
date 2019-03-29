import React, { Component } from "react";
import Autocomplete from 'react-autocomplete';
import Button from 'react-bootstrap/Button';
import './style.css';
import { withRouter } from "react-router-dom";

class Suggestions extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        value: "",
        autocompleteData: [],
        item: undefined
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
  }


  retrieveDataAsynchronously(searchText){
    let _this = this;
    let autocompleteData = [];
    
    if(searchText.length > 0){
      fetch(`http://localhost:3001/series-search/${searchText}`)
        .then(response => response.json()
          .then(json => {
            for(let j in json.docs){
                autocompleteData.push(json.docs[j]);
            }
          }
          )
          .then( _this.setState({autocompleteData}) )
        );
    }
  }

  onSelect(value){
    // this.props.history.push("/series/"+ value);
    window.location.href = "/series/"+ value;
  } 

  onChange(e){
    this.setState({
        value: e.target.value
    });
    this.retrieveDataAsynchronously(e.target.value);
  }

  renderItem(item, isHighlighted){
    return (
        <div key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.title}
        </div>
    );
  }

  getItemValue(item){
      return `${item._id}`;
  }

  onSubmit = () => {
    const searchText = this.state.value;
    
    if(searchText.length > 0){
      window.location.href = '/series-search/'+searchText;
    }
        
    //const url = window.location.href;
    //const response = await api.get(`/series-search/${searchText}`);
    //const { docs, ...seriesInfo } = response.data;
    //this.setState({ series: docs, seriesInfo, searchText});
    //this.props.history.push("/series-search/"+searchText);
  }

  render() {
      console.log(this.state.autocompleteData);

      return (
        <div className="sugg">
          <Autocomplete
            inputProps={{ className: "form-control"}}
            getItemValue={this.getItemValue}
            items={this.state.autocompleteData}
            renderItem={this.renderItem}
            value={this.state.value}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
          <Button className='btn-search' onClick={this.onSubmit} variant="outline-info">Search</Button>
        </div>
      );
  }
}

export default withRouter(Suggestions);