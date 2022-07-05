const getTables = async () => {
    const getData = sessionStorage.getItem('tokenUser');
    if(getData === null){
      return null;
    }else{
      const accesToken = JSON.parse(getData).access_token;
      const getMesa = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/tables', {
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `Bearer ${accesToken}`
      }
    });
    const getMesaResponse = await getMesa.json();
    const MesaResponse = Object.values(getMesaResponse);
    return MesaResponse;
    }
  }
  
  export default getTables