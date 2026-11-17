import bcrypt from 'bcrypt'
import { readFileSync, writeFileSync } from "node:fs";

const employeesFile = new URL("../data/employee.json", import.meta.url);
const employee = JSON.parse(readFileSync(employeesFile, "utf8"));

const companiesFile = new URL("../data/companies.json", import.meta.url);
const company = JSON.parse(readFileSync(companiesFile, "utf8"));

const trucksFile = new URL("../data/trucks.json", import.meta.url);
const trucks = JSON.parse(readFileSync(trucksFile, "utf8"));

const loadsFile = new URL("../data/loads.json", import.meta.url);
const loads = JSON.parse(readFileSync(loadsFile, "utf8"));

const driversFile = new URL("../data/drivers.json", import.meta.url);
const drivers = JSON.parse(readFileSync(driversFile, "utf8"));




const getCompanyInfo = () => {
    return company;
}


const createCompany = (params) => {
    const newCompany = {
        companyId: Math.max(...company.map(info => info.companyId), 0) + 1,
        companyName: params.companyName.trim(),
    }

    company.push(newCompany);
    writeFileSync(companiesFile, JSON.stringify(company, null, 4), "utf8");
    return newCompany;
}


const createEmployee = async (params, companyId) => {
    const hashedPassword = await hashPassword(params.password);

    const newEmployee = {
        employeeId: Math.max(...employee.map(info => info.employeeId), 0) + 1,
        companyId: companyId,
        employeeName: params.employeeName.trim(),
        employeeEmail: params.email.trim().toLowerCase(),
        hashedPassword: hashedPassword,
    };

    employee.push(newEmployee);
    writeFileSync(employeesFile, JSON.stringify(employee, null, 4), "utf8");

    return newEmployee;
};

const getEmployeeInfo = () => {
    return employee;
}


// Trucks 

const getTrucks = () => {
    return trucks;
};

const getTruckCounts = () => {
    const available = trucks.filter(t => t.status === "Available").length;
    const inTransit = trucks.filter(t => t.status === "In Transit").length;
    const maintenance = trucks.filter(t => t.status === "Maintenance").length;

    return { available, inTransit, maintenance };
};

// Loads 
const getLoads = () => {
    return loads.filter(load => load.status === "In Transit");
};


const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
};

// Druvers 
const getDrivers = () => {
    return drivers;
};


export default {
    getCompanyInfo,
    createCompany,
    
    getEmployeeInfo,
    createEmployee,
    hashPassword,

    getTrucks,
    getTruckCounts,
    getLoads,
    getDrivers,
}

