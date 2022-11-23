import React from "react";
import Shelf from "./Shelf";

const Shelves = ({ books, swapShelf }) => {
	const currentlyReading = books.filter(
		(book) => book.shelf === "currentlyReading"
	);
	const wantToRead = books.filter(
		(book) => book.shelf === "wantToRead"
	);
	const read = books.filter((book) => book.shelf === "read");

	return (
		<div className='list-books-content'>
			<div>
				<Shelf
					books={currentlyReading}
					shelfTitle='Currently Reading'
					swapShelf={swapShelf}
				/>
				<Shelf
					books={wantToRead}
					shelfTitle='Want to Read'
					swapShelf={swapShelf}
				/>
				<Shelf
					books={read}
					shelfTitle='Read'
					swapShelf={swapShelf}
				/>
			</div>
		</div>
	);
};

export default Shelves;
