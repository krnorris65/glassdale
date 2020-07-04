import {Criminal} from "./Criminal.js";
import {useCriminals} from "./CriminalProvider.js"

const criminalContainer = document.querySelector('.criminalsContainer')

export const CriminalList = () => {
    const criminals = useCriminals()
    criminals.forEach(criminal => {
        criminalContainer.innerHTML += Criminal(criminal)
    })
}