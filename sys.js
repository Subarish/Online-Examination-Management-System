function Submit() {
    var questions = document.querySelectorAll('.question');
    var unansweredQuestions = [];

    questions.forEach(function(question, index) {
        var radioButtons = question.querySelectorAll('input[type="radio"]');
        var answered = false;

        radioButtons.forEach(function(radioButton) {
            if (radioButton.checked) {
                answered = true;
            }
        });

        if (!answered) {
            unansweredQuestions.push(index + 1);
            question.classList.add('unanswered'); // Add a class to highlight unanswered questions
        } else {
            question.classList.remove('unanswered'); // Remove the class if the question is answered
        }
    });

    if (unansweredQuestions.length > 0) {
        alert('Please answer the following questions: ' + unansweredQuestions.join(', '));
        alert('please complete the Examination,after enter your Details!!! \n')
    } else {
        
            window.location.href = 'index.html';
        
        }    
    
}

function Cancel() {
    var questions = document.querySelectorAll('.question');

    questions.forEach(function(question) {
        var radioButtons = question.querySelectorAll('input[type="radio"]');
        
        radioButtons.forEach(function(radioButton) {
            radioButton.checked = false; // Uncheck all radio buttons
        });

        question.classList.remove('unanswered'); // Remove the unanswered class
    });

    alert('Retry the Examination.');
}

var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "profileicon.png"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.startDate}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, name, age, city, email, phone, sDate){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showAge").value = age,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showsDate").value = sDate
}


function editInfo(index, pic, name, Age, City, Email, Phone, Sdate){
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    age.value = Age
    city.value =City
    email.value = Email,
    phone.value = Phone,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "profileicon.png" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        startDate: sDate.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "profileicon.png"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})





form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('picture', imgInput.src || "profileicon.png");
    formData.append('employeeName', userName.value);
    formData.append('employeeAge', age.value);
    formData.append('employeeCity', city.value);
    formData.append('employeeEmail', email.value);
    formData.append('employeePhone', phone.value);
    formData.append('startDate', sDate.value);
    formData.append('isEdit', isEdit);
    if (isEdit) formData.append('editId', editId);

    try {
        const response = await fetch('submit.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            alert('Data saved successfully!');
            showInfo();
            form.reset();
            imgInput.src = "profileicon.png";
            submitBtn.innerText = "Submit";
            modalTitle.innerText = "Fill The Form";
            isEdit = false;
        } else {
            alert('Error saving data: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
