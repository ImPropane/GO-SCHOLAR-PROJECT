// --- SCHOLARSHIP DATABASE ---
const scholarships = [
    // --- MODIFIED: Added 'type' property to all scholarships ---
    // --- Government Scholarships ---
    {
        type: "Government",
        name: "Pre-Matric Scholarships Scheme for Minorities",
        portal: "National Scholarship Portal (NSP)",
        link: "https://scholarships.gov.in/",
        description: "Financial aid for meritorious students from minority communities for studies from Class 1 to 10.",
        eligibility: {
            category: ["MINORITY"],
            income: 100000,
            minMarks: 50,
        }
    },
    {
        type: "Government",
        name: "Post-Matric Scholarships Scheme for Minorities",
        portal: "National Scholarship Portal (NSP)",
        link: "https://scholarships.gov.in/",
        description: "Financial aid for meritorious students from minority communities for studies from Class 11 to PhD.",
        eligibility: {
            category: ["MINORITY"],
            income: 200000,
            minMarks: 50,
        }
    },
     {
        type: "Government",
        name: "Central Sector Scheme of Scholarships for College and University Students",
        portal: "National Scholarship Portal (NSP)",
        link: "https://scholarships.gov.in/",
        description: "Provides financial assistance to meritorious students from low-income families to meet day-to-day expenses while pursuing higher studies.",
        eligibility: {
            category: ["GENERAL", "OBC", "SC", "ST"],
            income: 450000,
            minMarks: 80, 
        }
    },
    {
        type: "Government",
        name: "Post-Matric Scholarship for SC Students",
        portal: "State Portals / NSP",
        link: "https://scholarships.gov.in/",
        description: "Financial assistance to Scheduled Caste students pursuing post-matriculation courses in India.",
        eligibility: {
            category: ["SC"],
            income: 250000,
        }
    },
    {
        type: "Government",
        name: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojana (Maharashtra)",
        portal: "MahaDBT Portal",
        link: "https://mahadbtmahait.gov.in/",
        description: "Provides tuition and exam fee concessions for students from economically weaker sections pursuing higher professional education in Maharashtra.",
        eligibility: {
            domicile: ["Maharashtra"],
            category: ["GENERAL"],
            income: 800000,
            minMarks: 60,
        }
    },
    
    // --- ADDED: Private Scholarships Section ---
    {
        type: "Private",
        name: "Reliance Foundation Undergraduate Scholarships",
        portal: "Reliance Foundation Portal",
        link: "https://www.reliancefoundation.org/education/scholarships",
        description: "Supports meritorious students for any stream of their choice. Aims to select 5,000 students annually.",
        eligibility: {
            income: 250000,
            minMarks: 60, // in 12th standard
        }
    },
    {
        type: "Private",
        name: "HDFC Bank Parivartan's ECSS Programme",
        portal: "Buddy4Study",
        link: "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme",
        description: "For meritorious and needy students belonging to underprivileged sections of society. Covers school, UG, and PG students.",
        eligibility: {
            income: 250000,
            minMarks: 55,
        }
    },
    {
        type: "Private",
        name: "Tata Capital Pankh Scholarship Programme",
        portal: "Tata Capital Official Site",
        link: "https://www.tatacapital.com/pankh-scholarship.html",
        description: "Aims to support meritorious students from economically weaker sections to pursue their academic goals without financial burden.",
        eligibility: {
            income: 400000,
            minMarks: 60,
        }
    },
    {
        type: "Private",
        name: "Infosys Foundation - Aarohan Social Innovation Awards",
        portal: "Infosys Foundation",
        link: "https://www.infosys.com/infosys-foundation.html",
        description: "An award for innovators in the social sector, but they also have educational programs. This is a proxy for their various educational initiatives.",
        eligibility: {
            // Eligibility for their scholarships can be very specific
            minMarks: 70, 
        }
    }
];

// --- STATES LIST ---
const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// --- SCRIPT LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // --- LOGIN LOGIC ---
    const loginOverlay = document.getElementById('login-overlay');
    const mainContent = document.getElementById('main-content');
    const loginForm = document.getElementById('login-form');
    const loginIdInput = document.getElementById('login-id');
    const loginPasswordInput = document.getElementById('login-password');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = loginIdInput.value;
        const password = loginPasswordInput.value;

        // Check credentials
        if (id.toUpperCase() === 'WHOS THE GOAT' && password.toUpperCase() === 'BHAVARTHA') {
            loginOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            initializeApp(); 
        } else {
            loginError.classList.remove('hidden');
        }
    });
});

