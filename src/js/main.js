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

// CONTACT FORM
let contact_form = $("form#contact-form");

let is_email = (email) => {
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

let html_encode = (str) => {
  return String(str).replace(/[^\w. ]/gi, (c) => {
    return "&#" + c.charCodeAt(0) + ";";
  });
};

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
  if (!email || !is_email(email)) {
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
  name_output.html(html_encode(name));
  email_output.html(html_encode(email));
  message_output.html(html_encode(message));
  output_row.hide().slideDown("medium");
};
// CONTACT FORM OUTPUT

// SCROLL DETECT, TRANSPARENT MENU
let fade_running = false;
$(window).on("scroll", () => {
  let nav = $(".nav");
  let current_opacity = nav.prop("style").opacity;
  if (!fade_running) {
    let scroll_point = 15;
    if ($(window).scrollTop() <= scroll_point && current_opacity !== 1) {
      console.log("Fading to full");
      fade_running = true;
      nav.fadeTo(".5s", 1, () => {
        fade_running = false;
      });
    } else if ($(window).scrollTop() > scroll_point && current_opacity != 0.5) {
      console.log("Fading to half");
      fade_running = true;
      nav.fadeTo(".5s", 0.5, () => {
        fade_running = false;
      });
    }
  }
});
// SCROLL DETECT, TRANSPARENT MENU
