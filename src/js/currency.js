export class Currency {
  static calculateRates(rates, value) {
    Object.keys(rates).forEach((key) => {
      console.log(key, rates[key]);
    });
  }
}
