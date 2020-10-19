import {className} from '../js_modules/helper_functions.mjs';

const memeExe = {
  gallery: document.querySelector("#meme-gallery"),
  canvas: document.querySelector("#meme-canvas"),
  container: document.querySelector("#meme-container"),
  uploadBtn: document.querySelector("#meme-uploadBtn"),
  downloadBtn: document.querySelector("#meme-downloadBtn"),
  imageEles: document.querySelectorAll(".thumb"),
  textTop: document.querySelector(".canvas-text--top"),
  textBtm: document.querySelector(".canvas-text--bottom"),
  memeText: document.querySelectorAll(".input-text"),
  get ctx() {
    return this.canvas.getContext("2d");
  }
}

//helper functions
memeExe.helperFunc = {};

memeExe.helperFunc.extractSrcFromUrl = function(imageEle) {
  if(imageEle) {
    return imageEle.style.backgroundImage.slice(4, -1).replace(/"/g, "");
  }
}


//render selected gallery image onto canvas
memeExe.renderMemeToCanvas = function(event) {
  var image = new Image();
  image.onload = memeExe.drawMeme;
  image.src = memeExe.helperFunc.extractSrcFromUrl(event.target);
 
  if(event.target.className === "thumb") {
    memeExe.toggleActive(event.target);
  }  
}


memeExe.toggleActive = function(element) {
  var activeCls = document.body.querySelector(".active");
  if(activeCls) {
    className.remove(activeCls, "active");
  }
  className.add(element, "active");
}


memeExe.drawMeme = function() {
  var meme = memeExe.setMemeSize(this.width, this.height, 300, 300);

  //set canvas container same as meme dimensions
  memeExe.canvas.width = meme.width;
  memeExe.canvas.height = meme.height;

  memeExe.container.width = meme.width;
  memeExe.container.height = meme.height;

  memeExe.ctx.drawImage(this, 0, 0, meme.width, meme.height);
  
  memeExe.drawText(memeExe.textTop.value, "top", window.getComputedStyle(memeExe.textTop).fontSize);
  memeExe.drawText(memeExe.textBtm.value, "bottom", window.getComputedStyle(memeExe.textBtm).fontSize);
}


memeExe.drawText = function(text, pos, font){
  var copy = text.toUpperCase(),
  yPos = "",
  xPos = "";

  switch (pos) {
    case 'top': 
      xPos = (memeExe.textTop.clientWidth/2)+1;
      yPos = memeExe.textTop.offsetTop+10;
      break;
    
    case 'bottom':
      xPos = (memeExe.textBtm.clientWidth/2)+1;
      yPos = memeExe.textBtm.offsetTop+10;
      break;
  }
  
  memeExe.ctx.textBaseline = 'top';
  memeExe.ctx.textAlign = 'center';
  memeExe.ctx.font = 'bold '+font+' Helvetica';
  memeExe.ctx.shadowColor="#000";
  memeExe.ctx.shadowOffsetX=2;
  memeExe.ctx.shadowOffsetY=2;
  memeExe.ctx.shadowBlur=0;
  memeExe.ctx.fillStyle = '#fff';
  memeExe.ctx.fillText(copy, xPos, yPos);  
}



memeExe.updateMeme = function() {
  setTimeout(function(){
    var image = new Image();
    image.onload = memeExe.drawMeme;
    var activeCls = document.querySelector(".active");
    image.src = memeExe.helperFunc.extractSrcFromUrl(activeCls);
  }, 1);
}


memeExe.setMemeSize = function(memeWidth, memeHeight, targetWidth, targetHeight) {
  var result = { width:0, height:0 };
  var ratio = memeWidth / memeHeight;

  //set width to height proportion
  result.width = targetWidth;
  result.height = targetHeight / ratio;

  //if calculated height is more than target height, set width proportionally
  if (result.height > targetHeight) {
    result.height = targetHeight;
    result.width = targetWidth * ratio;
  }
  return result;
}


//user meme upload 
memeExe.validateAndUploadMeme = function(event) {
  var memeFile = event.target.files[0];
  var validfileTypes = ["image/png", "image/jpg","image/jpeg"];
  if(memeFile && validfileTypes.includes(memeFile.type)) {
    var image = new Image(),
    URL = window.URL || window.webkitURL; 
    image.onload = memeExe.drawMeme;
    image.src = URL.createObjectURL(memeFile);
    memeExe.appendMemeUploadToGallery(image);
  }
}


memeExe.downloadMeme = function() {
  var imageUrl = memeExe.canvas.toDataURL("image/png")
                .replace("image/png", "image/octet-stream"); 
  memeExe.downloadBtn.setAttribute("href", imageUrl);
}


memeExe.appendMemeUploadToGallery = function(uploadImage) {
  var src = uploadImage.src;
  var newEle = '';
  newEle = document.createElement("div");
  newEle.style.backgroundImage = `url('${src}')`;
  newEle.className = "thumb";
  memeExe.gallery.insertBefore(newEle, memeExe.gallery.childNodes[0]);
  memeExe.gallery.removeChild(memeExe.gallery.lastElementChild);
  memeExe.toggleActive(newEle);
}

memeExe.shrinkToFill = function() {
  var inputLength = this.value.length,
  width = this.clientWidth,
  maxSize = width == 300? 43:35,
  initialSize = maxSize - inputLength,
  initialSize=initialSize<=11?11:initialSize;
  this.style.fontSize = initialSize + "px";
}

memeExe.listeners = function() {
  memeExe.gallery.addEventListener("click", memeExe.renderMemeToCanvas);
  memeExe.uploadBtn.addEventListener("change", memeExe.validateAndUploadMeme);
  memeExe.downloadBtn.addEventListener("click", memeExe.downloadMeme);
  Array.from(memeExe.memeText).forEach(text => {
    text.addEventListener("keydown", memeExe.updateMeme);
    text.addEventListener("keydown", memeExe.shrinkToFill);
    text.addEventListener("keyup", memeExe.updateMeme);
    text.addEventListener("focus", memeExe.updateMeme);  
});
}();
 


//render first image on canvas 
(function(){
  window.onload = function() {
  var image = new Image();
    image.onload = memeExe.drawMeme;
    image.src = memeExe.helperFunc.extractSrcFromUrl(memeExe.gallery.firstElementChild)
  memeExe.toggleActive(memeExe.gallery.firstElementChild);
};
})();