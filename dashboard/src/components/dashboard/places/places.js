import React, { useEffect, useState } from "react";
import { Layout } from "../../layout/layout";
import imgIcon from "../../../assets/images/x.svg";
import TotalData from "./totalData/totalData";
import { RightInfo } from "./rightInfo/rightInfo";
import { Chart } from "./chart/chart";
// import  {CITIES} from "../../../utils/endpoints" ;
import "./places.css";
import { BASE_URL, CITIES, PLACES, SERVICES } from "../../../utils/endpoints";
import { getRequest } from "../../../utils/http";
import { connect } from "react-redux";
const Container = ({ storeCities, storeServices }) => {
  const none = {
    rating: "",
    lat: "",
    lng: "",
    address: "",
    name: "",
    service: "",
    image: "",
    allRates: [],
    reviews: 0,
  };
  const [cities, setCities] = useState(storeCities);
  const [services, setServices] = useState(storeCities);
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState(none);

  useEffect(() => {
    setCities(storeCities);
    if (storeCities && storeCities.length === 0) {
      getRequest(`${BASE_URL}${CITIES}`).then((res) => {
        const data = res.data;

        setCities(data);
      });
    }
  }, [storeCities]);
  useEffect(() => {
    setServices(storeServices);
    if (storeServices && storeServices.length === 0) {
      getRequest(`${BASE_URL}${SERVICES}`).then((res) => {
        const data = res.data;

        setServices(data);
      });
    }
  }, [storeServices]);
  const getPlaces = (id) => {
    setPlace(none);
    getRequest(`${BASE_URL}${PLACES}/cities/${id}`)
      .then((res) => {
        console.log(res.data);
        setPlaces(res.data);
      })
      .catch((error) => console.log(error));
  };
  const getPlaceInfo = (id) => {
    const info = places.find((place) => {
      return place.id === id;
    });
    if (info) {
      const newData = {
        rating: info.rating ? +info.rating.toFixed(5) : "",
        lat:
          info.location && info.location.coordinates
            ? info.location.coordinates[1]
            : "",
        lng:
          info.location && info.location.coordinates
            ? info.location.coordinates[0]
            : "",
        address: info.address ? info.address : "",
        name: info.name ? info.name : "",
        service: info.service ? info.service : "",
        image: info.image ? info.image : "",
        allRates: info.allRates ? info.allRates : [],
        city: info.city ? info.city : "",
        reviews: info.reviews ? info.reviews : 0,
      };
      setPlace(newData);
    } else {
      setPlace(none);
    }
  };
  return (
    <div className='places-border'>
      <Layout>
        <div className='places'>
          <div className='select-type'>
            <p> City:</p>
            <select
              onChange={(e) => {
                getPlaces(e.target.value);
              }}
              className='form-select'>
              <option value=''>select City Please ....</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className='select-type'>
            <p> Places:</p>
            <select
              onChange={(e) => {
                getPlaceInfo(e.target.value);
              }}
              className='form-select'>
              <option value=''>select Place Please ....</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>
          <div className='row'>
            <div className='col-md-3 col-sm-3'>
              <div className='img'>
                <img src={place.image ? place.image : imgIcon} alt='icon' />
              </div>
            </div>
            <div className='col-md-6 col-sm-6'>
              <TotalData place={place ? place : none} />
            </div>
            <div className='col-md-3 col-sm-3'>
              <RightInfo
                place={place ? place : none}
                cities={cities}
                services={services}
              />
            </div>
          </div>
          <Chart place={place ? place : none} />
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = ({ cities, services }) => {
  return {
    storeCities: cities,
    storeServices: services,
  };
};
export const Places = connect(mapStateToProps)(Container);
