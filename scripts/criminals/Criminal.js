export const CriminalHTML = (criminalObj) => {
    return `
        <section id="criminal-${criminalObj.id}" class="criminal-card">
            <h2>Criminal Name: ${criminalObj.name}</h2>
            <p>Age: ${criminalObj.age}</p>
            <p>Crime: ${criminalObj.conviction}</p>
            <p>Term Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>Term End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
        </section>
    `
}