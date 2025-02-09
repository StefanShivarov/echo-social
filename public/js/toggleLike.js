console.log("executing toggle");

document.addEventListener("DOMContentLoaded", () => {
  const toggleLike = async (url, form) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        const likeCountElement = form.querySelector(".likes-count");
        const currentCount = parseInt(likeCountElement.textContent);
        likeCountElement.textContent = result.liked ? currentCount + 1 : currentCount - 1;
        const likeButton = form.querySelector(".like-button");
        likeButton.textContent = result.liked ? "Unlike" : "Like";
      }
    } catch (err) {
      console.error("Error toggling like!", err);
    }
  };

  document.querySelectorAll(".like-post-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const url = form.getAttribute("action");
      toggleLike(url, form);
    });
  });

  document.querySelectorAll(".like-comment-form").forEach((form) => {
    console.log("toggle comment like");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const url = form.getAttribute("action");
      toggleLike(url, form);
    });
  });
});
