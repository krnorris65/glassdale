export const Witness = (witnessObject) => {
    return `
    <div class="witness">
        <h4>${witnessObject.name}</h4>
        <div>${witnessObject.statements}</div>
    </div>
    `
}

