import { Criminal } from "./Criminal.js";
import { useCriminals, getCriminals } from "./CriminalProvider.js"
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { useOfficers } from "../officers/OfficerProvider.js";
import { hideOtherListContainers } from "../helpers/hideElement.js";
import { getCriminalFacilities, useCriminalFacilities } from "../facility/CriminalFacilityProvider.js";
import { getFacilities, useFacilities } from "../facility/FacilityProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector('.criminalsContainer')


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

    if ("officerId" in event.detail && event.detail.officerId !== "0") {

        const selectedOfficer = officerCollection.find(officer => officer.id === Number(event.detail.officerId))

        const matchingCriminals = appStateCriminals.filter(criminal => criminal.arrestingOfficer === selectedOfficer.name)

        render(matchingCriminals)
    } else {
        // if an officer isn't selected then return all the criminals
        render(appStateCriminals)
    }
})

const render = (criminalsToRender, allFacilities, allRelationships) => {
    hideOtherListContainers(contentTarget)
    // Step 1 - Iterate all criminals
    contentTarget.innerHTML = criminalsToRender.map(
        (criminalObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return Criminal(criminalObject, facilities)
        }
    ).join("")
}



// Render ALL criminals initially
export const CriminalList = () => {
    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(() => {
            const appStateCriminals = useCriminals()
            const allFacilities = useFacilities()
            const allCriminalFacilities = useCriminalFacilities()
            render(appStateCriminals, allFacilities, allCriminalFacilities)
        })
}


