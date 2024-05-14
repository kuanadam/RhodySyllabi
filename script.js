document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('agreeCheckbox');
    const enterButton = document.getElementById('enter')

    checkbox.addEventListener('change', function() {
        enterButton.disabled= !checkbox.checked;
    });
});
