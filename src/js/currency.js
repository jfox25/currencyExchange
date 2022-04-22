export class Currency {
  static calculateRates(rates, amount) {
    const valueArray = [];
    Object.keys(rates).forEach((key) => {
      valueArray.push([key, parseInt(rates[key]) * amount]);
    });
    return valueArray;
  }
  static getCurrencyCodes(rates) {
    const codeArray = [];
    Object.keys(rates).forEach((key) => {
      codeArray.push(key);
    });
    return codeArray;
  }
}
