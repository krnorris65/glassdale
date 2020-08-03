import { Facility } from "./Facility.js";
import { getFacilities, useFacilities } from "./FacilityProvider.js";
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js";
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js";
import { hideOtherListContainers } from "../helpers/hideElement.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector('.facilityContainer')


const render = (facilitiesToRender, allCriminals, allRelationships) => {
    hideOtherListContainers(contentTarget)
    contentTarget.innerHTML = facilitiesToRender.map(
        (facilityObject) => {
            const criminalRelationshipForThisFacility = allRelationships.filter(cf => cf.facilityId === facilityObject.id)

            const criminals = criminalRelationshipForThisFacility.map(cf => {
                const matchingCriminalObj = allCriminals.find(criminal => criminal.id === cf.criminalId)
                return matchingCriminalObj
            })

            return Facility(facilityObject, criminals)
        }
    ).join("")
}

eventHub.addEventListener("facilitiesButtonClicked", event => {
    FacilityList()
})


export const FacilityList = () => {
    hideOtherListContainers(contentTarget)
    getFacilities()
        .then(getCriminals)
        .then(getCriminalFacilities)
        .then(() => {
            const appStateFacilities = useFacilities()
            const allCriminals = useCriminals()
            const allCriminalFacilities = useCriminalFacilities()
            render(appStateFacilities, allCriminals, allCriminalFacilities)
        })
}