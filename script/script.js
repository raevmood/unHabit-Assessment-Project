document.addEventListener("DOMContentLoaded", () => {
  const faqSection = document.getElementById('faq-section');
  const faqs = faqSection.querySelectorAll('.faq');

  faqs.forEach(faq => {
    faq.querySelector('.question').addEventListener('click', () => {
      faq.classList.toggle('active');
     });
  });
});
