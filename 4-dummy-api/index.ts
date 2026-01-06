enum Gender {
  Male = 'male',
  Female = 'female',
}

enum BloodGroup {
  A = 'A+',
  AMinus = 'A-',
  B = 'B+',
  BMinus = 'B-',
  AB = 'AB+',
  ABMinus = 'AB-',
  O = 'O+',
  OMinus = 'O-',
}

enum HairType {
  STRAIGHT = 'Straight',
  STRANDS = 'Strands',
  VERY_CURLY = 'Very curly',
  CURLY = 'Curly',
  WAVY = 'Wavy',
}

enum HairColor {
  Black = 'Black',
  Blonde = 'Blonde',
  Brown = 'Brown',
  Red = 'Red',
  White = 'White',
}

enum EyeColor {
  Amber = 'Amber',
  Blue = 'Blue',
  Brown = 'Brown',
  Gray = 'Gray',
  Green = 'Green',
  Hazel = 'Hazel',
  Other = 'Other',
}

enum Role {
  Admin = 'admin',
  User = 'user',
  Moderator = 'moderator',
}

enum AddressState {
  'Mississippi',
  'Alabama',
  'Pennsylvania',
  'Colorado',
  'Tennessee',
  'Rhode Island',
  'Louisiana',
  'South Dakota',
  'West Virginia',
  'North Dakota',
  'Ohio',
  'Utah',
  'Iowa',
  'Wyoming',
  'Arkansas',
  'New Mexico',
  'Illinois',
  'New Jersey',
  'Missouri',
  'New York',
  'Maine',
  'Nevada',
  'Massachusetts',
  'Delaware',
  'Montana',
}

enum CompanyDepartment {
  'Engineering',
  'Support',
  'Research and Development',
  'Human Resources',
  'Product Management',
  'Marketing',
  'Services',
  'Accounting',
  'Training',
  'Legal',
  'Sales',
}

enum BankCardType {
  'Diners Club International',
  'JCB',
  'Discover',
  'Mastercard',
  'American Express',
  'UnionPay',
  'Visa',
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface TUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: EyeColor;
  hair: { color: HairColor; type: HairType };
  ip: string;
  address: {
    address: string;
    city: string;
    state: AddressState;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: CompanyDepartment;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: Coordinates;
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: Role;
}

function isUserResponce(res: any): boolean {
  return res.hasOwnProperty('users');
}

function isAddress(address: any): address is TUser['address'] {
  const checks: { [key: string]: () => boolean } = {
    address: () => typeof address.address === 'string',
    city: () => typeof address.city === 'string',
    state: () => AddressState.hasOwnProperty(address.state),
    stateCode: () => typeof address.stateCode === 'string',
    postalCode: () => typeof address.postalCode === 'string',
    coordinates: () =>
      address.coordinates.hasOwnProperty('lat') &&
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

function isBank(bank: any): bank is TUser['bank'] {
  const checks: { [key: string]: () => boolean } = {
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

function isCompany(company: any): company is TUser['company'] {
  const checks: { [key: string]: () => boolean } = {
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

function isCrypto(crypto: any): crypto is TUser['crypto'] {
  const checks: { [key: string]: () => boolean } = {
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

function isTypeUser(user: any): user is TUser {
  const checks: { [key: string]: () => boolean } = {
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
    if (users.every(isTypeUser)) {
      console.log('all users are valid');
    } else {
      console.log('some users are invalid');
    }
  })
  .catch((err) => console.error(err));
