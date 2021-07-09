import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import NominationBanner from '../../nominationBanner/nominationBanner';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import SearchBar from '../../SearchBar';
import NominationInfo from '../../nominationInfo';
import ApplicationUpdateDetail from '../../nominationInfo/applicationUpdateDetail';
import ApplicationForm from '../../nominationInfo/ApplicationForm';
import { format } from 'date-fns';

const NominationPage = ({
	match: {
		params: { id },
	},
}) => {
	const [activeNomination, setActiveNomination] = useContext(
		ActiveNominationContext
	);
	const [NominationsData, setNominationsData] = useContext(
		NominationsDataContext
	);
	const [error, setError] = useState();
	const [editHasBeenClicked, setEditHasBeenClicked] = useState(false);
	const [saveHasBeenClicked, setSaveHasBeenClicked] = useState(false);
	// const [validationFailed, setValidationFailed] = useState(false)

	const [mode, setMode] = useState('view');

	useEffect(() => {
		if (NominationsData) {
			NominationsData.forEach(nomination => {
				if (nomination.id === id) {
					return setActiveNomination(nomination);
				} else {
					return setError('Nomination does not exist');
				}
			});
		}
	});

	const {
		hospitalCity,
		hospitalState,
		hospitalZipCode,
		admissionDate,
		dischargeDate,
	} = activeNomination;
	const hospitalAddress = `${hospitalCity}, ${hospitalState}, ${hospitalZipCode}`;


	// look at format and DatePicker

	// const admissionDateObject = admissionDate ? format(new Date(admissionDate), 'MM/dd/yyyy') : '';
	
	// const dischargeDateObject = dischargeDate ? format(new Date(dischargeDate), 'MM/dd/yyyy') : '';

	const admissionDateObject = new Date(admissionDate);
	const dischargeDateObject = new Date(dischargeDate);
	

	const admissionDateStr = admissionDateObject.toLocaleDateString();

	const dischargeDateStr = dischargeDateObject.toLocaleDateString();

	const diffDays =
		Math.round(
			Math.abs(
				(admissionDateObject - dischargeDateObject) / (24 * 60 * 60 * 1000)
			)
		) >= 21
			? 'Yes'
			: 'No'; /* <- hours*minutes*seconds*milliseconds */



	let spanishRepString;
	if (activeNomination.representativeSpanishRequested) {
		spanishRepString = 'Yes'
	} else {
		spanishRepString = 'No'
	}

	const formData = {
		'Patient Information': '',
		'Patient Name': `${activeNomination.patientName}`,
		'Patient Age': `${activeNomination.patientAge}`,
		'Admission Date': `${admissionDateStr}`,
		'Discharge Date': `${dischargeDateStr}`,
		'Hospitalized for at least 21 days?': `${diffDays}`,
		'Diagnosis/case information': `${activeNomination.patientDiagnosis}`,
		'Family Member Information': '',
		'Representative Name': `${activeNomination.representativeName}`,
		'Representative Email Address': `${activeNomination.representativeEmailAddress}`,
		'Representative Phone Number': `${activeNomination.representativePhoneNumber}`,
		Relationship: `${activeNomination.representativeRelationship}`,
		'Request to communicate in Spanish?': `${spanishRepString}`,
		'Health Provider Information': '',
		'Provider Name': `${activeNomination.providerName}`,
		'Provider Email Address': `${activeNomination.providerEmailAddress}`,
		'Provider Phone Number': `${activeNomination.providerPhoneNumber}`,
		Title: `${activeNomination.providerTitle}`,
		'Name of Hospital': `${activeNomination.providerTitle}`,
		'Hospital URL': `${activeNomination.providerTitle}`,
		'Hospital Address': `${hospitalAddress}`,
		'How did you hear about KSF?': '',
	};

	function handleEditHasBeenClicked() {
		setEditHasBeenClicked(editHasBeenClicked => !editHasBeenClicked);
		console.log(`Nomination Page - handleEditHasBeenClicked: ${editHasBeenClicked}, ${mode}`);

		setMode('edit');

		console.log(`THIS IS MODE IN PARENT COMPONENT: ${mode}`);
	}

	function handleSaveHasBeenClicked() {
		setSaveHasBeenClicked(saveHasBeenClicked => !saveHasBeenClicked);
		// setMode('view');
		console.log(
			`Nomination Page - handleSaveHasBeenClicked: ${saveHasBeenClicked}, ${mode}`
		);
	}

	// function handleFailedValidation() {

	// }

	function revertMode(mode) {
		setMode(mode)
	}

	return (
		<>
			{activeNomination ? (
				<div className='nomination-show-page'>
					<SearchBar />
					<NominationBanner
					  mode={mode}
						editHasBeenClicked={editHasBeenClicked}
						saveHasBeenClicked={saveHasBeenClicked}
						handleSaveHasBeenClicked={handleSaveHasBeenClicked}
						handleEditHasBeenClicked={handleEditHasBeenClicked}
						nomination={activeNomination}
					/>
					<ApplicationStages />
					{/* Sends click state data to all NominationInfo children */}
					<ApplicationForm
						formData={formData}
						mode={mode}
						editHasBeenClicked={editHasBeenClicked}
						saveHasBeenClicked={saveHasBeenClicked}
						nomination={activeNomination}
						gridContent={true}
						id={id}
						revertMode={revertMode}
					/>
				</div>
			) : (
				<div>{error}</div>
			)}
		</>
	);
};

export default NominationPage;

// <>
// {activeNomination
//   ?
//   <div className="nomination-show-page">
//     <SearchBar />
//     <NominationBanner hasBeenClicked={hasBeenClicked} handleSaveHasBeenClicked={handleSaveHasBeenClicked} handleClick={handleClick} nomination={activeNomination} />
//     <ApplicationStages />
//     {/* Sends click state data to all NominationInfo children */}
//     <NominationInfo hasBeenClicked={hasBeenClicked} saveHasBeenClicked={saveHasBeenClicked}/>
//   </div>
//   :
//   <div>{error}</div>
// }
// </>
