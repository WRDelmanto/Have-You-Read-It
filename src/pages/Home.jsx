import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import NavBar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { fetchPosts, fetchReaderById } from "../services/MockAPI";

const Home = () => {
	const [account_reader, setReader] = useState([]);
	const [posts, setposts] = useState([]);
	const [filteredposts, setFilteredposts] = useState([]);
	const ACCOUNT_READER_ID = "754368128"; // For testing purposes

	useEffect(() => {
		const getReader = async () => {
			const account_reader = await fetchReaderById(ACCOUNT_READER_ID);
			setReader(account_reader);

			// console.log("Account reader:", account_reader);
		};

		const getposts = async () => {
			const fetchedposts = await fetchPosts(ACCOUNT_READER_ID);
			setposts(fetchedposts);
			setFilteredposts(fetchedposts);

			// console.log("posts:", fetchedposts);
			console.log("posts:", fetchedposts);
		};

		getReader().then(getposts);
	}, []);

	const handleFavorite = (bookID) => {
		if (account_reader.favoriteBooks.includes(bookID)) {
			const index = account_reader.favoriteBooks.indexOf(bookID);
			account_reader.favoriteBooks.splice(index, 1);
		} else {
			account_reader.favoriteBooks.push(bookID);
		}

		setReader({ ...account_reader });
		console.log("Updated bookId: " + bookID + " to favorite: " + account_reader.favoriteBooks.includes(bookID));
	};

	const handleBookmark = (bookID) => {
		if (account_reader.bookmarkedBooks.includes(bookID)) {
			const index = account_reader.bookmarkedBooks.indexOf(bookID);
			account_reader.bookmarkedBooks.splice(index, 1);
		} else {
			account_reader.bookmarkedBooks.push(bookID);
		}

		setReader({ ...account_reader });
		console.log("Updated bookId: " + bookID + " to bookmarked: " + account_reader.bookmarkedBooks.includes(bookID));
	};

	const handleCompleted = (bookID) => {
		if (account_reader.completedBooks.includes(bookID)) {
			const index = account_reader.completedBooks.indexOf(bookID);
			account_reader.completedBooks.splice(index, 1);
		} else {
			account_reader.completedBooks.push(bookID);
		}

		setReader({ ...account_reader });
		console.log("Updated bookId: " + bookID + " to completed: " + account_reader.completedBooks.includes(bookID));
	};

	return (
		<>
			{/* Navigation Bar */}
			<NavBar />

			{/* Body */}
			<Container style={{ marginTop: "64px" }}>
				<Row className="g-4">
					{filteredposts.map((post) => (
						<PostCard
							key={post._Id}
							post={post}
							isFavorite={account_reader.favoriteBooks.includes(post.book.bookId)}
							isBookmarked={account_reader.bookmarkedBooks.includes(post.book.bookId)}
							isCompleted={account_reader.completedBooks.includes(post.book.bookId)}
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
