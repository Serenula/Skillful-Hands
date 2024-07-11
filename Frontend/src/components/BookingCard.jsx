import React, { useState } from "react";
import styles from "./BookingCard.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const BookingCard = (props) => {
  const cancelBooking = useFetch();
  const queryClient = useQueryClient();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const token = localStorage.getItem("accessToken");
  const [reviewModal, setReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await cancelBooking(
        "/api/users/booking/" + props.bookingId,
        "DELETE",
        { id: props.userId },
        token
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["booking"]);
      setConfirmCancel(false);
    },
  });

  const { mutate: submitReview } = useMutation({
    mutationFn: async () => {
      return await cancelBooking(
        "/api/review/create",
        "POST",
        {
          serviceId: props.booking.serviceId,
          userId: props.userId,
          rating,
          comment,
        },
        token
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["service", props.booking.serviceId]);
      setReviewModal(false);
    },
  });

  return (
    <>
      {!confirmCancel && (
        <div className={styles.card}>
          <div className={styles.title}>{props.booking.title}</div>
          <div>{props.booking.category}</div>
          <div>{props.booking.description}</div>
          <div>{props.booking.date.split("T")[0]}</div>
          <div>{props.booking.vendor}</div>
          <div>{props.booking.serviceId}</div>
          <div>
            <b>Booking Id: </b>
            {props.bookingId}
          </div>
          <div>
            <b>Total Paid: </b> ${props.booking.price}
          </div>
          <div>
            <b>Status: </b>
            {props.booking.status}
          </div>

          <button onClick={() => setConfirmCancel(true)}>Cancel Booking</button>
          {/* <button onClick={() => setReviewModal(true)}>Write Review</button> */}
        </div>
      )}

      {confirmCancel && (
        <div className={styles.cancelCard}>
          <div>
            <div>Are you sure you want to cancel?</div>
            <div>
              Once cancelled, it is non-reversible. No refunds will be made.
            </div>
            <div>
              <button onClick={mutate}>Confirm</button>
              <button onClick={() => setConfirmCancel(false)}>Back</button>
            </div>
          </div>
        </div>
      )}

      {reviewModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Write a Review</h2>
            <div>
              <label>Rating: </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={0}>Select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div>
              <label>Comment: </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button onClick={submitReview}>Submit Review</button>
              <button onClick={() => setReviewModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingCard;
