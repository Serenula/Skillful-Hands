import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import styles from "./ReviewModal.module.css";

const ReviewModal = ({ serviceId, onclose, onReviewCreated }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const fetchData = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    if (!serviceId) {
      console.error("Service ID is required");
      return;
    }

    try {
      const response = await fetchData(
        "/api/review/create",
        "POST",
        { serviceId, rating, comment },
        token
      );
      console.log("Review created:", response);
      onReviewCreated();
      onclose();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <label htmlFor="rating">Rating:</label>
      <select
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <label htmlFor="comment">Comment:</label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewModal;
