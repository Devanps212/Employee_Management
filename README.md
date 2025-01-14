# Full-Stack Application: Employee & Department Management System

This is a MERN stack-based application designed for efficient management of admin login, employee records, and department details. The project includes:

1. **Backend**: Handles business logic, database interactions, and API operations.
2. **Frontend**: Provides a user interface for admins, employees and department.
3. **Tests**: Ffunctionality testing using Playwright.

---

## **Backend**

### **Features**
- **Admin Login**: Secure authentication using JWT.
- **Employee Management**: CRUD operations for employee records.
- **Department Management**: CRUD operations for departments.
- Input validation and error handling for all endpoints.

### **Setup Instructions**
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
yarn install

# Build the application
yarn build

# Start the server
yarn start

# Environment Variables
Create a .env file in the backend directory with the following keys:

```bash
MONGO_URI=your-mongodb-connection-string
FRONTEND_URL=http://localhost:3000
PORT=5000
JWT_SECRET=your-secret-key


# **Frontend**

This is the frontend part of the MERN stack-based Department & Employee Management System. It provides a user interface for admins to manage employee records and departments, with features like CRUD operations, sorting, and filtering.

---

## **Features**

- **Admin & Employee UI**: Interfaces for managing employees with CRUD functionality and sorting/filtering, and for managing departments with CRUD operations (no search and sort).
- **Security**: Axios interceptors are used to pass JWT tokens to the backend for secure communication.
- **Dynamic Components**: The frontend includes dynamic components that can be modified to adjust to different data inputs or structure.
- **State Management**: Redux is used for managing application state, including token management.
- **Environment Configuration**: Vite is used for handling environment variables for the frontend build.

---

## **Setup Instructions**

### **1. Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/your-repository.git
cd your-repository/frontend

### **2. Install Dependencies

Install the required dependencies with Yarn:

```bash
yarn install

### **3. Set Up Environment Variables

Create a .env file in the root of the frontend directory with the following content:

```bash
VITE_BASE_URL=backend_url

### **4. Start the Development Server

Run the following command to start the development server:

```bash
yarn dev


# **Playwright Tests for Admin & Employee Management System**

This README provides instructions to set up and run Playwright tests for verifying the functionalities of the Admin & Employee Management System.

---

## **Setup Instructions**

### **1. Install Playwright**

To install Playwright and its dependencies, run the following command:

```bash
npx playwright install

### **2. Playwright Test Configuration

Create a playwright.config.js file in the root of your project to set the base URL for the website.

## **3. Test it

Test it using the command

```bash
npx playwright test
