import { useWitness, getWitness } from './WitnessProvider.js';
import { WitnessHTML } from './Witness.js';

export const WitnessList = () => {
    getWitness()
        .then(() => {
            const witnessArray = useWitness();
            addWitnessesToDOM(witnessArray);
        })
}

const addWitnessesToDOM = (witnessArray) => {
    const domElement = document.querySelector(".witnessContainer");

    let HTMLArray = witnessArray.map(singleWitness => {
        return WitnessHTML(singleWitness);
    }).join("")

    domElement.innerHTML += HTMLArray;
}