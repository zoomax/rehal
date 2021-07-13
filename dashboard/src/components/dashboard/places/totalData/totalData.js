import React from "react";
import { Button } from "../../../elements/button/button";
// import { Header } from "../../../profile/header/header";
import { withRouter } from "react-router";
import "./totalData.css";
class TotalData extends React.Component {
  state = {
    data: [
      { names: "Visitors", value: "7,771" },
      { names: "Raters", value: "7,771" },
      { names: "Booking", value: "7,771" },
    ],
  };
  edit = () => {
    this.props.history.push("/profile");
    // var x = document.getElementById("modify");
    // x.classList.add("accordion-expanded");
  };
  render() {
    let { data } = this.state;
    return (
      <div className='total-data'>
        <div className='container'>
          <div className='row'>
            {data.map((data, id) => {
              return (
                <div className='col-md-4 col-3' key={id}>
                  <h5>{data.names}</h5>
                  <p>{data.value}</p>
                  <div className='border-bottom'></div>
                </div>
              );
            })}
          </div>
          <div className='row'>
            <Button onClick={this.edit}>
              Edit <i className='fa fa-cog'></i>
            </Button>
            <Button>
              Pop Up <i className='fa fa-arrow-up'></i>
            </Button>
          </div>
        </div>
        {/* <Header />s */}
      </div>
    );
  }
}
export default withRouter(TotalData);
