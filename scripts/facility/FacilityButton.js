const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".facility__button")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("click", event => {
    if (event.target.id === "facilityButton") {
        const showFacilities = new CustomEvent("facilitiesButtonClicked")

        // Dispatch to event hub
        eventHub.dispatchEvent(showFacilities)
    }
})


export const DisplayFacilitiesButton = () => {
    contentTarget.innerHTML = `
        <button id="facilityButton">Show Facilities</button>
    `
}