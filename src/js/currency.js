export class Currency {
  static calculateRates(rates, amount) {
    const valueArray = [];
    Object.keys(rates).forEach((key) => {
      valueArray.push([key, parseInt(rates[key]) * amount]);
    });
    return valueArray;
  }
}
