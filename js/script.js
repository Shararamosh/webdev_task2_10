document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  users_data_to_messages_collection()
});
function users_data_to_messages_collection() {
  messages_collection = document.getElementById("messages_collection")
  if (messages_collection == null)
    return
  messages_collection.innerHTML = ""
  fetch("http://localhost:3000/guest_messages",
    {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    }
  )
  .then(response => response.json())
  .then(data => {
    for(let guest_message of data) {
      let user_data = create_user_data(guest_message.id, guest_message.sender, guest_message.message, guest_message.avatar)
      messages_collection.appendChild(user_data)
    }
  })
  .catch(error => {
    console.log(error)
  });
}
function create_user_data(id, sender, message, avatar) {
  if (id < 0 || sender == "" || message == "")
    return ""
  if (avatar == "" || avatar == undefined) {
    avatar_num = getRandomInt(8)+1
    avatar = "images/avatars/GenericAvatar"+avatar_num.toString()+".png"
  }
  user_data = document.createElement("li")
  user_data.setAttribute("class", "collection-item avatar")
  user_img = document.createElement("img")
  user_img.setAttribute("src", avatar)
  user_img.setAttribute("class", "circle")
  user_data.appendChild(user_img)
  user_sender = document.createElement("spawn")
  user_sender.setAttribute("class", "title")
  user_del_btn = document.createElement("a")
  user_del_btn.setAttribute("href", "#")
  user_del_btn.addEventListener("click", on_user_del)
  user_del_btn_img = document.createElement("i")
  user_del_btn_img.setAttribute("class", "red-text material-icons right")
  user_del_btn_img.innerHTML += "delete"
  user_del_btn.appendChild(user_del_btn_img)
  user_sender.appendChild(user_del_btn)
  user_sender.innerHTML += sender
  user_data.appendChild(user_sender)
  user_message = document.createElement("p")
  user_message.innerHTML += message
  user_data.setAttribute("id", "user_"+id.toString())
  user_data.appendChild(user_message)
  return user_data
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function on_user_del() {
  console.log("Clicked:")
  console.log(this.parentElement.id)
  user_id = this.parentElement.id.slice(5)
  fetch("http://localhost:3000/guest_messages?id="+user_id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    console.log(response)
    users_data_to_messages_collection()
    })
  .catch(error => {
    console.log(error)
  })
}