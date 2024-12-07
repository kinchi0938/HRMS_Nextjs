"use client";

import {
  useEmployee,
  useUpdateEmployeeMutation,
} from "@/hooks/useEmployeeQuery";
import ValidateEmail from "@/utils/emailValidation";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: employee, isLoading } = useEmployee(id);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    housenumber: "",
    zipcode: 0,
    city: "",
    country: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(
    employee ? ValidateEmail(employee.email) : true
  );
  const [isFocus, setIsFocus] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  useEffect(() => {
    setIsEmailValid(ValidateEmail(formData.email));
  }, [formData.email]);

  const updateEmployeeMutation = useUpdateEmployeeMutation(id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    try {
      updateEmployeeMutation.mutate(formData);
      router.push(`/employee/${id}`);
    } catch (error) {
      setErrorMessage("Failed to update employee");
    }
  };

  useEffect(() => {
    if (document.activeElement === emailRef.current) {
      if (formData.email) {
        setIsEmailValid(ValidateEmail(formData.email));
        setIsFocus(true);
      }
    } else {
      setIsFocus(false);
    }
  }, [formData.email, isFocus]);

  // 폼 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "zipcode" ? Number(value) : value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        {errorMessage && (
          <div
            className="mb-3 bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold">Error : please try again!</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h3 className="max-w-full truncate mb-8 block text-2xl font-medium text-[#07074D]">
            Edit Employee: {employee?.firstName} {employee?.lastName}
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
            value={formData.username}
            onChange={handleInputChange}
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
                ref={emailRef}
                className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                ref={emailRef}
                className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
            value={formData.firstName}
            onChange={handleInputChange}
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
            value={formData.lastName}
            onChange={handleInputChange}
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
                  value={formData.street}
                  onChange={handleInputChange}
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
                  value={formData.housenumber}
                  onChange={handleInputChange}
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
                  value={formData.zipcode}
                  onChange={handleInputChange}
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
                  value={formData.city}
                  onChange={handleInputChange}
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
              value={formData.country}
              onChange={handleInputChange}
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
            value={formData.role}
            onChange={handleInputChange}
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
