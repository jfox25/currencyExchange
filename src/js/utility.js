class ApiCall {
  static async get(url) {
    await fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        let isStored = storeData(response.json());
        return isStored;
      })
      .catch(function (error) {
        return error;
      });
  }
  storeData(response) {
    sessionStorage.setItem("Currencies", JSON.stringify(response));
    if (sessionStorage.getItem("Currencies")) {
      return true;
    }
    return false;
  }
  getData() {
    return sessionStorage.getItem("Currencies");
  }
}
