import React, { useState } from "react";
import styles from "./Booking.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";

const Booking = (props) => {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const [availability, setAvailability] = useState(props.availability);
  const createBooking = useFetch();
  const [date, setDate] = useState("");
  const queryClient = useQueryClient();
  const [active, setActive] = useState(null);

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
          service: props.serviceId,
        },
        token
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["booking"]);
      props.handleBooking();
    },
  });

  const handleDivClick = (slot) => setActive(slot);

  return (
    <div className={styles.backdrop}>
      <div className={styles.booking}>
        <div className={styles.slots}>
          <label htmlFor="date">
            <b>Select a date</b>
          </label>

          {availability.map((slot) => {
            return (
              <>
                <div
                  onClick={() => handleDivClick(slot)}
                  className={active === slot ? styles.active : styles.date}
                >
                  <input
                    className={styles.radio}
                    type="radio"
                    name="date"
                    id={slot.split("T")[0]}
                    value={slot.split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                  ></input>
                  <label htmlFor={slot.split("T")[0]}>
                    {slot.split("T")[0]}
                  </label>
                </div>
              </>
            );
          })}
        </div>

        <div>
          <button className={styles.btn} onClick={mutate}>
            Confirm
          </button>
          <button className={styles.btn} onClick={props.handleBooking}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
