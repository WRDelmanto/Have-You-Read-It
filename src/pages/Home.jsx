import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { fetchPosts, fetchReaderById } from "../services/MockAPI";
import PostCard from "../components/PostCard";
import { fetchPosts, fetchReaderById } from "../services/MockAPI";

const Home = () => {
	const [posts, setposts] = useState([]);
	const [filteredposts, setFilteredposts] = useState([]);
	const [account_reader, setReader] = useState();
	const ACCOUNT_READER_ID = "754368128"; // For testing purposes
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
			const fetchedposts = await fetchPosts();
			setposts(fetchedposts);
			setFilteredposts(fetchedposts);
		const getReader = async () => {
			const account_reader = await fetchReaderById(ACCOUNT_READER_ID);
			setReader(account_reader);

			console.log("Account reader:", account_reader);
		};

		const getposts = async () => {
			const fetchedposts = await fetchPosts();
			setposts(fetchedposts);
			setFilteredposts(fetchedposts);

			// console.log("posts:", fetchedposts);
			console.log("posts:", fetchedposts);
		};

		getReader().then(getposts);
		getReader().then(getposts);
	}, []);

	const handleSearch = (event) => {
		const searchInput = event.target.value.toLowerCase();
		console.log("Search input: " + searchInput);

		if (searchInput === "") {
			setFilteredposts(posts);
			setFilteredposts(posts);
		} else {
			const filtered = posts.filter((post) =>
				post.book.title.toLowerCase().includes(searchInput)
			const filtered = posts.filter((post) =>
				post.book.title.toLowerCase().includes(searchInput)
			);
			setFilteredposts(filtered);
			setFilteredposts(filtered);
		}
	};

	const handleSignOut = () => {
		console.log("Signing out...");
	};

	const handleFavorite = (bookID) => {
		if (account_reader.favoriteBooks.includes(bookID)) {
			const index = account_reader.favoriteBooks.indexOf(bookID);
			account_reader.favoriteBooks.splice(index, 1);
		} else {
			account_reader.favoriteBooks.push(bookID);
		}

		setReader({ ...account_reader });
		console.log("Updated bookId: " + bookID + " to favorite: " + account_reader.favoriteBooks.includes(bookID));
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
			<NavBar handleSearch={handleSearch} handleSignOut={handleSignOut} />

			{/* Body */}
			<Container style={{ marginTop: "64px" }}>
				<Row className="g-4">
					{filteredposts.map((post) => (
						<PostCard
							key={post._Id}
							book={post.book}
							isFavorite={account_reader.favoriteBooks.includes(post.book.bookId)}
							isBookmarked={account_reader.bookmarkedBooks.includes(post.book.bookId)}
							isCompleted={account_reader.completedBooks.includes(post.book.bookId)}
					{filteredposts.map((post) => (
						<PostCard
							key={post._Id}
							book={post.book}
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
			<Footer />
		</>
	);
};

export default Home;
