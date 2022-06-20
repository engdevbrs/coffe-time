const getMenu = async () => {
  const getCartera = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/menus', {
  method: 'GET',
  headers: {
    'Accept':'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});
const getCarteraResponse = await getCartera.json();
const carteraResponse = Object.entries(getCarteraResponse);
return carteraResponse;
}

export default getMenu