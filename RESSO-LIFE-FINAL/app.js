function showFilter() {
  let box1 = document.getElementById("hidden");
  if (box1.style.display === "none") {
    box1.style.display = "inline-block"; // Change to desired display type
  } else {
    box1.style.display = "none";
  }

  if (box1.style.display !== "none") { // Check if element is visible
    let computedStyles = window.getComputedStyle(box1);
    if (computedStyles.top === '12.9rem') {
      box1.style.top = "1.9rem"; // Change to desired display type
    }
  }
}
