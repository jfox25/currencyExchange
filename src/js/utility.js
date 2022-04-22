export class ApiCall {
  static get(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
  static storeData(data) {
    sessionStorage.setItem("Currencies", JSON.stringify(data.conversion_rates));
  }
  static async getData() {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
    if (sessionStorage.getItem("Currencies") !== null) {
      console.log("Using cashing");
      const stringData = sessionStorage.getItem("Currencies");
      return JSON.parse(stringData);
    } else {
      const response = await ApiCall.get(url);
      if (response instanceof Error) {
        return response;
      } else {
        ApiCall.storeData(response);
        return response.conversion_rates;
      }
    }
  }
}
