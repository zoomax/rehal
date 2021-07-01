import React from "react";
import { Button } from "../../../../elements/button/button";
import "./chooseCity.css";
import axios from "axios";
export class ChooseCity extends React.Component {
  state = {
    docs: [],
  };
  componentDidMount() {
    axios.get("https://rehalapp2021.herokuapp.com/cities").then((resp) => {
      this.setState({ docs: resp.data.docs });
    });
  }
  render() {
    let { docs } = this.state;
    return (
      <div
        className="choose-city"
        id={this.props.city ? "showOption" : "hideOption"}
        onClick={this.props.clickOutside}
      >
        <div className="cities" id="cities">
          <div className="select" onClick={this.props.openOption}>
            <p id="city">{this.props.selectTitle}</p>
          </div>
          {this.props.enableBtn && (
            <Button
              onClick={() => {
                return this.props.doneClicked(this.props.cityId);
              }}
            >
              Done
            </Button>
          )}
        </div>{" "}
        <div
          onClick={this.props.OutsideCities}
          className="op"
          id={this.props.openCities ? "op" : ""}
        >
          <ul
            className={this.props.openCities ? "showData" : "hideData"}
            id="cityOption"
          >
            {docs.map((doc, id) => {
              return (
                <li
                  key={id}
                  id="cityOption"
                  className={doc.name}
                  onClick={this.props.liVal}
                  name={doc.id}
                >
                  {doc.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
