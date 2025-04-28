// Global variables
let customers = [
    {
        ssn: "123456789",
        name: "John Smith",
        accountNumber: "ACC10001234",
        ifscCode: "BANK0001234",
        balance: 85000,
        aadhaarNo: "1234 5678 9012",
        panCardNo: "ABCDE1234F",
        dob: "1985-05-15",
        gender: "male",
        address: "123 Main Street, City",
        contactNumber: "9876543210",
        email: "john.smith@example.com",
        occupation: "Software Engineer",
        maritalStatus: "married",
        employerName: "Tech Solutions Inc.",
        employerAddress: "456 Business Park, Tech City"
    },
    {
        ssn: "987654321",
        name: "Jane Doe",
        accountNumber: "ACC10005678",
        ifscCode: "BANK0005678",
        balance: 125000,
        aadhaarNo: "9876 5432 1098",
        panCardNo: "FGHIJ5678K",
        dob: "1990-08-25",
        gender: "female",
        address: "456 Oak Avenue, Town",
        contactNumber: "8765432109",
        email: "jane.doe@example.com",
        occupation: "Marketing Manager",
        maritalStatus: "single",
        employerName: "Global Marketing Ltd.",
        employerAddress: "789 Corporate Tower, Business District"
    }
];

let transactions = [];
let employees = [];
let currentEmployee = null;

// Generate a random 7-digit Employee ID
function generateEmployeeId() {
    return Math.floor(1000000 + Math.random() * 9000000);
}

// Generate a transaction ID (format: TXN followed by timestamp)
function generateTransactionId() {
    return "TXN" + Date.now();
}

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialization based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Initialize page-specific functionality
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeLoginPage();
            break;
        case 'employee-registration.html':
            initializeEmployeeRegistration();
            break;
        case 'customer-registration.html':
            initializeCustomerRegistration();
            break;
        case 'transaction-management.html':
            initializeTransactionManagement();
            break;
        case 'customer-management.html':
            initializeCustomerManagement();
            break;
        case 'dashboard.html':
            initializeDashboard();
            break;
    }
});

// Initialize Login Page
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const employeeId = document.getElementById('employeeId').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!employeeId || !password) {
                showMessage('messageContainer', 'Please enter both Employee ID and Password.', false);
                return;
            }
            
            // Simulate successful login
            showMessage('messageContainer', 'Login successful! Redirecting to dashboard...', true);
            
            // Store current employee in session storage (simulated)
            sessionStorage.setItem('currentEmployee', employeeId);
            
            // Redirect to dashboard after 1.5 seconds
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
}

// Initialize Employee Registration
function initializeEmployeeRegistration() {
    const employeeRegistrationForm = document.getElementById('employeeRegistrationForm');
    
    if (employeeRegistrationForm) {
        employeeRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const address = document.getElementById('address').value;
            const contactNumber = document.getElementById('contactNumber').value;
            
            // Simple validation
            if (!firstName || !lastName || !email || !password || !confirmPassword || !address || !contactNumber) {
                showMessage('messageContainer', 'Please fill all required fields.', false);
                return;
            }
            
            // Check password match
            if (password !== confirmPassword) {
                showMessage('messageContainer', 'Passwords do not match.', false);
                return;
            }
            
            // Generate employee ID
            const employeeId = generateEmployeeId();
            
            // Create employee object
            const employee = {
                id: employeeId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password, // In a real app, this would be encrypted
                address: address,
                contactNumber: contactNumber
            };
            
            // Add to employees array (simulated database)
            employees.push(employee);
            
            // Display success message
            document.getElementById('employeeId').value = employeeId;
            showMessage('messageContainer', `Employee Registration successful! Your Employee ID is: ${employeeId}`, true);
            
            // In a real app, this would be sent to the server
            console.log('New employee registered:', employee);
            
            // Reset form fields except Employee ID
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
            document.getElementById('address').value = '';
            document.getElementById('contactNumber').value = '';
        });
    }
}

