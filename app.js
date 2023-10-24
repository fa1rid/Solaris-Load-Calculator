// (() => {

//     document.getElementById('darkModeToggle').addEventListener('click', function () {
//         const htmlElement = document.querySelector('html');
//         const iconElement = document.getElementById('icon');
//         if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
//             htmlElement.setAttribute('data-bs-theme', 'light');
//             iconElement.className = 'bi bi-moon'; // Bootstrap icon for moon (light mode)
//         } else {
//             htmlElement.setAttribute('data-bs-theme', 'dark');
//             iconElement.className = 'bi bi-sun'; // Bootstrap icon for sun (dark mode)
//         }
//     });

//     'use strict'

//     const getStoredTheme = () => localStorage.getItem('theme')
//     const setStoredTheme = theme => localStorage.setItem('theme', theme)

//     const getPreferredTheme = () => {
//       const storedTheme = getStoredTheme()
//       if (storedTheme) {
//         return storedTheme
//       }

//       return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
//     }

//     const setTheme = theme => {
//       if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         document.documentElement.setAttribute('data-bs-theme', 'dark')
//       } else {
//         document.documentElement.setAttribute('data-bs-theme', theme)
//       }
//     }

//     setTheme(getPreferredTheme())

//     const showActiveTheme = (theme, focus = false) => {
//       const themeSwitcher = document.querySelector('#bd-theme')

//       if (!themeSwitcher) {
//         return
//       }

//       const themeSwitcherText = document.querySelector('#bd-theme-text')
//       const activeThemeIcon = document.querySelector('.theme-icon-active use')
//       const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
//       const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

//       document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
//         element.classList.remove('active')
//         element.setAttribute('aria-pressed', 'false')
//       })

//       btnToActive.classList.add('active')
//       btnToActive.setAttribute('aria-pressed', 'true')
//       activeThemeIcon.setAttribute('href', svgOfActiveBtn)
//       const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
//       themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

//       if (focus) {
//         themeSwitcher.focus()
//       }
//     }

//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
//       const storedTheme = getStoredTheme()
//       if (storedTheme !== 'light' && storedTheme !== 'dark') {
//         setTheme(getPreferredTheme())
//       }
//     })

//     window.addEventListener('DOMContentLoaded', () => {
//       showActiveTheme(getPreferredTheme())

//       document.querySelectorAll('[data-bs-theme-value]')
//         .forEach(toggle => {
//           toggle.addEventListener('click', () => {
//             const theme = toggle.getAttribute('data-bs-theme-value')
//             setStoredTheme(theme)
//             setTheme(theme)
//             showActiveTheme(theme, true)
//           })
//         })
//     })
//   })()

// Range Slider
const
    range = document.getElementById('backupHours'),
    rangeV = document.getElementById('rangeV'),
    rangeMin = document.getElementById('range-min'),
    rangemax = document.getElementById('range-max'),
    setValue = () => {
        const
            newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
            // newPosition = 10 - (newValue * 0.2);
            newPosition = 10 - (newValue * 0.2);
        rangeV.innerHTML = `<span>${range.value} hr</span>`;
        if (range.value === range.min) { rangeV.style.left = `calc(${newValue}% + (${newPosition}px + 20px) )`; }
        else if (range.value === range.max) { rangeV.style.left = `calc(${newValue}% + (${newPosition}px - 20px) )`; }
        else { rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`; }

        rangeMin.innerHTML = `<span>${range.min} hr</span>`;
        rangemax.innerHTML = `<span>${range.max} hr</span>`;
    };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);

// #######################################################
let envType;
$(document).ready(function () {

    // Initialize the carousel
    const carousel = $("#steps");
    carousel.carousel({ 'wrap': false });
    // #######################################################
    let currentStep = 1;
    const totalSteps = 3;

    function runStep(step, caller) {
        if (step === 1) {
            envType = caller.attr("id");
            // console.log(envType);
            if (generateAccordion() === true) {
                $("#loadType").text(envType)
                return true;
            }
        }
        if (step === 2) {
            var slider = $("#backupHours");
            var output = $("#backupHoursOutput");
            console.log(slider.val());
            output.html(slider.val() + ' Hours');
            slider.on('input', function () {
                console.log($(this).val());
                output.html($(this).val() + ' Hours');
            });

            return true;
        }
    }
    // $("[data-step-next]").click(function (event) {
    //     event.preventDefault(); // Prevent the default behavior of the anchor link
    //     envType = $(this).attr("id");
    //     console.log(envType);
    //     $(".nextBtn").click();
    //     generateAccordion();
    // });

    function updateProgressBar(step) {
        const progressBar = $(".progress-bar");
        const progress = Math.ceil((step / totalSteps) * 100);
        progressBar.css("width", progress + "%").attr("aria-valuenow", progress);
        progressBar.text(`Step ${step}/${totalSteps}`);
    }

    // Next button click event
    $(".nextBtn").click(function () {
        if (currentStep < totalSteps) {
            if (runStep(currentStep, $(this)) === true) {
                window.scrollTo(0, 0);
                carousel.carousel("next");
                currentStep++;
                updateProgressBar(currentStep);

            }
        }

    });

    // Previous button click event
    $(".previousBtn").click(function () {
        if (currentStep > 1) {
            currentStep--;
            updateProgressBar(currentStep);
            window.scrollTo(0, 0);
            carousel.carousel("prev");
        }
        if (currentStep == 1) {
            $("#loadType").text('');
        }
    });

    // // Dark Mode
    // $("input[id='lightSwitch']").on("change", function () {
    //     if ($("html").attr("data-bs-theme") == 'light') {
    //         $("html").attr("data-bs-theme", "dark");
    //     } else if ($("html").attr("data-bs-theme") == "dark") {
    //         $("html").attr("data-bs-theme", "light");
    //     }
    // });
    // const htmlElement = document.querySelector("html")
    // if (htmlElement.getAttribute("data-bs-theme") === 'auto') {
    //     function updateTheme() {
    //         document.querySelector("html").setAttribute("data-bs-theme",
    //             window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    //     }
    //     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
    //     updateTheme()
    // }
    // #######################################################
    // Function to set the theme based on user preference or system settings
    function setTheme() {
        const htmlElement = document.querySelector('html');
        const iconElement = document.getElementById('icon');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            htmlElement.setAttribute('data-bs-theme', savedTheme);
            if (savedTheme === 'dark') {
                iconElement.className = 'bi bi-sun'; // Bootstrap icon for sun (dark mode)
            } else {
                iconElement.className = 'bi bi-moon'; // Bootstrap icon for moon (light mode)
            }
        } else if (prefersDarkMode) {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            iconElement.className = 'bi bi-sun'; // Bootstrap icon for sun (dark mode)
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            iconElement.className = 'bi bi-moon'; // Bootstrap icon for moon (light mode)
        }
    }

    // Function to toggle the theme and save it in local storage
    function toggleTheme() {
        const htmlElement = document.querySelector('html');
        const iconElement = document.getElementById('icon');
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-bs-theme', newTheme);
        iconElement.className = newTheme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
        localStorage.setItem('theme', newTheme);
    }

    // Toggle the theme when the button is clicked
    document.getElementById('darkModeToggle').addEventListener('click', toggleTheme);

    // Set the theme when the page loads
    setTheme();
});
