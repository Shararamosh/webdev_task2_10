document.addEventListener("DOMContentLoaded", init_sidenav_mobile)
document.addEventListener("DOMContentLoaded", users_data_to_messages_collection)
$("#messages_collection").on("click", ".user_delete", function() {
  user_id = $(this)[0].parentElement.parentElement.id
  delete_user(user_id)
})
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
message_submit_btn = document.getElementById("message_submit")
message_submit_btn.addEventListener("click", upload_user_data)
function init_sidenav_mobile() {
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
}
function upload_user_data() {
  email_input = document.getElementById("email_input")
  if (email_input == null || !email_input.checkValidity())
    return
  message_input = document.getElementById("message_input")
  if (message_input == null || !email_input.checkValidity())
    return
  avatar_input = document.getElementById("avatar_input")
  let email = email_input.value
  let message = message_input.value
  console.log(email)
  console.log(message)
  if (avatar_input.files.length < 1) {
    send_user_data(email, message, "");
    return;
  }
  let file = avatar_input.files[0];
  getBase64(file).then(
    file_base64 => {
      send_user_data(email, message, file_base64);
    }
  )
}
function send_user_data(email, message, avatar) {
  fetch("http://localhost:3000/guest_messages",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({"sender": email, "message": message, "avatar": avatar})
    })
  .then(response => response.json())
  .then(guest_message => {
    add_guest_message(guest_message);
  })
}
function add_guest_message(guest_message) {
  messages_collection = document.getElementById("messages_collection")
  if (messages_collection == null)
    return
  let user_data = create_user_data(guest_message.id, guest_message.sender, guest_message.message, guest_message.avatar)
  messages_collection.appendChild(user_data)
}
function remove_element_by_id(id) {
  let element = document.getElementById(id)
  if (element != null)
    element.remove()
}
function users_data_to_messages_collection() {
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
      add_guest_message(guest_message)
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
  user_del_btn = document.createElement("a")
  user_del_btn.setAttribute("href", "#")
  user_del_btn.setAttribute("class", "user_delete")
  user_del_btn_img = document.createElement("i")
  user_del_btn_img.setAttribute("class", "red-text material-icons right")
  user_del_btn_img.innerHTML += "delete"
  user_del_btn.appendChild(user_del_btn_img)
  user_sender.appendChild(user_del_btn)
  user_sender_email = document.createElement("p")
  user_sender_email.setAttribute("class", "user_email")
  user_sender_email.innerHTML += sender
  user_sender.appendChild(user_sender_email)
  user_data.appendChild(user_sender)
  user_message = document.createElement("p")
  user_message.setAttribute("class", "user_message")
  user_message.innerHTML += message
  user_data.setAttribute("id", "user_"+id.toString())
  user_data.appendChild(user_message)
  return user_data
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function delete_user(element_id) {
  user_id = element_id.slice(5)
  fetch("http://localhost:3000/guest_messages/"+user_id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    console.log(response)
    remove_element_by_id(element_id)
    })
  .catch(error => {
    console.log(error)
  })
}