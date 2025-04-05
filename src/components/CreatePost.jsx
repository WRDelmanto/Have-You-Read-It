import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Image, ListGroup, Spinner } from "react-bootstrap";
import OpenLibraryAPI from "../services/OpenLibraryAPI";
import { Post } from "../models/post";

const CreatePost = ({ onPostCreated }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [booksResults, setBooksResults] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchTimeout = useRef(null);

    const handleSearch = (event) => {
        const searchInput = event.target.value;
        setSearchQuery(searchInput);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(async () => {
            if (searchInput.length > 0) {
                const filteredBooks = await OpenLibraryAPI.getBooksByTitle(
                    searchInput.replaceAll(" ", "+")
                );
                setBooksResults(filteredBooks || []);
            } else {
                setBooksResults([]);
            }
        }, 400);
    };

    const handleBookSelect = (book) => {
        setSelectedBook(book);
        setBooksResults([]);
        setSearchQuery(book.title);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBook || !title || !description) return;

        setIsSubmitting(true);

        const newPost = new Post({
            bookId: selectedBook.bookId,
            readerId: JSON.parse(localStorage.getItem("reader"))._id,
            title,
            description,
        });

        console.log("Creating post:", newPost);

        onPostCreated(newPost);
        setTitle("");
        setDescription("");
        setSelectedBook(null);
        setSearchQuery("");
        setIsSubmitting(false);
    };

    return (
        <Card className="p-4 mb-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
                <h5 className="mb-3">Create a New Post</h5>

                <Form.Group controlId="bookSearch" className="mb-3">
                    <Form.Label>Search Book</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type to search for a book..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {booksResults.length > 0 && (
                        <ListGroup className="mt-2">
                            {booksResults.map((book) => (
                                <ListGroup.Item
                                    key={book.bookId}
                                    action
                                    onClick={() => handleBookSelect(book)}
                                    className="d-flex align-items-center"
                                >
                                    <Image
                                        src={book.cover}
                                        rounded
                                        width={40}
                                        height={60}
                                        className="me-3"
                                    />
                                    <div>
                                        <strong>{book.title}</strong>
                                        <div className="text-muted" style={{ fontSize: "12px" }}>
                                            {book.authorName}
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Form.Group>

                {selectedBook && (
                    <div className="d-flex align-items-center mb-3">
                        <Image
                            src={selectedBook.cover}
                            alt={selectedBook.title}
                            width={60}
                            height={90}
                            className="me-3"
                        />
                        <div>
                            <h6 className="mb-1">{selectedBook.title}</h6>
                            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                                {selectedBook.authorName}
                            </p>
                        </div>
                    </div>
                )}

                <Form.Group controlId="postTitle" className="mb-3">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter post title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="postDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="What do you want to say about this book?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" disabled={isSubmitting || !selectedBook || !title || !description}>
                    {isSubmitting ? <Spinner animation="border" size="sm" /> : "Create Post"}
                </Button>
            </Form>
        </Card>
    );
};

export default CreatePost;