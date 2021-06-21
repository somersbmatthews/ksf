import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import ApplicationDetail from "./applicationDetail";
import ApplicationUpdateDetail from "./applicationUpdateDetail";
import HealthProviderDetail from "./healthProviderDetail";
import styles from "./styles.module.css";
import ApplicationUpdateDetailNew from './applicationUpdateDetailNew';

function NominationInfo(props) {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );

  const { hospitalCity, hospitalState, hospitalZipCode, admissionDate, dischargeDate } = activeNomination;
  const hospitalAddress = `${hospitalCity}, ${hospitalState}, ${hospitalZipCode}`;

  const admissionDateObject = new Date(admissionDate);
  const properDateFormat = admissionDateObject.toLocaleDateString();

  const dischargeDateObject = new Date(activeNomination.dischargeDate);

  const diffDays = Math.round(Math.abs((admissionDateObject - dischargeDateObject) / (24 * 60 * 60 * 1000))) >= 21 ? 'Yes' : 'No'; /* <- hours*minutes*seconds*milliseconds */

  const newDate = new Date(dischargeDate);
  const dischargeDateStr = newDate.toLocaleDateString();

  const fields = [
    {
      label: 'Provider Name',
      value: activeNomination.providerName,
    },
    {
      label: 'Email Address',
      value: activeNomination.providerEmailAddress,
    },
    {
      label: 'Phone Number',
      value: activeNomination.providerPhoneNumber,
    },
    {
      label: 'Title',
      value: activeNomination.providerTitle,
    },
    {
      label: 'Name of Hospital',
      value: activeNomination.hospitalName,
    },
    {
      label: 'Hospital URL',
      value: activeNomination.hospitalURL,
    },
    {
      label: 'Hospital Address',
      value: hospitalAddress,
    },
    {
      label: 'How did you hear about KSF?',
      value: '',
    },
  ];

    const familyInfo = [
      {
        label: "Representative Name",
        value: activeNomination.representativeName
      },
      {
        label: "Email Address",
        value: activeNomination.representativeEmailAddress
      },
      {
        label: "Phone Number",
        value: activeNomination.representativePhoneNumber
      },
      {
        label: "Relationship",
        value: activeNomination.representativeRelationship
      },
      {
        label: "Request to communicate in Spanish?",
        value: "No"
      }];
      
    const patientInfo = [
      {
        label: "Patient Name",
        value: activeNomination.patientName
      },
      {
        label: "Patient Age",
        value: activeNomination.patientAge
      },
      {
        label: "Admission Date",
        value: properDateFormat 
      },
      {
        label: "Discharge Date",
        value: activeNomination.dischargeDate
      },
      {
        label: "Hospitalized for at least 21 days?",
        value: diffDays
      },
      {
        label: "Diagnosis/case information",
        value: activeNomination.patientDiagnosis
      },
    ];

    // const patientAndFamilyInfo = {
    //   "Patient Name": activeNomination.patientName,
    //   "Patient Age": 
    // }


    const patientAndFamilyInfo = [
      {
        label: "Patient Name",
        value: activeNomination.patientName
      },
      {
        label: "Patient Age",
        value: activeNomination.patientAge
      },
      {
        label: "Admission Date",
        value: properDateFormat 
      },
      {
        label: "Discharge Date",
        value: activeNomination.dischargeDate
      },
      {
        label: "Hospitalized for at least 21 days?",
        value: diffDays
      },
      {
        label: "Diagnosis/case information",
        value: activeNomination.patientDiagnosis
      },
      {
        label: "Representative Name",
        value: activeNomination.representativeName
      },
      {
        label: "Email Address",
        value: activeNomination.representativeEmailAddress
      },
      {
        label: "Phone Number",
        value: activeNomination.representativePhoneNumber
      },
      {
        label: "Relationship",
        value: activeNomination.representativeRelationship
      },
      {
        label: "Request to communicate in Spanish?",
        value: "No"
      }
    ]
      return (
        <div className={styles.layout}>
          { // Dictates which data is displayed based on the edit button being clicked: first half is current app data (edit button visible),
            // second half allows updates to the active application data (save button visible).
          !props.hasBeenClicked && !props.saveConfirm ? <div><ApplicationDetail propsData={patientInfo} gridContent={true} title="Patient Information" />
            <ApplicationDetail propsData={familyInfo} title="Family Member Information"/></div> : <div>
            {/* when user is editing, this will render */}
            {/* <ApplicationUpdateDetailNew saveHasBeenClicked={props.saveHasBeenClicked} propsData={patientAndFamilyInfo} hasBeenClicked={props.hasBeenClicked} gridContent={true} /> */}
            <ApplicationUpdateDetailNew saveHasBeenClicked={props.saveHasBeenClicked} propsData={patientInfo} hasBeenClicked={props.hasBeenClicked} gridContent={true} title="Patient Information" />
            <ApplicationUpdateDetailNew saveHasBeenClicked={props.saveHasBeenClicked} propsData={familyInfo} hasBeenClicked={props.hasBeenClicked} gridContent={true} title="Family Member Information"/>
            {/* <ApplicationUpdateDetail propsData={patientInfo} hasBeenClicked={props.hasBeenClicked} saveHasBeenClicked={props.saveHasBeenClicked} gridContent={true} title="Patient Information" />
            <ApplicationUpdateDetail propsData={familyInfo} hasBeenClicked={props.hasBeenClicked} saveHasBeenClicked={props.saveHasBeenClicked} title="Family Member Information"/> */}
            </div>
          }
            {/* This set of data is always displayed. */}
            <HealthProviderDetail propsData={fields} gridContent={true} title="Health Provider Information" />
        </div>
      );
    }
  
  export default NominationInfo;
