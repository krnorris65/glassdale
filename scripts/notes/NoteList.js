import { useNotes, getNotes, deleteNote } from './NoteProvider.js'
import { useCriminals, getCriminals } from '../criminals/CriminalProvider.js'
import { hideOtherListContainers } from "../helpers/hideElement.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".notesContainer")

const render = (noteCollection, criminalCollection) => {

    contentTarget.innerHTML = noteCollection.map(note => {
        // Find the related criminal
        const relatedCriminal = criminalCollection.find(criminal => criminal.id === note.criminalId)

        return `
            <section class="note">
                <h2>Note about ${relatedCriminal.name}</h2>
                ${note.text}
                <button id="deleteNote--${note.id}">Delete</button>
            </section>
        `
    }).join("")
}

export const NoteList = () => {
    hideOtherListContainers(contentTarget)
    getNotes()
        .then(getCriminals)
        .then(() => {
            const notes = useNotes()
            const criminals = useCriminals()

            render(notes, criminals)
        })
}

eventHub.addEventListener("noteButtonClicked", event => {
    NoteList()
})
eventHub.addEventListener("noteStateChanged", event => {
    NoteList()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")

        /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
        deleteNote(id).then(
            () => {
                const updatedNotes = useNotes()
                const criminals = useCriminals()
                render(updatedNotes, criminals)
            }
        )
    }
})