import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery) {
      this.props.onSearch(this.state.searchQuery);
    }
  };

  onSearchQueryChange = e => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group" >
          <label htmlFor="trackName">
            Which song do you want to search for.. ?
          </label>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.onSearchQueryChange}
            className="form-control"
            id="trackName"
            aria-describedby="trackHelp"
            placeholder="Track..."
          />
          <small id="trackHelp" className="form-text text-muted">
            Music is the universal language. Cheers to Spotify.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Find Songs!
        </button>
      </form>
    );
  }
}

export default SearchForm;
