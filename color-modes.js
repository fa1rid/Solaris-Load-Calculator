function setTheme() {
    const htmlElement = document.querySelector('html');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
    } else if (prefersDarkMode) {
        htmlElement.setAttribute('data-bs-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-bs-theme', 'light');
    }
}
function setThemeIcon() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const iconElement = document.getElementById('icon');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            iconElement.className = 'bi bi-sun'; // Bootstrap icon for sun (dark mode)
        } else {
            iconElement.className = 'bi bi-moon'; // Bootstrap icon for moon (light mode)
        }
    } else if (prefersDarkMode) {
        iconElement.className = 'bi bi-sun'; // Bootstrap icon for sun (dark mode)
    } else {
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

// Set the theme when the page loads
setTheme();