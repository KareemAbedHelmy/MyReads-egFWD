import React, { useState } from "react";

const Book = ({ book, swapShelf }) => {
	const [shelf] = useState(book.shelf);
	return (
		<li key={book.id}>
			<div className='book'>
				<div className='book-top'>
					<div className='book-cover'style={{width: 128,height: 193,backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ""})`,}}></div>
			<div className='book-shelf-changer'>
				<select value={shelf} onChange={(event) => swapShelf(book, event.target.value)}>
					<option value='move' disabled>Move to...</option>
					<option value='currentlyReading'>Currently Reading</option>
					<option value='wantToRead'>Want to Read</option>
					<option value='read'>Read</option>
					<option value='none'>None</option>
				</select>
			</div>
		</div>
		<div className='book-title'>{book.title}</div>
		<div className='book-authors'>{book.authors}</div>
			</div>
		</li>
	);
};

export default Book;
