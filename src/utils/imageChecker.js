const isImageURLValid = (url) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve(true); // Image URL is valid
    img.onerror = () => resolve(false); // Image URL is invalid

    img.src = url;
  });
};

async function checkImageURL(url) {
  const isValid = await isImageURLValid(url);
  console.log(isValid, url);
  return isValid;
}
export default checkImageURL;
