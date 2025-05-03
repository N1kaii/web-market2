'use strict'

const catalog = document.getElementById("catalog")

fetch("./data/prodction.json").then( uploadProducts )

function uploadProducts(data){
    data.json().then( getProducts )
}

function getProducts(data){
    for(let guitarName in data){
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
       
   const descriotionDiv = getDescriptionDiv(guitarData)
   guitarCard.append(descriotionDiv)
       
   return guitarCard
}


function getImagesSlider(imagesList){
    
    const imagesSlider = document.createElement('div')
    imagesSlider = 'slider-wrapper'
    
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
                images[image.length - 1].classList.add('visible')
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
                images[image.length + 1].classList.add('visible')
            }
            index = images.length
        }
        index++
    }
}