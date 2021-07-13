import React, { useEffect } from "react";
import { Layout } from "../layout/layout";
import { Header } from "./header/header";
import { connect } from "react-redux";
import { getRequest } from "../../utils/http";
import { CITIES, BASE_URL } from "../../utils/endpoints";
import { setCities } from "../../redux-store/actions/citiesActions";
import "./service.css";
const Container = ({ setCities }) => {
  useEffect(() => {
    getRequest(`${BASE_URL}${CITIES}`).then((res) => {
      const data = res.data;
      console.log(data);
      setCities(data);
    });
  });

  return (
    <div className='service-border'>
      <Layout>
        <div className='service'>
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

export const Service = connect(null, mapDispatchToProps)(Container);
