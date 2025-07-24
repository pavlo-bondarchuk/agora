document.querySelector(".profile-chats").addEventListener("click", function () {
  document.querySelector(".popup-overlay").classList.toggle("show");
  document.querySelector(".popup-chats").classList.toggle("show");
});
document
  .querySelector(".profile-groups")
  .addEventListener("click", function () {
    document.querySelector(".popup-overlay").classList.toggle("show");
    document.querySelector(".popup-groups").classList.toggle("show");
  });
document
  .querySelector(".profile-calendar")
  .addEventListener("click", function () {
    document.querySelector(".popup-overlay").classList.toggle("show");
    document.querySelector(".popup-calendar").classList.toggle("show");
  });
document
  .querySelector(".profile-settings")
  .addEventListener("click", function () {
    // get .profile-settings position from top and left
    const settingsButton = document.querySelector(".profile-settings");
    const top =
      settingsButton.getBoundingClientRect().top + window.scrollY + 40; // add 40px to the top position
    const left = settingsButton.getBoundingClientRect().left + window.scrollX;
    // set .modal-settings position to top and left
    const modalSettings = document.querySelector(".modal-settings");
    modalSettings.style.top = `${top}px`;
    modalSettings.style.left = `${left}px`;
    // toggle .modal-settings visibility
    modalSettings.classList.toggle("show");
  });
document.querySelector(".popup-overlay").addEventListener("click", function () {
  document.querySelector(".popup-overlay").classList.remove("show");
  document.querySelector(".popup-chats").classList.remove("show");
  document.querySelector(".popup-groups").classList.remove("show");
  document.querySelector(".popup-calendar").classList.remove("show");
  document.querySelector(".modal-settings").classList.remove("show");
});

document.querySelectorAll(".theme-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", checkbox.checked);

    document
      .querySelectorAll(".modal-settings, .popup-settings--mobile")
      .forEach((el) => el.classList.remove("show"));

    document.querySelectorAll(".theme-checkbox").forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = checkbox.checked;
      }
    });
  });
});
document
  .querySelector(".profile-header--actions .icon-dots")
  .addEventListener("click", function () {
    document.querySelector(".popup-resources--mobile").classList.toggle("show");
  });
document
  .querySelector(".profile-header--actions .icon-settings")
  .addEventListener("click", function () {
    document.querySelector(".popup-settings--mobile").classList.toggle("show");
  });

document.querySelectorAll("[data-content]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-content");

    document.querySelectorAll("[data-content]").forEach((t) => {
      t.classList.toggle("active", t === tab);
    });

    document.querySelectorAll("[data-tab]").forEach((content) => {
      content.classList.toggle(
        "active",
        content.getAttribute("data-tab") === target
      );
    });
  });
});
