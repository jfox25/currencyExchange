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
async function buildSelects() {
  const rates = await ApiCall.getData();
  const codes = Currency.getCurrencyCodes(rates);
  for (let i = 0; i < codes.length; i++) {
    $("#from-code-select").append(
      `<option val='${codes[i]}'>${codes[i]}</option>`
    );
    $("#target-code-select").append(
      `<option val='${codes[i]}'>${codes[i]}</option>`
    );
  }
}
async function getData(amount, userCode, output) {
  const rates = await ApiCall.getData();
  const isValidationError = userValidation(rates, userCode, output);
  if (!isValidationError) {
    const isError = errorHandling(output, rates);
    if (!isError) {
      const values = Currency.calculateRates(rates, amount);
      displayRates(values, output, userCode);
    }
  }
}
function displayRates(values, output, userCode) {
  values.forEach((value) => {
    $(output).append(`<li class='rate-item'>${value[0]}: $${value[1]}`);
    if (value[0] === userCode) {
      $("#target-output").text(`${value[0]}: $${value[1]}`);
    }
  });
}
$(document).ready(function () {
  buildSelects();
  $("#currency-form").submit(function (event) {
    event.preventDefault();
    const code = $("#from-code-select").val();
    const amount = parseInt($("#amount-input").val());
    const output = $("#output");
    $(output).text("");
    getData(amount, code, output);
  });
});
