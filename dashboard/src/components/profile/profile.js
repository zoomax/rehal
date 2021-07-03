import React from "react";
import { Layout } from "../layout/layout";
import { Header } from "./header/header";
import { connect } from "react-redux";
import { getRequest } from "../../utils/http";
import { CITIES, BASE_URL } from "../../utils/endpoints"; 
import { setCities} from "../../redux-store/actions/citiesActions" ; 
import "./profile.css";
class Container extends React.Component {
  componentDidMount() {
    getRequest(`${BASE_URL}${CITIES}`).then((res) => {
      const data = res.data.docs
      console.log(data);
      this.props.setCities(data)
    });
  }
  render() {
    return (
      <div className='profile-border'>
        <Layout>
          <div className='profile'>
            <Header />
          </div>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCities: (payload) => dispatch(setCities(payload)),
  };
};

export const Profile = connect(null, mapDispatchToProps)(Container);
