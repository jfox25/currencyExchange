import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { ApiCall } from "./js/utility";
import { Currency } from "./js/currency";
async function getData(amount) {
  const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
  const rates = await ApiCall.getData(url);
  console.log(rates);
  const values = Currency.calculateRates(rates, amount);
  displayRates(values);
}
function clearFields() {
  $("#output").text("");
  $("#amount-input").val("");
}
function displayRates(values) {
  const output = $("#output");
  values.forEach((value) => {
    $(output).append(`<li class='rate-item'>${value[0]}: ${value[1]}`);
  });
}
$(document).ready(function () {
  $("#currency-form").submit(function (event) {
    event.preventDefault();
    // const code = $("#code-select").val();
    const amount = parseInt($("#amount-input").val());
    clearFields();
    getData(amount);
  });
});
