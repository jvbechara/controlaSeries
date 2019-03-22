import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import Button from 'react-bootstrap/Button';
import './style.css';

class Suggestions extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        value: "",
        autocompleteData: []
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
    
    fetch(`http://localhost:3001/series/search/${searchText}`)
      .then(response => response.json()
        .then(json =>{
            for(let j in json){
              autocompleteData.push(json[j]);
            }
          }
        )
        .then(
          _this.setState({autocompleteData})
        )
      );
    //console.log(this.state.autocompleteData);
  }
  onSelect(value){
    this.setState({value});
  }
  onChange(e){
    this.setState({
        value: e.target.value
    });
    this.retrieveDataAsynchronously(e.target.value);
  }

  renderItem(item, isHighlighted){
    return (
        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.title}
        </div>
    );
  }

  getItemValue(item){
      // You can obviously only return the Label or the component you need to show
      // In this case we are going to show the value and the label that shows in the input
      return `${item.id}`;
  }

  render() {
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
        <Button className='btn-search' variant="outline-info">Search</Button>
      </div>
    );
  }
}

export default Suggestions;