import NominationInfo from '../nominationInfo';
import style from './style.css'
import React, {useEffect, useState} from 'react';
const states = require('us-state-codes');

/**
 * Creates and renders the active nomination banner.
 * 
 * @param {*} props - active nomination props
 * @returns - nomination banner component
 */
const NominationBanner = (props) => {
  const date = new Date(props.nomination.dateReceived).toLocaleDateString();
  const lastName = props.nomination.patientName ? props.nomination.patientName.split(' ')[1] : '';
  const state = states.getStateCodeByStateName(props.nomination.hospitalState);
  const nominationName = `${lastName}-${state}`;
  const formattedAmount = props.nomination.amountRequestedCents ? props.nomination.amountRequestedCents.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '';
  const hipaaDate = props.nomination.hipaaTimestamp;
  const valid = new Date(hipaaDate).getTime() > 0;
  let newDate = new Date(hipaaDate);
  const time = newDate.toLocaleDateString();
  const minutes = newDate.toLocaleTimeString();
  const finalDate = `${time} – ${minutes}`;

  // Variables for edit button coloring and save functionality.
  let backColor = "white";
  let textColor = "green";
  let saveOrEditLabel = "Edit";

  // Handles changing edit button colors and title to "save" if clicked.
  if(props.hasBeenClicked) {
    backColor = "green";
    textColor = "white";
    saveOrEditLabel = "Save";
  }

  return (
    <div className="nomination-banner-container">
      <div className="row">
        <div className="column column-10 icon-container">
          <img src="/ksflogo.png" alt="other" />
        </div>

        <div className="column column-80 nomination-details">
          <div className="row banner-top">
            <div className="column name">
              <p>Application</p>
              <span>
                <h1 className="nom-name">
                  <strong>{nominationName}</strong>
                </h1>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="column hp-name">
              <p className="secondary-dark">HP Name</p>
              <span><h2 className="body-font"><strong>{props.nomination.providerName}</strong></h2></span>
            </div>
            <div className="column fam-name">
              <p className="secondary-dark">Family Member Name</p>
              <span><h2 className="body-font"><strong>{props.nomination.representativeName}</strong></h2></span>
            </div>
            <div className="column created-at">
              <p className="secondary-dark">Submission Date</p>
              <span>
                <h2 className="body-font">
                  <strong>{date}</strong>
                </h2>
              </span>
            </div>
            <div className="column amount">
              <p className="secondary-dark">Grant Amount Requested</p>
              <span>
                <h2 className="body-font">
                  <strong>{formattedAmount ? `$${formattedAmount}` : ''}</strong>
                </h2>
              </span>
            </div>
            <div className="column hippa">
              <p className="secondary-dark">HIPAA Date</p>
              <span>
                <h2 className="body-font">
                  <strong>{valid ? finalDate : 'Awaiting HIPAA'}</strong>
                </h2>
              </span>
            </div>
          </div>
        </div>
        <div className="column column-10">
          <button 
            className="button button-outline edit-button"
            style={{ backgroundColor: backColor, color:textColor }}
            onClick={props.handleClick}
            type="submit"
            form="update-form"
            id="edit-button">{saveOrEditLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default NominationBanner;
