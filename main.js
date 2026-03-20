

MPP.client.on("a", msg => {
  if (msg.a == "+phobos") {
    MPP.chat.send("Phobos commands: +start")
  } else if (msg.a == "+start") {
    MPP.chat.send("Hit note A-1")
  }
})

MPP.client.on("n", note => {
  if note.n.includes("a-1") {
    MPP.chat.send("Nice")
  }
})
