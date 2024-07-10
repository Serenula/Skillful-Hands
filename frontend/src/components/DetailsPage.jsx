import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import style2 from "./DetailsPage.module.css";
import Booking from "./Booking";
import NavBar from "./NavBar";

const DetailsPage = () => {
  const fetchData = useFetch();
  const params = useParams();
  const [isBooking, setIsBooking] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["details"],
    queryFn: async () => await fetchData("/api/services/" + params.id),
  });

  const handleBooking = () => {
    setIsBooking(!isBooking);
  };

  return (
    <div className={style2.page}>
      <NavBar />

      {isSuccess && (
        <>
          <Link to={"/services"} className={style2.back}>
            Go Back
          </Link>
          <div className={style2.vendor}>
            <div className={style2.aboutUs}>
              <div>
                <h3>About Us</h3>
              </div>
              <div>
                {/* to be replaced with a vendor description */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>

            <div className={style2.booking}>
              <div>
                <h3>{data.vendor.username}</h3>
              </div>
            </div>
          </div>

          <div className={style2.service}>
            <div>
              <h3>Services</h3>
              <div>{data.name}</div>
              <div>{data.description}</div>
              <div>${data.price}</div>
            </div>
            <div>
              <button className={style2.bookButton} onClick={handleBooking}>
                Book now
              </button>
            </div>
          </div>

          {isBooking && (
            <Booking
              id={params.id}
              handleBooking={handleBooking}
              availability={data.availability}
              title={data.name}
              vendor={data.vendor.username}
              price={data.price}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DetailsPage;
