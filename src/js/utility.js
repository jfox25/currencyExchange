export class ApiCall {
  static get(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
  static async getData() {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
    if (sessionStorage.getItem(`Currencies`) !== null) {
      const stringData = sessionStorage.getItem(`Currencies`);
      return JSON.parse(stringData);
    } else {
      const response = await ApiCall.get(url);
      if (response instanceof Error) {
        return response;
      } else {
        sessionStorage.setItem(
          `Currencies`,
          JSON.stringify(response.conversion_rates)
        );
        return response.conversion_rates;
      }
    }
  }
}
