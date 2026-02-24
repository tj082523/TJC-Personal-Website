import { useEffect, useState } from "react";
import axios from "axios";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get("http://localhost:3000/guestbook");
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/guestbook", {
      name,
      message,
    });
    setName("");
    setMessage("");
    fetchComments();
  };

  return (
    <div className="container">
      <h1>Guestbook</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="card">
            <h3>{comment.name}</h3>
            <p>{comment.message}</p>
            <small>
              {new Date(comment.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}