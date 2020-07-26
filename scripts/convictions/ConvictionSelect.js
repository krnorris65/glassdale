/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions, getConvictions } from "./ConvictionProvider.js"
import { resetOtherDropdowns } from "../helpers/resetElement.js";

const eventHub = document.querySelector(".container")
// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {
    
    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        const convictions = useConvictions()
        // Create custom event. Provide an appropriate name.
        const chosenCrimeId = event.target.value
        resetOtherDropdowns(event.target.id)

        const crime = convictions.find(crime => crime.id === Number(chosenCrimeId))
        
        
        const crimeSelected = new CustomEvent("chosenCrime", {
            detail: {
                crimeId: chosenCrimeId,
                crime: crime
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(crimeSelected)
    }
})


const render = convictionsCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(crime => `<option value="${crime.id}">${crime.name}</option>`).join("")
            }
        </select>
    `
}

export const ConvictionSelect = () => {
    // Get all convictions from application state
    getConvictions().then(() => {
        const convictions = useConvictions()
        render(convictions)
    })
}