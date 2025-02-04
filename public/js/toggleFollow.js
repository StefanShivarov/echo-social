console.log("herereere");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".follow-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("here");
      const userId = form.querySelector('input[name="userId"]').value;
      const isFollowed = form.querySelector("button").textContent === "Unfollow";
      const url = `http://localhost:3000/users/${userId}/${isFollowed ? "unfollow" : "follow"}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        console.log(response);

        if (response.ok) {
          const button = form.querySelector("button");
          button.textContent = isFollowed ? "Follow" : "Unfollow";
        } else {
          console.error("Failed to update follow status!");
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    });
  });
});