function initializeApp() {
    const stateSelect = document.getElementById('state');
    if (stateSelect.options.length <= 1) {
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    const form = document.getElementById('scholarship-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        findScholarships();
    });
    
    lucide.createIcons();
}

function findScholarships() {
    // --- MODIFIED: Get scholarship type from the new radio buttons ---
    const scholarshipType = document.querySelector('input[name="scholarshipType"]:checked').value;
    
    const student = {
        category: document.getElementById('category').value,
        income: parseInt(document.getElementById('income').value, 10),
        domicile: document.getElementById('state').value,
        marks: parseInt(document.getElementById('marks').value, 10),
        isExServiceman: document.getElementById('exServiceman').checked,
        isFarmer: document.getElementById('farmer').checked,
        isDisabled: document.getElementById('disabled').checked
    };

    const eligibleScholarships = scholarships.filter(s => {
        const e = s.eligibility;
        
        // --- MODIFIED: Check scholarship type first ---
        if (scholarshipType !== 'All' && s.type !== scholarshipType) {
            return false;
        }

        if (e.income && student.income > e.income) return false;
        if (e.category && !e.category.includes(student.category)) return false;
        if (e.minMarks && student.marks < e.minMarks) return false;
        if (e.domicile && !e.domicile.includes(student.domicile)) return false;
        if (e.isExServiceman && !student.isExServiceman) return false;
        if (e.isDisabled && !student.isDisabled) return false;

        return true;
    });

    displayResults(eligibleScholarships);
}

function displayResults(results) {
    const container = document.getElementById('results-container');
    container.innerHTML = ''; 

    if (results.length === 0) {
        container.innerHTML = `
            <div class="bg-white p-8 rounded-xl shadow-lg text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                <h3 class="mt-4 text-xl font-semibold text-gray-900">No Matching Scholarships Found</h3>
                <p class="mt-1 text-gray-500">Based on the provided details, we couldn't find any direct matches. Try adjusting the criteria or check the official portals for more schemes.</p>
            </div>
        `;
        return;
    }

    results.forEach(s => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-indigo-100 transition-shadow';
        
        // --- MODIFIED: Create a tag based on scholarship type ---
        const typeClass = s.type.toLowerCase() === 'private' ? 'tag-private' : 'tag-government';
        const typeTag = `<span class="tag ${typeClass}">${s.type}</span>`;

        card.innerHTML = `
            <div class="flex justify-between items-start">
                 <h3 class="text-xl font-bold text-indigo-700">${s.name}</h3>
                 ${typeTag}
            </div>
            <p class="text-sm font-medium text-gray-500 mt-1 mb-3">Portal: ${s.portal}</p>
            <p class="text-gray-600 mb-4">${s.description}</p>
            <div class="border-t border-gray-200 pt-4">
                <h4 class="font-semibold text-gray-800 mb-2">Key Eligibility:</h4>
                <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                    ${s.eligibility.category ? `<li>Category: <strong>${s.eligibility.category.join(', ')}</strong></li>` : ''}
                    ${s.eligibility.income ? `<li>Family Income below: <strong>₹${s.eligibility.income.toLocaleString('en-IN')}</strong></li>` : ''}
                    ${s.eligibility.minMarks ? `<li>Minimum Marks: <strong>${s.eligibility.minMarks}%</strong></li>` : ''}
                    ${s.eligibility.domicile ? `<li>Domicile: <strong>${s.eligibility.domicile.join(', ')}</strong></li>` : ''}
                    ${s.eligibility.isDisabled ? `<li>For Persons with Disabilities</li>` : ''}
                    ${s.eligibility.isExServiceman ? `<li>For Wards of Ex-Servicemen</li>` : ''}
                </ul>
            </div>
            <div class="mt-5">
                 <a href="${s.link}" target="_blank" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                   Visit Portal
                   <i data-lucide="arrow-right" class="ml-2 h-4 w-4"></i>
                </a>
            </div>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}


