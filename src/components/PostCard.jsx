import { useState } from "react";
import { Card } from "react-bootstrap";
import { FaBook, FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const PostCard = ({ post, isFavorite, isBookmarked, isCompleted, handleFavorite, handleBookmark, handleCompleted }) => {
	const navigate = useNavigate();
	const [isHovered, setIsHovered] = useState(false);
	const [iconHovered, setIconHovered] = useState({
		favorite: false,
		bookmarked: false,
		completed: false,
	});
	const [textHovered, setTextHovered] = useState({
		title: false,
		subtitle: false,
		readerName: false,
	});

	const handleIconHover = (icon) => {
		setIconHovered((prevState) => ({
			...prevState,
			[icon]: !prevState[icon],
		}));
	};

	const handleTextHover = (text) => {
		setTextHovered((prevState) => ({
			...prevState,
			[text]: !prevState[text],
		}));
	};

	return (
		<Card className="h-100 book-card border-0 shadow-lg">
			<div className="d-flex">
				{/* Book cover with hover effect */}
				<Card.Img
					src={post.book.cover}
					alt={post.book.title}
					style={{
						height: "250px",
						objectFit: "contain",
						width: "150px",
						cursor: "pointer",
						transition: "transform 0.3s ease-in-out",
						transform: isHovered ? "scale(1.05)" : "scale(1)",
					}}
					onClick={() => navigate(`/book/${book.bookId}`)}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				/>

				{/* Body content */}
				<div className="d-flex flex-column ms-3 w-100">
					<div className="d-flex justify-content-between align-items-start">
						<div className="d-flex align-items-start flex-column">
							{/* Title */}
							<Link to={`/book/${post.book.bookId}`} className="text-decoration-none">
								<Card.Title
									className="h5 text-dark mt-1 mb-2"
									style={{
										transition: "transform 0.3s ease-in-out",
										transform: textHovered.title ? "scale(1.01)" : "scale(1)",
									}}
									onMouseEnter={() => handleTextHover("title")}
									onMouseLeave={() => handleTextHover("title")}
								>
									{post.book.title}
								</Card.Title>
							</Link>

							{/* Author */}
							<Link to={`/author/${post.book.authorId}`} className="text-decoration-none">
								<Card.Subtitle
									className="text-muted mb-4"
									style={{
										transition: "transform 0.3s ease-in-out",
										transform: textHovered.subtitle ? "scale(1.05)" : "scale(1)",
									}}
									onMouseEnter={() => handleTextHover("subtitle")}
									onMouseLeave={() => handleTextHover("subtitle")}
								>
									{post.book.authorName}
								</Card.Subtitle>
							</Link>

							{/* Reader */}
							<Link to={`/reader/${post.reader?._Id}`} className="text-decoration-none">
								<Card.Title
									className="h5 text-dark mb-2"
									style={{
										transition: "transform 0.3s ease-in-out",
										transform: textHovered.readerName ? "scale(1.01)" : "scale(1)",
									}}
									onMouseEnter={() => handleTextHover("readerName")}
									onMouseLeave={() => handleTextHover("readerName")}
								>
									{post.reader?.name || "Anonymous"}
								</Card.Title>
							</Link>
							<div className="d-flex flex-column align-items-start">
								{/* Title */}
								<div className="h6 text-dark mb-1">{post.title}</div>
								{/* Description */}
								<div nclassName="h6 text-muted mb-1" > {post.description}</div>
							</div>
						</div>

						{/* Favorite, bookmarked, and completed buttons */}
						<div className="d-flex flex-row">
							<button
								className="btn btn-link p-0 me-2"
								onClick={() => handleFavorite(book.bookId)}
								onMouseEnter={() => handleIconHover("favorite")}
								onMouseLeave={() => handleIconHover("favorite")}
							>
								{isFavorite ? (
									<FaHeart
										size={22}
										style={{
											color: "red",
											transition: "transform 0.3s",
											transform: iconHovered.favorite ? "scale(1.2)" : "scale(1)",
										}}
									/>
								) : (
									<FaRegHeart
										size={22}
										style={{
											color: "red",
											transition: "transform 0.3s",
											transform: iconHovered.favorite ? "scale(1.2)" : "scale(1)",
										}}
									/>
								)}
							</button>
							<button
								className="btn btn-link p-0 me-2"
								onClick={() => handleBookmark(book.bookId)}
								onMouseEnter={() => handleIconHover("bookmarked")}
								onMouseLeave={() => handleIconHover("bookmarked")}
							>
								{isBookmarked ? (
									<FaBookmark
										size={22}
										style={{
											transition: "transform 0.3s",
											transform: iconHovered.bookmarked ? "scale(1.2)" : "scale(1)",
										}}
									/>
								) : (
									<FaRegBookmark
										size={22}
										style={{
											transition: "transform 0.3s",
											transform: iconHovered.bookmarked ? "scale(1.2)" : "scale(1)",
										}}
									/>
								)}
							</button>
							<button
								className="btn btn-link p-0"
								onClick={() => handleCompleted(book.bookId)}
								onMouseEnter={() => handleIconHover("completed")}
								onMouseLeave={() => handleIconHover("completed")}
							>
								{isCompleted ? (
									<FaBook
										size={22}
										style={{
											transition: "transform 0.3s",
											transform: iconHovered.completed ? "scale(1.2)" : "scale(1)",
											color: "green",
										}}
									/>
								) : (
									<FaBook
										size={22}
										style={{
											transition: "transform 0.3s",
											transform: iconHovered.completed ? "scale(1.2)" : "scale(1)",
											color: "white",
											stroke: "green",
											strokeWidth: "20px",
										}}
									/>
								)}
							</button>
						</div>
					</div>
					{/* Comments */}
					{post.comments.length > 0 && (
						<div className="d-flex flex-column mt-4 align-items-start">
							<Card.Subtitle className="text-muted">Comments:</Card.Subtitle>
							{post.comments.map((comment) => (
								<div key={comment._id} className="mb-1 text-muted">
									{comment.text}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</Card >
	);
};

export default PostCard;
