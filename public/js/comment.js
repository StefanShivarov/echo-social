document.addEventListener("DOMContentLoaded", () => {
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
          console.log(commentsList);
          const commentElement = document.createElement("li");
          commentElement.innerHTML = `
              <a href="/users/${comment.userId}"><h4>${comment.user.username}</h4></a>
            <p>${comment.content}</p>
            <small>${new Date(comment.createdAt).toDateString()}</small>
            `;
          commentsList.appendChild(commentElement);
          form.reset();
        } else {
          console.error("Failed to create comment!");
        }
      } catch (err) {
        console.error("Error creating comment!", err);
      }
    });
  });
});
