import { hooks } from "@bigcommerce/stencil-utils";
import CatalogPage from "./catalog";
import compareProducts from "./global/compare-products";
import FacetedSearch from "./common/faceted-search";
import CartPreview from "./global/cart-preview";
import $ from "jquery";
import utils from "@bigcommerce/stencil-utils";
import { find } from "core-js/fn/array";
// import {cartRemoveItem} from './cart';
export default class Category extends CatalogPage {
  onReady() {
    compareProducts(this.context.urls);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    this.hoverOnImage = this.hoverOnImage.bind(this);
    // this.hideRemoveButton = this.hideRemoveButton.bind(this);
    // this.getCart = this.getCart.bind(this);
    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      hooks.on("sortBy-submitted", this.onSortBySubmit);
    }

    this.addProductToCart();
    this.removeAllItems();
    this.hoverOnImage();
    console.log("context", this.context.products);
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

    addBtn.on("click", (e) => {
      e.preventDefault();
      $.get(`/cart.php?action=add&product_id=${productID}`, (d) => {
        console.log("get fired, refreshing");

        window.location = "/special-items";
      });
    });
  }

  hoverOnImage() {
    var mainImages = [];
    var rollOvers = [];
    this.context.products.forEach(function (e, i) {
      if (e.images[0]) {
        mainImages[e.id] = e.images[0].data;
      }
      if (e.images[1]) {
        rollOvers[e.id] = e.images[1].data;
      }
    });

    $(".product")
      .mouseover("#hoverHide", function () {
        console.log("mouseover");
        $(this).find("img#hoverHide").hide();
        // $(".card-img-container").find("img#hoverDisplay").show();
        $(".card-img-container").find("img#hoverDisplay").css('display', 'block');
      })
      .mouseout("#hoverDisplay", function () {
        $(this).find("img#hoverHide").show();
        $(".card-img-container").find("img#hoverDisplay").hide().css('display', 'none');
        // $(".alternate-image-container").hide();
      });

    const image = $(".product").find("img");

  }

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
          console.log(item);
          if (item["productId"] === 112) {
            let itemID = item["id"];

            utils.api.cart.itemUpdate(itemID, 0, (err, response) => {
              if (err) {
                return console.log(err);
              }

              console.log("SUCCESSSSSSS\n", response);
              window.location = "/special-items";
            });
          }
        }
      });
    });
  }
}
