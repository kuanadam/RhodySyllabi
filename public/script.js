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
        }, 1000); // 1 seconds
    }
});

const departments = [
    "Accounting", "Africana Studies", "Animal and Veterinary Science", "Art & Art History", "Arts and Sciences, College of",
    "Biological Sciences", "Biomedical and Pharmaceutical Sciences", "Business Administration, College of",
    "Cell and Molecular Biology", "Chemical Engineering", "Chemistry", "Civil and Environmental Engineering", "Clinical Laboratory Science",
    "Communication Studies", "Communicative Disorders", "Computer Science and Statistics", "Economics", "Education",
    "Education and Professional Studies, College of", "Electrical, Computer, and Biomedical Engineering", "Engineering, College of", "English",
    "English Language Studies", "Entrepreneurial Management", "Environmental and Natural Resource Economics", "Environmental Horticulture",
    "Environment and Life Sciences, College of the", "Film Media", "Finance", "Fisheries, Animal, and Veterinary Science",
    "Gender and Women’s Studies", "General Business", "Geology and Geological Oceanography", "George & Anne Ryan Institute for Neuroscience",
    "Geosciences", "Gerontology", "Global Business", "Graduate School", "Harrington School of Communication and Media", "Health Sciences, College of",
    "Health Studies", "History", "Honors Program", "Human Development and Family Studies", "Industrial and System Engineering", "International Engineering",
    "Journalism", "Kinesiology", "Labor Relations and Human Resources", "Landscape Architecture", "Library and Information Studies", "Library – Public Services",
    "Library – Technical Services", "Marine Affairs", "Marine Biology", "Marketing", "Mathematics", "Mechanical Engineering and Applied Mechanics",
    "Military Science", "Modern and Classical Languages and Literatures", "Music", "Natural Resources Science", "Neuroscience, Ryan Institute",
    "Nursing, College of", "Nutrition and Food Sciences", "Ocean Engineering", "Oceanography, Graduate School of", "Pharmacy Practice (PHP)",
    "Pharmacy, College of", "Philosophy", "Physics", "Physical Education and Exercise Science (Kinesiology)", "Physical Therapy", "Plant Sciences",
    "Political Science", "Pre-Health Advisory Program", "Preveterinary Medicine", "Psychology", "Public Relations", "Ryan Institute for Neuroscience",
    "Army ROTC", "Sociology and Anthropology", "Supply Chain Management", "Textiles, Fashion Merchandising and Design", "Theatre", "Turfgrass Management",
    "University College for Academic Success", "University Libraries", "Wildlife and Conservation Biology", "Women’s Studies", "Writing and Rhetoric"
];

const departmentSelect = document.getElementById('department-select');

departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department;
    option.textContent = department;
    departmentSelect.appendChild(option);
});
