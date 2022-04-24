
document.querySelector('#add_location_button').addEventListener('click', () =>{
    const serviceWrapper = document.createElement('div')
    serviceWrapper.className = 'service'

    serviceWrapper.innerHTML = `<div class="input-group">
    <label>name</label>
    <input type="text" required name="service-name">
</div>
<div class="input-group">
    <label>url</label>
    <input type="text" required name="service-url">
</div>
<div class="input-group">
    <label>description</label>
    <input type="text" required name="service-description">
</div>`

    const removeButton = document.createElement('span')
    removeButton.className = 'remove-button'
    removeButton.innerHTML = 'remove'
    removeButton.addEventListener('click', () => {
        document.querySelector('#services-list').removeChild(serviceWrapper)
    })
    serviceWrapper.prepend(removeButton)

    document.querySelector('#services-list').appendChild(serviceWrapper)
})


document.querySelector('#add_service_area').addEventListener('click', () => {
    const serviceAreaWrapper = document.createElement('div')
    serviceAreaWrapper.className = 'service-area'

    serviceAreaWrapper.innerHTML = `<div class="input-group">
    <label>country</label>
    <input type="text" required name="service-area-country">
</div>
<div class="input-group">
    <label>state</label>
    <input type="text" required name="service-area-state">
</div>
<div class="input-group">
    <label>cityTown</label>
    <input type="text" required name="service-area-cityTown">
</div>
<div class="input-group">
    <label>url</label>
    <input type="text" required name="service-area-url">
</div>
<div class="input-group">
    <label>zipCodes</label>
    <textarea name="service-area-zipCodes" cols="30" rows="10"></textarea>
</div>`

    const removeButton = document.createElement('span')
    removeButton.className = 'remove-button'
    removeButton.innerHTML = 'remove'
    removeButton.addEventListener('click', () => {
        document.querySelector('#service-areas-list').removeChild(serviceAreaWrapper)
    })
    serviceAreaWrapper.prepend(removeButton)

    document.querySelector('#service-areas-list').appendChild(serviceAreaWrapper)
})

// Form submit
document.querySelector('#inputForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target

    const payload = {
        schemaType: form.schemaType.value,
        businessName: form.businessName.value,
        websiteURL: form.websiteURL.value,
        imageURL: form.imageURL.value,
        slogan: form.slogan.value,
        description: form.description.value,
        disambiguatingDescription: form.disambiguatingDescription.value,
        streetAddress: form.streetAddress.value,
        cityTown: form.cityTown.value,
        state: form.state.value,
        zipCode: form.zipCode.value,
        country: form.country.value,
        phone: form.phone.value,
        email: form.email.value,
        query: form.query.value,
        keywords: form.keywords.value.split(',').map(keyword => keyword.trim()),
        ownersName: form.ownersName.value,
        privacyPolicyURL: form.privacyPolicyURL.value,
        backlinks: extractByLine(form.backlinks.value),
        aboutPages: extractByLine(form.otherPages.value),
        services: [],
        areasServed: []
    }

    const serviceElementsCount = document.querySelectorAll('#services-list .service').length

    for (let index = 0; index < serviceElementsCount; index++) {
        payload.services.push({
            name: document.getElementsByName("service-name")[index].value,
            url: document.getElementsByName("service-url")[index].value,
            description: document.getElementsByName("service-description")[index].value
        })
    }

    const serviceAreaElementCount = document.querySelectorAll('#service-areas-list .service-area').length

    for (let index = 0; index < serviceAreaElementCount; index++) {
        payload.areasServed.push({
            country: document.getElementsByName("service-area-country")[index].value,
            state: document.getElementsByName("service-area-state")[index].value,
            cityTown: document.getElementsByName("service-area-cityTown")[index].value,
            url: document.getElementsByName("service-area-url")[index].value,
            zipCodes: document.getElementsByName("service-area-zipCodes")[index].value.split(',').map(zipcode => zipcode.trim())
        })
    }

    form.style.display = 'none'
    document.querySelector('#loading-text').style.display = 'unset'

    axios({
        method: 'post',
        url: 'https://rank-schema-plugin-server.herokuapp.com/schema-generator/build',
        data: payload
    })
    .then(res => {
        displayResults(res.data)
    })
    .catch(err => {
        console.log(`ERROR BUILDING SCHEMA :${err.message}`)
    })
})

