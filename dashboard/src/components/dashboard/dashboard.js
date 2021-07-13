import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../layout/layout";
import "./dashboard.css";
import Header from "./header/header";
import { Body } from "./body/body";
import { setCities } from "../../redux-store/actions/citiesActions";
import { setServices } from "../../redux-store/actions/servicesActions";
import { connect } from "react-redux";
import { getRequest } from "../../utils/http";
import { BASE_URL, CITIES, PLACES, SERVICES } from "../../utils/endpoints";
import { getObjFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
export const Container = ({
  storeCities,
  storeServices,
  setStoreCities,
  setStoreServices,
}) => {
  const user = getObjFromLocalStorage("user");

  const options = useMemo(() => {
    return {
      headers: {
        "auth-token": user.token,
      },
    };
  }, [user.token]);
  const [places, setPlaces] = useState([]);
  const [city, setCity] = useState("");
  const [id, setId] = useState("total");
  const openDiv = (id) => {
    setId(id);
  };
  // getCities
  useEffect(() => {
    const url = `${BASE_URL}${CITIES}`;
    if (storeCities.length === 0) {
      getRequest(url, options)
        .then((res) => {
          const data = res.data;
          setStoreCities(data);
          toast.success("Cities has been updated successfully ");
        })
        .catch((e) => {
          // failure
          toast.error(e.response);
        });
    }
  }, [setStoreCities, storeCities, options]);
  // getPlaces
  useEffect(() => {
    const url = `${BASE_URL}${PLACES}cities/${city}`;
    getRequest(url, options)
      .then((res) => {
        const data = res.data;
        setPlaces(data);
        console.log("dashboard places", data);
        toast.success("Places has been fetched successfully ");
      })
      .catch((e) => {
        // failure
        toast.error(e.response);
      });
  }, [city, options]);
  // getServices
  useEffect(() => {
    const url = `${BASE_URL}${SERVICES}`;
    if (storeServices && storeServices.length === 0) {
      getRequest(url, options)
        .then((res) => {
          const data = res.data;
          setStoreServices(data);
          toast.success("Services has been fetched successfully ");
        })
        .catch((e) => {
          // failure
          toast.error(e.response);
        });
    }
  }, [options, storeServices, setStoreServices]);

  const onCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
  };
  // get all info
  //comments , rates ,places as objects , notificatiob

  return (
    <div className='dashboard-border'>
      <Layout>
        <div className='dashboard'>
          <div className='select-type'>
            <p> City:</p>
            <select
              className='form-select'
              onChange={(e) => {
                onCityChange(e);
              }}>
              <option value=''>select a City...</option>
              {storeCities.map((city, index) => {
                return (
                  <option key={index} value={city.id}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
          <Header
            openDiv={(id) => openDiv(id)}
            getTotalRates={getTotalRates}
            places={places}
            services={storeServices}
          />
          <Body
            getTotalRates={getTotalRates}
            id={id}
            places={places}
            services={storeServices}
          />
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = ({ cities, services }) => {
  return {
    storeServices: services,
    storeCities: cities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStoreCities: (payload) => dispatch(setCities(payload)),
    setStoreServices: (payload) => dispatch(setServices(payload)),
  };
};
export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

function getTotalRates(serviceId, places) {
  let total = [];
  let reviews = 0;
  let serviceProviders = places;
  if (serviceId !== "total")
    serviceProviders = places.filter(
      (place) => place.service.toString() === serviceId.toString(),
    );
  serviceProviders.forEach((provider) => {
    if (provider.allRates) total = [...total, ...provider.allRates];
    if (provider.reviews) reviews += provider.reviews;
  });
  const allRates = total.map((rate) => (rate.rating ? rate.rating : 0));
  return {
    totalRates: total.length,
    maxRate: total.length !== 0 ? Math.max(...allRates) : 0,
    minRate: total.length !== 0 ? Math.min(...allRates) : 0,
    avgRate:
      total.length !== 0
        ? allRates.reduce((acc = 0, rate) => (acc += rate)) / allRates.length
        : 0,
    reviews,
  };
}
export function getAllNotifications(options) {
  const url = `${BASE_URL}notifications/All`;
  getRequest(url, options)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
}
export function getAllComments(options) {
  const url = `${BASE_URL}comments/All`;
  getRequest(url, options)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
}
export function getAllRates(options) {
  const url = `${BASE_URL}rates/All`;
  getRequest(url, options)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
}
export function getAllPlaces(options) {
  const url = `${BASE_URL}places/All`;
  getRequest(url, options)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
}
