import React from "react";
import { AddContent } from "./addContent/addContent";
import "./header.css";
import { RemoveContent } from "./removeContent/removeContent";
import { NameContent } from "./removeContent/nameContent/nameContent";
import { ChooseCity } from "./addContent/chooseCity/chooseCity";
import { ModifyContent } from "./modifyContent/modifyContent";
import { ModifyData } from "./modifyContent/modifyData/modifyData";
import ShowAllContent from "./showAllContent/showAllContent";
export class Header extends React.Component {
  state = {
    openName: false,
    city: false,
    openCities: false,
    selectTitle: "Choose City",
    enableBtn: false,
    title: "city",
    modify: false,
    cityId: "",
  };
  nameClicked = () => {
    this.setState({ openName: true });
  };
  cityClicked = () => {
    this.setState({ city: true });
  };
  openOption = () => {
    this.setState({ openCities: true });
  };
  liVal = (e) => {
    this.setState({
      openCities: false,
      selectTitle: e.target.className,
      enableBtn: true,
      cityId: e.target.getAttribute("name"),
    });
  };
  componentDidMount() {
    const accordions = document.querySelectorAll(".profile-header");
    for (const accordion of accordions) {
      const panels = accordion.querySelectorAll(".all");
      for (const panel of panels) {
        const head = panel.querySelector(".btns");
        head.addEventListener("click", () => {
          for (const otherPanel of panels) {
            if (otherPanel !== panel) {
              otherPanel.classList.remove("accordion-expanded");
              this.setState({ openName: false, title: "City", modify: false });
            }
          }
          panel.classList.toggle("accordion-expanded");
        });
      }
    }
  }
  clickOutside = (e) => {
    var cities = document.getElementById("cities");
    if (!cities.contains(e.target) && e.target.id !== "cityOption") {
      this.setState({
        city: false,
        openCities: false,
        enableBtn: false,
        selectTitle: "Choose City",
      });
    }
  };
  OutsideCities = (e) => {
    var cityOption = document.getElementById("cityOption");
    if (!cityOption.contains(e.target)) {
      this.setState({
        city: false,
        openCities: false,
        enableBtn: false,
        selectTitle: "Choose City",
      });
    }
  };
  doneClicked = (cityId) => {
    var xx = document.getElementById("city").innerText;
    this.setState({
      title: xx,
      city: false,
      openCities: false,
      enableBtn: false,
      selectTitle: "Choose City",
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: this.state.selectTitle }),
    };
    fetch(
      "https://reqres.in/api/postshttps://rehalapp2021.herokuapp.com/cities/" +
        cityId,
      requestOptions,
    ).then((response) => response.json());
  };
  modifyClicked = () => {
    this.setState({ modify: true });
  };
  render() {
    return (
      <div className='profile-header'>
        <div className='all'>
          <div className='btns'>
            Add <i className='fa fa-chevron-down'></i>
          </div>{" "}
          <div className='content'>
            {" "}
            <AddContent
              cityClicked={this.cityClicked}
              selectTitle={this.state.selectTitle}
              title={this.state.title}
              cities={[]}
              services={[]}
            />
          </div>
        </div>
        <div className='all'>
          <div className='btns'>
            Remove <i className='fa fa-chevron-down'></i>
          </div>{" "}
          <div className='content'>
            {" "}
            <RemoveContent
              nameClicked={this.nameClicked}
              openName={this.state.openName}
            />
            {this.state.openName && <NameContent />}
          </div>
        </div>
        {/* <div className='all'>
          <div className='btns'>
            Add Service <i className='fa fa-chevron-down'></i>
          </div>{" "}
          <div className='content'>
            {" "}
            <AddService
              nameClicked={this.nameClicked}
              openName={this.state.openName}
            />
            {this.state.openName && <NameContent />}
          </div>
        </div> */}
        <div className='all' id='modify'>
          <div className='btns'>
            Modify <i className='fa fa-chevron-down'></i>
          </div>{" "}
          <div className='content'>
            {" "}
            <ModifyContent
              modifyClicked={this.modifyClicked}
              modify={this.state.modify}
            />
            {this.state.modify && <ModifyData />}
          </div>
        </div>
        <div className='all'>
          <div className='btns'>
            Show All <i className='fa fa-chevron-down'></i>
          </div>{" "}
          <div className='content'>
            {" "}
            <ShowAllContent />
          </div>
        </div>
        <ChooseCity
          city={this.state.city}
          clickOutside={this.clickOutside}
          openOption={this.openOption}
          openCities={this.state.openCities}
          OutsideCities={this.OutsideCities}
          liVal={this.liVal}
          selectTitle={this.state.selectTitle}
          enableBtn={this.state.enableBtn}
          doneClicked={this.doneClicked}
          cityId={this.state.cityId}
        />
      </div>
    );
  }
}
