import React, { useEffect, useState } from "react";
import { Layout } from "../../layout/layout";
import { RatingChart } from "./ratingChart/ratingChart";
import { Total } from "./total/total";
import "./rating.css";
import { connect } from "react-redux";
import { getRequest } from "../../../utils/http";
import { BASE_URL, PLACE_RATES } from "../../../utils/endpoints";
import { useParams, useHistory } from "react-router";
import { getObjFromLocalStorage } from "../../../utils/localStorage";
export const Container = () => {
  const user = getObjFromLocalStorage("user");
  const [placeRates, setPlaceRates] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    getRequest(`${BASE_URL}${PLACE_RATES(id)}`, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        const docs = res.data.docs;
        console.log(docs);
        // returns empty array whether place is not exist or  place has no ratings yet
        setPlaceRates(docs);
      })
      .catch((error) => {
        console.log(error);
        history.push("/profile/all");
      });
  }, [id, history]);
  return (
    <div className='rating-border'>
      <Layout>
        <div className='rating'>
          {/* <div className='select-type'>
            <p> City:</p>
            <select className='form-select'>
              <option value=''>select a service...</option>
              <option value='all'>All</option>

              {cities.map((city, index) => {
                return (
                  <option key={index} value={city.id}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='select-type'>
            <p> Service:</p>
            <select className='form-select'>
              <option value=''>select a service...</option>
              <option value='all'>All</option>

              {services.map((service, index) => {
                return (
                  <option key={index} value={service.id}>
                    {service.name}
                  </option>
                );
              })}
            </select>
          </div> */}
          <Total docs={placeRates} />
          <RatingChart docs={placeRates} />
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = ({ cities, services }) => {
  return {
    cities,
    services,
  };
};

export const Rating = connect(mapStateToProps)(Container);
