import { useCriminals } from "./CriminalProvider.js";
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".knownAssociatesContainer")

eventHub.addEventListener("showKnownAssociates", event => {
    if ("chosenCriminal" in event.detail) {
        const criminalId = Number(event.detail.chosenCriminal)
        const criminalCollection = useCriminals()

        const chosenCriminal = criminalCollection.find(criminal => criminal.id === criminalId)

        KnownAssociateDiv(chosenCriminal.known_associates)

        const alibiDialog = document.querySelector("#alibis")
        alibiDialog.showModal()

        const alibiClose = document.querySelector("#close-dialog")
        alibiClose.addEventListener("click", event => {
            alibiDialog.close()
        })

    }
})


export const KnownAssociateDiv = (associates) => {
    let associateHTML = ""
    for (const associate of associates) {
        associateHTML += `
                <li> ${associate.name} (${associate.alibi})</li>
            `
    }
    contentTarget.innerHTML = `
        <dialog id="alibis">
            <h3>Associates with Alibis</h3>
            <ul>
            ${associateHTML}
            </ul>
            <button id="close-dialog">Close</button
        </dialog>
    `
}