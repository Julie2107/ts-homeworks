"use strict";
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A"] = "A+";
    BloodGroup["AMinus"] = "A-";
    BloodGroup["B"] = "B+";
    BloodGroup["BMinus"] = "B-";
    BloodGroup["AB"] = "AB+";
    BloodGroup["ABMinus"] = "AB-";
    BloodGroup["O"] = "O+";
    BloodGroup["OMinus"] = "O-";
})(BloodGroup || (BloodGroup = {}));
var HairType;
(function (HairType) {
    HairType["STRAIGHT"] = "Straight";
    HairType["STRANDS"] = "Strands";
    HairType["VERY_CURLY"] = "Very curly";
    HairType["CURLY"] = "Curly";
    HairType["WAVY"] = "Wavy";
})(HairType || (HairType = {}));
var HairColor;
(function (HairColor) {
    HairColor["Black"] = "Black";
    HairColor["Blonde"] = "Blonde";
    HairColor["Brown"] = "Brown";
    HairColor["Red"] = "Red";
    HairColor["White"] = "White";
})(HairColor || (HairColor = {}));
var EyeColor;
(function (EyeColor) {
    EyeColor["Amber"] = "Amber";
    EyeColor["Blue"] = "Blue";
    EyeColor["Brown"] = "Brown";
    EyeColor["Gray"] = "Gray";
    EyeColor["Green"] = "Green";
    EyeColor["Hazel"] = "Hazel";
    EyeColor["Other"] = "Other";
})(EyeColor || (EyeColor = {}));
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["User"] = "user";
    Role["Moderator"] = "moderator";
})(Role || (Role = {}));
var AddressState;
(function (AddressState) {
    AddressState[AddressState["Mississippi"] = 0] = "Mississippi";
    AddressState[AddressState["Alabama"] = 1] = "Alabama";
    AddressState[AddressState["Pennsylvania"] = 2] = "Pennsylvania";
    AddressState[AddressState["Colorado"] = 3] = "Colorado";
    AddressState[AddressState["Tennessee"] = 4] = "Tennessee";
    AddressState[AddressState["Rhode Island"] = 5] = "Rhode Island";
    AddressState[AddressState["Louisiana"] = 6] = "Louisiana";
    AddressState[AddressState["South Dakota"] = 7] = "South Dakota";
    AddressState[AddressState["West Virginia"] = 8] = "West Virginia";
    AddressState[AddressState["North Dakota"] = 9] = "North Dakota";
    AddressState[AddressState["Ohio"] = 10] = "Ohio";
    AddressState[AddressState["Utah"] = 11] = "Utah";
    AddressState[AddressState["Iowa"] = 12] = "Iowa";
    AddressState[AddressState["Wyoming"] = 13] = "Wyoming";
    AddressState[AddressState["Arkansas"] = 14] = "Arkansas";
    AddressState[AddressState["New Mexico"] = 15] = "New Mexico";
    AddressState[AddressState["Illinois"] = 16] = "Illinois";
    AddressState[AddressState["New Jersey"] = 17] = "New Jersey";
    AddressState[AddressState["Missouri"] = 18] = "Missouri";
    AddressState[AddressState["New York"] = 19] = "New York";
    AddressState[AddressState["Maine"] = 20] = "Maine";
    AddressState[AddressState["Nevada"] = 21] = "Nevada";
    AddressState[AddressState["Massachusetts"] = 22] = "Massachusetts";
    AddressState[AddressState["Delaware"] = 23] = "Delaware";
    AddressState[AddressState["Montana"] = 24] = "Montana";
})(AddressState || (AddressState = {}));
var CompanyDepartment;
(function (CompanyDepartment) {
    CompanyDepartment[CompanyDepartment["Engineering"] = 0] = "Engineering";
    CompanyDepartment[CompanyDepartment["Support"] = 1] = "Support";
    CompanyDepartment[CompanyDepartment["Research and Development"] = 2] = "Research and Development";
    CompanyDepartment[CompanyDepartment["Human Resources"] = 3] = "Human Resources";
    CompanyDepartment[CompanyDepartment["Product Management"] = 4] = "Product Management";
    CompanyDepartment[CompanyDepartment["Marketing"] = 5] = "Marketing";
    CompanyDepartment[CompanyDepartment["Services"] = 6] = "Services";
    CompanyDepartment[CompanyDepartment["Accounting"] = 7] = "Accounting";
    CompanyDepartment[CompanyDepartment["Training"] = 8] = "Training";
    CompanyDepartment[CompanyDepartment["Legal"] = 9] = "Legal";
    CompanyDepartment[CompanyDepartment["Sales"] = 10] = "Sales";
})(CompanyDepartment || (CompanyDepartment = {}));
var BankCardType;
(function (BankCardType) {
    BankCardType[BankCardType["Diners Club International"] = 0] = "Diners Club International";
    BankCardType[BankCardType["JCB"] = 1] = "JCB";
    BankCardType[BankCardType["Discover"] = 2] = "Discover";
    BankCardType[BankCardType["Mastercard"] = 3] = "Mastercard";
    BankCardType[BankCardType["American Express"] = 4] = "American Express";
    BankCardType[BankCardType["UnionPay"] = 5] = "UnionPay";
    BankCardType[BankCardType["Visa"] = 6] = "Visa";
})(BankCardType || (BankCardType = {}));
function isUserResponce(res) {
    return res.hasOwnProperty('users');
}
function isAddress(address) {
    const checks = {
        address: () => typeof address.address === 'string',
        city: () => typeof address.city === 'string',
        state: () => AddressState.hasOwnProperty(address.state),
        stateCode: () => typeof address.stateCode === 'string',
        postalCode: () => typeof address.postalCode === 'string',
        coordinates: () => address.coordinates.hasOwnProperty('lat') &&
            address.coordinates.hasOwnProperty('lng') &&
            typeof address.coordinates.lat === 'number' &&
            typeof address.coordinates.lng === 'number',
        country: () => typeof address.country === 'string',
    };
    for (const key in checks) {
        if (!checks[key]()) {
            return false;
        }
    }
    return true;
}
function isBank(bank) {
    const checks = {
        cardExpire: () => typeof bank.cardExpire === 'string',
        cardNumber: () => typeof bank.cardNumber === 'string',
        cardType: () => BankCardType.hasOwnProperty(bank.cardType),
        currency: () => typeof bank.currency === 'string',
        iban: () => typeof bank.iban === 'string',
    };
    for (const key in checks) {
        if (!checks[key]()) {
            return false;
        }
    }
    return true;
}
function isCompany(company) {
    const checks = {
        department: () => CompanyDepartment.hasOwnProperty(company.department),
        name: () => typeof company.name === 'string',
        title: () => typeof company.title === 'string',
        address: () => isAddress(company.address),
    };
    for (const key in checks) {
        if (!checks[key]()) {
            return false;
        }
    }
    return true;
}
function isCrypto(crypto) {
    const checks = {
        coin: () => typeof crypto.coin === 'string',
        wallet: () => typeof crypto.wallet === 'string',
        network: () => typeof crypto.network === 'string',
    };
    for (const key in checks) {
        if (!checks[key]()) {
            return false;
        }
    }
    return true;
}
function isTypeUser(user) {
    const checks = {
        id: () => typeof user.id === 'number',
        firstName: () => typeof user.firstName === 'string',
        lastName: () => typeof user.lastName === 'string',
        maidenName: () => typeof user.maidenName === 'string',
        age: () => typeof user.age === 'number',
        gender: () => Gender.hasOwnProperty(user.gender),
        email: () => typeof user.email === 'string',
        phone: () => typeof user.phone === 'string',
        username: () => typeof user.username === 'string',
        password: () => typeof user.password === 'string',
        birthDate: () => typeof user.birthDate === 'string',
        image: () => typeof user.image === 'string',
        bloodGroup: () => BloodGroup.hasOwnProperty(user.bloodGroup),
        height: () => typeof user.height === 'number',
        weight: () => typeof user.weight === 'number',
        eyeColor: () => EyeColor.hasOwnProperty(user.eyeColor),
        hair: () => user.hair.hasOwnProperty('color') && user.hair.hasOwnProperty('type'),
        ip: () => typeof user.ip === 'string',
        address: () => isAddress(user.address),
        macAddress: () => typeof user.macAddress === 'string',
        university: () => typeof user.university === 'string',
        bank: () => isBank(user.bank),
        company: () => isCompany(user.company),
        ein: () => typeof user.ein === 'string',
        ssn: () => typeof user.ssn === 'string',
        userAgent: () => typeof user.userAgent === 'string',
        crypto: () => isCrypto(user.crypto),
        role: () => Role.hasOwnProperty(user.role),
    };
    for (const key in checks) {
        if (!checks[key]()) {
            return false;
        }
    }
    return true;
}
fetch('https://dummyjson.com/users')
    .then((res) => res.json())
    .then((users) => {
    if (users.users.every(isTypeUser)) {
        console.log('all users are valid');
        console.log(users.users);
    }
    else {
        console.log('some users are invalid');
    }
})
    .catch((err) => console.error(err));
