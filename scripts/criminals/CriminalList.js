import { Criminal } from "./Criminal.js";
import { useCriminals } from "./CriminalProvider.js"

const eventHub = document.querySelector(".container")

const criminalContainer = document.querySelector('.criminalsContainer')

// have this event listener here instead of in Criminal.js so that there aren't 200+ event listeners being added
criminalContainer.addEventListener("click", event => {
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

eventHub.addEventListener('chosenCrime', event => {
    const appStateCriminals = useCriminals()

    // You remembered to add the id of the crime to the event detail, right?
    if ("crimeId" in event.detail && event.detail.crimeId !== "0") {
        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const matchingCriminals = appStateCriminals.filter(criminal => criminal.conviction === event.detail.crime.name)

        /*
            Then invoke render() and pass the filtered collection as
            an argument
        */
        render(matchingCriminals)
    } else {
        // if a crime isn't selected then return all the criminals
        render(appStateCriminals)
    }
})

eventHub.addEventListener('chosenOfficer', event => {
    const appStateCriminals = useCriminals()

    if("officer" in event.detail && event.detail.officer !== undefined){

        const matchingCriminals = appStateCriminals.filter(criminal => criminal.arrestingOfficer === event.detail.officer.name)
        render(matchingCriminals)
    } else {
        // if an officer isn't selected then return all the criminals
        render(appStateCriminals)
    }
})

const render = criminalCollection => {
    let criminalHtmlRepresentation = ""
    criminalCollection.forEach(criminal => {
        criminalHtmlRepresentation += Criminal(criminal)
    })
    criminalContainer.innerHTML = criminalHtmlRepresentation
}


// Render ALL criminals initally
export const CriminalList = () => {
    const appStateCriminals = useCriminals()
    render(appStateCriminals)
}


