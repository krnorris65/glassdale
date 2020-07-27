import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js";
import { saveNote } from "./NoteProvider.js";
const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

const render = () => {
    getCriminals().then(() => {

        const criminalsCollection = useCriminals()
        const alphabetizedCriminals = criminalsCollection.sort((a,b) => a.name > b.name ? 1 : -1)
        
        contentTarget.innerHTML = `
        <fieldset>
        <label class="label" for="note-text">Note:</>
        <input type="text" id="note-text">
        </fieldset>
        <fieldset>
        <label class="label" for="note-criminal">Criminal:</>
        <select id="note-criminal">
        <option value="0">***Select Criminal***</option>
        ${alphabetizedCriminals.map(criminal => {
            return `<option value="${criminal.id}">${criminal.name}</option>`
        })}
        </select>
        </fieldset>
        
        <button id="saveNote">Save Note</button>
        `
    })
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteText = document.getElementById("note-text")
        const noteCriminalId = document.getElementById("note-criminal")

        // Make a new object representation of a note
        const newNote = {
            text: noteText.value,
            criminalId: Number(noteCriminalId.value),
            timestamp: Date.now()
        }

        // Change API state and application state
        saveNote(newNote)
        
        //reset values of form
        noteText.value = ""
        noteCriminalId.value = 0

    }
})

export const NoteForm = () => {
    render()
}