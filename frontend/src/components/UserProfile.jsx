import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./UserProfile.module.css";
import BookingCard from "../components/BookingCard";
import NavBar from "./NavBar";

const UserProfile = () => {
  const userDetails = useFetch();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token); // Decode token once
  const userId = decodedToken.id;
  const [updateInfo, setUpdateInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState("All");
  const [sort, setSort] = useState("ascending");

  // Fetch user data
  const {
    data: userData,
    isSuccess: isUserDataSuccess,
    isFetching: isUserDataFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      console.log("Fetching user data");
      return await userDetails(
        "/api/users/" + userId,
        undefined,
        undefined,
        token
      );
    },
  });

  // Fetch bookings data
  const { data: bookingsData, isSuccess: isBookingSuccess } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      console.log("Fetching bookings data");
      return await userDetails(
        "/api/users/booking/" + userId,
        undefined,
        undefined,
        token
      );
    },
  });

  useEffect(() => {
    if (isUserDataSuccess && userData) {
      setUsername(userData.username);
      setAddress(userData.address);
      setEmail(userData.email);
    }
  }, [userData, isUserDataSuccess]);

  useEffect(() => {
    if (isBookingSuccess && bookingsData) {
      setBookings(bookingsData);
    }
  }, [bookingsData, isBookingSuccess]);

  // Sort bookings based on selected order
  const sorting = (value) => {
    console.log(value);
    setSort(value);
    if (value === "ascending") {
      bookings.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    } else {
      bookings.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }
  };

  //making changes to user's info
  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log(address);
      console.log(username);
      console.log("sending request to change data");
      return await userDetails(
        "/api/users/" + userId,
        "PATCH",
        {
          address,
          username,
          email,
        },
        token
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
      {isUserDataFetching && <p>Loading user data...</p>}
      {isUserDataSuccess && (
        <>
          <NavBar />
          <Link to={"/services"}>Go Back</Link>
          <div className={styles.page}>
            <div className={styles.profile}>
              <div className={styles.user}>
                <h3>{username}</h3>
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
                    <select
                      className={styles.sortBy}
                      onChange={(e) => setFilteredBookings(e.target.value)}
                    >
                      <option value="All">All Bookings</option>
                      <option value="Upcoming">Upcoming Bookings</option>
                      <option value="Completed">Completed Bookings</option>
                    </select>

                    <select
                      className={styles.sortBy}
                      onChange={(e) => sorting(e.target.value)}
                    >
                      <option value="ascending">Ascending Dates</option>
                      <option value="descending">Descending Dates</option>
                    </select>
                  </div>
                  <div className={styles.list}>
                    {bookings.map(
                      (booking) =>
                        booking.status === filteredBookings && (
                          <BookingCard
                            booking={booking}
                            key={booking._id}
                            bookingId={booking._id}
                            accessToken={token}
                            userId={userId}
                            serviceId={booking.service}
                          />
                        )
                    )}
                    {filteredBookings === "All" &&
                      bookings.map((booking) => (
                        <BookingCard
                          booking={booking}
                          key={booking._id}
                          bookingId={booking._id}
                          accessToken={token}
                          userId={userId}
                          serviceId={booking.service}
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
                    </div>
                    <div>
                      <label>Email</label>
                      <div>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label>Address</label>
                      <div>
                        <input
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                        ></input>
                      </div>
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
        </>
      )}
    </>
  );
};

export default UserProfile;
