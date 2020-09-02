/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__crime")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {

    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

// EXPORT FUNCTION***********************

export const ConvictionSelect = () => {
    // Get all convictions from application state
    const convictions = useConvictions()
    const sortedArray = [];
    convictions.map(crimeObj => {
        sortedArray.push(crimeObj.name)
    })
    sortedArray.sort();
    render(sortedArray)
}

//RENDER*************************************

const render = (convictionsCollection) => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
        convictionsCollection.map(crime => {
            return `<option value=${crime}>${crime}</option>`
        })
        }
        </select>
    `
}