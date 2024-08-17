const cl = console.log;
const todolist = document.getElementById("todolist");
const selected = document.getElementById("selected");

const todourl = `https://jsonplaceholder.typicode.com/todos`;

 let todoArr = [];
 let todoFilteredArray = [];


const templating = (arr) => {
  
  let result = " ";
  let completed = " ";
  
  arr.forEach((ele, i) => {
    (ele.completed == true) ? completed = "Yes" : completed = "No";
    result += `<tr>
                   <td>${i + 1}</td>
                   <td>${ele.title}</td>
                   <td>${ele.userId}</td>
                   <td>${completed}</td>
                   </tr>`;
  });
  todolist.innerHTML = result;
};


const objtoArr = (obj) => {
       
    for (const key in obj) {
        todoArr.push({...obj[key], id : key})
            
        }
        return todoArr;
    }


// const fetchPosts = () => {
//   //API call starts => loader show
//    loader.classList.remove(`d-none`)
//   //1. create xhr object

//   let xhr = new XMLHttpRequest(); //object

//   //2.configuration

//   //xhr.open(METHODNAME , API_URL)

//   xhr.open("GET", todourl);

//   //3

//   xhr.send();

//   //4.after getting response

//   xhr.onload = function () {
//     // cl(xhr.status)
//     if (xhr.status >= 200 && xhr.status < 300) {
//       //API call success
//       todoArr = JSON.parse(xhr.response);

//       // templating
//       templating(todoArr);
//       cl(todoArr);
//     }

//      loader.classList.add(`d-none`) //Loader hide
//   };
// };

// fetchPosts();

const makeApiCall = async(methodName, api_url, msgBody)=>{
    loader.classList.remove(`d-none`)
    msgBody = msgBody ? JSON.stringify(msgBody) : null;

    let res = await fetch(api_url,{
    method:methodName,
    body:msgBody,
    headers:{
      "token":"Token from local storage"
    }
    })

    return res.json()
         
}

const fetchPosts = async () => {
    let data = await makeApiCall("GET", todourl)
    let arr = objtoArr(data);
    templating(arr)
    loader.classList.add(`d-none`)
}
fetchPosts()

const onchangestatus = (event) => {
  if (event.target.value === "all") {
    templating(todoArr);
  } else {
    let selectedDropdownValue = JSON.parse(event.target.value);
    todoFilteredArray= todoArr.filter(
      (status) => status.completed == selectedDropdownValue
    );
    templating(todoFilteredArray)
  }
};

selected.addEventListener("change", onchangestatus);
