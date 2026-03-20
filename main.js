var hit = false
const template = JSON.stringify(
  {points: 0}
)
const op = MPP.piano.play;
let currentnote
let currentplayid
let currentplayglobal
MPP.client.sendArray([
    {
        m: "userset",
        set: { name: "Phobos (+pb)" }
    }
]);
function checkstor(id) {
  if (localStorage.getItem(id) == null) {
      localStorage.setItem(id,template)
  }
}

MPP.client.on("a", msg => {
  if (msg.a == "+pb") {
    MPP.chat.send("Phobos commands: +start +score +slam")
  } else if (msg.a == "+start") {
    currentnote = Object.keys(MPP.piano.keys)[Math.floor(Math.random() * Object.keys(MPP.piano.keys).length)]
    currentplayid = msg.p.id
    currentplayglobal = msg.p._id
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
  } else if (msg.a == "+slam") {
    Object.keys(MPP.piano.keys).forEach(key => { MPP.press(key, 1); });
  }
})

MPP.client.on("n", note => {
  note.n.forEach(n => {
    if (n.n === currentnote && hit == true && n.p == currentplayid)  {
      MPP.chat.send("You hit the note! +5 points has been added. Use +score to see your points!");
      checkstor(currentplayglobal)
      let tempset = JSON.stringify(
        JSON.parse(localStorage.getItem(currentplayglobal)).points + 5
      )
      localStorage.setItem(currentplayglobal,tempset)
      hit = false
      currentplayid = ""
      currentnote = ""
      currentplayglobal = ""
    }
  });
})
