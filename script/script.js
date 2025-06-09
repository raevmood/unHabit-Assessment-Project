document.addEventListener("DOMContentLoaded", () => {
  const faqSection = document.getElementById('faq-section');
  const faqs = faqSection.querySelectorAll('.faq');

  faqs.forEach(faq => {
    faq.querySelector('.question').addEventListener('click', () => {
      faq.classList.toggle('active');
     });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".products-content");
  const scrollLeftButton = document.querySelector(".scroll-button-left");
  const scrollRightButton = document.querySelector(".scroll-button-right");

  const scrollAmount = 550;

  scrollLeftButton.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  scrollRightButton.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});
