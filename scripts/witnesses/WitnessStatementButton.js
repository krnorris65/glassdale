const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".witness_button")
import { resetAllDropdowns } from "../helpers/resetElement.js";

// On the event hub, listen for a "change" event.
eventHub.addEventListener("click", event => {
    if (event.target.id === "witnessButton") {
        resetAllDropdowns()
        const showStatements = new CustomEvent("witnessButtonClicked")

        // Dispatch to event hub
        eventHub.dispatchEvent(showStatements)
    }
})


export const WitnessStatementButton = () => {
    contentTarget.innerHTML = `
        <button id="witnessButton">Show Witness Statements</button>
    `
}