import React from "react";
import { Form, Button, Grid, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";

class BookForm extends React.Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages
    },
    covers: this.props.book.covers,
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      // console.log("ae", this.state.loading);
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.authors) errors.authors = "Can't be blank";
    if (!data.pages) errors.pages = "Can't be blank";
    return errors;
  };

  render() {
    const { loading, data, errors } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="title"
                    id="title"
                    name="title"
                    placeholder="title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor="authors">Book Authors</label>
                  <input
                    type="authors"
                    id="authors"
                    name="authors"
                    placeholder="authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor="pages">Pages</label>
                  <input
                    type="pages"
                    id="pages"
                    name="pages"
                    placeholder="pages"
                    value={data.pages}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Button primary>Save</Button>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number.isRequired
  }).isRequired
};
export default BookForm;
