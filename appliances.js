const appliances = {
    Residential: [
        {
            Category: "Kitchen",
            Appliances: {
                "Refrigerator": 150,
                "Microwave": 1200,
                "Toaster": 800,
                "Blender": 400,
                "Coffee Maker": 1000,
                "Dishwasher": 1500,
                "Food Processor": 600,
                "Oven": 3500,
            },
        },
        {
            Category: "Laundry",
            Appliances: {
                "Washing Machine": 500,
                "Dryer": 4000,
                "Iron": 1500,
                "Sewing Machine": 150,
                "Humidifier": 200,
                "Vacuum Cleaner": 800,

            },
        },
        {
            Category: "Entertainment",
            Appliances: {
                "TV": 200,
                "Game Console": 150,
                "Stereo System": 500,
                "Home Theater": 1200,
                "Projector": 800,
                "Amplifier": 400,
                "Soundbar": 80,
                "DVD Player": 35,
                "Gaming Console": 150,
            },
        },
        {
            Category: "Home Office",
            Appliances: {
                "Laptop": 200,
                "Desktop Computer": 350,
                "Printer": 600,
                "Office Desk Lamp": 60,
                "Scanner": 300,
                "Shredder": 200,
                "Router": 10,
            },
        },
        {
            Category: "Bedroom",
            Appliances: {
                "Air Conditioner": 2000,
                "Fan": 75,
                "Electric Blanket": 200,
                "Alarm Clock": 5,
                "Hair Dryer": 1200,
            },
        },
        {
            Category: "Fans Coolers",
            Appliances: {
                "Ceiling Fan": 75,
                "Table Fan": 50,
                "Air Cooler": 200,
            },
        },
        {
            Category: "Lights",
            Appliances: {
                "LED Bulb": 10,
                "Incandescent Bulb": 60,
                "Fluorescent Tube": 40,
                "Desk Lamp": 20,
            },
        },
        {
            Category: "ACs/Heaters",
            Appliances: {
                "Split AC": 1500,
                "Window AC": 1200,
                "Inverter AC": 1700,
                "Water Heater": 1500,
            },
        },
        {
            Category: "Motors",
            Appliances: {
                "Ceiling Fan Motor": 75,
                "Water Pump Motor": 750,
                "Refrigerator Compressor": 300,
            },
        },
    ],
    Commercial: [
        {
            Category: "Kitchen",
            Appliances: {
                "Industrial Refrigerator": 1000,
                "Commercial Microwave": 1800,
                "Commercial Oven": 3500,
                "Coffee Machine": 1200,
                "Dishwasher": 2000,
                "Deep Fryer": 2500,
                "Griddle": 3500,
            },
        },
        {
            Category: "Office",
            Appliances: {
                "Desktop Computer": 250,
                "Laptop": 200,
                "Laser Printer": 600,
                "Copier": 1500,
                "Fax Machine": 300,
                "Conference Phone": 500,
                "Projector": 800,
                "Security Camera": 20,
            },
        },
        {
            Category: "Industrial",
            Appliances: {
                "Conveyor Belt": 5000,
                "Heavy Machinery": 10000,
                "Industrial Oven": 6000,
                "Welding Machine": 7000,
                "Air Compressor": 4500,
                "Generator": 8000,
                "CNC Machine": 3500,
            },
        },
        {
            Category: "Healthcare",
            Appliances: {
                "MRI": 15000,
                "X-Ray Machine": 8000,
                "Ultrasound": 3000,
                "Ventilator": 1800,
                "Defibrillator": 1200,
                "ECG Machine": 600,
                "Medical Refrigerator": 250,
            },
        },
        {
            Category: "Hospitality",
            Appliances: {
                "Hotel TV": 250,
                "Ice Maker": 800,
                "Dish Warming Trolley": 1000,
                "Espresso Machine": 1500,
                "Commercial Washer": 3000,
                "Commercial Dryer": 5000,
                "Wine Cooler": 300,
            },
        },
    ],
};
console.log(envType);

// Lists for residential and commercial appliances
const residentialAppl = appliances.Residential;
const commercialAppl = appliances.Commercial;

let applianceData;


// console.log("Residential Appliances:", residentialAppl);
// console.log("Commercial Appliances:", commercialAppl);

function listAppliancesWithPower(appliances) {
    for (const category in appliances) {
        console.log(`Category: ${category}`);
        for (const appliance in appliances[category]) {
            const powerRating = appliances[category][appliance];
            console.log(`${appliance} (${powerRating}W)`);
        }
    }
}

// // Call the function for residential appliances
// console.log("Residential Appliances:");
// listAppliancesWithPower(residentialAppliances);

// // Call the function for commercial appliances
// console.log("\nCommercial Appliances:");
// listAppliancesWithPower(commercialAppl);


let applianceQuantities = {};
let categoryPower = {};
let totalLoad

