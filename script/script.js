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

document.addEventListener("DOMContentLoaded", () => {
  const countDisplay = document.getElementById("visit-counter");

  let visitCount = localStorage.getItem("visitCount");

  if (!visitCount) {
    visitCount = 0;
  }

  visitCount = parseInt(visitCount) + 1;

  localStorage.setItem("visitCount", visitCount);

  countDisplay.textContent = visitCount;
});

document.addEventListener("DOMContentLoaded", async () => {
  const inputField = document.querySelector(".chatbot-form");
  const sendButton = document.querySelector(".chatbot-send-button");
  const responseField = document.querySelector(".chatbot-response-text");
  const sampleQuestions = document.querySelectorAll(".sample-question");

  const response = await fetch("context.txt");
  const context = await response.text();

  async function askChatbot(message) {
    try {
      const resp = await puter.ai.chat([
        { role: "system", content: context },
        { role: "user", content: message }
      ]);

      console.log("Response:", resp);

      if (resp.choices.length > 0) {
        responseField.value = resp.choices[0].message.content;
      } else {
        responseField.value = "Unexpected response. Please try again.";
      }

    } catch (error) {
      responseField.value = "An error occurred. Please try again later.";
    }
  }

  sendButton.addEventListener("click", () => {
    const message = inputField.value.trim();
    if (message) {
      askChatbot(message);
    }
  });

  sampleQuestions.forEach(button => {
    button.addEventListener("click", () => {
      const question = button.textContent;
      inputField.value = question;
      askChatbot(question);
    });
  });
});



