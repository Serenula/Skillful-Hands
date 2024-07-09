import React, { useState } from "react";
import styles from "./BookingCard.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import ReviewModal from "./ReviewModal";
import { useParams } from "react-router-dom";

const BookingCard = (props) => {
  const cancelBooking = useFetch();
  const queryClient = useQueryClient();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const params = useParams();

  const {} = useQuery({
    queryKey: ["Service"],
    queryFn: async () => {
      const serviceLink = "/api/services/" + params.id;
      console.log("Service Link:", serviceLink);
      return await fetchData(serviceLink, "POST");
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await cancelBooking(
        "/api/users/booking/" + props.bookingId,
        "DELETE",
        { id: props.userId },
        props.accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["booking"]);
      setConfirmCancel(false);
    },
  });

  const handleReviewClick = () => {
    setReviewModal(true);
  };

  const handleReviewSubmit = () => {
    setReviewModal(false);
    queryClient.invalidateQueries(["services"]);
  };

  return (
    <>
      {!confirmCancel && (
        <div className={styles.card}>
          <div className={styles.title}>{props.booking.title}</div>
          <div>{props.booking.category}</div>
          <div>{props.booking.description}</div>
          <div>{props.booking.date.split("T")[0]}</div>
          {/* <div>{props.booking.time}</div> */}
          <div>{props.booking.vendor}</div>
          <div>
            <b>Booking Id: </b>
            {props.bookingId}
          </div>
          <div>
            <b>Total Paid:</b> ${props.booking.price}
          </div>
          {/* <button onClick={mutate}>Cancel Booking</button> */}
          <button onClick={() => setConfirmCancel(true)}>Cancel Booking</button>
          <button onClick={handleReviewClick}>Write Review</button>
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
              <button onClick={() => setConfirmCancel(false)}>back</button>
            </div>
          </div>
        </div>
      )}

      {reviewModal && (
        <ReviewModal
          id={params.id}
          userId={props.userId}
          accessToken={props.accessToken}
          onClose={() => setReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
};

export default BookingCard;
