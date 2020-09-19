import { useOfficers, getOfficers } from './OfficerProvider.js';

// Get a reference to the DOM element where the <select> will be rendered
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {
    if (event.target.id === "officerSelected") {
        // Get the name of the selected officer
        const selectedOfficer = event.target.value

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

export const OfficerSelect = () => {
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
            <option value="0">Select Arresting Officer</option>
            ${officersCollection.map(officerObj => {
        return `<option value="${officerObj}">${officerObj}</option>`
    }).join("")
        }
        </select>
    `
}