document.addEventListener("DOMContentLoaded", () => {
  const collapsedList = document.querySelector(".collapsed-list");
  const heading = collapsedList.querySelector(".collapsed-list-heading");
  const panel = collapsedList.querySelector(".collapsed-list-panel");
  const icon = collapsedList.querySelector(".collapsed-list-heading--icon");

  heading.addEventListener("click", () => {
    panel.classList.toggle("active");
    icon.classList.toggle("active");
    heading.classList.toggle("active");
  });

  document.querySelectorAll(".region-card span").forEach((span) => {
    const value = span.getAttribute("data-value");
    span.parentElement.addEventListener("mouseenter", () => {
      span.textContent = value;
    });
    span.parentElement.addEventListener("mouseleave", () => {
      span.textContent = "%";
    });
  });
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isActive = content.classList.contains("active");

      document
        .querySelectorAll(".accordion-content")
        .forEach((c) => c.classList.remove("active"));
      document
        .querySelectorAll(".accordion-header")
        .forEach((h) => h.classList.remove("active"));

      if (!isActive) {
        content.classList.add("active");
        header.classList.add("active");
      }
    });
  });
});
document.querySelectorAll(".seller-faq__question").forEach((question) => {
  question.addEventListener("click", () => {
    const currentItem = question.parentElement;
    const isOpen = currentItem.classList.contains("open");

    document.querySelectorAll(".seller-faq__item").forEach((item) => {
      item.classList.remove("open");
    });

    if (!isOpen) {
      currentItem.classList.add("open");
    }
  });
});
