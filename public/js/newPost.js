const NewPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const post_body = document.querySelector("#post-content").value.trim();

  if (title && post_body) {
    const response = await fetch("/api/posts/newpost", {
      method: "POST",
      body: JSON.stringify({ title, post_body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to post");
    }
  }
};
document.querySelector(".post-form").addEventListener("submit", NewPostHandler);
