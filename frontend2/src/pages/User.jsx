import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./User.module.css";
import BookingCard from "../components/BookingCard";

const User = (props) => {
  const userDetails = useFetch();
  const queryClient = useQueryClient();
  const [updateInfo, setUpdateInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [bookings, setBookings] = useState([]);

  //fetch user data
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      console.log("fetching data");
      return await userDetails(
        "/api/users/" + props.userId,
        undefined,
        undefined,
        props.accessToken
      );
    },
  });

  //render the user info when data is fetched.
  useEffect(() => {
    console.log("no data yet");
    if (data) {
      console.log("have data - reset states");
      setUsername(data.username);
      setAddress(data.address);
      setBookings(data.bookings);
      setEmail(data.email);
      console.log(props.accessToken);
      console.log(props.userId);
    }
  }, [data]);

  //making changes to user's info
  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log(address);
      console.log(username);
      console.log("sending request to change data");
      return await userDetails(
        "/api/users/" + props.userId,
        "PATCH",
        {
          address,
          username,
          email,
        },
        props.accessToken
      );
    },
    onSuccess: () => {
      console.log("successful sending change request");
      queryClient.invalidateQueries(["user"]);
      console.log("data should be changed");
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
                    <BookingCard
                      booking={booking}
                      key={booking._id}
                      bookingId={booking._id}
                      accessToken={props.accessToken}
                      userId={props.userId}
                    />
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
                    <div>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      ></input>
                    </div>
                    {/* <div>{data.email}</div> */}
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
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
