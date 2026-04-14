
let envType;
(() => {
    // #######################################################
    $(document).ready(function () {
        // Toggle the theme when the button is clicked
        setThemeIcon();
        document.getElementById('darkModeToggle').addEventListener('click', toggleTheme);
    // #######################################################

        // Alerts
        function showAlert(message, type, duration) {
            // Create the alert element
            var alertElement = document.createElement("div");
            alertElement.classList.add("alert", "alert-" + type, "fixed-top-slide", "shadow");
            // alertElement.classList.add("alert", "alert-" + type, "fixed-top-slide", "border-top-0", "border-start-0", "border-end-0", "rounded-0", "shadow");
            // alertElement.innerText = message;
            alertElement.innerHTML = `<div class="px-0 container-md text-center"> ${message}</div>`;

            // Add the alert to the container
            document.getElementById("alert-container").appendChild(alertElement);

            // Set a timeout to slide the alert down and dismiss it
            setTimeout(function () {
                alertElement.style.top = "10px";
                alertElement.style.opacity = 1;
                setTimeout(function () {
                    // Dismiss the alert after 5 seconds
                    // alertElement.style.transition = "opacity 1s";
                    alertElement.style.top = "-60px";
                    alertElement.style.opacity = 0;
                    setTimeout(function () {
                        alertElement.remove();
                    }, 1000); // Remove the element after the transition is complete
                }, duration); // Dismiss after x seconds
            }, 100); // Slide down after a short delay
        }

        // Example usage:
        // showAlert("This is a Bootstrap 5 alert!", "danger");
        // #######################################################

        // Initialize the carousel
        const carousel = $("#steps");
        carousel.carousel({ 'wrap': false });
        // #######################################################
        let currentStep = 1;
        const totalSteps = 3;
        let totalW;

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
                console.log(`totalLoad ${totalLoad}`);
                if (!totalLoad > 0) {
                    showAlert("Please enter load.", "danger", 3000);
                    return false;
                }
                const slider = $("#backupHours");
                const output = $("#backupHoursOutput");
                const backupHours = parseFloat(slider.val());
                totalW = backupHours * totalLoad
                console.log(backupHours);
                output.html(backupHours + ' Hours');
                slider.on('input', function () {
                    const backupHours = parseFloat($(this).val());
                    // console.log(backupHours);
                    totalW = backupHours * totalLoad
                    // console.log(totalW);
                    output.html($(this).val() + ' Hours');
                });
                return true;
            }
            if (step === 3) {
                console.log(totalW);
                const output = $("#finalLoad");
                output.html(totalW + 'W');
                fetchProductDetails(totalW);
                return true;
            }

        }

        function updateProgressBar(step = 1) {
            const progressBar = $(".progress-bar");
            const progress = Math.ceil((step / totalSteps) * 100);
            progressBar.css("width", progress + "%").attr("aria-valuenow", progress);
            progressBar.text(`Step ${step}/${totalSteps}`);
        }
        updateProgressBar();

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
        $(".finishBtn").click(function () {
            if (currentStep <= totalSteps) {
                if (runStep(currentStep, $(this)) === true) {
                    window.scrollTo(0, 0);
                    carousel.carousel("next");
                    updateProgressBar(0);
                }
            }
        });
        $(".againBtn").click(function () {
            currentStep = 1;
            window.scrollTo(0, 0);
            carousel.carousel(0);
            updateProgressBar(1);
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

    });

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

    async function fetchProductDetails(power) {
    // Show a loader immediately while the API request is in progress
    const recommendedProductDiv = document.getElementById('recommended-product');
    recommendedProductDiv.innerHTML = `
      <div id="recommended-loading" class="d-flex justify-content-center align-items-center my-4">
        <div class="spinner-border" role="status" aria-hidden="true"></div>
        <span class="visually-hidden">Loading...</span>
      </div>
    `;

    try {
        // Fetch the product details from the API
        const response = await fetch(`https://solarissolutions.co/product_finder_api.php?power=${power}&type=json`);
        const result = await response.json();

        // Clear the loader before inserting results
        recommendedProductDiv.innerHTML = '';

        if (result.success && result.data && result.data.length > 0) {
            // Loop through each product in the data array
            result.data.forEach(product => {
                // Create a card element
                const cardHTML = `
                <div class="card mb-3" style="max-width: 540px;">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${product.image_medium}" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="${product.name}">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description && product.description.length > 100 ? product.description.substring(0, 97) + '...' : (product.description || '')}</p>
                        <a href="${product.url}" class="btn btn-primary">View Product</a>
                      </div>
                    </div>
                  </div>
                </div>
                `;
                recommendedProductDiv.innerHTML += cardHTML;
            });
        } else {
            // Display a friendly message if no products were found (only after fetch completes)
            const message = result && result.message ? result.message : 'No products were found for the selected load.';
            recommendedProductDiv.innerHTML = `<p class="text-muted">${message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        // Replace loader with a clear error message
        recommendedProductDiv.innerHTML = '<p>There was an error retrieving the product details. Please try again later.</p>';
    }
}

})()
