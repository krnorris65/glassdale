import {useOfficers} from "./OfficerProvider.js"

const contentTarget = document.querySelector(".filters__officer")

const render = officersCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officersCollection.map(officer => `<option value="${officer.id}">${officer.name}</option>`)
            }
        </select>
    `
}

export const OfficerSelect = () => {
    // Get all officers from application state
    const officers = useOfficers()
    render(officers)
}