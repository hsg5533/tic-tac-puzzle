var setup = {
  puzzle_fifteen: {
    diff: 300,
    size: [512, 640],
    grid: [3, 4],
    fill: !0,
    number: !1,
    art: { url: "./img/art.jpg", ratio: !1 },
    keyBoard: !0,
    gamePad: !0,
    time: 0.1,
    style:
      "background-color:#c4cebb;display:grid;justify-items:center;align-items:center;font-family:Arial;color:#fff;border-radius:12px;font-size:32px;",
  },
};
slot_style.value = setup.puzzle_fifteen.style;
var file,
  img_file = document.getElementById("img_file"),
  img = document.getElementById("art");
function loadFiles(e) {
  (file = img_file.files[0]), adden_file();
}
function adden_file() {
  (setup.puzzle_fifteen.art.url = window.URL.createObjectURL(file)),
    (img.src = setup.puzzle_fifteen.art.url),
    (img.onload = function () {
      (setup.puzzle_fifteen.size = [img.width, img.height]),
        auto_grid(),
        auto_style(),
        fifteen_update();
    });
}
function auto_grid() {
  var e = setup.puzzle_fifteen;
  e.size[1] < e.size[0]
    ? (e.grid = [Math.round(e.size[0] / (e.size[1] / 4)) - 1, 3])
    : (e.grid = [3, Math.round(e.size[1] / (e.size[0] / 4)) - 1]),
    (grid_width.value = e.grid[0]),
    (grid_height.value = e.grid[1]),
    (width.value = e.size[0]),
    (height.value = e.size[1]);
}
function auto_style() {
  var e,
    t,
    i = setup.puzzle_fifteen;
  for (
    t = 0,
      e =
        i.size[1] < i.size[0]
          ? Math.round(i.size[0] / i.grid[0] / 16)
          : Math.round(i.size[1] / i.grid[1] / 16),
      d = i.style.split(";");
    t < d.length;
    t++
  )
    d[t].includes("border-radius")
      ? (i.style = i.style.replace(
          d[t],
          "border-radius:" + Math.round(1.5 * e) + "px"
        ))
      : d[t].includes("font-size") &&
        (i.style = i.style.replace(d[t], "font-size:" + 3 * e + "px"));
  slot_style.value = i.style;
}
function fifteen_update() {
  (f.innerHTML = ""), ceation_slots();
}
function fifteen_build() {
  var e = new FileReader();
  file ? e.readAsDataURL(file) : alert("Please upload a file with a picture"),
    (e.onload = function () {
      var t;
      (setup.puzzle_fifteen.art.url = e.result),
        ((t = new XMLHttpRequest()).onreadystatechange = function () {
          if (4 == this.readyState && 200 == this.status) {
            var e =
                "data:text/json;charset=utf-8," +
                encodeURIComponent(
                  "<!DOCTYPE html>\n<html>\n<head>\n<style>\n body{height:97vh;padding:0;display:grid;align-content:center;justify-content:center;}\n</style>\n</head>\n<body>\n<div id='fifteen'></div>\n<script>\n" +
                    this.responseText.replace(
                      "setup.puzzle_fifteen",
                      JSON.stringify(setup.puzzle_fifteen, null, "	")
                    ) +
                    "\n</script>\n</body>\n</html>"
                ),
              t = document.getElementById("dwonload");
            t.setAttribute("href", e),
              t.setAttribute("download", "index.html"),
              t.click();
          }
        }),
        t.open("GET", "./js/puzzle.js", !0),
        t.send(),
        (t.onerror = function () {
          0 == this.status && alert("runetime not loaded");
        });
    }),
    (e.onerror = function (e) {
      alert("Error: " + e);
    });
}
img_file.addEventListener("change", loadFiles);
var drop = {
  init: function () {
    window.File &&
      window.FileReader &&
      window.FileList &&
      window.Blob &&
      (window.addEventListener("dragover", function (e) {
        e.preventDefault(), e.stopPropagation();
      }),
      window.addEventListener("drop", function (e) {
        e.preventDefault(),
          e.stopPropagation(),
          (file = e.dataTransfer.files[0]),
          adden_file();
      }));
  },
};
window.addEventListener("DOMContentLoaded", drop.init);
