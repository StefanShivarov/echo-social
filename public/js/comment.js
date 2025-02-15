document.addEventListener("DOMContentLoaded", () => {
  const attachDeleteListener = (form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const actionUrl = form.getAttribute("action");
      const commentElement = form.closest("li");

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          commentElement.remove();
        } else {
          console.error("Failed to delete comment!");
        }
      } catch (err) {
        console.error("Error deleting comment!", err);
      }
    });
  };

  document.querySelectorAll(".comment-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const actionUrl = form.getAttribute("action");
      const content = form.querySelector("textarea[name='content']").value;

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });

        if (response.ok) {
          const comment = await response.json();
          const commentsList = form.previousElementSibling;
          const commentElement = document.createElement("li");
          commentElement.innerHTML = `
            <a href="/users/${comment.userId}"><h4>${comment.user.username}</h4></a>
            <p>${comment.content}</p>
            <small>${new Date(comment.createdAt).toDateString()}</small>
            <form
              action="/posts/${comment.postId}/comments/${comment.id}?_method=DELETE"
              method="POST"
              class="delete-comment-form"
            >
              <button type="submit">Delete</button>
            </form>
            `;
          commentsList.appendChild(commentElement);
          form.reset();

          const deleteForm = commentElement.querySelector(".delete-comment-form");
          attachDeleteListener(deleteForm);
        } else {
          console.error("Failed to create comment!");
        }
      } catch (err) {
        console.error("Error creating comment!", err);
      }
    });
  });

  document.querySelectorAll(".delete-comment-form").forEach((form) => attachDeleteListener(form));
});
