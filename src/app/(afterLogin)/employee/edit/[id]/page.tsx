"use client";

import { IEmployee } from "@/app/types/employee.type";
import ValidateEmail from "@/utils/emailValidation";
import { useEffect, useRef, useState } from "react";

export default function Edit() {
  //get Employee for Current Profile
  const getThisEmployee = {
    _id: "5",
    username: "Garrick55",
    password: "5mxufFCJZoVoAvC",
    firstName: "Darby",
    lastName: "Konopelski",
    email: "Jordane.Stokes56@gmail.com",
    street: "Ellis Common",
    housenumber: "83471",
    zipcode: 58313,
    city: "Lake Lydaborough",
    country: "Japan",
    role: "orchestrate virtual mindshare",
    admin: false,
    comments: [],
  };
  // will change to function

  const [thisEmployee, setThisEmployee] = useState<
    IEmployee | null | undefined
  >(getThisEmployee);
  const [username, setUsername] = useState(thisEmployee?.username);
  const [email, setEmail] = useState(thisEmployee?.email);
  const [firstName, setFirstName] = useState(thisEmployee?.firstName);
  const [lastName, setLastName] = useState(thisEmployee?.lastName);
  const [street, setStreet] = useState(thisEmployee?.street);
  const [housenumber, setHousenumber] = useState(thisEmployee?.housenumber);
  const [zipcode, setZipcode] = useState(thisEmployee?.zipcode);
  const [city, setCity] = useState(thisEmployee?.city);
  const [country, setCountry] = useState(thisEmployee?.country);
  const [role, setRole] = useState(thisEmployee?.role);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setUsername(thisEmployee?.username);
    setEmail(thisEmployee?.email);
    setFirstName(thisEmployee?.firstName);
    setLastName(thisEmployee?.lastName);
    setStreet(thisEmployee?.street);
    setHousenumber(thisEmployee?.housenumber);
    setZipcode(thisEmployee?.zipcode);
    setCity(thisEmployee?.city);
    setCountry(thisEmployee?.country);
    setRole(thisEmployee?.role);
  }, [thisEmployee]);

  //Edit this User
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  //validate Email
  useEffect(() => {
    if (document.activeElement === ref.current) {
      if (email) {
        const validEmail = ValidateEmail(email);
        setIsEmailValid(validEmail);
        setIsFocus(true);
      }
    } else {
      setIsFocus(false);
    }
  }, [email, isFocus]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        {errorMessage ? (
          <div
            className="mb-3 bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold">Error : please try again!</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        ) : (
          <></>
        )}
        <form onSubmit={handleSubmit}>
          <h3 className="max-w-full truncate mb-8 block text-2xl font-medium text-[#07074D]">
            Edit Employee&nbsp;:&nbsp;{thisEmployee?.firstName}&nbsp;
            {thisEmployee?.lastName}
          </h3>

          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="username"
          >
            Username*
            <span className="text-gray-400">
              {" "}
              only for User not for Employee
            </span>
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="username"
            value={username}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />
          <br></br>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="email"
          >
            Email*
          </label>
          {!isEmailValid && isFocus ? (
            <>
              <input
                ref={ref}
                className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                type="email"
                name="email"
                value={email}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
              />
              <div
                className="mb-3 bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
                role="alert"
              >
                <p className="font-bold">Invalid Email</p>
                <p className="text-sm">Please use valid Email</p>
              </div>
            </>
          ) : (
            <>
              <input
                ref={ref}
                className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                type="email"
                name="email"
                value={email}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
              />
            </>
          )}
          <br></br>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="firstName"
          >
            First Name*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFirstName(e.currentTarget.value)
            }
          />
          <br></br>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="lastName"
          >
            Last Name*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLastName(e.currentTarget.value)
            }
          />
          <br></br>
          <div>
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Address
            </label>
            <div className="grid grid-cols-4">
              <div className="col-span-3">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="street"
                >
                  Street
                </label>
                <input
                  className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                  type="text"
                  name="street"
                  value={street}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setStreet(e.currentTarget.value)
                  }
                />
                <br></br>
              </div>
              <div className="ml-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="housenumber"
                >
                  Nr
                </label>
                <input
                  className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3  text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                  type="text"
                  name="housenumber"
                  value={housenumber}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setHousenumber(e.currentTarget.value)
                  }
                />
                <br></br>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="mr-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="zipcode"
                >
                  PLZ
                </label>
                <input
                  className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                  type="number"
                  name="zipcode"
                  value={zipcode}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setZipcode(parseInt(e.currentTarget.value))
                  }
                />
                <br></br>
              </div>
              <div>
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="city"
                >
                  Ort
                </label>
                <input
                  className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3  text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setCity(e.currentTarget.value)
                  }
                />
                <br></br>
              </div>
            </div>
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
              htmlFor="country"
            >
              Land
            </label>
            <input
              className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3  text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
              type="text"
              name="country"
              value={country}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setCountry(e.currentTarget.value)
              }
            />
          </div>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="role"
          >
            Role*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="role"
            value={role}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setRole(e.currentTarget.value)
            }
          />
          <br></br>
          <h3 className="mb-8 block text-base font-medium text-gray-500">
            * required
          </h3>
          <button
            className="hover:shadow-form rounded-md bg-blue-500 hover:bg-blue-400 py-3 px-8 text-base font-semibold text-white outline-none"
            type="submit"
          >
            Edit this Employee
          </button>
        </form>
      </div>
    </div>
  );
}
