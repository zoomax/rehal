import React from "react";
import { Layout } from "../../layout/layout";
import img from "../../../assets/images/x.svg";
import "./all.css";
import { withRouter } from "react-router";
class All extends React.Component {
  state = {
    data: [
      {
        img: img,
        name: "place name",
        city: "city",
        serviceType: "service type",
        rate: 3.5,
        des: "descriptions sdkjaskdj asldkj",
      },
      {
        img: img,
        name: "place name",
        city: "city",
        serviceType: "service type",
        rate: 3.5,
        des: "descriptions sdkjaskdj asldkj",
      },
      {
        img: img,
        name: "place name",
        city: "city",
        serviceType: "service type",
        rate: 3.5,
        des: "descriptions sdkjaskdj asldkj",
      },
      {
        img: img,
        name: "place name",
        city: "city",
        serviceType: "service type",
        rate: 3.5,
        des: "descriptions sdkjaskdj asldkj",
      },
      {
        img: img,
        name: "place name",
        city: "city",
        serviceType: "service type",
        rate: 3.5,
        des: "descriptions sdkjaskdj asldkj",
      },
      {
        img: img,
        name: "place name",
        city: "city",
        serviceType: "service type",
        rate: 3.5,
        des: "descriptions sdkjaskdj asldkj",
      },
      {
        img: img,
        name: "place name",
        city: "city",
        serviceType: "service type",
        rate: 3.5,
        des: "descriptions sdkjaskdj asldkj",
      },
    ],
  };
  redirect = () => {
    this.props.history.push("/profile");
  };
  render() {
    let { data } = this.state;
    return (
      <div className="all-border">
        <Layout>
          <div className="alls">
            <div className="btns" onClick={this.redirect}>
              Show All <i className="fa fa-chevron-down"></i>
            </div>
            <div className="container all-data">
              <div className="row">
                {data.map((data, id) => {
                  return (
                    <div className="col-md-4 col-sm-6 col-12" key={id}>
                      <div className="row">
                        <div className="img">
                          <img src={data.img} alt="img" />
                        </div>
                        <div className="data-content">
                          <div className="row1">
                            <h5>{data.name}</h5>
                            <img src={img} alt="im" />
                          </div>
                          <div className="row2">
                            <p>{data.city}</p>
                            <p>{data.serviceType}</p>
                            <i className="fa fa-star"></i>
                            <p>{data.rate}</p>
                          </div>
                          <div className="row3">
                            <p>{data.des}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
export default withRouter(All);
