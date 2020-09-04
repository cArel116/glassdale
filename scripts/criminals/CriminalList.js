import { getCriminals, useCriminals } from './CriminalProvider.js';
import { CriminalHTML } from './Criminal.js';
import { OfficerList } from '../officers/OfficerList.js';
import { useOfficers } from '../officers/OfficerProvider.js';


const eventHub = document.querySelector(".container")

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {

    // You remembered to add the id of the crime to the event detail, right?
    if (event.detail.crimeThatWasChosen !== "0") {
        /*
        Filter the criminals application state down to the people that committed the crime
        */
        const matchingCriminals = useCriminals().filter(currentCriminal => {
            return currentCriminal.conviction === event.detail.crimeThatWasChosen
        })
        /*
        Then invoke render() and pass the filtered collection as
        an argument
        */
        addCriminalsToDOM(matchingCriminals);
    }
    else {
        addCriminalsToDOM(useCriminals());
    }
})



/* ****  ARRESTING OFFICER **** */

eventHub.addEventListener('officerChosen', event => {
    // How can you access the officer name that was selected by the user?
    const officerName = event.detail.officerThatWasChosen
    if (officerName !== "0") {

        // How can you get the criminals that were arrested by that officer?

        const criminals = useCriminals().filter(criminalObject => {
            if (criminalObject.arrestingOfficer === officerName) {
                return true
            }
        })
        OfficerList(criminals);
    }
    else {
        OfficerList(useOfficers());
    }

})

/* *** */


export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals();
            console.log("criminalArray", criminalArray);
            addCriminalsToDOM(criminalArray);
        })
}

const addCriminalsToDOM = (aCriminalArray) => {
    const domElement = document.querySelector(".criminalsContainer");

    let HTMLArray = aCriminalArray.map(singleCriminal => {
        return CriminalHTML(singleCriminal);
    })
    console.log("HTMLArray", HTMLArray);

    domElement.innerHTML = HTMLArray.join("");
}