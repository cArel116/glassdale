import { AlibiDialog } from './AlibiDialog.js';

const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("associates--")) {
        const [prefix, criminalId] = event.target.id.split("--")

        const alibiEvent = new CustomEvent("associatesClicked", {
            detail: {
                chosenCriminal: criminalId
            }
        })

        eventHub.dispatchEvent(alibiEvent);
    }
})

export const CriminalHTML = (criminalObj) => {
    return `
        <section id="criminal-${criminalObj.id}" class="criminal-card">
            <h2>${criminalObj.name}</h2>
            <p>Age: ${criminalObj.age}</p>
            <p>Crime: ${criminalObj.conviction}</p>
            <p>Term Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>Term End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
            <button id="associates--${criminalObj.id}">Associate Alibis</button>
            ${AlibiDialog(criminalObj.id)}
        </section>
    `
}