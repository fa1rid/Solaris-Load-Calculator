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
                "Vacuum Cleaner": 800,
                "Sewing Machine": 150,
                "Humidifier": 200,
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
            },
        },
        {
            Category: "Home Office",
            Appliances: {
                "Laptop": 200,
                "Desktop Computer": 350,
                "Printer": 600,
                "Desk Lamp": 60,
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
            Category: "Home Appliances",
            Appliances: {
                "Vacuum Cleaner": 800,
                "Water Heater": 1500,
                "Refrigerator": 150,
                "Microwave": 1200,
            },
        },
        {
            Category: "TV Entertainment",
            Appliances: {
                "TV": 200,
                "Soundbar": 80,
                "DVD Player": 35,
                "Gaming Console": 150,
            },
        },
        {
            Category: "ACs",
            Appliances: {
                "Split AC": 1500,
                "Window AC": 1200,
                "Inverter AC": 1700,
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

function generateAccordion() {
    // Keeps track of the quantity for each appliance
    applianceQuantities = {};
    // Keeps track of the category power
    categoryPower = {};
    document.getElementById('totalPower').textContent = '0W';

    if (envType === 'Residential') { applianceData = residentialAppl }
    if (envType === 'Commercial') { applianceData = commercialAppl }

    const accordionContainer = document.getElementById('accordionContainer');
    accordionContainer.innerHTML = '';

    for (const categoryID in applianceData) {
        const categoryName = applianceData[categoryID].Category;
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'accordion-item';

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'accordion-header';
        const categoryTotalPower = categoryPower[categoryID] || '';
        categoryTitle.innerHTML = `
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${categoryID}" aria-expanded="true">
        ${categoryName}${categoryTotalPower ? ` (${categoryTotalPower}WX)` : ''}
      </button>
    `;

        const appliances = applianceData[categoryID].Appliances;
        const categoryContent = document.createElement('div');
        categoryContent.className = 'accordion-collapse collapse';
        categoryContent.setAttribute('data-bs-parent', '#accordionContainer'); // Set data-bs-parent attribute
        categoryContent.id = `collapse-${categoryID}`;

        const appliancesList = document.createElement('div');
        // appliancesList.className = 'accordion-body bg-body';
        appliancesList.className = 'p-sm-3 px-sm-4 bg-body';

        for (const appliance in appliances) {
            const powerRating = appliances[appliance];
            appliancesList.innerHTML += `
        <div class=" row bg-body-secondary px-3 py-2 mb-2">
          <div class="col-md-8 mb-2 mb-md-0 mt-2">${appliance} (${powerRating}W)</div>
          <div class="col-md-4 mb-2 mb-md-0">
          <div class="mx-5 mx-md-0 bg-body d-flex align-items-center justify-content-between ">
            <button style="width:35%" class="btn btn-sm fs-5" onclick="decreaseQuantity('${appliance}')">-</button>
            <div style="width:30%"  class="border-start border-end h-100 d-flex align-items-center justify-content-center ">
            <span id="${appliance}-quantity" >0</span>
            </div>
            <button style="width:35%" class="btn btn-sm fs-5" onclick="increaseQuantity('${appliance}')">+</button>
          </div>
        </div>
        </div>
      `;
            //         appliancesList.innerHTML += `
            //     <div class="bg-body-tertiary px-3 py-2 d-flex align-items-center justify-content-between mb-2">
            //       <div>${appliance} (${powerRating}W)</div>
            //       <div class="ms-2 me-2 bg-body d-flex align-items-center flex-column flex-md-row">
            //         <button class="btn btn-sm px-4 fs-5" onclick="decreaseQuantity('${appliance}')">-</button>
            //         <span id="${appliance}-quantity">0</span>
            //         <button class="btn btn-sm px-4 fs-5" onclick="increaseQuantity('${appliance}')">+</button>
            //       </div>
            //     </div>
            //   `;
        }

        categoryContent.appendChild(appliancesList);
        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(categoryContent);
        accordionContainer.appendChild(categoryDiv);
    }
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
    const quantityElement = document.getElementById(`${appliance}-quantity`);
    quantityElement.textContent = applianceQuantities[appliance];

    const totalPowerElement = document.getElementById('totalPower');
    totalPowerElement.textContent = calculateTotalPower() + 'W';

    const categoryTitleElement = document.querySelector(`[data-bs-target="#collapse-${getCategory(appliance)}"]`);
    const categoryTotalPower = categoryPower[getCategory(appliance)] || '';
    categoryTitleElement.innerHTML = `${applianceData[getCategory(appliance)].Category}${categoryTotalPower ? ` <span class="badge rounded-pill text-bg-warning ms-2">(${categoryTotalPower}W)</span>` : ''}`;
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
    return totalPower || '';
}

// generateAccordion();