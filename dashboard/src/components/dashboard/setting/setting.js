import React from "react";
import { Layout } from "../../layout/layout";
import { AboutContent } from "./aboutContent/aboutContent";
import { Contact } from "./contact/contact";
import { FaqContent } from "./faqContent/faqContent";
import { Password } from "./password/password";
import "./setting.css";
export class Setting extends React.Component {
  componentDidMount() {
    const accordions = document.querySelectorAll(".setting");
    for (const accordion of accordions) {
      const panels = accordion.querySelectorAll(".all-settings");
      for (const panel of panels) {
        const head = panel.querySelector(".btns");
        head.addEventListener("click", () => {
          for (const otherPanel of panels) {
            if (otherPanel !== panel) {
              otherPanel.classList.remove("accordion-expanded");
            }
          }
          panel.classList.toggle("accordion-expanded");
        });
      }
    }
  }
  render() {
    return (
      <div className='setting-border'>
        <Layout>
          <div className='setting'>
            <div className='all-settings'>
              <div className='btns'>
                Account Settings <i className='fa fa-chevron-down'></i>
              </div>
              <div className='content'>
                <Contact />
              </div>
            </div>
            <div className='all-settings'>
              <div className='btns'>
               Password Change <i className='fa fa-chevron-down'></i>
              </div>
              <div className='content'>
                <Password />
              </div>
            </div>
            <div className='all-settings'>
              <div className='btns'>
                About Us <i className='fa fa-chevron-down'></i>
              </div>
              <div className='content'>
                <AboutContent />
              </div>
            </div>
            <div className='all-settings'>
              <div className='btns'>
                FAQ <i className='fa fa-chevron-down'></i>
              </div>
              <div className='content'>
                <FaqContent />
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
