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
  static getData() {
    const stringData = sessionStorage.getItem("Currencies");
    return JSON.parse(stringData);
  }
}
