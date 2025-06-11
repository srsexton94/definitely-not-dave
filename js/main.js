const SKIN_COLORS = [
  { hex: "694d3d", label: "dark" },
  { hex: "ae5d29", label: "medium" },
  { hex: "d08b5b", label: "tan" },
  { hex: "edb98a", label: "light" },
  { hex: "ffdbb4", label: "pale" },
];
const HEAD_STYLES = [
  { code: "longAfro", description: "an afro", hasHeadCovering: false },
  { code: "bangs", description: "bangs", hasHeadCovering: false },
  { code: "bantuKnots", description: "bantu knots", hasHeadCovering: false },
  { code: "bun", description: "a bun with a headband", hasHeadCovering: true },
  { code: "cornrows2", description: "cornrows", hasHeadCovering: false },
  { code: "dreads", description: "locs", hasHeadCovering: false },
  { code: "flatTopLong", description: "a flat top", hasHeadCovering: false },
  { code: "grayBun", description: "a bun", hasHeadCovering: false },
  { code: "hatBeanie", description: "a beanie", hasHeadCovering: true },
  { code: "hatHip", description: "a wide-brimmed hat", hasHeadCovering: true },
  { code: "hijab", description: "a hijab", hasHeadCovering: true },
  { code: "long", description: "long hair", hasHeadCovering: false },
  { code: "longCurly", description: "curly hair", hasHeadCovering: false },
  { code: "mohawk", description: "a mohawk", hasHeadCovering: false },
  { code: "noHair1", description: "no hair", hasHeadCovering: false },
  { code: "shaved2", description: "a high fade", hasHeadCovering: false },
  { code: "short4", description: "short hair", hasHeadCovering: false },
  { code: "turban", description: "a turban", hasHeadCovering: true },
];
const NAMES = [
  "Bailey",
  "Akira",
  "Cameron",
  "Ming",
  "Taylor",
  "Alex",
  "Sasha",
  "Jesse",
  "Riley",
  "Sam",
  "Morgan",
  "Quinn",
  "Anh",
  "Sol",
  "Meko",
  "Skylar",
];

const gameboard = document.querySelector("section.gameboard");
const controls = document.querySelector("section.controls");
const startButton = document.querySelector("button.start");
const endButton = document.querySelector("button.end");

let boardArr;

function createCardHTML(src, alt) {
  return `
    <div class="card">
      <div class="inner">
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

function getRandomHex() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function getRandomArrayEl(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function toggleGame() {
  startButton.classList.toggle("hidden");
  endButton.classList.toggle("hidden");
  document
    .querySelectorAll("div.inner")
    .forEach((card) => card.classList.toggle("flipped"));
  document.querySelector("form").classList.toggle("hidden");
}

window.addEventListener("load", function () {
  boardArr = NAMES.map((name) => {
    const isFacingLeft = Math.random() >= 0.5;
    const skinColor = getRandomArrayEl(SKIN_COLORS);
    const headStyle = getRandomArrayEl(HEAD_STYLES);
    return {
      src: `https://api.dicebear.com/9.x/open-peeps/svg?face=calm&backgroundColor=${getRandomHex()}&flip=${isFacingLeft}&skinColor=${
        skinColor.hex
      }&head=${headStyle.code}`,
      alt: `An avatar with ${skinColor.label} skin and ${
        headStyle.description
      } facing ${isFacingLeft ? "left" : "right"}`,
      name,
      skinColor,
      headStyle,
    };
  });
  boardArr.forEach((el) => {
    gameboard.appendChild(
      createElementFromHTML(createCardHTML(el.src, el.alt))
    );
  });
});

// gameboard.addEventListener("click", function (event) {
//   event.target.parentNode.classList.toggle("flipped");
// });

startButton.addEventListener("click", toggleGame);
endButton.addEventListener("click", toggleGame);
