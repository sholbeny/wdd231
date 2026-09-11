const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "",
        technology: [],
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "",
        technology: [],
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "",
        technology: [],
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "",
        technology: [],
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "",
        technology: [],
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "",
        technology: [],
        completed: false
    }
];

const courseContainer = document.querySelector("#courses");
const totalCredits = document.querySelector("#totalCredits");

const allButton = document.querySelector("#all");
const cseButton = document.querySelector("#cse");
const wddButton = document.querySelector("#wdd");


function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach((course) => {
        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.textContent = `${course.subject} ${course.number}`;

        courseContainer.appendChild(courseCard);
    });

    displayCredits(courseList);
}


function displayCredits(courseList) {
    const credits = courseList.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    totalCredits.textContent = `Total Credits: ${credits}`;
}


allButton.addEventListener("click", () => {
    displayCourses(courses);
});


cseButton.addEventListener("click", () => {
    const cseCourses = courses.filter((course) => {
        return course.subject === "CSE";
    });

    displayCourses(cseCourses);
});


wddButton.addEventListener("click", () => {
    const wddCourses = courses.filter((course) => {
        return course.subject === "WDD";
    });

    displayCourses(wddCourses);
});


displayCourses(courses);