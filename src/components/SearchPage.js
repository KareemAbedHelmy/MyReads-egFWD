import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const SearchPage = ({ moveToShelf, books }) => {
	const [value, setvalue] = useState("");
	const [searchedBooks, setSearchedBooks] = useState([]);
	const searchDebounce = useDebounce(value,300);
	

	useEffect(() => {
		const search = (value) => {
			if (value.length === null) {
				setSearchedBooks([]);
			} else {
				BooksAPI.search(value).then((allBooks) => {
					if (allBooks.error) {
						setSearchedBooks([]);
						throw new Error(allBooks.error);
					} else {
						setSearchedBooks(allBooks);
					}
				});
			}
		};
		search(value);
	} ,[value,searchDebounce]);

	return (
		<div className='search-books'>
			<div className='search-books-bar'>
				<Link to='/'>
					<button className='close-search'>Close</button>
				</Link>
				<div className='search-books-input-wrapper'>
					<input
						type='text'
						value={value}
						onChange={(e) => setvalue(e.target.value)}
						placeholder='Search by title or author'
					/>
				</div>
			</div>
			<div className='search-books-results'>
			<ol className='books-grid'>
			{searchedBooks.length !== null &&
				searchedBooks.map((book) => {
					const bookShelf = books.find(
						(bookInShelf) => bookInShelf.id === book.id
					);
					//3shan el dropdown (if already in shelf set it to the shelf it is in else khaleeh none)
					bookShelf ? (book.shelf = bookShelf.shelf) : (book.shelf = "none");
					return (
						<Book
							key={book.id}
							book={book}
							swapShelf={moveToShelf}
						/>
						
					);
				})}
		</ol>
			</div>
		</div>
	);
};

export default SearchPage;