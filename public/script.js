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

document.addEventListener('DOMContentLoaded', () => {
    const departmentMappings = {
        "Accounting": 1,
        "Africana Studies": 2,
        "Animal and Veterinary Science": 3,
        "Art & Art History": 4,
        "Arts and Sciences, College of": 5,
        "Biological Sciences": 6,
        "Biomedical and Pharmaceutical Sciences": 7,
        "Business Administration, College of": 8,
        "Cell and Molecular Biology": 9,
        "Chemical Engineering": 10,
        "Chemistry": 11,
        "Civil and Environmental Engineering": 12,
        "Clinical Laboratory Science": 13,
        "Communication Studies": 14,
        "Communicative Disorders": 15,
        "Computer Science and Statistics": 16,
        "Economics": 17,
        "Education": 18,
        "Education and Professional Studies, College of": 19,
        "Electrical, Computer, and Biomedical Engineering": 20,
        "Engineering, College of": 21,
        "English": 22,
        "English Language Studies": 23,
        "Entrepreneurial Management": 24,
        "Environmental and Natural Resource Economics": 25,
        "Environmental Horticulture": 26,
        "Environment and Life Sciences, College of the": 27,
        "Film Media": 28,
        "Finance": 29,
        "Fisheries, Animal, and Veterinary Science": 30,
        "Gender and Women’s Studies": 31,
        "General Business": 32,
        "Geology and Geological Oceanography": 33,
        "George & Anne Ryan Institute for Neuroscience": 34,
        "Geosciences": 35,
        "Gerontology": 36,
        "Global Business": 37,
        "Graduate School": 38,
        "Harrington School of Communication and Media": 39,
        "Health Sciences, College of": 40,
        "Health Studies": 41,
        "History": 42,
        "Honors Program": 43,
        "Human Development and Family Studies": 44,
        "Industrial and System Engineering": 45,
        "International Engineering": 46,
        "Journalism": 47,
        "Kinesiology": 48,
        "Labor Relations and Human Resources": 49,
        "Landscape Architecture": 50,
        "Library and Information Studies": 51,
        "Library – Public Services": 52,
        "Library – Technical Services": 53,
        "Marine Affairs": 54,
        "Marine Biology": 55,
        "Marketing": 56,
        "Mathematics": 57,
        "Mechanical Engineering and Applied Mechanics": 58,
        "Military Science": 59,
        "Modern and Classical Languages and Literatures": 60,
        "Music": 61,
        "Natural Resources Science": 62,
        "Neuroscience, Ryan Institute": 63,
        "Nursing, College of": 64,
        "Nutrition and Food Sciences": 65,
        "Ocean Engineering": 66,
        "Oceanography, Graduate School of": 67,
        "Pharmacy Practice (PHP)": 68,
        "Pharmacy, College of": 69,
        "Philosophy": 70,
        "Physics": 71,
        "Physical Education and Exercise Science (Kinesiology)": 72,
        "Physical Therapy": 73,
        "Plant Sciences": 74,
        "Political Science": 75,
        "Pre-Health Advisory Program": 76,
        "Preveterinary Medicine": 77,
        "Psychology": 78,
        "Public Relations": 79,
        "Ryan Institute for Neuroscience": 80,
        "Army ROTC": 81,
        "Sociology and Anthropology": 82,
        "Supply Chain Management": 83,
        "Textiles, Fashion Merchandising and Design": 84,
        "Theatre": 85,
        "Turfgrass Management": 86,
        "University College for Academic Success": 87,
        "University Libraries": 88,
        "Wildlife and Conservation Biology": 89,
        "Women’s Studies": 90,
        "Writing and Rhetoric": 91
    };

    const departmentSelect = document.getElementById('department-select');

    Object.entries(departmentMappings).forEach(([department, id]) => {
        const option = document.createElement('option');
        option.value = id; // Use the ID as the value to easily reference in the backend
        option.textContent = department;
        departmentSelect.appendChild(option);
    });
});

