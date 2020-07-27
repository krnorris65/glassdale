import { useNotes, getNotes} from './NoteProvider.js'
import { useCriminals, getCriminals} from '../criminals/CriminalProvider.js'
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
            </section>
        `
    }).join("")
}

const NoteList = () => {
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