import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown, Form } from "semantic-ui-react";
import axios from "axios";

class SearchBookForm extends Component {
  state = {
    query: "",
    loading: false,
    options: [
      {
        key: 1,
        value: 1,
        text: "first book"
      },
      {
        key: 2,
        value: 2,
        text: "second book"
      },
      {
        key: 3,
        value: 3,
        text: "thirsd book"
      }
    ],
    books: {}
  };

  onSearchChange = (e, data) => {
    // console.log("agerr", this.timer);
    clearTimeout(this.timer);
    this.setState({
      query: data
    });
    this.timer = setTimeout(this.fetchOptions, 3000);
  };
  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onBookSelect(this.state.book[data.value]);
  };
  fetchOptions = () => {
    if (!this.state.query) return;
    // console.log("query =", this.state.query);
    this.setState({ loading: true });
    axios
      .get(`/api/books/search?q=${this.state.query.searchQuery}`)
      .then(res => res.data.books)
      .then(books => {
        const options = [];
        const booksHash = {};
        books.forEach(book => {
          booksHash[book.goodreadsId] = book;
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title
          });
        });
        this.setState({ loading: false, options, books: booksHash });
      });
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}
SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired
};
export default SearchBookForm;
