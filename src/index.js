import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { ApiCall } from "./js/utility";
import { Currency } from "./js/currency";
function errorHandling(element, response) {
  if (response instanceof Error) {
    $(element).text("");
    $(element).append(
      `<p class='error'>There was an error getting this data from api<p><p class='error'>Error Code:${response.statusCode}`
    );
    return true;
  } else {
    return false;
  }
}
function userValidation(rates, userCode, output) {
  const isError = errorHandling(output, rates);
  if (!isError) {
    const codes = Currency.getCurrencyCodes(rates);
    for (let i = 0; i < codes.length; i++) {
      if (codes[i] === userCode) {
        return false;
      }
    }
    $(output).append(
      "<p class='error'>This currency code is not supported, please enter a supported code<p>"
    );
    return true;
  }
}
async function getData(amount, url, userCode, output) {
  const rates = await ApiCall.getData(url);
  const isValidationError = userValidation(rates, userCode, output);
  if (!isValidationError) {
    const isError = errorHandling(output, rates);
    if (!isError) {
      const values = Currency.calculateRates(rates, amount);
      displayRates(values, output);
    }
  }
}
function clearFields(output) {
  $(output).text("");
  $("#amount-input").val("");
}
function displayRates(values, element) {
  values.forEach((value) => {
    $(element).append(`<li class='rate-item'>${value[0]}: ${value[1]}`);
  });
}
$(document).ready(function () {
  $("#currency-form").submit(function (event) {
    event.preventDefault();
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
    const code = $("#code-select").val();
    const amount = parseInt($("#amount-input").val());
    const output = $("#output");
    clearFields(output);
    getData(amount, url, code, output);
  });
});
