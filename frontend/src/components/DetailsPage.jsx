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

  console.log("Service ID:", params);

  const { data, isSuccess } = useQuery({
    queryKey: ["Service"],
    queryFn: async () => {
      const serviceLink = "/api/services/" + params.id;
      console.log("Service Link:", serviceLink);
      return await fetchData(serviceLink, "POST");
    },
  });

  const handleBooking = () => {
    setIsBooking(!isBooking);
  };

  return (
    <div className={style2.page}>
      <NavBar />

      {isSuccess && data && (
        <>
          <Link to={"/services"} className={style2.back}>
            Go Back
          </Link>
          <div className={style2.vendor}>
            <div className={style2.aboutUs}>
              <div>
                <h3>About Us</h3>
              </div>
              <div>{data.vendor?.aboutUs}</div>
            </div>

            <div className={style2.booking}>
              <div>
                <h3>{data.vendor?.username}</h3>
              </div>
            </div>
          </div>

          <div className={style2.service}>
            <div>
              <h3>Services</h3>
              <div>{data.name || "No service name available"}</div>
              <div>{data.description || "No description available"}</div>
              <div>
                {data.price !== undefined
                  ? `$${data.price}`
                  : "No price available"}
              </div>
              <h3>Reviews</h3>
              <div>{data.reviews?.comments || "No service name available"}</div>
            </div>
            <div>
              <button className={style2.bookButton} onClick={handleBooking}>
                Book now
              </button>
            </div>
          </div>

          {isBooking && data.vendor && (
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
