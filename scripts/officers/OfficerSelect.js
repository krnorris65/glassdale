import {useOfficers, getOfficers} from "./OfficerProvider.js"
import { resetOtherDropdowns } from "../helpers/resetElement.js";

const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

const render = officersCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officersCollection.map(officer => `<option value="${officer.id}">${officer.name}</option>`).join("")
            }
        </select>
    `
}

export const OfficerSelect = () => {
    // Get all officers from application state
    getOfficers().then(() => {
        const officers = useOfficers()
        render(officers)
    })
}

eventHub.addEventListener("change", event => {
    if(event.target.id === "officerSelect"){
        resetOtherDropdowns(event.target.id)
        const officers = useOfficers()

        const chosenOfficerId = event.target.value

        const officerSelected = new CustomEvent("chosenOfficer", {
            detail: {
                officerId: chosenOfficerId
            }
        })

        eventHub.dispatchEvent(officerSelected)
    }
})