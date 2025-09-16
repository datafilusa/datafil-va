
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    const chat = item.querySelector(".faq-chat");

    questionBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const isActive = item.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
          const iChat = i.querySelector(".faq-chat");
          if (iChat) iChat.style.display = "none";
        }
      });

      // Toggle clicked FAQ item
      if (isActive) {
        item.classList.remove("active");
        if (chat) chat.style.display = "none";
      } else {
        item.classList.add("active");
        if (chat) chat.style.display = "flex";
      }
    });
  });

  // Collapse all FAQs when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInsideFAQ = [...faqItems].some(item => item.contains(e.target));
    if (!clickedInsideFAQ) {
      faqItems.forEach(item => {
        item.classList.remove("active");
        const chat = item.querySelector(".faq-chat");
        if (chat) chat.style.display = "none";
      });
    }
  });
});

