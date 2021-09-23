function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function turn() {
  document.body.classList.contains("dark")
    ? document.body.classList.remove("dark")
    : document.body.classList.add("dark");
}
