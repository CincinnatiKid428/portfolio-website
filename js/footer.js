// File: js/footer.js

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.createElement("footer");
  footer.className = "page-footer";
  footer.innerHTML = `
    <p>Follow me:</p>
    <div>
      <a href="https://github.com/CincinnatiKid428" target="_blank">
        <img class="social-media-icons" src="svg/bw_github_icon.svg"
             alt="GitHub icon hyperlink to my Github page"></a>
      <a href="https://www.linkedin.com/in/philip-weaver-b74576387/" target="_blank">
        <img class="social-media-icons" src="svg/bw_linkedin_icon.svg"
             alt="LinkedIn icon hyperlink to my LinkedIn page"></a>
      <a href="https://x.com/PhilipW42823" target="_blank">
        <img class="social-media-icons" src="svg/bw_x_icon.svg"
             alt="X icon hyperlink to my X page"></a>
    </div>
  `;

  document.body.appendChild(footer);
});
