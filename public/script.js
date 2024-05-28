// Enter button function
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('agreeCheckbox');
    const enterButton = document.getElementById('enter')

    checkbox.addEventListener('change', function() {
        enterButton.disabled= !checkbox.checked;
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    var model = document.getElementById("popUp");
    var form = document.getElementById("submissionForm");

    // Set a flag in session storage when the form is submitted
    form.addEventListener('submit', function() {
        sessionStorage.setItem('formSubmitted', 'true');
    });

    // Check the flag on page load and display the popup if the flag is set
    if (sessionStorage.getItem('formSubmitted') === 'true') {
        model.style.display = 'block';
        setTimeout(function() {
            model.style.display = 'none';
            sessionStorage.removeItem('formSubmitted');
        }, 1000); // 3 seconds
    }
});
