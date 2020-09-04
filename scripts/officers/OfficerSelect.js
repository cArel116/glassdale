import { useOfficers, getOfficers } from './OfficerProvider.js';

// Get a reference to the DOM element where the <select> will be rendered
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value

        // Define a custom event
        const customEvent = new CustomEvent("officerChosen", {
            detail: {
                officerThatWasChosen: selectedOfficer
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

// EXPORT FUNCTION***********************

export const arrestingOfficerSelect = () => {
    // Get all officers from application state
    getOfficers()
        .then(() => {
            const officers = useOfficers()
            const sortedOfficerArray = [];
            officers.map(officerObj => {
                sortedOfficerArray.push(officerObj.name)
            })
            sortedOfficerArray.sort();
            render(sortedOfficerArray)
        })
}

//RENDER*************************************

const render = (officersCollection) => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelected">
            <option value="0">Please select an arresting officer...</option>
            ${
        officersCollection.map(officer => {
            return `<option value=${officer}>${officer}</option>`
        })
        }
        </select>
    `
}