function toggleText() {

  let btn = document.querySelector (".toggle-text-button");
  let textOne = document.getElementById ("text");

  btn.addEventListener ('click', function (btn) {
    if (!btn) return;
    textOne.hidden = !textOne.hidden;

  });

}