const test = {
    "schemaMarkups": [
        "{\"@context\":\"https://schema.org\",\"@type\":[\"Organization\"],\"@id\":\"#organization\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":4.5,\"bestRating\":5,\"worstRating\":0,\"reviewCount\":\"115\"},\"url\":\"https://southfloridasolarco.com/\",\"additionalType\":[\"LocalBusiness\",\"https://en.wikipedia.org/wiki/Roofer\",\"https://www.wikidata.org/wiki/Q552378\"],\"knowsAbout\":[\"Cape Coral Solar\",\"Residential Solar\"],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"#logo\",\"contentUrl\":\"https://cdn-fccbk.nitrocdn.com/igPHWZRDXGBlJEiydMDieWmbgEzAGYzP/assets/static/optimized/wp-content/uploads/2022/01/274d5dc4c47cc09509740d11abf74fd0.cropped-South-Florida-Solar-1-190x80.png\",\"url\":\"https://cdn-fccbk.nitrocdn.com/igPHWZRDXGBlJEiydMDieWmbgEzAGYzP/assets/static/optimized/wp-content/uploads/2022/01/274d5dc4c47cc09509740d11abf74fd0.cropped-South-Florida-Solar-1-190x80.png\"},\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Fort Myers\",\"addressRegion\":\"Florida\",\"postalCode\":\"3040\",\"streetAddress\":\"3040 Oasis Grand Blvd #1902\",\"addressCountry\":\"United States\"},\"brand\":{\"@id\":\"#organization\"},\"name\":\"South Florida Solar\",\"alternateName\":[\"Cape Coral Solar Company\",\"Residential Solar Company\"],\"legalName\":\"South Florida Solar\",\"description\":\"Our qualified solar panel professionals have worked with countless homes and businesses helping them to begin living a more sustainable lifestyle with energy sourced from our high-quality solar panels. In building our company locally, you can count on us to increase the value of your property while enhancing your quality of life with a reliable, renewable energy source.\",\"disambiguatingDescription\":\"All Phase Solar has watched as the solar business has gone from clunky old thermal panels that warmed water by absorbing the sun’s heat to the sophisticated photovoltaic power systems of today.  We’ve seen how the sun – the cleanest and greenest of all the sustainable sources of renewable energy has been ever more efficiently tapped by improvements in photovoltaic technology and home storage. We’ve been part of the story as solar power has matured to be a fully operational power source with each home capable of powering itself – and even of selling power back to the national grid.  We’re the experts in solar panel installation and integration with other power systems and we can install your own systems. Which means you can reduce your fossil fuel dependence, clean up your green act, reassure customers and family members about how responsible you are… and yes, save money\",\"actionableFeedbackPolicy\":\"https://southfloridasolarco.com/privacy-policy\",\"award\":[\"2021 Best In Fort Myers Cape Coral Solar\",\"2021 Best In Fort Myers Residential Solar\",\"2021 Best In Fort Myers Cape Coral Solar near me\",\"2021 Best In Fort Myers Residential Solar near me\"],\"areaServed\":[{\"@type\":\"AdministrativeArea\",\"@id\":\"#orgarea\",\"geo\":{\"@type\":\"GeoShape\",\"postalCode\":[\"33901\",\"33902\",\"33903\",\"33905\",\"33906\",\"33907\",\"33911\",\"33912\",\"33913\",\"33916\",\"33917\",\"33919\",\"33966\",\"33971\",\"33990\"]},\"containsPlace\":[{\"@type\":\"City\",\"name\":\"Fort Myers\",\"url\":[\"https://www.google.com/maps/place/Fort+Myers,+Florida,+United+States/\"]}]}],\"sameAs\":[\"https://local.google.com/place?id=3205189215751114131&use=srp\",\"https://maps.google.com/maps?cid=3205189215751114131\"],\"image\":{\"@type\":\"ImageObject\",\"@id\":\"#image\",\"contentUrl\":\"https://cdn-fccbk.nitrocdn.com/igPHWZRDXGBlJEiydMDieWmbgEzAGYzP/assets/static/optimized/wp-content/uploads/2022/01/274d5dc4c47cc09509740d11abf74fd0.cropped-South-Florida-Solar-1-190x80.png\",\"url\":\"https://cdn-fccbk.nitrocdn.com/igPHWZRDXGBlJEiydMDieWmbgEzAGYzP/assets/static/optimized/wp-content/uploads/2022/01/274d5dc4c47cc09509740d11abf74fd0.cropped-South-Florida-Solar-1-190x80.png\"},\"email\":\"kijurnan@gmail.com\",\"telephone\":\"239 360 6393\",\"founder\":\"South Florida Solar\",\"slogan\":\"SOUTH FLORIDA SOLAR\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"@id\":\"#contactPoint\",\"name\":\"South Florida Solar\",\"description\":\"Our qualified solar panel professionals have worked with countless homes and businesses helping them to begin living a more sustainable lifestyle with energy sourced from our high-quality solar panels. In building our company locally, you can count on us to increase the value of your property while enhancing your quality of life with a reliable, renewable energy source.\",\"contactType\":\"Customer Service\",\"telephone\":\"239 360 6393\",\"areaServed\":{\"@id\":\"#orgarea\"}},\"makesOffer\":{\"@type\":\"Offer\",\"@id\":\"\",\"itemOffered\":[{\"@id\":\"#capecoralsolar\"},{\"@id\":\"#residentialsolar\"}]},\"subOrganization\":[{\"@id\":\"#fortmyers\"}]}",
        "{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"@id\":\"#organization\",\"name\":\"South Florida Solar\",\"url\":\"https://southfloridasolarco.com/\",\"keywords\":\"solar roofing fort myers, fort myers solar\",\"about\":[{\"@type\":\"thing\",\"name\":\"Roof\",\"sameAs\":[\"https://www.google.com/search?q=Roof&kgmid=/m/06hyd\",\"https://en.wikipedia.org/wiki/Roof\"]},{\"@type\":\"thing\",\"name\":\"Waistcoat\",\"sameAs\":[\"https://www.google.com/search?q=Waistcoat&kgmid=/m/01sdp6\",\"https://en.wikipedia.org/wiki/Waistcoat\"]},{\"@type\":\"thing\",\"name\":\"Thatching\",\"sameAs\":[\"https://www.google.com/search?q=Thatching&kgmid=/g/11j97d13q5\",\"https://en.wikipedia.org/wiki/Thatching\"]},{\"@type\":\"thing\",\"name\":\"Building\",\"sameAs\":[\"https://www.google.com/search?q=Building&kgmid=/m/0cgh4\",\"https://en.wikipedia.org/wiki/Building\"]},{\"@type\":\"thing\",\"name\":\"Electrician\",\"sameAs\":[\"https://www.google.com/search?q=Electrician&kgmid=/m/01bw9x\",\"https://en.wikipedia.org/wiki/Electrician\"]},{\"@type\":\"thing\",\"name\":\"Welder\",\"sameAs\":[\"https://www.google.com/search?q=Welder&kgmid=/m/01jp5n\",\"https://en.wikipedia.org/wiki/Welder\"]},{\"@type\":\"thing\",\"name\":\"Tradesman\",\"sameAs\":[\"https://www.google.com/search?q=Tradesman&kgmid=/m/01jp3p\",\"https://en.wikipedia.org/wiki/Tradesman\"]},{\"@type\":\"thing\",\"name\":\"Apprenticeship\",\"sameAs\":[\"https://www.google.com/search?q=Apprenticeship&kgmid=/m/015ljk\",\"https://en.wikipedia.org/wiki/Apprenticeship\"]},{\"@type\":\"thing\",\"name\":\"Trousers\",\"sameAs\":[\"https://www.google.com/search?q=Trousers&kgmid=/m/07mhn\",\"https://en.wikipedia.org/wiki/Trousers\"]},{\"@type\":\"thing\",\"name\":\"Plumber\",\"sameAs\":[\"https://www.google.com/search?q=Plumber&kgmid=/m/01jp58\",\"https://en.wikipedia.org/wiki/Plumber\"]},{\"@type\":\"thing\",\"name\":\"Construction\",\"sameAs\":[\"https://www.google.com/search?q=Construction&kgmid=/g/121mknrx\",\"https://en.wikipedia.org/wiki/Construction\"]}],\"mentions\":[]}",
        "{\"@context\":\"https://schema.org\",\"@id\":\"#fortmyers\",\"@type\":\"LocalBusiness\",\"additionalType\":[\"LocalBusiness\",\"LocalBusiness\"],\"name\":\"South Florida Solar\",\"description\":\"Our qualified solar panel professionals have worked with countless homes and businesses helping them to begin living a more sustainable lifestyle with energy sourced from our high-quality solar panels. In building our company locally, you can count on us to increase the value of your property while enhancing your quality of life with a reliable, renewable energy source.\",\"url\":\"https://southfloridasolarco.com/fort-myers/\",\"knowsAbout\":[\"Cape Coral Solar\",\"Residential Solar\"],\"sameAs\":[\"https://local.google.com/place?id=3205189215751114131&use=srp\",\"https://maps.google.com/maps?cid=3205189215751114131\"],\"brand\":{\"@id\":\"#organization\"},\"priceRange\":\"$\",\"logo\":{\"@id\":\"#logo\"},\"image\":{\"@id\":\"#image\"},\"makesOffer\":{\"@id\":\"#offer\"},\"parentOrganization\":{\"@id\":\"#organization\"},\"telephone\":\"239 360 6393\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"name\":\"South Florida Solar\",\"description\":\"Our qualified solar panel professionals have worked with countless homes and businesses helping them to begin living a more sustainable lifestyle with energy sourced from our high-quality solar panels. In building our company locally, you can count on us to increase the value of your property while enhancing your quality of life with a reliable, renewable energy source.\",\"contactType\":\"Customer Service\",\"telephone\":\"239 360 6393\"},\"address\":{\"@type\":\"PostalAddress\",\"@id\":\"#fortmyers\",\"addressLocality\":\"Fort Myers\",\"addressRegion\":\"Florida\",\"postalCode\":[\"33901\",\"33902\",\"33903\",\"33905\",\"33906\",\"33907\",\"33911\",\"33912\",\"33913\",\"33916\",\"33917\",\"33919\",\"33966\",\"33971\",\"33990\"],\"addressCountry\":\"United States\",\"sameAs\":[\"https://local.google.com/place?id=3205189215751114131&use=srp\",\"https://maps.google.com/maps?cid=3205189215751114131\"]}}",
        "{\"@context\":\"http://schema.org\",\"@type\":\"Service\",\"@id\":\"#capecoralsolar\",\"provider\":[{\"@id\":\"#fortmyers\"}],\"brand\":{\"@id\":\"#organization\"},\"name\":\"Cape Coral Solar\",\"alternatename\":\"Cape Coral Solar\",\"serviceType\":\"Cape Coral Solar\",\"audience\":\"People looking to get Cape Coral Solar Services\",\"url\":\"https://southfloridasolarco.com/cape-coral-solar-fort-myers/\",\"description\":\"Cape Coral has always been a ground breaker.  From the very start when the area was developed by the Gulf American Land Corporation and financed without the usual involvement from banks and institutional investors. That trend continued with it being the first municipality in the country to use large scale reverse osmosis for its water.\"}",
        "{\"@context\":\"http://schema.org\",\"@type\":\"Service\",\"@id\":\"#residentialsolar\",\"provider\":[{\"@id\":\"#fortmyers\"}],\"brand\":{\"@id\":\"#organization\"},\"name\":\"Residential Solar\",\"alternatename\":\"Residential Solar\",\"serviceType\":\"Residential Solar\",\"audience\":\"People looking to get Residential Solar Services\",\"url\":\"https://southfloridasolarco.com/residential-solar-fort-myers/\",\"description\":\"Once there was an idea that residential solar power was all about hippies aiming to live off grid.  Now as the cost, performance, and efficiency of solar power systems have evolved it is truly the case that solar power can offer benefits to any household.  You don’t have to cover the outside of your home in unsightly panels to get the benefits and you will see the difference in your utility bill from day one. Solar power is proving so popular that research suggests a new homeowner is going solar pretty much every 90 seconds. Every single day the sun puts out enough energy to power not just your home but the whole planet; so isn’t it about time you got your cut?\"}"
    ],
    "schemaMap": [
        {
            "url": "https://southfloridasolarco.com/",
            "indexMap": [
                0,
                1,
                2,
                3,
                4
            ]
        },
        {
            "url": "https://southfloridasolarco.com/about/",
            "indexMap": [
                0,
                1,
                2,
                3,
                4
            ]
        },
        {
            "url": "https://southfloridasolarco.com/fort-myers/",
            "indexMap": [
                2,
                0,
                1,
                3,
                4
            ]
        },
        {
            "url": "https://southfloridasolarco.com/cape-coral-solar-fort-myers/",
            "indexMap": [
                3,
                0,
                1,
                2,
                4
            ]
        },
        {
            "url": "https://southfloridasolarco.com/residential-solar-fort-myers/",
            "indexMap": [
                4,
                0,
                1,
                2,
                3
            ]
        }
    ]
}

