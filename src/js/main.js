// TOAST NOTIFICATIONS
let toast = $("div#toast");
let toast_img = $("div#toast-img");
let toast_icon = $("img#toast-icon");
let toast_desc = $("div#toast-desc");
let alert_types = "success info warning error";
let launch_toast = (data) => {
  toast_img.addClass(data.type);
  toast_icon
    .attr("src", "src/img/" + data.type + ".png")
    .attr("alt", data.type)
    .attr("title", data.type);
  toast_desc.html(data.message).removeClass(alert_types).addClass(data.type);
  toast.addClass("show");
  setTimeout(() => {
    toast.removeClass("show " + alert_types);
    toast_img.removeClass(alert_types);
    toast_icon
      .attr("src", "src/img/info.png")
      .attr("alt", "Info")
      .attr("title", "Info");
    toast_desc.html("");
  }, 5000);
};
// TOAST NOTIFICATIONS

// HELPER FUNCS
let toInt = (num) => {
  let parsed = parseInt(num);
  return !isNaN(parsed) ? parsed : 0;
};
let isEmail = (email) => {
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

let htmlEncode = (str) => {
  return String(str).replace(/[^\w. ]/gi, (c) => {
    return "&#" + c.charCodeAt(0) + ";";
  });
};
// HELPER FUNCS

// CONTACT FORM
let contact_form = $("form#contact-form");

contact_form.on("submit", (obj) => {
  obj.preventDefault();
  let name = $("input#name").val();
  let email = $("input#email").val();
  let message = $("textarea#message").val();
  let confirmation = $("input#confirmation");
  let name_valid = $("span#name-valid");
  let name_invalid = $("span#name-invalid");
  let email_valid = $("span#email-valid");
  let email_invalid = $("span#email-invalid");
  let message_valid = $("span#message-valid");
  let message_invalid = $("span#message-invalid");
  let confirmation_valid = $("span#confirmation-valid");
  let confirmation_invalid = $("span#confirmation-invalid");
  let valid_elems = [
    name_valid,
    email_valid,
    message_valid,
    confirmation_valid,
  ];
  let invalid_elems = [
    name_invalid,
    email_invalid,
    message_invalid,
    confirmation_invalid,
  ];
  let validation_elems = [];
  let i;
  let error_values = [];
  if (!name) {
    name_invalid.removeClass("hide");
    name_valid.addClass("hide");
    error_values.push("name");
  } else {
    name_valid.removeClass("hide");
    name_invalid.addClass("hide");
  }
  if (!email || !isEmail(email)) {
    email_invalid.removeClass("hide");
    email_valid.addClass("hide");
    error_values.push("email");
  } else {
    email_valid.removeClass("hide");
    email_invalid.addClass("hide");
  }
  if (!message) {
    message_invalid.removeClass("hide");
    message_valid.addClass("hide");
    error_values.push("message");
  } else {
    message_valid.removeClass("hide");
    message_invalid.addClass("hide");
  }
  if (!confirmation.is(":checked")) {
    confirmation_invalid.removeClass("hide");
    confirmation_valid.addClass("hide");
    error_values.push("confirmation");
  } else {
    confirmation_valid.removeClass("hide");
    confirmation_invalid.addClass("hide");
  }
  if (error_values.length > 0) {
    launch_toast({
      type: "error",
      message: "You didn't enter a valid " + error_values.join(", "),
    });
    return false;
  }
  for (i of valid_elems) {
    i.removeClass("hide");
    validation_elems.push(i);
  }
  for (i of invalid_elems) {
    i.addClass("hide");
    validation_elems.push(i);
  }
  let data = "name=" + name + "&email=" + email + "&message=" + message;
  $.ajax({
    url: "/",
    type: "get",
    data: data,
    success: () => {
      update_form_output(name, email, message);
      launch_toast({
        type: "success",
        message: "Your message has been sent",
      });
      setTimeout(() => {
        for (i of validation_elems) {
          i.fadeOut("medium");
        }
      }, 5000);
    },
    error: (resp) => {
      console.error(resp);
    },
  });
  return true;
});
// CONTACT FORM

// CONTACT FORM OUTPUT
let update_form_output = (name, email, message) => {
  let output_row = $("div#form-response");
  let name_output = $("span#name-output");
  let email_output = $("span#email-output");
  let message_output = $("span#message-output");
  name_output.html(htmlEncode(name));
  email_output.html(htmlEncode(email));
  message_output.html(htmlEncode(message));
  output_row.hide().slideDown("medium");
};
// CONTACT FORM OUTPUT

// SCROLL DETECT, TRANSPARENT MENU
let fade_running = false;
$(window).on("scroll", () => {
  let nav = $(".nav");
  let current_opacity = nav.prop("style").opacity;
  if (!fade_running) {
    let scroll_point = 10;
    if ($(window).scrollTop() <= scroll_point && current_opacity !== 1) {
      fade_running = true;
      nav.fadeTo(".5s", 1, () => {
        fade_running = false;
      });
    } else if ($(window).scrollTop() > scroll_point && current_opacity != 0.5) {
      fade_running = true;
      nav.fadeTo(".5s", 0.75, () => {
        fade_running = false;
      });
    }
  }
});
// SCROLL DETECT, TRANSPARENT MENU

// BACKGROUND TRANSITIONS
$(() => {
  let bgElem = $(".parallax");
  let bgCnt = 7;
  let i = 2;
  let bgStr = "parallax-bg-";
  setInterval(() => {
    let unusedBgClasses = [];
    for (let k = 1; k <= bgCnt; ++k) {
      unusedBgClasses.push(bgStr + k.toString());
    }
    let bgClassName = bgStr + i;
    unusedBgClasses = unusedBgClasses.filter((elem) => {
      return elem != bgClassName;
    });
    bgElem.fadeTo(750, 0.05, () => {
      bgElem.addClass(bgClassName).removeClass(unusedBgClasses.join(" "));
      bgElem.fadeTo(750, 1);
    });
    ++i;
    if (i > bgCnt) {
      i = 1;
    }
  }, 5000);
});
// BACKGROUND TRANSITIONS

// DUMMY BASKET MANAGEMENT
let formatCurrency = (amount) => {
  let formatter = new Intl.NumberFormat("en-gb", {
    style: "currency",
    currency: "gbp",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
  // amount = amount.toFixed(2);
  // let parts = amount.split('.');
  // return parseInt(parts[0]).toLocaleString() + '.' + parts[1];
};
let productList = [
  {
    id: 1,
    name: "Twisty Bear",
    image: "src/img/store/bear-1.png",
    cost: 19.99,
  },
  {
    id: 2,
    name: "Stuffed Bear",
    image: "src/img/store/bear-2.png",
    cost: 4.99,
  },
  {
    id: 3,
    name: "Robo Not-Bear",
    image: "src/img/store/bear-3.png",
    cost: 49.99,
  },
  {
    id: 4,
    name: "Robo Plush",
    image: "src/img/store/bear-4.png",
    cost: 3.99,
  },
  {
    id: 5,
    name: "Shiba Chonk",
    image: "src/img/store/bear-5.jpg",
    cost: 7.99,
  },
  {
    id: 6,
    name: "Lion Cub",
    image: "src/img/store/bear-6.png",
    cost: 5.49,
  },
  {
    id: 7,
    name: "10-Foot Bear",
    image: "src/img/store/bear-7.png",
    cost: 543.21,
  },
  {
    id: 8,
    name: "FNAF-alike",
    image: "src/img/store/bear-8.png",
    cost: 10.99,
  },
];
let basket = {
  total: 0.0,
  items: [],
};
let populateProducts = () => {
  let storeContainer = $("div.store-container");
  if (storeContainer.length < 2) {
    let entry;
    let markup =
      ' \
    <div class="store-item"> \
        <div class="store-item-description"> \
          {name}<br> \
          {cost} \
        </div> \
        <div class="store-controls"> \
          <a href="javascript:void(0);" data-product-id="{id}" data-basket-action="remove" class="btn btn-danger change-basket"> \
            <span class="fas fa-minus"></span> \
          </a> \
          <span id="product-basket-{id}">0</span> \
          <a href="javascript:void(0);" data-product-id="{id}" data-basket-action="add" class="btn btn-success change-basket"> \
            <span class="fas fa-plus"></span> \
          </a> \
        </div> \
        <img src="{image}" alt="[store item]" class="store-image"><br> \
      </div> \
    ';
    for (entry of productList) {
      storeContainer.append(
        markup
          .replace(/\{id\}/gm, entry.id)
          .replace("{name}", entry.name)
          .replace("{cost}", formatCurrency(entry.cost))
          .replace("{image}", entry.image)
      );
    }
    reinitializeBasket();
  }
};
let updateBasketTotalCost = (cost) => {
  let basketSubtotal = $("span#basket-subtotal");
  basket["total"] += cost;
  basketSubtotal.text(formatCurrency(basket["total"]));
};
let updateBasketItems = (product, action) => {
  let item = basket.items.find(x => x.id === product.id);
  if (action === "add") {
    if (item === undefined) {
      basket.items.push({ id: product.id, name: product.name, qty: 1 });
    } else {
      basket.items.find(x => x.id == product.id).qty++;
    }
  } else if (action === 'remove') {
    if (item !== undefined) {
      basket.items.find(x => x.id === product.id)['qty']--;
      if (item.qty <= 0) {
        basket.items = basket.items.filter(x => x.id !== product.id);
      }
    }
  }
  redrawBasket();
};
let redrawBasket = () => {
  let markup = ' \
    <div class="basket-row" id="basket-item-{id}"> \
      <span class="basket-item-name">{name}</span> \
      <span class="basket-item-qty">{qty}</span> \
    </div> \
  ';
  let fullBasketMarkup = '';
  if (basket.items.length > 0) {
    let i;
    for (i of basket.items) {
      fullBasketMarkup += markup
        .replace('{id}', i.id)
        .replace('{name}', i.name)
        .replace('{qty}', i.qty);
    }
  }
  $('div#basket-items').html(fullBasketMarkup);
}
let reinitializeBasket = () => {
  $(".change-basket").on("click", (obj) => {
    let data = obj.currentTarget.dataset;
    let id = data.productId;
    let amntVal = toInt($("span#product-basket-" + id).html());
    let product = productList.find((x) => x.id === toInt(id));
    let updateItems = false;
    if (data.basketAction === "add") {
      $("span#product-basket-" + id).text(amntVal + 1);
      updateBasketTotalCost(product.cost);
      updateItems = true;
    } else if (data.basketAction === "remove") {
      let amntVal = toInt($("span#product-basket-" + id).html());
      if (amntVal > 0) {
        $("span#product-basket-" + id).text(amntVal - 1);
        updateBasketTotalCost(-product.cost);
        updateItems = true;
      }
    }
    if (updateItems) {
      updateBasketItems(product, data.basketAction);
    }
  });
};
// DUMMY BASKET MANAGEMENT
