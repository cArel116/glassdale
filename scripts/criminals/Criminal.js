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
            <h3 class="criminalCardName">${criminalObj.name}</h3>
            <p>Age: ${criminalObj.age}</p>
            <p>Crime: ${criminalObj.conviction}</p>
            <p>Term Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>Term End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
            <button id="associates--${criminalObj.id}" class="associateAlibis">Associate Alibis</button>
            ${AlibiDialog(criminalObj.id)}
        </section>
    `
}


// export const Criminal = (criminalObject, facilities) => {
//     return `
//     <div class="criminal">
//         <h4>${criminalObject.name}</h4>
//         <div class="criminal__details">
//             <p>Convicted for ${criminalObject.conviction}</p>
//             <p>Arrested by ${criminalObject.arrestingOfficer}</p>
//             <p>Incarcerated between:
//                 ${new Date(criminalObject.incarceration.start).toLocaleDateString()} and
//                 ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
//             </p>
//             <p>Age: ${criminalObject.age}</p>
//             <div>
//                 <h2>Facilities</h2>
//                 <ul>
//                     ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
//                 </ul>
//             </div>
//             <button id="associates--${criminalObject.id}">Show Associates</button>
//         </div>
//     </div>
//     `
// }