import React, { useState } from "react";
import styles from "./Booking.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";

const Booking = (props) => {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token); // Decode token once
  const userId = decodedToken.id;
  const [availability, setAvailability] = useState(props.availability);
  const createBooking = useFetch();
  const [date, setDate] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await createBooking(
        "/api/users/booking/" + userId,
        "PUT",
        {
          title: props.title,
          vendor: props.vendor,
          price: props.price,
          date,
          user: userId,
        },
        token
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["booking"]);
      props.handleBooking();
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.booking}>
        <div className={styles.slots}>
          <label htmlFor="date">
            <b>Select a date</b>
          </label>
          {/* <input id="date" type="date"></input> */}
          {availability.map((slot) => {
            return (
              <button className={styles.date}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="date"
                  id={slot.split("T")[0]}
                  value={slot.split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                ></input>
                <label htmlFor={slot.split("T")[0]}>{slot.split("T")[0]}</label>
              </button>
            );
          })}
        </div>
        <div>
          <button onClick={mutate}>Confirm</button>
          <button onClick={props.handleBooking}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
