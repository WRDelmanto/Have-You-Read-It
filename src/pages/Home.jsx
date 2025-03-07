import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";
import MainNavbar from "../components/Navbar";
import { fetchMockBooks } from "../services/MockAPI";

const Home = () => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const getBooks = async () => {
			const savedBooks = localStorage.getItem("books");

			if (savedBooks) setBooks(JSON.parse(savedBooks));
			else {
				const fetchedBooks = await fetchMockBooks();
				setBooks(fetchedBooks);

				localStorage.setItem("books", JSON.stringify(fetchedBooks));
			}

			console.log("Books:", books);
		};

		getBooks();
	}, []);

	return (
		<>
			{/* Navigation Bar */}
			<MainNavbar />

			{/* Body */}
			<Container>
				<Row xs={1} md={1} className="g-4">
					{books.map((book) => (
						<BookCard
							key={book.id}
							book={book}
							isFavorite={false}
							isBookmarked={false}
							isCompleted={false}
						/>
					))}
				</Row>
			</Container>
		</>
	);
};

export default Home;
