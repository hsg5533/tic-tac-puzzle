var o,
  p = setup.puzzle_fifteen,
  freeslot = [],
  size = [],
  m = [],
  f = document.getElementById("fifteen");
function ceation_slots() {
  size = [p.size[0] / (p.grid[0] + 1), p.size[1] / (p.grid[1] + 1)];
  var e = p.emptySlot ? p.emptySlot : (p.grid[1] + 1) * (p.grid[0] + 1);
  (f.style.width = p.size[0] + "px"),
    (f.style.height = p.size[1] + "px"),
    (f.style.position = "relative"),
    p.fill &&
      (fifteen_resize(), window.addEventListener("resize", fifteen_resize, !0)),
    (o = 1);
  for (var t = 0; t <= p.grid[1]; t++)
    for (var s = 0; s <= p.grid[0]; s++)
      if (o != e) {
        m[t] || (m[t] = []), (m[t][s] = o);
        var r = document.createElement("div");
        (r.id = "slot" + o),
          r.setAttribute("onclick", "move_slot(" + o + ")"),
          (r.className = "slot"),
          p.number && (r.innerHTML = o),
          (r.style =
            "background-image:url(" +
            p.art.url +
            ");background-size:" +
            (p.art.ratio ? p.size[0] + "px auto" : "auto " + p.size[1] + "px") +
            ";background-position:-" +
            size[0] * s +
            "px -" +
            size[1] * t +
            "px ;width:" +
            size[0] +
            "px;height:" +
            size[1] +
            "px;top:" +
            size[1] * t +
            "px;left:" +
            size[0] * s +
            "px;position:absolute;" +
            (p.style ? p.style : "")),
          p.time && (r.style.transitionDuration = p.time + "s"),
          f.appendChild(r),
          o++;
      } else (m[t][s] = 0), (freeslot = [t, s]), o++;
  stir_slots();
}
function stir_slots() {
  for (var e = 0; e < p.diff; e++) {
    var t = [];
    2 * Math.random() > 1
      ? (t = [
          freeslot[0] + (-1 + Math.round(2 * Math.random())),
          freeslot[1],
        ])[0] < 0
        ? (t[0] = t[0] + 2)
        : t[0] > p.grid[1] && (t[0] = t[0] - 2)
      : (t = [
          freeslot[0],
          freeslot[1] + (-1 + Math.round(2 * Math.random())),
        ])[1] < 0
      ? (t[1] = t[1] + 2)
      : t[1] > p.grid[0] && (t[1] = t[1] - 2);
    var s = [m[freeslot[0]][freeslot[1]], m[t[0]][t[1]]];
    (m[freeslot[0]][freeslot[1]] = s[1]),
      (m[t[0]][t[1]] = s[0]),
      (freeslot = [t[0], t[1]]);
  }
  for (var e = 0; e <= p.grid[1]; e++)
    for (var r = 0; r <= p.grid[0]; r++)
      if (m[e][r]) {
        var i = document.getElementById("slot" + m[e][r]);
        (i.style.left = r * size[0] + "px"), (i.style.top = e * size[1] + "px");
      }
}
function move_slot(e) {
  var t,
    s,
    r,
    i = 0,
    l = [];
  function _(e, i, l, _) {
    (r = m[e][i]),
      ((t = document.getElementById("slot" + r)).style.left =
        (i + _) * size[0] + "px"),
      (t.style.top = (e + l) * size[1] + "px"),
      (m[e][i] = s),
      (s = r);
  }
  for (var $ = 0; $ < p.grid[1] + 1; $++) {
    for (var a = 0; a < p.grid[0] + 1; a++) {
      if (m[$][a] == e) {
        if (((l = [$, a]), (s = 0), freeslot[0] == l[0])) {
          if (freeslot[1] > l[1])
            for (i = 0; i < freeslot[1] - l[1]; i++) _(l[0], l[1] + i, 0, 1);
          else if (freeslot[1] < l[1])
            for (i = 0; i < l[1] - freeslot[1]; i++) _(l[0], l[1] - i, 0, -1);
          (m[freeslot[0]][freeslot[1]] = s),
            (freeslot = [l[0], l[1]]),
            (e = !1);
          break;
        }
        if (freeslot[1] == l[1]) {
          if (freeslot[0] > l[0])
            for (i = 0; i < freeslot[0] - l[0]; i++) _(l[0] + i, l[1], 1, 0);
          else if (freeslot[0] < l[0])
            for (i = 0; i < l[0] - freeslot[0]; i++) _(l[0] - i, l[1], -1, 0);
          (m[freeslot[0]][freeslot[1]] = s),
            (freeslot = [l[0], l[1]]),
            (e = !1);
          break;
        }
      }
      if (!e) break;
    }
    if (!e) break;
  }
  check_slots();
}
function check_slots() {
  for (var e = 1, t = 0; t <= p.grid[1]; t++)
    for (var s = 0; s <= p.grid[0]; s++)
      if (0 == m[t][s] || e == m[t][s]) e++;
      else break;
  e == o &&
    setTimeout(
      () => {
        alert("win");
      },
      p.time ? 1e3 * p.time : 0
    );
}
function fifteen_resize() {
  var e = f.parentNode.getBoundingClientRect();
  p.size[0] / p.size[1] < e.width / e.height
    ? (f.style.transform = "scale(" + e.height / p.size[1] + ")")
    : (f.style.transform = "scale(" + e.width / p.size[0] + ")");
}
ceation_slots(),
  p.keyBoard &&
    document.addEventListener("keydown", function (e) {
      37 == (e = e.keyCode)
        ? move_slot(m[freeslot[0]][freeslot[1] + 1])
        : 39 == e
        ? move_slot(m[freeslot[0]][freeslot[1] - 1])
        : 38 == e
        ? move_slot(m[freeslot[0] + 1][freeslot[1]])
        : 40 == e && move_slot(m[freeslot[0] - 1][freeslot[1]]);
    });
let gamepad, gamepadPress;
p.gamePad &&
  window.addEventListener("gamepadconnected", function (e) {
    let t = () => {
      for (gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        let e = gamepad.buttons.some((e) => e.pressed);
        gamepadPress !== e &&
          ((gamepadPress = e),
          gamepad.buttons[12].pressed && m[freeslot[0] + 1]
            ? move_slot(m[freeslot[0] + 1][freeslot[1]])
            : gamepad.buttons[14].pressed && m[freeslot[0]]
            ? move_slot(m[freeslot[0]][freeslot[1] + 1])
            : gamepad.buttons[15].pressed && m[freeslot[0]]
            ? move_slot(m[freeslot[0]][freeslot[1] - 1])
            : gamepad.buttons[13].pressed &&
              m[freeslot[0] - 1] &&
              move_slot(m[freeslot[0] - 1][freeslot[1]]));
      }
      requestAnimationFrame(t);
    };
    t();
  });
