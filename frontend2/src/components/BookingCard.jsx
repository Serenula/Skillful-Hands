import React from "react";
import styles from "./BookingCard.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const BookingCard = (props) => {
  const cancelBooking = useFetch();
  const queryClient = useQueryClient();

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
    },
  });

  return (
    <div className={styles.card}>
      <div className={styles.title}>{props.booking.title}</div>
      <div>{props.booking.category}</div>
      <div>{props.booking.description}</div>
      <div>{props.booking.date}</div>
      <div>{props.booking.time}</div>
      <div>{props.booking.vendor}</div>
      <div>
        <b>Booking Id: </b>
        {props.bookingId}
      </div>
      <div>
        <b>Total Paid:</b> ${props.booking.price}
      </div>
      <button onClick={mutate}>Cancel Booking</button>
    </div>
  );
};

export default BookingCard;
