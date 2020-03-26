function showImage(imageUri) {
    let image = document.createElement("img");
    image.src = imageUri;
    document.getElementById('body').appendChild(image);
}

browser.runtime.onMessage.addListener(showImage);