function displayResults(data) {
    document.querySelector('#loading-text').style.display = 'none'
    document.querySelector('.results-view').style.display = 'inherit'

    data.schemaMap.forEach(map => {
        const resultGroup = document.createElement('div')
        resultGroup.className = 'result-group'

        const url = document.createElement('a')
        url.href = map.url
        url.innerHTML = map.url
        url.target = '_blank'
        resultGroup.appendChild(url)

        let schemaMarkup = ''

        map.indexMap.forEach(index => {
            schemaMarkup = schemaMarkup + `<!-- Schema for ${map.url}-->`
            schemaMarkup = schemaMarkup + `<script type="application/ld+json">${data.schemaMarkups[index]}</script>`
        })

        const schemaMarkupTextArea = document.createElement('textarea')
        schemaMarkupTextArea.readOnly = true
        schemaMarkupTextArea.cols = 30
        schemaMarkupTextArea.rows = 10
        schemaMarkupTextArea.innerHTML = schemaMarkup
        resultGroup.appendChild(schemaMarkupTextArea)

        const copyButton = document.createElement('span')
        copyButton.className = 'copy=button'
        copyButton.innerHTML = 'copy ⚡'
        copyButton.addEventListener('click', () =>{
            schemaMarkupTextArea.select()
            navigator.clipboard.writeText(schemaMarkupTextArea.value)
        })
        resultGroup.appendChild(copyButton)

        document.querySelector('.results-view').appendChild(resultGroup)

    })
}


function extractByLine(input) {
    const array = []
    input.split(/\n/).forEach(item => { if (item.trim() !== '') array.push(item.trim()) })
    return array
}