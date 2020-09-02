import { getCriminals, useCriminals } from './CriminalProvider.js';
import { CriminalHTML } from './Criminal.js'

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