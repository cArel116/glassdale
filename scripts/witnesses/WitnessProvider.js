let witnesses = [];

export const useWitness = () => {
    return witnesses.slice();
}

export const getWitness = () => {
    return fetch("https://criminals.glassdale.us/witnesses")
        .then(response => response.json())
        .then(parsedResponse => {
            witnesses = parsedResponse;
        })
}