// Initialize Customer Registration
function initializeCustomerRegistration() {
    const customerRegistrationForm = document.getElementById('customerRegistrationForm');
    
    if (customerRegistrationForm) {
        customerRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const customerSSN = document.getElementById('customerSSN').value;
            const customerName = document.getElementById('customerName').value;
            const accountNumber = document.getElementById('accountNumber').value;
            const ifscCode = document.getElementById('ifscCode').value;
            const accountBalance = document.getElementById('accountBalance').value;
            const aadhaarNo = document.getElementById('aadhaarNo').value;
            const panCardNo = document.getElementById('panCardNo').value;
            const dob = document.getElementById('dob').value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value;
            const address = document.getElementById('address').value;
            const contactNumber = document.getElementById('contactNumber').value;
            const email = document.getElementById('email').value;
            const occupation = document.getElementById('occupation').value;
            const maritalStatus = document.getElementById('maritalStatus').value;
            const employerName = document.getElementById('employerName').value;
            const employerAddress = document.getElementById('employerAddress').value;
            
            // Simple validation for required fields
            if (!customerSSN || !customerName || !accountNumber || !ifscCode || !accountBalance || 
                !aadhaarNo || !panCardNo || !dob || !gender || !contactNumber) {
                showMessage('messageContainer', 'Please fill all required fields.', false);
                return;
            }
            
            // Check if SSN already exists
            const existingCustomer = customers.find(c => c.ssn === customerSSN);
            if (existingCustomer) {
                showMessage('messageContainer', 'A customer with this SSN already exists.', false);
                return;
            }
            
            // Create customer object
            const customer = {
                ssn: customerSSN,
                name: customerName,
                accountNumber: accountNumber,
                ifscCode: ifscCode,
                balance: parseFloat(accountBalance),
                aadhaarNo: aadhaarNo,
                panCardNo: panCardNo,
                dob: dob,
                gender: gender,
                address: address,
                contactNumber: contactNumber,
                email: email,
                occupation: occupation,
                maritalStatus: maritalStatus,
                employerName: employerName,
                employerAddress: employerAddress
            };
            
            // Add to customers array (simulated database)
            customers.push(customer);
            
            // Display success message
            showMessage('messageContainer', 'Customer Registration Successful!', true);
            
            // In a real app, this would be sent to the server
            console.log('New customer registered:', customer);
            
            // Reset form
            customerRegistrationForm.reset();
        });
    }
}

// Initialize Transaction Management
function initializeTransactionManagement() {
    const transactionForm = document.getElementById('transactionForm');
    
    if (transactionForm) {
        // Pre-fill transaction ID
        document.getElementById('transactionId').value = generateTransactionId();
        
        transactionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const transactionId = document.getElementById('transactionId').value;
            const customerSSN = document.getElementById('customerSSN').value;
            const customerName = document.getElementById('customerName').value;
            const accountId = document.getElementById('accountId').value;
            const date = document.getElementById('date').value;
            const aadhaarNo = document.getElementById('aadhaarNo').value;
            const panCardNo = document.getElementById('panCardNo').value;
            const address = document.getElementById('address').value;
            const contactNumber = document.getElementById('contactNumber').value;
            const modeOfPayment = document.getElementById('modeOfPayment').value;
            
            // Simple validation for required fields
            if (!transactionId || !customerSSN || !customerName || !accountId || !date || 
                !aadhaarNo || !panCardNo || !contactNumber || !modeOfPayment) {
                showMessage('messageContainer', 'Please fill all required fields.', false);
                return;
            }
            
            // Create transaction object
            const transaction = {
                id: transactionId,
                customerSSN: customerSSN,
                customerName: customerName,
                accountId: accountId,
                date: date,
                aadhaarNo: aadhaarNo,
                panCardNo: panCardNo,
                address: address,
                contactNumber: contactNumber,
                modeOfPayment: modeOfPayment,
                timestamp: new Date().toISOString()
            };
            
            // Add to transactions array (simulated database)
            transactions.push(transaction);
            
            // Display success message
            showMessage('messageContainer', 'Transaction processed successfully!', true);
            
            // In a real app, this would be sent to the server
            console.log('New transaction recorded:', transaction);
            
            // Reset form and generate new transaction ID
            transactionForm.reset();
            document.getElementById('transactionId').value = generateTransactionId();
        });
    }
}

// Initialize Customer Management
function initializeCustomerManagement() {
    // Set up event listeners for customer actions
    setupCustomerActionButtons();
    
    // Initialize search functionality
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = document.getElementById('searchCustomer').value.toLowerCase();
            filterCustomersTable(searchTerm);
        });
    }
}

// Initialize Dashboard
function initializeDashboard() {
    // Functionality for dashboard page
    // This would typically include fetching and displaying summary statistics
    console.log('Dashboard initialized');
}

// Set up event listeners for customer action buttons (view, update, delete)
function setupCustomerActionButtons() {
    // View customer details
    const viewButtons = document.querySelectorAll('.viewCustomer');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const customerId = this.dataset.id;
            const customer = customers.find(c => c.ssn === customerId);
            
            if (customer) {
                displayCustomerDetails(customer);
                $('#customerDetailsModal').modal('show');
            } else {
                showMessage('messageContainer', 'Customer not found.', false);
            }
        });
    });
    
    // Update customer
    const updateButtons = document.querySelectorAll('.updateCustomer');
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const customerId = this.dataset.id;
            const customer = customers.find(c => c.ssn === customerId);
            
            if (customer) {
                // First view details, then allow update
                displayCustomerDetails(customer);
                $('#customerDetailsModal').modal('show');
                
                showMessage('messageContainer', 'Please view customer details before updating. Key information like SSN cannot be updated.', true);
                
                // In a real app, this would redirect to an update form with pre-filled fields
                setTimeout(() => {
                    window.location.href = `customer-registration.html?update=${customerId}`;
                }, 3000);
            } else {
                showMessage('messageContainer', 'Customer not found.', false);
            }
        });
    });
    
    // Delete customer
    const deleteButtons = document.querySelectorAll('.deleteCustomer');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const customerId = this.dataset.id;
            const customer = customers.find(c => c.ssn === customerId);
            
            if (customer) {
                // First view details, then confirm deletion
                displayCustomerDetails(customer);
                $('#customerDetailsModal').modal('show');
                
                // Confirm deletion after viewing details
                setTimeout(() => {
                    if (confirm(`Are you sure you want to delete customer ${customer.name}?`)) {
                        // Remove customer from array (simulated database)
                        customers = customers.filter(c => c.ssn !== customerId);
                        
                        // Update the table (in a real app, this would refresh the data from the server)
                        document.querySelector(`tr[data-id="${customerId}"]`)?.remove();
                        
                        showMessage('messageContainer', 'Customer deleted successfully.', true);
                        $('#customerDetailsModal').modal('hide');
                    }
                }, 1000);
            } else {
                showMessage('messageContainer', 'Customer not found.', false);
            }
        });
    });
}

