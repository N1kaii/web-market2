'use strict'

const catalog = document.getElementById("catalog")

const cartProductCounter = document.getElementById("cartCounter")

fetch("./data/prodction.json").then( uploadProducts )

function uploadProducts(data){
    data.json().then( getProducts )
}


function getProducts(data){
    for(let guitarName in data) {
        const guitarData = data[guitarName]
        const guitarCard = getProductCard(guitarName, guitarData)
        catalog.append(guitarCard)
    }
}


function getProductCard(guitarName, guitarData){
    const guitarCard = document.createElement('div')
    guitarCard.className = "guitar-card"
        
    const cardTitle = document.createElement('h4')
    cardTitle.innerText = guitarName
    guitarCard.append(cardTitle)
           
    const cardImagesSlider = getImagesSlider(guitarData.images)
    guitarCard.append(cardImagesSlider)
        
    const descriptionDiv = getDescriptionDiv(guitarData)
    guitarCard.append(descriptionDiv)
        
    return guitarCard
}


//LOcal Storage
let order = {}
let storageData = localStorage.getItem('order')
if(storageData) {
    order = JSON.parse(storageData)
    
    let count = 0
    for(let productName in order){
        count += order[productName]
    }
    cartProductCounter.innerText = count
}

function updateLocalStorage() {
    const storageData = JSON.stringify(order)
    localStorage.setItem('order', storageData)
}

function updateCartCounter(value) {
    const count = +cartProductCounter.innerText
    cartProductCounter.innerText = count + value
}

function orderAdd(productKey) {
    if (productKey in order){
        order[productKey]++
    } else {
        order[productKey] = 1
    }
    updateLocalStorage()
    updateCartCounter(1)
    return order[productKey]
}

function orderRemove(productKey){
    if(productKey in order === false){
        return 0
    }

    order[productKey]--
    updateCartCounter(-1)

    const count = order[productKey]
    if (count === 0){
        delete order[productKey]
    }

    updateLocalStorage()
    return count
}

function getDescriptionDiv(guitarName, guitarData){
    const descriptionDiv = document.createElement('div')
    descriptionDiv.className = "description"

    const productOrderDiv = getProductOrderDiv(guitarName)
    descriptionDiv.append(productOrderDiv)

    return descriptionDiv
}

function getProductOrderDiv(guitarName) {
    const orderDiv = document.createElement('div')
    orderDiv.className = 'order'

    const firstButton = document.createElement('button')
    firstButton.innerText = 'В КОРЗИНУ'
    firstButton.onclick = () => {
        const counter = orderAdd(guitarName)
        updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton)
    }
    orderDiv.append(firstButton)


    const removeButton = document.createElement('button')
    removeButton.className = 'change-order-button'
    removeButton.innerText = '-'
    removeButton.onclick = () => {
        const counter = orderRemove(guitarName)
        updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton)
    }
    orderDiv.append(removeButton)

    const counterSpan = document.createElement('span')
    counterSpan.className = 'order-counter'
    counterSpan.innerText = 0
    orderDiv.append(counterSpan)


    const addButton = document.createElement('button')
    addButton.className = 'change-order-button'
    addButton.innerText = '+'
    addButton.onclick = () => {
        const counter = orderAdd(guitarName)

        updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton)
    }
    orderDiv.append(addButton)


    let counter = 0
    if (guitarName in order) {
        counter = order[guitarName]
    }
    updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton)

    return orderDiv
}

function updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton){
    counterSpan.innerText = counter

    if (counter > 0) {
        firstButton.style.display = 'none'
        removeButton.style.display = 'inline'
        counterSpan.style.display = 'inline'
        addButton.style.display = 'inline'
    } else {
        firstButton.style.display = 'inline'
        removeButton.style.display = 'none'
        counterSpan.style.display = 'none'
        addButton.style.display = 'none'
    }
}








function getImagesSlider(imagesList){
    
    const imagesSlider = document.createElement('div')
    imagesSlider.className = 'slider-wrapper'
    
    for(let i = 0; i < imagesList.length; i++) {
        const image = new Image()
        image.src = './images/' + imagesList[i]
        if (i === 0){
            image.className = 'slide-image visible'
        } else{
            image.className = 'slide-image'
        }
        imagesSlider.append(image)
    }

    if(imagesList.length > 1){
        const arrowForward = new Image()
        arrowForward.src = './images/arrow_forward.svg'
        arrowForward.className = "arrow forward"
        arrowForward.onclick = () => showForwardImage(imagesSlider)
        imagesSlider.append(arrowForward)

        const arrowBack = new Image()
        arrowBack.src = './images/arrow_back.svg'
        arrowBack.className = "arrow back"
        arrowBack.onclick = () => showBackImage(imagesSlider)
        imagesSlider.append(arrowBack)
    }
    
    return imagesSlider
}

function showBackImage(slider) {
    const images = slider.querySelectorAll('.slide-image')
    let index = 0
    while (index <  images.length) {
        if (images[index].classList.contains('visible')){
            images[index].classList.remove('visible')
            if(index > 0){
                images[index - 1].classList.add('visible')
            } else {
                images[images.length - 1].classList.add('visible')
            }
            index = images.length
        }
        index++
    }
}

function showForwardImage(slider) {
    const images = slider.querySelectorAll('.slide-image')
    let index = 0
    while (index <  images.length) {
        if (images[index].classList.contains('visible')){
            images[index].classList.remove('visible')
            if(index === images.length - 1){
                images[0].classList.add('visible')
            } else {
                images[index+ 1].classList.add('visible')
            }
            index = images.length
        }
        index++
    }
}
