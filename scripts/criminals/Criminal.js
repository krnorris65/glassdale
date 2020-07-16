export const Criminal = (criminalObject) => {
    return `
    <div class="criminal">
        <h4>${criminalObject.name}</h4>
        <div class="criminal__details">
            <p>Age: ${criminalObject.age}</p>
            <p>Crime: ${criminalObject.conviction}</p>
            <p>Term start: ${new Date(criminalObject.incarceration.start).toLocaleDateString()}</p>
            <p>Term end: ${new Date(criminalObject.incarceration.end).toLocaleDateString()}</p>
        </div>
    </div>
    `
}