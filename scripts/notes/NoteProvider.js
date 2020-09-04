/*
    hold onto array of notes
    useNotes -- makes copy of array of notes and returns
    get all the notes from database
    add a note to the DB
*/

export const useNotes = () => {
    return useNotes.slice();
}

export const saveNote = noteObj => {
    return fetch("http://localhost:8088/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteObj)
    })
        .then(() => {
            return getNotes()
        })
        .then(dispatchStateChangeEvent)
}