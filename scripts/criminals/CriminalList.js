import { Criminal } from "./Criminal.js";
import { useCriminals, getCriminals } from "./CriminalProvider.js"
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { useOfficers } from "../officers/OfficerProvider.js";
import { hideOtherListContainers } from "../helpers/hideElement.js";

const eventHub = document.querySelector(".container")
const criminalContainer = document.querySelector('.criminalsContainer')


eventHub.addEventListener('chosenCrime', event => {
    const appStateCriminals = useCriminals()
    const crimeCollection = useConvictions()

    // You remembered to add the id of the crime to the event detail, right?
    if ("crimeId" in event.detail && event.detail.crimeId !== "0") {
        /*
            Filter the criminals application state down to the people that committed the crime
        */
       const selectedCrime = crimeCollection.find(crime => crime.id === Number(event.detail.crimeId))

        const matchingCriminals = appStateCriminals.filter(criminal => criminal.conviction === selectedCrime.name)

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
    const officerCollection = useOfficers()

    if("officerId" in event.detail && event.detail.officerId !== "0"){

        const selectedOfficer = officerCollection.find(officer => officer.id === Number(event.detail.officerId))

        const matchingCriminals = appStateCriminals.filter(criminal => criminal.arrestingOfficer === selectedOfficer.name)
        
        render(matchingCriminals)
    } else {
        // if an officer isn't selected then return all the criminals
        render(appStateCriminals)
    }
})

const render = criminalCollection => {
    hideOtherListContainers(criminalContainer)
    let criminalHtmlRepresentation = ""
    criminalCollection.forEach(criminal => {
        criminalHtmlRepresentation += Criminal(criminal)
    })
    criminalContainer.innerHTML = criminalHtmlRepresentation
}



// Render ALL criminals initally
export const CriminalList = () => {
    getCriminals().then(() => {
        const appStateCriminals = useCriminals()
        render(appStateCriminals)
    })
}


