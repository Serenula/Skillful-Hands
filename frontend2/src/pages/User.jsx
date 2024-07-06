import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./User.module.css";
import BookingCard from "../components/BookingCard";

const User = (props) => {
  const userDetails = useFetch();
  const [updateInfo, setUpdateInfo] = useState(false);
  const queryClient = useQueryClient();
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [bookings, setBookings] = useState([]);

  //fetch user data
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await userDetails(
        "/api/users/" + props.id,
        undefined,
        undefined,
        props.accessToken
      );
    },
  });

  //render the user info when data is fetched.
  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setAddress(data.address);
      setBookings(data.bookings);
    }
  }, [data]);

  //making changes to user's info
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await userDetails("/api/users/" + props.id, "PATCH", {
        address,
        username,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      alert("changes successful");
    },
  });

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {isSuccess && (
        <div className={styles.page}>
          <div className={styles.profile}>
            <div className={styles.user}>
              <h3>{data.username}</h3>
              <button
                onClick={() => {
                  setUpdateInfo(!updateInfo);
                }}
              >
                Update personal info
              </button>
            </div>
            <div></div>
          </div>

          <div className={styles.rightColumn}>
            {!updateInfo && (
              <div>
                <div className={styles.dropdown}>
                  <div>My Bookings</div>
                </div>
                <div className={styles.list}>
                  {bookings.map((booking) => (
                    <BookingCard booking={booking} />
                  ))}
                </div>
              </div>
            )}

            {updateInfo && (
              <div>
                <div className={styles.dropdown}>
                  <div>Personal info</div>
                </div>
                <div className={styles.info}>
                  <label>User Id</label>
                  <div>{data._id}</div>
                </div>
                <div>
                  <label>Username</label>
                  <div>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    ></input>
                  </div>
                  {/* <div>{data.username}</div> */}
                </div>
                <div>
                  <label>Email</label>
                  <div>{data.email}</div>
                </div>
                <div>
                  <label>Address</label>
                  <div>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    ></input>
                  </div>
                  {/* <div>{data.address}</div> */}
                </div>
                <div>
                  <button onClick={mutate}>Save</button>
                  <button
                    onClick={() => {
                      setUpdateInfo(!updateInfo);
                      setUsername(data.username);
                      setAddress(data.address);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
