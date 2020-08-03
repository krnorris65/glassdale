export const Facility = (facilityObject, criminals) => {
    return `
    <div class="facility">
        <h2>${facilityObject.facilityName}</h2>
        <div class="facility__details">
            <p>Security Level: ${facilityObject.securityLevel}</p>
            <p>Capacity: ${facilityObject.capacity}</p>
            <div>
                <h4>Criminals</h4>
                <ul>
                    ${criminals.map(f => `<li>${f.name}</li>`).join("")}
                </ul>
            </div>
        </div>
    </div>
    `
}