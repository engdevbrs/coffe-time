const getUsers = async () => {
    const getToken = localStorage.getItem('tokenUser');
    const accesToken = JSON.parse(getToken).access_token;
    const getUser = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users', {
    method: 'GET',
    headers: {
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `Bearer ${accesToken}`
        }
    });
    const getUserResponse = await getUser.json();
    return getUserResponse;
  }
  
  export default getUsers