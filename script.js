(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var allCategoriesUrl = 
  "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
var categoriesTitleHtml = "snippets/menu-items-title.html";
var categoryHtml = "snippets/category-snippet.html";

// Convenience function for inserting innerHTML for 'selector'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}' with 'propValue' in 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// TODO: STEP 1: Use $ajaxUtils to send a GET request to allCategoriesUrl
$ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowHomeHTML, true); 
});

// Builds HTML for the home page based on categories array returned from the server.
function buildAndShowHomeHTML (categories) {

  // Load home snippet page
  $ajaxUtils.sendGetRequest(homeHtml, function (homeHtml) {

    // TODO: STEP 2: Choose a random category
    var randomCategoryIndex = Math.floor(Math.random() * categories.length);
    var randomCategoryShortName = categories[randomCategoryIndex].short_name;

    // TODO: STEP 3: Substitute {{randomCategoryShortName}} with the random category
    var homeHtmlToInsertIntoMain = insertProperty(homeHtml, "randomCategoryShortName", "'" + randomCategoryShortName + "'");

    // TODO: STEP 4: Insert the produced HTML into the main page
    insertHtml("#main-content", homeHtmlToInsertIntoMain);

  }, false); // False because we don't want it to process as JSON
}

global.$dc = dc;

})(window);
