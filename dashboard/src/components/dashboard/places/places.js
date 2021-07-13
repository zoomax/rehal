import React, { useEffect, useState } from "react";
import { Layout } from "../../layout/layout";
import imgIcon from "../../../assets/images/x.svg";
import TotalData from "./totalData/totalData";
import { RightInfo } from "./rightInfo/rightInfo";
import { Chart } from "./chart/chart";

import { getRequest } from "../../../utils/http";
import { BASE_URL, CITIES, PLACES } from "../../../utils/endpoints";
import { connect } from "react-redux";
import { setPlaces } from "../../../redux-store/actions/placesActions";
import "./places.css";

const Places = ({ storeCities }) => {
  const [cities, setCities] = useState(storeCities);
  const [show, setShow] = useState(false);
  let [places, setplace] = useState([]);
  let [placeData, setplaceData] = useState([]);

  useEffect(() => {
    if (storeCities.length === 0) {
      getRequest(`${BASE_URL}${CITIES}`).then((res) => {
        const data = res.data;
        setCities(data);
      });
    }
  }, [storeCities.length]);
  const getPlaces = (id) => {
    setShow(true);
    getRequest(`${BASE_URL}${PLACES}cities/${id}`).then((res) => {
      setplace(res.data);
    });
  };

  const shown = (id) => {
    getRequest(`${BASE_URL}${PLACES}${id}`).then((res) => {
      setplaceData(res.data);
    });
  };
  return (
    <div className="places-border">
      <Layout>
        <div className="places">
          <div className="select-type">
            <p> type:</p>
            <select
              type="text"
              name="city "
              placeholder="select City"
              onChange={(e) => {
                getPlaces(e.target.value);
              }}
            >
              <option value="">Select City....</option>
              {cities.map((city, index) => {
                return (
                  <option value={city.id} key={index}>
                    {city.name}
                  </option>
                );
              })}
            </select>
            {show && (
              <select
                type="text"
                name="place "
                placeholder="select place"
                onChange={(e) => {
                  // getPlaces(e.target.value);
                  // console.log(e.target.value);
                  shown(e.target.value);
                }}
              >
                <option value="">Select City....</option>
                {places.map((place, index) => {
                  return (
                    <option value={place.id} id={place.id}>
                      {place.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-3">
              <div className="img">
                <img src={imgIcon} alt="icon" />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <TotalData />;
            </div>
            <div className="col-md-3 col-sm-3">
              <RightInfo placeData={placeData} />
            </div>
          </div>
          <Chart placeData={placeData} />
        </div>
      </Layout>
    </div>
  );
};
const mapStateToProps = ({ cities }) => {
  return {
    storeCities: cities,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    setPlaces: (payload) => dispatch(setPlaces(payload)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Places);
