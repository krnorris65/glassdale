export const Criminal = (criminalObject) => {
    return `
    <div class="criminal">
        <h4>${criminalObject.name}</h4>
        <div class="criminal__details">
            <p>Age: ${criminalObject.age}</p>
            <p>Crime: ${criminalObject.conviction}</p>
            <p>Term start: ${new Date(criminalObject.incarceration.start).toLocaleDateString()}</p>
            <p>Term end: ${new Date(criminalObject.incarceration.end).toLocaleDateString()}</p>
        </div>
        <button id="associates--${criminalObject.id}">Associate Alibis</button>
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