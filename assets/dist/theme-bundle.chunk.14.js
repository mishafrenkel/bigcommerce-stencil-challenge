(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _global_cart_preview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/cart-preview */ "./assets/js/theme/global/cart-preview.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







 // import {cartRemoveItem} from './cart';

var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category() {
    return _CatalogPage.apply(this, arguments) || this;
  }

  var _proto = Category.prototype;

  _proto.onReady = function onReady() {
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context.urls);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this); // this.getCart = this.getCart.bind(this);

    if (jquery__WEBPACK_IMPORTED_MODULE_7___default()("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["hooks"].on("sortBy-submitted", this.onSortBySubmit);
    }

    this.addProductToCart(112);
    this.removeAllItems();
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var $productListingContainer = jquery__WEBPACK_IMPORTED_MODULE_7___default()("#product-listing-container");
    var $facetedSearchContainer = jquery__WEBPACK_IMPORTED_MODULE_7___default()("#faceted-search-container");
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: "category/product-listing",
        sidebar: "category/sidebar"
      },
      showMore: "category/show-more"
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_5__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      jquery__WEBPACK_IMPORTED_MODULE_7___default()("body").triggerHandler("compareReset");
      jquery__WEBPACK_IMPORTED_MODULE_7___default()("html, body").animate({
        scrollTop: 0
      }, 100);
    });
  };

  _proto.addProductToCart = function addProductToCart() {
    var addBtn = jquery__WEBPACK_IMPORTED_MODULE_7___default()("#addAll");
    var productID = this.context.products[0].id;
    console.log(this.context.cart);
    var loadingClass = "is-loading";
    var $cart = jquery__WEBPACK_IMPORTED_MODULE_7___default()("[data-cart-preview]");
    var $cartDropdown = jquery__WEBPACK_IMPORTED_MODULE_7___default()("#cart-preview-dropdown");
    var $cartLoading = jquery__WEBPACK_IMPORTED_MODULE_7___default()('<div class="loadingOverlay"></div>');
    addBtn.on("click", function (e) {
      e.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_7___default.a.get("/cart.php?action=add&product_id=" + productID, function (d) {
        console.log("get fired, refreshing");
        window.location = "/special-items";
      });
    });
  } // $("#removeAll").click(() => {
  //   utils.api.cart.getCart({}, (err, response) => {
  //     console.log(response);
  //     console.log(err);
  //   });
  //   cartRemoveItem(112);
  //   //   cartRemoveItem(112);
  //   //   alert("Item removed");
  // });
  ;

  _proto.removeAllItems = function removeAllItems() {
    var removeBtn = jquery__WEBPACK_IMPORTED_MODULE_7___default()("#removeAll");
    removeBtn.on("click", function (e) {
      e.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getCart({}, function (err, response) {
        if (err) return console.log(err);
        var items = response["lineItems"]["physicalItems"];
        console.log(items);

        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          console.log(item);

          if (item["productId"] === 112) {
            var itemID = item["id"];
            _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.itemUpdate(itemID, 0, function (err, response) {
              if (err) {
                return console.log(err);
              }

              console.log('SUCCESSSSSSS\n', response);
              window.location = "/special-items";
            });
          }
        }
      });
    });
  } //   async addToAll(itemID, oldQty) {
  //     const productID = this.context.products[0].id;
  //     console.log('productID: ', productID);
  //     const cart = this.getCart();
  //     const newQty = oldQty + 10;
  //     const itemId = "bf973fde-6482-4696-bd2c-0b419c373fbc";
  //     // console.log("newQty: ", newQty);
  //     $("#addAll").click(() => {
  //       console.log("I was clicked");
  //       utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
  //         if (response.data.status === "succeed") {
  //           // if the quantity is changed "1" from "0", we have to remove the row.
  //           const remove = newQty === 0;
  //           this.refreshContent(remove);
  //         }
  //       });
  //       //   createCart(`/api/storefront/carts`, {
  //       //     lineItems: [
  //       //       {
  //       //         quantity: 1,
  //       //         productId: `${productID}`,
  //       //       },
  //       //     ],
  //       //   })
  //       //     .then((data) => console.log(JSON.stringify(data)))
  //       //     .catch((error) => console.error(error));
  //       //   $.get(`/cart.php?action=add&product_id=${productID}`);
  //       //   alert("You added an item to the shopping cart");
  //     });
  //   }
  //    getCart() {
  //      utils.api.cart.getCart({}, (err, response) => {
  //       console.table(response);
  //       return response;
  //     });
  //     // return response["lineItems"]["physicalItems"][0]["id"];
  //   }
  ;

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_3__["default"]);



