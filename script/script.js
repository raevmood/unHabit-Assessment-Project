document.addEventListener("DOMContentLoaded", () => {
  initFaqAccordion();
  initProductScroller();
  initVisitCounter();
  initPuterChatbot();

  function initFaqAccordion() {
    const faqs = document.querySelectorAll('.faq');
    faqs.forEach(faq => {
      const question = faq.querySelector('.question');
      question.addEventListener('click', () => {
        faqs.forEach(otherFaq => {
          if (otherFaq !== faq) {
            otherFaq.classList.remove('active');
          }
        });
        faq.classList.toggle('active');
      });
    });
  }

  function initProductScroller() {
    const scrollContainer = document.querySelector(".products-content");
    const scrollLeftButton = document.querySelector(".scroll-button-left");
    const scrollRightButton = document.querySelector(".scroll-button-right");
    if (!scrollContainer) return;
    const scrollAmount = 550;
    scrollLeftButton.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    scrollRightButton.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  function initVisitCounter() {
    const countDisplay = document.getElementById("visit-counter");
    if (!countDisplay) return;
    let visitCount = localStorage.getItem("unHabitVisitCount") || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem("unHabitVisitCount", visitCount);
    countDisplay.textContent = visitCount;
  }

  async function initPuterChatbot() {
    const inputField = document.querySelector(".chatbot-form");
    const sendButton = document.querySelector(".chatbot-send-button");
    const responseField = document.querySelector(".chatbot-response-text");
    const sampleQuestions = document.querySelectorAll(".sample-question");

    if (!inputField || !sendButton || !responseField) return;

    let context = "You are a helpful assistant.";
    try {
      const response = await fetch("context.txt");
      context = await response.text();
    } catch (error) {
      console.error("Failed to load context.txt:", error);
      responseField.value = "Error: Could not load my knowledge base. Please contact support.";
      inputField.disabled = true;
      sendButton.disabled = true;
      return;
    }

    async function askChatbot(message) {
      responseField.value = "Thinking...";
      sendButton.disabled = true;
      inputField.disabled = true;

      try {
        const resp = await puter.ai.chat([
          { role: "system", content: context },
          { role: "user", content: message }
        ]);

        if (resp && resp.message && resp.message.content) {
          responseField.value = resp.message.content;
        } else {
          responseField.value = "I received a valid but empty response. Please rephrase your question.";
          console.log("Unexpected response structure. Full object:", resp);
        }
      } catch (error) {
        console.error("Chatbot API Error:", error);
        responseField.value = "Sorry, an error occurred while connecting to the AI. Please try again later.";
      } finally {
        sendButton.disabled = false;
        inputField.disabled = false;
      }
    }

    sendButton.addEventListener("click", () => {
      const message = inputField.value.trim();
      if (message) {
        askChatbot(message);
        inputField.value = '';
      }
    });

    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendButton.click();
      }
    });

    sampleQuestions.forEach(button => {
      button.addEventListener("click", () => {
        const question = button.textContent;
        inputField.value = question;
        askChatbot(question);
      });
    });
  }
});



