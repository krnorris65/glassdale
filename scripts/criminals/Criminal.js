export const Criminal = (criminalObject, facilities) => {
    return `
    <div class="criminal">
        <h2>${criminalObject.name}</h2>
        <div class="criminal__details">
            <p>Convicted for ${criminalObject.conviction}</p>
            <p>Arrested by ${criminalObject.arrestingOfficer}</p>
            <p>Incarcerated between:
                ${new Date(criminalObject.incarceration.start).toLocaleDateString()} and
                ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${criminalObject.age}</p>
            <div>
                <h4>Facilities</h4>
                <ul>
                    ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
            <button id="associates--${criminalObject.id}">Show Associates</button>
        </div>
    </div>
    `
}

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("associates--")){
        const [label, criminalId] = event.target.id.split("--")
        const showAssociates = new CustomEvent("showKnownAssociates", {
            detail: {
                chosenCriminal: criminalId
            }
        })

        eventHub.dispatchEvent(showAssociates)
    }
})