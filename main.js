var hit = false
const template = JSON.stringify(
  {points: 0}
)
const op = MPP.piano.play;
let currentnote
MPP.client.sendArray([
    {
        m: "userset",
        set: { name: "Phobos (+pb)" }
    }
]);

MPP.client.on("a", msg => {
  if (msg.a == "+pb") {
    MPP.chat.send("Phobos commands: +start +score")
  } else if (msg.a == "+start") {
    currentnote = Object.keys(MPP.piano.keys)[Math.floor(Math.random() * Object.keys(MPP.piano.keys).length)]
    MPP.chat.send("Hit note " + currentnote)
    hit = true
  } else if (msg.a == "+score") {
    if (localStorage.getItem(msg.p._id) == null) {
      localStorage.setItem(msg.p._id,template)
      MPP.chat.send("Score: 0")
    } else {
      MPP.chat.send("Score: " + 
        JSON.parse(localStorage.getItem(msg.p._id)).points
      )
    }
  }
})

MPP.client.on("n", note => {
  note.n.forEach(n => {
    if (n.n === currentnote && hit == true)  {
      MPP.chat.send("Nice");
      hit = false
    }
  });
})
