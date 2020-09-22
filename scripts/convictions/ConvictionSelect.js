/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions, getConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__crime")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {

    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        const selectedCrime = event.target.value

        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: selectedCrime
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

// EXPORT FUNCTION***********************

export const ConvictionSelect = () => {
    // Get all convictions from application state
    getConvictions()
        .then(() => {
            const convictions = useConvictions()
            const sortedArray = [];
            convictions.map(crimeObj => {
                sortedArray.push(crimeObj.name)
            })
            sortedArray.sort();
            render(sortedArray)
        })
}

//RENDER*************************************

const render = (convictionsCollection) => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown selectCrimeDropdown" id="crimeSelect">
            <option value="0">Select A Crime</option>
            ${convictionsCollection.map(crime => {
        return `<option value=${crime}>${crime}</option>`
    })
        }
        </select>
    `
}