// Display customer details in the modal
function displayCustomerDetails(customer) {
    const detailsContainer = document.getElementById('customerDetails');
    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <table class="details-table">
                <tr>
                    <td class="label">SSN ID:</td>
                    <td>${customer.ssn}</td>
                </tr>
                <tr>
                    <td class="label">Customer Name:</td>
                    <td>${customer.name}</td>
                </tr>
                <tr>
                    <td class="label">Account Number:</td>
                    <td>${customer.accountNumber}</td>
                </tr>
                <tr>
                    <td class="label">IFSC Code:</td>
                    <td>${customer.ifscCode}</td>
                </tr>
                <tr>
                    <td class="label">Account Balance:</td>
                    <td>₹${customer.balance.toLocaleString()}</td>
                </tr>
                <tr>
                    <td class="label">Aadhaar Number:</td>
                    <td>${customer.aadhaarNo}</td>
                </tr>
                <tr>
                    <td class="label">PAN Card Number:</td>
                    <td>${customer.panCardNo}</td>
                </tr>
                <tr>
                    <td class="label">Date of Birth:</td>
                    <td>${customer.dob}</td>
                </tr>
                <tr>
                    <td class="label">Gender:</td>
                    <td>${customer.gender === 'male' ? 'Male' : 'Female'}</td>
                </tr>
                <tr>
                    <td class="label">Address:</td>
                    <td>${customer.address || 'N/A'}</td>
                </tr>
                <tr>
                    <td class="label">Contact Number:</td>
                    <td>${customer.contactNumber}</td>
                </tr>
                <tr>
                    <td class="label">Email:</td>
                    <td>${customer.email || 'N/A'}</td>
                </tr>
                <tr>
                    <td class="label">Occupation:</td>
                    <td>${customer.occupation || 'N/A'}</td>
                </tr>
                <tr>
                    <td class="label">Marital Status:</td>
                    <td>${customer.maritalStatus ? customer.maritalStatus.charAt(0).toUpperCase() + customer.maritalStatus.slice(1) : 'N/A'}</td>
                </tr>
                <tr>
                    <td class="label">Employer Name:</td>
                    <td>${customer.employerName || 'N/A'}</td>
                </tr>
                <tr>
                    <td class="label">Employer Address:</td>
                    <td>${customer.employerAddress || 'N/A'}</td>
                </tr>
            </table>
        `;
    }
}

// Filter customers table based on search term
function filterCustomersTable(searchTerm) {
    const tbody = document.getElementById('customerTableBody');
    if (tbody) {
        const filteredCustomers = customers.filter(customer => 
            customer.ssn.toLowerCase().includes(searchTerm) || 
            customer.name.toLowerCase().includes(searchTerm) || 
            customer.accountNumber.toLowerCase().includes(searchTerm)
        );
        
        // Clear existing rows
        tbody.innerHTML = '';
        
        // Add filtered rows
        if (filteredCustomers.length > 0) {
            filteredCustomers.forEach(customer => {
                tbody.innerHTML += `
                    <tr data-id="${customer.ssn}">
                        <td>${customer.ssn}</td>
                        <td>${customer.name}</td>
                        <td>${customer.accountNumber}</td>
                        <td>₹${customer.balance.toLocaleString()}</td>
                        <td>${customer.contactNumber}</td>
                        <td>
                            <button class="btn btn-info btn-sm viewCustomer" data-id="${customer.ssn}">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button class="btn btn-warning btn-sm updateCustomer" data-id="${customer.ssn}">
                                <i class="fas fa-edit"></i> Update
                            </button>
                            <button class="btn btn-danger btn-sm deleteCustomer" data-id="${customer.ssn}">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            // Re-attach event listeners
            setupCustomerActionButtons();
        } else {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">No customers found matching "${searchTerm}"</td>
                </tr>
            `;
        }
    }
}
