import {useOfficers} from "./OfficerProvider.js"

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
    const officers = useOfficers()
    render(officers)
}

eventHub.addEventListener("change", event => {
    if(event.target.id === "officerSelect"){
        const officers = useOfficers()

        const chosenOfficerId = event.target.value

        const officerInfo = officers.find(officer => officer.id === Number(chosenOfficerId))


        const officerSelected = new CustomEvent("chosenOfficer", {
            detail: {
                officer: officerInfo
            }
        })

        eventHub.dispatchEvent(officerSelected)
    }
})