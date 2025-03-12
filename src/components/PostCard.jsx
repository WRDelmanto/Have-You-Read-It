import { Card } from "react-bootstrap";
import { FaBook, FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const PostCard = ({ post, isFavorite, isBookmarked, isCompleted, handleFavorite, handleBookmark, handleCompleted }) => {
	const navigate = useNavigate();

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
						transition: "transform 0.3s ease-in-out"
					}}
					onClick={() => navigate(`/book/${post.book.bookId}`)}
					onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
					onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
										transition: "transform 0.3s ease-in-out"
									}}
									onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
									onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
								>
									{post.book.title}
								</Card.Title>
							</Link>

							{/* Author */}
							<Link to={`/author/${post.book.authorId}`} className="text-decoration-none">
								<Card.Subtitle
									className="text-muted mb-4"
									style={{
										transition: "transform 0.3s ease-in-out"
									}}
									onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
									onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
								>
									{post.book.authorName}
								</Card.Subtitle>
							</Link>

							{/* Reader */}
							<div className="d-flex flex-row mb-2"
								onClick={() => navigate(`/reader/${post.reader._Id}`)}
								onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
								onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
								style={{
									cursor: "pointer",
									transition: "transform 0.3s ease-in-out"
								}}
							>
								<Card.Img
									src={post.reader?.picture}
									alt={post.reader?.name}
									style={{
										height: "30px",
										objectFit: "contain",
										width: "30px",
										borderRadius: "50%"
									}}
								/>
								<Card.Title className="h5 text-dark ms-2">{post.reader?.name || "Anonymous"}</Card.Title>
							</div>

							<div className="d-flex flex-column align-items-start">
								{/* Title */}
								<div className="h6 text-dark mb-1">{post.title}</div>
								{/* Description */}
								<div className="h6 text-muted mb-1" > {post.description}</div>
							</div>
						</div>

						{/* Favorite, bookmarked, and completed buttons */}
						<div className="d-flex flex-row">
							<button
								className="btn btn-link p-0 me-2"
								onClick={() => handleFavorite(post.book.bookId)}
								onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
								onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
							>
								{isFavorite ? (
									<FaHeart
										size={22}
										style={{
											color: "red",
											transition: "0.3s"
										}}
									/>
								) : (
									<FaRegHeart
										size={22}
										style={{
											color: "red",
											transition: "0.3s",
										}}
									/>
								)}
							</button>
							<button
								className="btn btn-link p-0 me-2"
								onClick={() => handleBookmark(post.book.bookId)}
								onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
								onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
							>
								{isBookmarked ? (
									<FaBookmark
										size={22}
										style={{
											transition: "0.3s",
										}}
									/>
								) : (
									<FaRegBookmark
										size={22}
										style={{
											transition: "0.3s"
										}}
									/>
								)}
							</button>
							<button
								className="btn btn-link p-0"
								onClick={() => handleCompleted(post.book.bookId)}
								onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
								onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
							>
								{isCompleted ? (
									<FaBook
										size={22}
										style={{
											transition: "0.3s",
											color: "green",
										}}
									/>
								) : (
									<FaBook
										size={22}
										style={{
											transition: "0.3s",
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
								<div key={comment._Id} className="mt-2 text-muted">
									<Card.Img
										src={comment.reader?.picture}
										alt={comment.reader?.name}
										onClick={() => navigate(`/reader/${comment.reader._Id}`)}
										onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
										onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
										style={{
											cursor: "pointer",
											height: "30px",
											objectFit: "contain",
											width: "30px",
											borderRadius: "50%",
											transition: "0.3s ease-in-out"
										}}
									/>
									<span className="ms-2">{comment.text}</span>
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
