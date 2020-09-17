export const WitnessHTML = (witnessObj) => {
    return `
        <section id="witness--${witnessObj.id}" class="criminal-card">
            <p><strong>Witness:</strong> ${witnessObj.name}</p>
            <p>Statement: ${witnessObj.statements}</p>
        </section>
    `
}