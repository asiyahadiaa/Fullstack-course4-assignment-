(function (global) {
  var dc = {};

  // REMOVED "snippets/" because your files are in the main list
  var homeHtml = "home-snippet.html"; 
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "menu-items-title.html";
  var categoryHtml = "category-snippet.html";

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var showLoading = function (selector) {
    // REMOVED "images/" prefix
    var html = "<div class='text-center'><img src='ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    // STEP 1: Fetch categories
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowHomeHTML, true);
  });

  function buildAndShowHomeHTML (categories) {
    $ajaxUtils.sendGetRequest(homeHtml, function (homeHtml) {
      // STEP 2: Choose a random category
      var randomCategoryIndex = Math.floor(Math.random() * categories.length);
      var randomCategoryShortName = categories[randomCategoryIndex].short_name;

      // STEP 3: Substitute placeholder
      var homeHtmlToInsertIntoMain = insertProperty(homeHtml, "randomCategoryShortName", "'" + randomCategoryShortName + "'");

      // STEP 4: Insert into page
      insertHtml("#main-content", homeHtmlToInsertIntoMain);
    }, false);
  }

  global.$dc = dc;
})(window);
