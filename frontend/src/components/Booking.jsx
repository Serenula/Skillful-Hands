import React, { useState } from "react";
import styles from "./Booking.module.css";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const Booking = (props) => {
  const [availability, setAvailability] = useState(props.availability);
  const createBooking = useFetch();

  // const {mutate} = useMutation({
  //   mutationFn: async() => await createBooking()
  // })

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
              <div className={styles.date}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="date"
                  id={slot.split("T")[0]}
                  value={slot.split("T")[0]}
                ></input>
                <label htmlFor={slot.split("T")[0]}>{slot.split("T")[0]}</label>
              </div>
            );
          })}
        </div>
        <div>
          <button>Confirm</button>
          <button onClick={props.handleBooking}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
