let rotatorCases = Array.from(document.querySelectorAll("span.rotator__case"));

function rotationCases() {
  for (let i = 0; i < rotatorCases.length; i++) {
    let rotatorCase = rotatorCases[i];

    if (rotatorCase.classList.contains("rotator__case_active")) {
      rotatorCase.classList.remove("rotator__case_active");
      if (i + 1 === rotatorCases.length) {
        i = 0;
        rotatorCases[i].classList.add("rotator__case_active");
        return false;
      } else {
        rotatorCases[i + 1].classList.add("rotator__case_active");
        return false;
      }
    }
  }
}

setInterval(rotationCases, 1000);
