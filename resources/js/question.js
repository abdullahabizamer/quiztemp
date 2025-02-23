document.addEventListener("DOMContentLoaded", function () {
  const questionForms = document.querySelectorAll(".question-form");

  questionForms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
              .content,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        showExplanation(result.explanation, result.correct);

        if (result.correct) {
          updateProgress();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting your answer.");
      }
    });
  });

  function showExplanation(explanation, isCorrect) {
    const modal = document.getElementById("explanation-modal");
    const content = modal.querySelector(".modal-content");

    content.innerHTML = `
            <div class="${isCorrect ? "text-green-600" : "text-red-600"} mb-4 flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${
                      isCorrect
                        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
                        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
                    }
                </svg>
                <span class="text-lg font-medium">${isCorrect ? "Correct!" : "Incorrect"}</span>
            </div>
            <p class="text-gray-600">${explanation}</p>
        `;

    modal.classList.remove("hidden");
  }

  function updateProgress() {
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");

    if (progressBar && progressText) {
      const currentWidth = parseInt(progressBar.style.width) || 0;
      const newWidth = Math.min(currentWidth + 1, 100);

      progressBar.style.width = `${newWidth}%`;
      progressText.textContent = `${newWidth}%`;
    }
  }
});
