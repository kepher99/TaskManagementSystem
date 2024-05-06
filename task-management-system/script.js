firebase.initializeApp({
  apiKey: "AIzaSyC8LPuHH4cfeSzsRk2oMKWj7Q8dhlwrHWs",
  authDomain: "plp-web-d5a93.firebaseapp.com",
  projectId: "plp-web-d5a93",
  storageBucket: "plp-web-d5a93.appspot.com",
  messagingSenderId: "329718796435",
  appId: "1:329718796435:web:bf8d1c9c864d3a451d7d66"
});

const db = firebase.firestore();

function addTask(){
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();
  if(task !== ""){
    db.collection("tasks").add({
      task: task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    taskInput.value = "";
    console.log("Task added.");
  }
}

function renderTask(doc){
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
  <span>${doc.data().task}</span>
  <button class="delete-button" onclick="deleteTask('${doc.id}')">Delete</button>
  `;
  taskList.appendChild(taskItem);
}

db.collection("tasks")
  .orderBy("timestamp","desc")
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
      if(change.type === "added"){
        renderTask(change.doc);
      }
    });
  });

function deleteTask(id){
  db.collection("tasks").doc(id).delete();
}