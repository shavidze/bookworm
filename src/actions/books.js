import { normalize } from "normalizr";
import api from "../api";
import { BOOKS_FETCHED } from "../types";
import { bookSchema } from "../schemas";
const booksFetched = data => ({
  type: BOOKS_FETCHED,
  data
});
export const fetchBooks = () => dispatch =>
  api.books
    .fetchAll()
    .then(books => dispatch(booksFetched(normalize(book, [bookSchema]))));
