function generateCertificate() {
    // Get form values
    var studentName = document.getElementById('studentName').value;
    var regNo = document.getElementById('regNo').value;
    var department = document.getElementById('department').value;
    var examName = document.getElementById('examName').value;
    var completionDate = new Date().toLocaleDateString();

    // Update certificate with form values
    document.getElementById('certStudentName').textContent = studentName;
    document.getElementById('certRegNo').textContent = regNo;
    document.getElementById('certDepartment').textContent = department;
    document.getElementById('certExamName').textContent = examName;
    document.getElementById('certCompletionDate').textContent = completionDate;

    // Show the certificate and hide the form
    document.querySelector('.form-container').style.display = 'none';
    document.querySelector('.certificate-container').style.display = 'block';
}
