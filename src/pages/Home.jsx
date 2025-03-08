import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";
import NavBar from "../components/Navbar";
import { fetchMockBooks } from "../services/MockAPI";

const Home = () => {
	const [books, setBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);

	useEffect(() => {
		const getBooks = async () => {
			const fetchedBooks = await fetchMockBooks();
			setBooks(fetchedBooks);
			setFilteredBooks(fetchedBooks);

			console.log("Books:", fetchedBooks);
		};

		getBooks();
	}, []);

	const handleSearch = (event) => {
		const searchInput = event.target.value.toLowerCase();
		console.log("Search input: " + searchInput);

		if (searchInput === "") {
			setFilteredBooks(books);
		} else {
			const filtered = books.filter((book) =>
				book.title.toLowerCase().includes(searchInput)
			);
			setFilteredBooks(filtered);
		}
	};

	const handleSignOut = () => {
		console.log("Signing out...");
	};

	const handleFavorite = (bookID) => {
		const toggleFavorite = books.map((book) =>
			book.id === bookID ? { ...book, isFavorite: !book.isFavorite } : book
		);

		setBooks(toggleFavorite);
		setFilteredBooks(toggleFavorite);
		console.log("Updated favorite books:", toggleFavorite);
	};

	const handleBookmark = (bookID) => {
		const toggleBookmarked = books.map((book) =>
			book.id === bookID ? { ...book, isBookmarked: !book.isBookmarked } : book
		);

		setBooks(toggleBookmarked);
		setFilteredBooks(toggleBookmarked);
		console.log("Updated bookmarked books:", toggleBookmarked);
	};

	const handleCompleted = (bookID) => {
		const toggleCompleted = books.map((book) =>
			book.id === bookID ? { ...book, isCompleted: !book.isCompleted } : book
		);

		setBooks(toggleCompleted);
		setFilteredBooks(toggleCompleted);
		console.log("Updated completed books:", toggleCompleted);
	};

	return (
		<>
			{/* Navigation Bar */}
			<NavBar handleSearch={handleSearch} handleSignOut={handleSignOut} />

			{/* Body */}
			<Container style={{ marginTop: "64px" }}>
				<Row xs={1} md={1} className="g-4">
					{filteredBooks.map((book) => (
						<BookCard
							key={book.id}
							book={book}
							isFavorite={book.isFavorite}
							isBookmarked={book.isBookmarked}
							isCompleted={book.isCompleted}
							handleFavorite={handleFavorite}
							handleBookmark={handleBookmark}
							handleCompleted={handleCompleted}
						/>
					))}
				</Row>
			</Container>
		</>
	);
};

export default Home;
