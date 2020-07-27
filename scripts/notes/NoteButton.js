const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".note_button")
// import { resetAllDropdowns } from "../helpers/resetElement.js";

// On the event hub, listen for a "change" event.
eventHub.addEventListener("click", event => {
    if (event.target.id === "noteButton") {
        const showStatements = new CustomEvent("noteButtonClicked")

        // Dispatch to event hub
        eventHub.dispatchEvent(showStatements)
    }
})


export const NoteButton = () => {
    contentTarget.innerHTML = `
        <button id="noteButton">Show Notes</button>
    `
}