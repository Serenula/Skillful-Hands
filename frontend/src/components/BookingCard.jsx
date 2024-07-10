import React, { useState } from "react";
import styles from "./BookingCard.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const BookingCard = (props) => {
  const cancelBooking = useFetch();
  const queryClient = useQueryClient();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const token = localStorage.getItem("accessToken");

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

  return (
    <>
      {!confirmCancel && (
        <div className={styles.card}>
          <div className={styles.title}>{props.booking.title}</div>
          <div>{props.booking.category}</div>
          <div>{props.booking.description}</div>
          <div>{props.booking.date.split("T")[0]}</div>
          <div>{props.booking.vendor}</div>
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
    </>
  );
};

export default BookingCard;
