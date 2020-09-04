/*
    A bunch of input boxes related to the note information.
*/

import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { saveNote } from './NoteProvider.js'

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        clickEvent.preventDefault()

        const noteContent = document.querySelector("#note-text")
        const noteCriminal = document.querySelector("#noteForm--criminal")

        if (noteCriminal.value !== "0") {
            const newNote = {
                noteText: noteContent.value,
                suspect: noteCriminal.value,
                date: Date.now()
            }
        }
        else {
            window.alert("Choose A Suspect");
        }

        saveNote(newNote);


    }
})

const render = (criminalArray) => {
    contentTarget.innerHTML = `
        <h3>New Note Details</h3>
        <input type="text" id="note-text">

        <select class="dropdown" id="noteForm--criminal">
            <option value="0">Please select a criminal...</option>
            ${
        criminalArray.map(criminalObject => {
            return `<option value=${criminalObject.name}>${criminalObject.name}</option>`
        })
        }
        </select>

        <button type="button" id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    getCriminals()
        .then(() => {
            render(useCriminals());
        })

}