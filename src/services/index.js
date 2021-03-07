import Compress from "compress.js";

export async function resizeImagecompress(file, height, width) {
  const compress = new Compress();
  const resizedImage = await compress.compress([file], {
    size: 2, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: width, // the max width of the output image, defaults to 1920px
    maxHeight: height, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
  });
  const img = resizedImage[0];
  const base64str = img.data;
  return base64str;
}

export function imageCoverter(image) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    try {
      reader.readAsDataURL(image);
    } catch (error) {
      window.location.reload();
    }
  }).then((response) => response);
}

//base64 to file conversion
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

//image resize and return with file/base64 based on condition
export const imageResize = (e, FIXED_HEIGHT, FIXED_WIDTH, type) => {
  var file = e;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      var img = document.createElement("img");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > FIXED_WIDTH) {
            height = FIXED_HEIGHT;
            width = FIXED_WIDTH;
          } else {
            height = FIXED_HEIGHT;
            width = FIXED_WIDTH;
          }
        } else {
          if (height > FIXED_HEIGHT) {
            width = FIXED_WIDTH;
            height = FIXED_HEIGHT;
          } else {
            width = FIXED_WIDTH;
            height = FIXED_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        let convert = canvas.toDataURL("image/png", 0.1);
        resolve(convert);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }).then((response) => {
    var file = dataURLtoFile(response, e.name);
    if (type === "file"){
      return file;
    }
    else{
      return response
    }
    
  });
};