function generateAccordion() {
    totalLoad = 0;
    // Keeps track of the quantity for each appliance
    applianceQuantities = {};
    // Keeps track of the category power
    categoryPower = {};
    document.getElementById('totalPower').textContent = '0W';

    if (envType === 'Residential') { applianceData = residentialAppl }
    if (envType === 'Commercial') { applianceData = commercialAppl }

    const catTabs = $('#v-pills-tab');
    const catContent = $('#v-pills-tabContent');
    catTabs.html('');
    catContent.html('');

    let setActive = true;
    
    for (const categoryID in applianceData) {
        const categoryName = applianceData[categoryID].Category;
        const appliances = applianceData[categoryID].Appliances;
        const categoryTotalPower = categoryPower[categoryID] || '';
        let activeClass = '';
        if (setActive) activeClass = 'active';

        const catEle = `<button class="nav-link ${activeClass}" id="cat-${categoryID}-tab" data-bs-toggle="pill" data-bs-target="#cat-${categoryID}" type="button" role="tab" aria-controls="cat-${categoryID}" aria-selected="true">${categoryName}${categoryTotalPower ? ` (${categoryTotalPower}W)` : ''}</button>`;
        catTabs.append(catEle);

        if (setActive) activeClass = 'show active';
        setActive = false;

        const catContentEle = `<div class="tab-pane fade ${activeClass}" id="cat-${categoryID}" role="tabpanel" aria-labelledby="cat-${categoryID}-tab" tabindex="0"></div>`;
        catContent.append(catContentEle);

        const appliancesList = document.createElement('div');
        appliancesList.className = 'row align-items-stretch';

        for (const appliance in appliances) {
            const powerRating = appliances[appliance];
            appliancesList.innerHTML += `
            <div class="col-lg-6 border">
                <div class="row my-2 align-items-center ">
                    <div class="col-8 mb-md-0">${appliance} (${powerRating}W)</div>
                    <div class="col-4 ps-0 mb-md-0">
                        <div class="border ms-1 d-flex align-items-stretch  justify-content-between ">
                            <button style="width:35%" class="p-0 btn btn-sm fs-5 bg-body-tertiary" onclick="decreaseQuantity('${appliance}')">-</button>
                            <div style="width:30%"  class="border-start border-end d-flex align-items-center justify-content-center ">
                            <span id="${appliance}-quantity" >0</span>
                            </div>
                            <button style="width:35%" class="p-0 btn btn-sm fs-5 bg-body-tertiary" onclick="increaseQuantity('${appliance}')">+</button>
                        </div>
                    </div>
                </div>
            </div>`;

        }
        const catContentAplliances = $(`#cat-${categoryID}`);
        catContentAplliances.append(appliancesList);

    }

    $("#custom-load").on('input', function(){
        const inputValue = $(this).val();
        $('#totalPower').text(inputValue + 'W');
        totalLoad = inputValue;
    })
    return true;
}

function increaseQuantity(appliance) {
    if (!applianceQuantities[appliance]) {
        applianceQuantities[appliance] = 1;
        const category = getCategory(appliance);
        if (!categoryPower[category]) {
            categoryPower[category] = applianceData[category].Appliances[appliance];
        } else {
            categoryPower[category] += applianceData[category].Appliances[appliance];
        }
    } else {
        applianceQuantities[appliance]++;
        categoryPower[getCategory(appliance)] += applianceData[getCategory(appliance)].Appliances[appliance];
    }

    updateQuantityDisplay(appliance);
}

function decreaseQuantity(appliance) {
    if (applianceQuantities[appliance] > 0) {
        applianceQuantities[appliance]--;
        categoryPower[getCategory(appliance)] -= applianceData[getCategory(appliance)].Appliances[appliance];
        updateQuantityDisplay(appliance);
    }
}

function updateQuantityDisplay(appliance) {
    $("#custom-load").val('');
    const quantityElement = document.getElementById(`${appliance}-quantity`);
    quantityElement.textContent = applianceQuantities[appliance];

    const totalPowerElement = document.getElementById('totalPower');
    totalPowerElement.textContent = calculateTotalPower() + 'W';

    const categoryTitleElement = document.getElementById(`cat-${getCategory(appliance)}-tab`);
    const categoryTotalPower = categoryPower[getCategory(appliance)] || '';
    categoryTitleElement.innerHTML = `${applianceData[getCategory(appliance)].Category}${categoryTotalPower ? ` <span class="badge rounded-pill text-bg-warning">(${categoryTotalPower}W)</span>` : ''}`;
}

function getCategory(appliance) {
    for (const category in applianceData) {
        if (appliance in applianceData[category].Appliances) {
            return category;
        }
    }
}

function calculateTotalPower() {
    let totalPower = 0;
    for (const appliance in applianceQuantities) {
        totalPower += applianceQuantities[appliance] * applianceData[getCategory(appliance)].Appliances[appliance];
    }
    totalLoad = totalPower || 0;
    return totalPower || '0';
}

// generateAccordion();