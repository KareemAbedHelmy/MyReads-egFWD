import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

const BooksApp = () => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		getBooks();
	  }, []);
	  
	const getBooks = async () => {
		const res = await BooksAPI.getAll();
		setBooks(res);
	  };


	const moveToShelf = (book, shelf) => {
		BooksAPI.update(book, shelf);
		if (shelf !== "none") {
			book.shelf = shelf;
			setBooks(
				books.filter((b) => b.id !== book.id).concat(book)
			);
			
		} else {
			setBooks(books.filter((b) => b.id !== book.id));
		}
	};

	return (
		<Router>
			<div className='app'>
				<Switch>
					<Route exact path='/search'>
						<SearchPage
							moveToShelf={moveToShelf}
							books={books}
						/>
					</Route>
				</Switch>
				<div className='list-books'>
					<Switch>
						<Route exact path='/'>
							<div className='list-books-title'>
								<h1>MyReads</h1>
							</div>
							<MainPage books={books} swapShelf={moveToShelf} />
						</Route>
					</Switch>

					<div className='open-search'>
						<Link to='/search'>
							<button><i className="fa fa-search"></i></button>
						</Link>
					</div>
				</div>
			</div>
		</Router>
	);
};

export default BooksApp;
