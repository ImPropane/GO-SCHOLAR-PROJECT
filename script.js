// --- SCHOLARSHIP DATABASE ---
const scholarships = [
    // Central Government - National Scholarship Portal (NSP)
    {
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
        name: "Central Sector Scheme of Scholarships for College and University Students",
        portal: "National Scholarship Portal (NSP)",
        link: "https://scholarships.gov.in/",
        description: "Provides financial assistance to meritorious students from low-income families to meet day-to-day expenses while pursuing higher studies.",
        eligibility: {
            category: ["GENERAL", "OBC", "SC", "ST"],
            income: 450000, // Updated from 8L to 4.5L as per recent guidelines
            minMarks: 80, // Top 20th percentile of successful candidates in Class 12
        }
    },
    {
        name: "Prime Minister's Scholarship Scheme For Wards of States/UTs Police Personnel",
        portal: "National Scholarship Portal (NSP)",
        link: "https://scholarships.gov.in/",
        description: "A scholarship scheme for the dependent wards of State/UTs Police Personnel who are martyred during Terror/Naxal attacks.",
        eligibility: {
            isExServiceman: true,
            minMarks: 60,
        }
    },
    {
        name: "Post-Matric Scholarship for Students with Disabilities",
        portal: "National Scholarship Portal (NSP)",
        link: "https://scholarships.gov.in/",
        description: "Empowering students with disabilities for post-matric education. For students with 40% or more disability.",
        eligibility: {
            isDisabled: true,
            income: 250000,
        }
    },
    {
        name: "Post Matric Scholarship for SC Students",
        portal: "State Portals / NSP",
        link: "https://scholarships.gov.in/",
        description: "Financial assistance to Scheduled Caste students pursuing post-matriculation courses in India.",
        eligibility: {
            category: ["SC"],
            income: 250000,
        }
    },
    {
        name: "Post Matric Scholarship for ST Students",
        portal: "State Portals / NSP",
        link: "https://scholarships.gov.in/",
        description: "Financial assistance to Scheduled Tribe students for post-matric studies.",
        eligibility: {
            category: ["ST"],
            income: 250000,
        }
    },
    {
        name: "Post Matric Scholarship for OBC Students",
        portal: "State Portals / NSP",
        link: "https://scholarships.gov.in/",
        description: "Financial assistance to Other Backward Classes (OBC) students for post-matric studies.",
        eligibility: {
            category: ["OBC", "EBC"],
            income: 150000,
        }
    },
    // State Specific (Example)
     {
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
    {
        name: "Mukhyamantri Medhavi Vidyarthi Yojana (Madhya Pradesh)",
        portal: "State Scholarship Portal 2.0 (MP)",
        link: "http://scholarshipportal.mp.nic.in/",
        description: "Full fee coverage for meritorious students for admission to graduate-level courses in Madhya Pradesh.",
        eligibility: {
            domicile: ["Madhya Pradesh"],
            income: 600000,
            minMarks: 70, // In MP Board 12th, or 85 in CBSE/ICSE
        }
    },
    {
        name: "Swami Vivekananda Merit Cum Means Scholarship (West Bengal)",
        portal: "SVMCM Portal",
        link: "https://svmcm.wbhed.gov.in/",
        description: "Scholarship for meritorious and economically backward students of West Bengal pursuing higher studies.",
        eligibility: {
            domicile: ["West Bengal"],
            income: 250000,
            minMarks: 60, // varies by level
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
        if (id === 'ALU KHAYEGA' && password === 'TU KHA') {
            loginOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            // Initialize the main app logic only after successful login
            initializeApp(); 
        } else {
            loginError.classList.remove('hidden');
        }
    });
});

function initializeApp() {
     // Populate states dropdown
    const stateSelect = document.getElementById('state');
    // Check if dropdown is already populated to avoid duplicates
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

    // --- SHARE BUTTON LOGIC ---
    const shareButton = document.getElementById('share-button');
    shareButton.addEventListener('click', async () => {
        const shareData = {
            title: 'GoScholar India',
            text: 'Check out this Government Scholarship Recommendation System!',
            url: window.location.href
        };

        if (navigator.share) { // Use Web Share API if available
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Sharing cancelled or failed", err);
            }
        } else { // Fallback to copying link
            const originalButtonHTML = shareButton.innerHTML;
            
            const textArea = document.createElement("textarea");
            textArea.value = window.location.href;
            textArea.style.position = "fixed"; // Prevent scrolling to bottom
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                shareButton.textContent = 'Link Copied!';
            } catch (err) {
                console.error('Unable to copy', err);
                shareButton.textContent = 'Copy Failed';
            }
            document.body.removeChild(textArea);

            setTimeout(() => {
                shareButton.innerHTML = originalButtonHTML;
                lucide.createIcons(); // Re-create the icon after restoring HTML
            }, 2000);
        }
    });
    
    lucide.createIcons();
}

function findScholarships() {
    // Get student data from form. Note: not all fields are used for filtering yet.
    const student = {
        category: document.getElementById('category').value,
        income: parseInt(document.getElementById('income').value, 10),
        domicile: document.getElementById('state').value,
        marks: parseInt(document.getElementById('marks').value, 10),
        isExServiceman: document.getElementById('exServiceman').checked,
        isFarmer: document.getElementById('farmer').checked,
        isDisabled: document.getElementById('disabled').checked
    };

    // Filter scholarships based on key eligibility criteria
    const eligibleScholarships = scholarships.filter(s => {
        const e = s.eligibility;
        
        // Income Check
        if (e.income && student.income > e.income) return false;

        // Category Check
        if (e.category && !e.category.includes(student.category)) return false;
        
        // Minimum Marks Check
        if (e.minMarks && student.marks < e.minMarks) return false;

        // Domicile Check (if specified)
        if (e.domicile && !e.domicile.includes(student.domicile)) return false;

        // Ex-Serviceman Check
        if (e.isExServiceman && !student.isExServiceman) return false;

        // Disability Check
        if (e.isDisabled && !student.isDisabled) return false;

        // If all checks pass, it's a match
        return true;
    });

    displayResults(eligibleScholarships);
}

function displayResults(results) {
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // Clear previous results

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
        card.innerHTML = `
            <h3 class="text-xl font-bold text-indigo-700">${s.name}</h3>
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
    lucide.createIcons(); // Re-render icons after adding new elements
}