import {Criminal} from "./Criminal.js";
import {useCriminals} from "./CriminalProvider.js"
import {getOneConviction} from "../convictions/ConvictionProvider.js"

const eventHub = document.querySelector(".container")

const criminalContainer = document.querySelector('.criminalsContainer')


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

eventHub.addEventListener('chosenCrime', event => {
    const appStateCriminals = useCriminals()

    // You remembered to add the id of the crime to the event detail, right?
    if ("crimeId" in event.detail && event.detail.crimeId !== "0") {
        /*
            Filter the criminals application state down to the people that committed the crime
        */

        getOneConviction(event.detail.crimeId).then ( conviction => {
            console.log(conviction)
            const matchingCriminals = appStateCriminals.filter(criminal => criminal.conviction === conviction.name)
            console.log(matchingCriminals)
    
            /*
                Then invoke render() and pass the filtered collection as
                an argument
            */
           render(matchingCriminals)
        })
    }else {
        render(appStateCriminals)
    }
})
