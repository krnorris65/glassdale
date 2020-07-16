let convictions = []

export const useConvictions = () => convictions.slice()

export const getConvictions = () => {
    return fetch("https://criminals.glassdale.us/crimes")
        .then(response => response.json())
        .then(parsedConvictions => {
            convictions = parsedConvictions
            }
        )
}

export const getOneConviction = (id) => {
    return fetch(`https://criminals.glassdale.us/crimes/${id}`)
        .then(response => response.json())
}

