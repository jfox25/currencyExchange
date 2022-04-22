import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { ApiCall } from "./js/utility";
import { Currency } from "./js/currency";
async function getData() {
  const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
  const response = await ApiCall.get(url);
  ApiCall.storeData(response);
  const rates = ApiCall.getData();
  Currency.calculateRates(rates);
}
$(document).ready(function () {
  $("#currency-form").submit(function (event) {
    event.preventDefault();
    getData();
    // const code = $("#code-select").val();
  });
});
