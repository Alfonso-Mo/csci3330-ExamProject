import truckingServices from "../services/trucking.services.js"
import bcrypt from 'bcrypt'


const showLogin = (req,res) => {
    res.render("login")
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const employees = truckingServices.getEmployeeInfo();

    const account = employees.find(
        employee => employee.employeeEmail === email.trim().toLowerCase()
    );

    if (!account) {
        return res.status(401).send("Invalid email or password.");
    }

    const passwordMatches = await bcrypt.compare(password, account.hashedPassword);

    if (!passwordMatches) {
        return res.status(401).send("Invalid email or password.");
    }

    req.session.employeeId = account.employeeId;
    return res.redirect("/dashboard");
};

const showRegister = (req,res) => {
    res.render("register")
}

const showDashboard = (req, res) => {
    if (!req.session.employeeId) {
        return res.redirect("/");
    }

    const truckCounts = truckingServices.getTruckCounts();
    const loads = truckingServices.getLoads();

    return res.render("dashboard", { truckCounts, loads });
};


const createCompany = async (req,res) => {
    const company = truckingServices.createCompany(req.body);

    await truckingServices.createEmployee(req.body, company.companyId);

    return res.render("login");
}

const getCompanies = (req,res) => {
    const companies = truckingServices.getCompanyInfo();
    return res.status(200).json(companies);
}


export default {
    showRegister,
    showLogin,
    showDashboard,

    createCompany,
    getCompanies,

    login,
}