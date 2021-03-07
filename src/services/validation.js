export const validateNull = (str) => {
  if (str == null || str === '') {
    return false
  }
  return true
}

export const validateLength = (value, length) => {
  if (value == null) {
    return false
  }
  return (value.length <= length);
}

export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}

export const validatePassword = (password) => {
  return (password.length >= 6); 
}

export const validatePasswordConfirmation = (password, passwordConfirmation) => {
  return (password === passwordConfirmation);
}

export const validateTitle = (str) => {
  if (str == null) {
    return false
  }
  const strByteLength = getByteLength(str)
  return (strByteLength <= 60);
}

export const validateAmount = (str) => {
  const ret = perseStrToNumber(str)
  if (ret === false) {
    return false
  }
  return (ret >= 300 && ret <= 999999999);
}

export const validateQty = (str) => {
  const ret = perseStrToNumber(str)
  if (ret === false) {
    return false
  }
  return (ret > 0 && ret <= 999);
}

const getByteLength = (str) => {
  str = (str == null)? "" : str;
  return encodeURI(str).replace(/%../g, "*").length;
}

const perseStrToNumber = (str) => {
  if (str == null) {
    return false
  }
  try {
    return Number(str)
  } catch (error) {
    return false
  }
}

export const validateCategoryTitle  = (str) => {
  if(str == null || str.length < 2){
    return false;
  }
  return true
}
export const ImageValidation = (image) =>{
  if (image.match(/.(jpg|jpeg|png|gif)$/i)){
    return true
  }
  return false
}

export const validateUrl = (str) =>{
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  
}

export const validateYoutubeUrl = (url) =>{
  if (url !== undefined && url !== '' && url !==null ) {        
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return 'https://www.youtube.com/embed/' + match[2] 
    } else {
      return false
    }
  }
    if(url === '' || url === undefined || url === null){
      return true
    }
    else{
      return false
    }
}