function createCart(url, cartItems) {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cartItems)
  }).then(function (response) {
    return response.json();
  });
}

function addItem(itemID) {
  _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.itemUpdate(itemID, 2, function (err, response) {
    // this.$overlay.hide();
    if (err) {
      return console.log(err);
    }

    console.log("response", response);
  });
} // function cartRemoveItem(itemId) {
//   $.ajax({
//     url:
//       "https://frenkel-store.mybigcommerce.com/api/storefront/carts/56b705b3-66d9-4fe2-a80a-3a4cdc948249/items/112?itemId=112&include=lineItems.digitalItems.options%2ClineItems.physicalItems.options",
//     type: "DELETE",
//     success: function (result) {
//       // Do something with the result
//       alert("DELETED");
//     },
//   });
// }
// utils.api.cart.itemRemove(itemId, (err, response) => {
//     if (response.data.status === 'succeed') {
//         this.refreshContent(true);
//     } else {
//         alert(response.data.errors.join('\n'));
//     }
// })
//   var data = null;
//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;
//   xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === this.DONE) {
//       console.log(this.responseText);
//     }
//   });
//   xhr.open(
//     "DELETE",
//     "https://frenkel-store.mybigcommerce.com/api/storefront/carts/56b705b3-66d9-4fe2-a80a-3a4cdc948249/items/112?itemId=112&include=lineItems.digitalItems.options%2ClineItems.physicalItems.options",
//   );
//   xhr.send(data);
// }

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJvblJlYWR5IiwiY29tcGFyZVByb2R1Y3RzIiwiY29udGV4dCIsInVybHMiLCJhZGRQcm9kdWN0VG9DYXJ0IiwiYmluZCIsInJlbW92ZUFsbEl0ZW1zIiwiJCIsImxlbmd0aCIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJob29rcyIsIm9uIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiYWRkQnRuIiwicHJvZHVjdElEIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiY2FydCIsImxvYWRpbmdDbGFzcyIsIiRjYXJ0IiwiJGNhcnREcm9wZG93biIsIiRjYXJ0TG9hZGluZyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImdldCIsImQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbW92ZUJ0biIsInV0aWxzIiwiYXBpIiwiZ2V0Q2FydCIsImVyciIsInJlc3BvbnNlIiwiaXRlbXMiLCJpIiwiaXRlbSIsIml0ZW1JRCIsIml0ZW1VcGRhdGUiLCJDYXRhbG9nUGFnZSIsImNyZWF0ZUNhcnQiLCJ1cmwiLCJjYXJ0SXRlbXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5n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Q0EsUUFBSUQsR0FBSixFQUFTO0FBQ1AsYUFBT2pCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZ0IsR0FBWixDQUFQO0FBQ0Q7O0FBRURqQixXQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCaUIsUUFBeEI7QUFDRCxHQVBEO0FBUUQsQyxDQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsSSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gXCIuL2NhdGFsb2dcIjtcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSBcIi4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHNcIjtcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gXCIuL2NvbW1vbi9mYWNldGVkLXNlYXJjaFwiO1xuaW1wb3J0IENhcnRQcmV2aWV3IGZyb20gXCIuL2dsb2JhbC9jYXJ0LXByZXZpZXdcIjtcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHNcIjtcbi8vIGltcG9ydCB7Y2FydFJlbW92ZUl0ZW19IGZyb20gJy4vY2FydCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgb25SZWFkeSgpIHtcbiAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0LnVybHMpO1xuICAgIHRoaXMuYWRkUHJvZHVjdFRvQ2FydCA9IHRoaXMuYWRkUHJvZHVjdFRvQ2FydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVtb3ZlQWxsSXRlbXMgPSB0aGlzLnJlbW92ZUFsbEl0ZW1zLmJpbmQodGhpcyk7XG4gICAgLy8gdGhpcy5nZXRDYXJ0ID0gdGhpcy5nZXRDYXJ0LmJpbmQodGhpcyk7XG4gICAgaWYgKCQoXCIjZmFjZXRlZFNlYXJjaFwiKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICBob29rcy5vbihcInNvcnRCeS1zdWJtaXR0ZWRcIiwgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRQcm9kdWN0VG9DYXJ0KDExMik7XG4gICAgdGhpcy5yZW1vdmVBbGxJdGVtcygpO1xuICB9XG5cbiAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJChcIiNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyXCIpO1xuICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJChcIiNmYWNldGVkLXNlYXJjaC1jb250YWluZXJcIik7XG4gICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHByb2R1Y3RMaXN0aW5nOiBcImNhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZ1wiLFxuICAgICAgICBzaWRlYmFyOiBcImNhdGVnb3J5L3NpZGViYXJcIixcbiAgICAgIH0sXG4gICAgICBzaG93TW9yZTogXCJjYXRlZ29yeS9zaG93LW1vcmVcIixcbiAgICB9O1xuXG4gICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgJChcImJvZHlcIikudHJpZ2dlckhhbmRsZXIoXCJjb21wYXJlUmVzZXRcIik7XG5cbiAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIDEwMCxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQcm9kdWN0VG9DYXJ0KCkge1xuICAgIGNvbnN0IGFkZEJ0biA9ICQoXCIjYWRkQWxsXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJRCA9IHRoaXMuY29udGV4dC5wcm9kdWN0c1swXS5pZDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRleHQuY2FydCk7XG5cbiAgICBjb25zdCBsb2FkaW5nQ2xhc3MgPSBcImlzLWxvYWRpbmdcIjtcbiAgICBjb25zdCAkY2FydCA9ICQoXCJbZGF0YS1jYXJ0LXByZXZpZXddXCIpO1xuICAgIGNvbnN0ICRjYXJ0RHJvcGRvd24gPSAkKFwiI2NhcnQtcHJldmlldy1kcm9wZG93blwiKTtcbiAgICBjb25zdCAkY2FydExvYWRpbmcgPSAkKCc8ZGl2IGNsYXNzPVwibG9hZGluZ092ZXJsYXlcIj48L2Rpdj4nKTtcblxuICAgIGFkZEJ0bi5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICQuZ2V0KGAvY2FydC5waHA/YWN0aW9uPWFkZCZwcm9kdWN0X2lkPSR7cHJvZHVjdElEfWAsIChkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0IGZpcmVkLCByZWZyZXNoaW5nXCIpO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFwiL3NwZWNpYWwtaXRlbXNcIjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gJChcIiNyZW1vdmVBbGxcIikuY2xpY2soKCkgPT4ge1xuICAvLyAgIHV0aWxzLmFwaS5jYXJ0LmdldENhcnQoe30sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIC8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAvLyAgIH0pO1xuICAvLyAgIGNhcnRSZW1vdmVJdGVtKDExMik7XG4gIC8vICAgLy8gICBjYXJ0UmVtb3ZlSXRlbSgxMTIpO1xuICAvLyAgIC8vICAgYWxlcnQoXCJJdGVtIHJlbW92ZWRcIik7XG4gIC8vIH0pO1xuXG5cbiAgcmVtb3ZlQWxsSXRlbXMoKSB7XG4gICAgY29uc3QgcmVtb3ZlQnRuID0gJChcIiNyZW1vdmVBbGxcIik7XG5cbiAgICByZW1vdmVCdG4ub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q2FydCh7fSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gcmVzcG9uc2VbXCJsaW5lSXRlbXNcIl1bXCJwaHlzaWNhbEl0ZW1zXCJdO1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgY29uc29sZS5sb2coaXRlbSlcbiAgICAgICAgICBpZiAoaXRlbVtcInByb2R1Y3RJZFwiXSA9PT0gMTEyKSB7XG4gICAgICAgICAgICBsZXQgaXRlbUlEID0gaXRlbVtcImlkXCJdO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JRCwgMCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NVQ0NFU1NTU1NTU1xcbicsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCIvc3BlY2lhbC1pdGVtc1wiO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcblxuICB9XG4gIC8vICAgYXN5bmMgYWRkVG9BbGwoaXRlbUlELCBvbGRRdHkpIHtcbiAgLy8gICAgIGNvbnN0IHByb2R1Y3RJRCA9IHRoaXMuY29udGV4dC5wcm9kdWN0c1swXS5pZDtcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdwcm9kdWN0SUQ6ICcsIHByb2R1Y3RJRCk7XG4gIC8vICAgICBjb25zdCBjYXJ0ID0gdGhpcy5nZXRDYXJ0KCk7XG4gIC8vICAgICBjb25zdCBuZXdRdHkgPSBvbGRRdHkgKyAxMDtcbiAgLy8gICAgIGNvbnN0IGl0ZW1JZCA9IFwiYmY5NzNmZGUtNjQ4Mi00Njk2LWJkMmMtMGI0MTljMzczZmJjXCI7XG4gIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIm5ld1F0eTogXCIsIG5ld1F0eSk7XG4gIC8vICAgICAkKFwiI2FkZEFsbFwiKS5jbGljaygoKSA9PiB7XG4gIC8vICAgICAgIGNvbnNvbGUubG9nKFwiSSB3YXMgY2xpY2tlZFwiKTtcblxuICAvLyAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAvLyAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZWVkXCIpIHtcbiAgLy8gICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gIC8vICAgICAgICAgICBjb25zdCByZW1vdmUgPSBuZXdRdHkgPT09IDA7XG5cbiAgLy8gICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH0pO1xuICAvLyAgICAgICAvLyAgIGNyZWF0ZUNhcnQoYC9hcGkvc3RvcmVmcm9udC9jYXJ0c2AsIHtcbiAgLy8gICAgICAgLy8gICAgIGxpbmVJdGVtczogW1xuICAvLyAgICAgICAvLyAgICAgICB7XG4gIC8vICAgICAgIC8vICAgICAgICAgcXVhbnRpdHk6IDEsXG4gIC8vICAgICAgIC8vICAgICAgICAgcHJvZHVjdElkOiBgJHtwcm9kdWN0SUR9YCxcbiAgLy8gICAgICAgLy8gICAgICAgfSxcbiAgLy8gICAgICAgLy8gICAgIF0sXG4gIC8vICAgICAgIC8vICAgfSlcbiAgLy8gICAgICAgLy8gICAgIC50aGVuKChkYXRhKSA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSkpXG4gIC8vICAgICAgIC8vICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gIC8vICAgICAgIC8vICAgJC5nZXQoYC9jYXJ0LnBocD9hY3Rpb249YWRkJnByb2R1Y3RfaWQ9JHtwcm9kdWN0SUR9YCk7XG4gIC8vICAgICAgIC8vICAgYWxlcnQoXCJZb3UgYWRkZWQgYW4gaXRlbSB0byB0aGUgc2hvcHBpbmcgY2FydFwiKTtcbiAgLy8gICAgIH0pO1xuICAvLyAgIH1cblxuICAvLyAgICBnZXRDYXJ0KCkge1xuICAvLyAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENhcnQoe30sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gIC8vICAgICAgIGNvbnNvbGUudGFibGUocmVzcG9uc2UpO1xuICAvLyAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gIC8vICAgICB9KTtcblxuICAvLyAgICAgLy8gcmV0dXJuIHJlc3BvbnNlW1wibGluZUl0ZW1zXCJdW1wicGh5c2ljYWxJdGVtc1wiXVswXVtcImlkXCJdO1xuICAvLyAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2FydCh1cmwsIGNhcnRJdGVtcykge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcbiAgfSkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG59XG5cbmZ1bmN0aW9uIGFkZEl0ZW0oaXRlbUlEKSB7XG4gIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlELCAyLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgIC8vIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuICB9KTtcbn1cblxuLy8gZnVuY3Rpb24gY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4vLyAgICQuYWpheCh7XG4vLyAgICAgdXJsOlxuLy8gICAgICAgXCJodHRwczovL2ZyZW5rZWwtc3RvcmUubXliaWdjb21tZXJjZS5jb20vYXBpL3N0b3JlZnJvbnQvY2FydHMvNTZiNzA1YjMtNjZkOS00ZmUyLWE4MGEtM2E0Y2RjOTQ4MjQ5L2l0ZW1zLzExMj9pdGVtSWQ9MTEyJmluY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zJTJDbGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMub3B0aW9uc1wiLFxuLy8gICAgIHR5cGU6IFwiREVMRVRFXCIsXG4vLyAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuLy8gICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggdGhlIHJlc3VsdFxuXG4vLyAgICAgICBhbGVydChcIkRFTEVURURcIik7XG4vLyAgICAgfSxcbi8vICAgfSk7XG4vLyB9XG4vLyB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbi8vICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuLy8gICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGFsZXJ0KHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbi8vICAgICB9XG4vLyB9KVxuXG4vLyAgIHZhciBkYXRhID0gbnVsbDtcblxuLy8gICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4vLyAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4vLyAgIHhoci5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3BvbnNlVGV4dCk7XG4vLyAgICAgfVxuLy8gICB9KTtcblxuLy8gICB4aHIub3Blbihcbi8vICAgICBcIkRFTEVURVwiLFxuLy8gICAgIFwiaHR0cHM6Ly9mcmVua2VsLXN0b3JlLm15YmlnY29tbWVyY2UuY29tL2FwaS9zdG9yZWZyb250L2NhcnRzLzU2YjcwNWIzLTY2ZDktNGZlMi1hODBhLTNhNGNkYzk0ODI0OS9pdGVtcy8xMTI/aXRlbUlkPTExMiZpbmNsdWRlPWxpbmVJdGVtcy5kaWdpdGFsSXRlbXMub3B0aW9ucyUyQ2xpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnNcIixcbi8vICAgKTtcblxuLy8gICB4aHIuc2VuZChkYXRhKTtcbi8vIH1cbiJdLCJzb3VyY2VSb290IjoiIn0=