const gameboard = document.querySelector("section.gameboard");
let boardArr = Array.from({ length: 16 });

function createCardHTML(src, alt) {
  return `
    <div class="card">
      <div class="inner flipped" onclick="onCardClick(this)">
        <div class="front"></div>
        <img
          class="back"
          src="${src}"
          alt="${alt}"
        />
      </div>
    </div>
  `;
}

function createElementFromHTML(htmlString) {
  const container = document.createElement("div");
  container.innerHTML = htmlString;
  return container.firstElementChild;
}

function onCardClick(card) {
  card.classList.toggle("flipped");
}

window.addEventListener("load", function () {
  boardArr = boardArr.map((_el) => {
    return {
      src: "https://api.dicebear.com/9.x/open-peeps/svg",
      alt: "avatar",
    };
  });
  boardArr.forEach((el) => {
    gameboard.appendChild(
      createElementFromHTML(createCardHTML(el.src, el.alt))
    );
  });
});
