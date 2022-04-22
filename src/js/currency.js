// import { ApiCall } from "./js/utility";

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
  // static async calculateSpecificRate(userRate, targetRate, rates, ammount) {
  //   let userRateValue;
  //   let targetRateValue;
  //   Object.keys(rates).forEach((key) => {
  //     if (key === userRate) {
  //       userRateValue = rates[key];
  //     } else if (key === targetRate) {
  //       targetRateValue = rates[key];
  //     }
  //   });
  // }
}
