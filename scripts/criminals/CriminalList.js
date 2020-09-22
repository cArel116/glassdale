import { getCriminals, useCriminals } from './CriminalProvider.js';
import { CriminalHTML } from './Criminal.js';
// import { Criminal } from './Criminal.js';
// import { useFacilities, getFacilities } from '../facilities/FacilityProvider.js';
// import { useCriminalFacilities, getCriminalFacilities } from '../facilities/CriminalFacilityProvider.js';


const eventHub = document.querySelector(".container")

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {

    //get selected officer
    const contentTarget = document.querySelector(".officerSelect")
    // console.log("what officer is selected?", contentTarget.value);

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

    // How can you get the criminals that were arrested by that officer?
    if (officerName !== "0") {
        const matchingCriminals = useCriminals().filter(criminalObj => {
            return criminalObj.arrestingOfficer === officerName
        });
        addCriminalsToDOM(matchingCriminals)
    } else {
        addCriminalsToDOM(useCriminals())
    }
})


export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals();
            // console.log("criminalArray", criminalArray);
            addCriminalsToDOM(criminalArray);
        })
}

const addCriminalsToDOM = (aCriminalArray) => {
    const domElement = document.querySelector(".criminalsContainer");

    let HTMLArray = aCriminalArray.map(singleCriminal => {
        return CriminalHTML(singleCriminal);
    })
    // console.log("HTMLArray", HTMLArray);

    domElement.innerHTML = HTMLArray.join("");
}


// ********************* 9/22 LISTING FACILITIES PER CRIMINAL *********************

// export const CriminalList = () => {
//     // Kick off the fetching of both collections of data
//     getFacilities()
//         .then(getCriminalFacilities)
//         .then(
//             () => {
//                 // Pull in the data now that it has been fetched
//                 const facilities = useFacilities()
//                 const crimFac = useCriminalFacilities()
//                 const criminals = useCriminals()

//                 // Pass all three collections of data to render()
//                 render(criminals, facilities, crimFac)
//             }
//         )
// }


// const render = (criminalsToRender, allFacilities, allRelationships) => {
//     // Step 1 - Iterate all criminals
//     contentTarget.innerHTML = criminalsToRender.map(
//         (criminalObject) => {
//             // Step 2 - Filter all relationships to get only ones for this criminal
//             const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

//             // Step 3 - Convert the relationships to facilities with map()
//             const facilities = facilityRelationshipsForThisCriminal.map(cf => {
//                 const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
//                 return matchingFacilityObject
//             })

//             // Must pass the matching facilities to the Criminal component
//             return Criminal(criminalObject, facilities)
//         }
//     ).join("")
// }