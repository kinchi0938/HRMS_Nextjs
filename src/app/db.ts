import { faker } from "@faker-js/faker";
import { IEmployee } from "./types/employee.type";

function generateMockUsers(count: number): IEmployee[] {
  const employee = [];
  for (let i = 0; i < count; i++) {
    employee.push({
      _id: i + 1 + "",
      username: faker.helpers.uniqueArray(faker.internet.userName, 1)[0],
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.helpers.uniqueArray(faker.internet.email, 1)[0],
      street: faker.location.street(),
      housenumber: faker.location.buildingNumber(),
      zipcode: parseInt(faker.location.zipCode()),
      city: faker.location.city(),
      country: faker.location.country(),
      role: faker.company.buzzPhrase(),
      comments: [],
    });
  }
  return employee;
}

export const mockDatabase: { employees: IEmployee[] } = {
  employees: generateMockUsers(5),
};

console.log(mockDatabase);
