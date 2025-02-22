document.addEventListener("DOMContentLoaded", function () {
  const questionForms = document.querySelectorAll(".question-form");

  questionForms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
            .content,
        },
      });

      const result = await response.json();

      if (result.correct) {
        showExplanation(result.explanation, true);
      } else {
        showExplanation(result.explanation, false);
      }
    });
  });

  function showExplanation(explanation, isCorrect) {
    const modal = document.getElementById("explanation-modal");
    const content = modal.querySelector(".modal-content");
    content.innerHTML = `
            <div class="${isCorrect ? "text-green-600" : "text-red-600"} mb-4">
                ${isCorrect ? "Correct!" : "Incorrect"}
            </div>
            <p>${explanation}</p>
        `;
    modal.classList.remove("hidden");
  }
});
