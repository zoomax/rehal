import React, { useEffect } from "react";
import { Layout } from "../layout/layout";
import { Header } from "./header/header";
import { connect } from "react-redux";
import { getRequest } from "../../utils/http";
import { CITIES, BASE_URL } from "../../utils/endpoints";
import { setCities } from "../../redux-store/actions/citiesActions";
import "./city.css";
const Container = ({ setCities }) => {
  useEffect(() => {
    getRequest(`${BASE_URL}${CITIES}`).then((res) => {
      const data = res.data.docs;
      console.log(data);
      setCities(data);
    });
  });

  return (
    <div className='city-border'>
      <Layout>
        <div className='city'>
          <Header />
        </div>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCities: (payload) => dispatch(setCities(payload)),
  };
};

export const City = connect(null, mapDispatchToProps)(Container);
