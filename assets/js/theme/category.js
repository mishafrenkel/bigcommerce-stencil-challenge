import { hooks } from "@bigcommerce/stencil-utils";
import CatalogPage from "./catalog";
import compareProducts from "./global/compare-products";
import FacetedSearch from "./common/faceted-search";
import CartPreview from "./global/cart-preview";
import $ from "jquery";
import utils from "@bigcommerce/stencil-utils";
// import {cartRemoveItem} from './cart';
export default class Category extends CatalogPage {
  onReady() {
    compareProducts(this.context.urls);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    // this.getCart = this.getCart.bind(this);
    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      hooks.on("sortBy-submitted", this.onSortBySubmit);
    }

    this.addProductToCart(112);
    this.removeAllItems();
  }

  initFacetedSearch() {
    const $productListingContainer = $("#product-listing-container");
    const $facetedSearchContainer = $("#faceted-search-container");
    const productsPerPage = this.context.categoryProductsPerPage;
    const requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage,
          },
        },
      },
      template: {
        productListing: "category/product-listing",
        sidebar: "category/sidebar",
      },
      showMore: "category/show-more",
    };

    this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);

      $("body").triggerHandler("compareReset");

      $("html, body").animate(
        {
          scrollTop: 0,
        },
        100,
      );
    });
  }

  addProductToCart() {
    const addBtn = $("#addAll");
    const productID = this.context.products[0].id;
    console.log(this.context.cart);

    const loadingClass = "is-loading";
    const $cart = $("[data-cart-preview]");
    const $cartDropdown = $("#cart-preview-dropdown");
    const $cartLoading = $('<div class="loadingOverlay"></div>');

    addBtn.on("click", (e) => {
      e.preventDefault();

      $.get(`/cart.php?action=add&product_id=${productID}`, (d) => {
        console.log("get fired, refreshing");

        window.location = "/special-items";
      });
    });
  }

  // $("#removeAll").click(() => {
  //   utils.api.cart.getCart({}, (err, response) => {
  //     console.log(response);
  //     console.log(err);
  //   });
  //   cartRemoveItem(112);
  //   //   cartRemoveItem(112);
  //   //   alert("Item removed");
  // });


  removeAllItems() {
    const removeBtn = $("#removeAll");

    removeBtn.on("click", (e) => {
      e.preventDefault();
      utils.api.cart.getCart({}, (err, response) => {
        if (err) return console.log(err);
        const items = response["lineItems"]["physicalItems"];
        console.log(items);

        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          console.log(item)
          if (item["productId"] === 112) {
            let itemID = item["id"];

            utils.api.cart.itemUpdate(itemID, 0, (err, response) => {
              if (err) {
                return console.log(err);
              }

              console.log('SUCCESSSSSSS\n', response);
              window.location = "/special-items";
            })

          }
        }
      });
    })

  }
  //   async addToAll(itemID, oldQty) {
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
}

function createCart(url, cartItems) {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItems),
  }).then((response) => response.json());
}

function addItem(itemID) {
  utils.api.cart.itemUpdate(itemID, 2, (err, response) => {
    // this.$overlay.hide();
    if (err) {
      return console.log(err);
    }

    console.log("response", response);
  });
}

// function cartRemoveItem(itemId) {
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
