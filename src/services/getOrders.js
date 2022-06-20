const getOrders = async () => {
    const getData = localStorage.getItem('tokenUser');
    const accesToken = JSON.parse(getData).access_token;
    const getPedido = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/orders', {
    method: 'GET',
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : `Bearer ${accesToken}`
    }
  });
  const getPedidoResponse = await getPedido.json();
  const PedidoResponse = Object.values(getPedidoResponse);
  return PedidoResponse;
  }
  
  export default getOrders