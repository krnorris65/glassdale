import { Witness } from "./Witness.js";
import { useWitnesses, getWitnesses } from "./WitnessProvider.js";

const eventHub = document.querySelector(".container")
const witnessContainer = document.querySelector('.criminalsContainer')

const render = witnessCollection => {
    let witnessHtmlRepresentation = ""
    witnessCollection.forEach(witness => {
        witnessHtmlRepresentation += Witness(witness)
    })
    witnessContainer.innerHTML = witnessHtmlRepresentation
}

eventHub.addEventListener("witnessButtonClicked", event => {
    WitnessList()
})


export const WitnessList = () => {
    getWitnesses().then(() => {
        const appStateWitnesses = useWitnesses()
        render(appStateWitnesses)
    })
}