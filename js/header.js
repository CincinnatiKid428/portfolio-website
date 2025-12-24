// File: js/header.js

document.addEventListener("DOMContentLoaded", function () {
  const header = document.createElement("header");
  header.className = "page-header";
  header.innerHTML = `

    <div class="squares-container">
      <div class="squares-container-row">
        <div class="square sq-top-left"></div>
        <div class="square sq-top-right"></div>
      </div>
      <div class="squares-container-row">
        <div class="square sq-bot-left"></div>
        <div class="square sq-bot-right"></div>
      </div>
    </div>

    <img src="img/header_logo.png" class="page-header__item logo-image"
      alt="Personal logo of Philip Weaver, a text logo with black letters casting shadow and consisting of my name">

    <nav class="page-header__item">

      <ul role="menubar" class="navigation-list">
        <li role="presentation">
          <a href="index.html" role="menuitem" class="navigation-list__item navigation-list__item-left_button">Home</a>
        </li>
        <li role="presentation">
          <a href="about.html" role="menuitem" class="navigation-list__item">About</a>
        </li>
        <li role="presentation">
          <a href="work.html" role="menuitem" class="navigation-list__item">Work</a>
        </li>
        <li role="presentation">
          <a href="contact.html" role="menuitem" class="navigation-list__item navigation-list__item-right_button">Contact</a>
        </li>
      </ul>

    </nav>
  `;

  document.body.prepend(header);
});