jQuery(function ($) {
  $("pre")
    .hide()
    .before(
      '<div class="toggle-source-code toggle-source-code_action_show"></div>'
    );

  $(".toggle-source-code").on("click", function () {
    var button = $(this),
      code = button.next("pre");
    if (button.hasClass("toggle-source-code_action_show")) {
      button
        .removeClass("toggle-source-code_action_show")
        .addClass("toggle-source-code_action_hide");
      code.slideDown();
    } else if (button.hasClass("toggle-source-code_action_hide")) {
      button
        .removeClass("toggle-source-code_action_hide")
        .addClass("toggle-source-code_action_show");
      code.slideUp();
    }
  });
});
