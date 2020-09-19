import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { saveNote } from "./NoteProvider.js";
/*
    A bunch of input boxes related to the note information
*/
const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".noteFormContainer");

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteContent = document.querySelector("#noteForm--text")
        const noteCriminal = document.querySelector("#noteForm--criminal")

        if (noteCriminal.value !== "0") {
            const newNote = {
                noteText: noteContent.value,
                suspectId: parseInt(noteCriminal.value),
                date: Date.now()
            }
            noteContent.value = "";
            noteCriminal.value = "0";
            saveNote(newNote);


        } else {
            window.alert("Choose a Suspect");
        }



    }
})

const render = (criminalArray) => {
    contentTarget.innerHTML = `
        <div class="newNoteParent">
            <select class="noteForm dropdown" id="noteForm--criminal">
				<option value="0">Select Criminal</option>
				${criminalArray.map(criminalObject => {
        return `<option value="${criminalObject.id}">${criminalObject.name}</option>`
    }).join("")
        }
            </select>
        </div>
        <div class="newNoteSubmissionArea">
            <textarea id="noteForm--text" class="noteForm noteFormTextArea" placeholder="[Type New Note Here]"></textarea>
            <button id="saveNote" class="noteForm saveNoteButton">Save Note</button>
        </div>
		
    `
}

export const NoteForm = () => {
    getCriminals()
        .then(() => {
            render(useCriminals());
        })

}