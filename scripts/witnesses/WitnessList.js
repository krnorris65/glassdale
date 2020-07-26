import { Witness } from "./Witness.js";
import { useWitnesses, getWitnesses } from "./WitnessProvider.js";
import { hideOtherListContainers } from "../helpers/hideElement.js";

const eventHub = document.querySelector(".container")
const witnessContainer = document.querySelector('.statementsContainer')

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
    hideOtherListContainers(witnessContainer)
    getWitnesses().then(() => {
        const appStateWitnesses = useWitnesses()
        render(appStateWitnesses)
    })
}