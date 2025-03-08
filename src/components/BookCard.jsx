import { Card } from "react-bootstrap";
import { FaBook, FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookCard = ({ book, isFavorite, isBookmarked, isCompleted, handleFavorite, handleBookmark, handleCompleted }) => {
	return (
		<Card className="h-100 book-card border-0 shadow-sm">
			<div className="d-flex">
				{/* Book cover */}
				<Card.Img
					src={book.coverImage}
					alt={book.title}
					style={{ height: "250px", objectFit: "contain", width: "150px" }}
				/>

				{/* Body content */}
				<div className="d-flex flex-column ms-3 w-100">
					<div className="d-flex justify-content-between align-items-start">
						<div className="d-flex align-items-start flex-column">
							{/* Title */}
							<Link to={`/book/${book.id}`} className="text-decoration-none">
								<Card.Title className="h5 text-dark mt-1 mb-2">{book.title}</Card.Title>
							</Link>

							{/* Author */}
							<Link to={`/author/${book.author.id}`} className="text-decoration-none">
								<Card.Subtitle className="text-muted mb-4">{book.author.name}</Card.Subtitle>
							</Link>
						</div>

						{/* Favorite, bookmarked and completed buttons */}
						<div className="d-flex flex-row align-items-start">
							<button
								className="btn btn-link text-danger p-0 me-2"
								onClick={() => handleFavorite(book.id)}
							>
								{isFavorite ? <FaHeart /> : <FaRegHeart />}
							</button>
							<button
								className="btn btn-link text-primary p-0 me-2"
								onClick={() => handleBookmark(book.id)}
							>
								{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
							</button>
							<button
								className="btn btn-link text-primary p-0"
								onClick={() => handleCompleted(book.id)}
							>
								{isCompleted ? (
									<FaBook style={{ color: "green" }} />
								) : (
									<FaBook style={{ color: "white", stroke: "green", strokeWidth: "30px" }} />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default BookCard;
