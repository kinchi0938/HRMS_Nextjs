"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ValidateEmail from "@/utils/emailValidation";
import { SignupRequest } from "@/lib/api/auth/auth.types";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth/auth.api";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupRequest>({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    housenumber: "",
    zipcode: "",
    city: "",
    country: "",
    role: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupRequest, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof SignupRequest]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      console.log(data);
      router.push("/");
    },
    onError: (error: {
      message: string;
      errors?: Partial<Record<keyof SignupRequest, string>>;
    }) => {
      console.error("Server Error Details:", {
        error,
      });
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ username: error.message });
      }
    },
  });

  const validateForm = () => {
    const newErrors: Partial<Record<keyof SignupRequest, string>> = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.zipcode) {
      newErrors.zipcode = "Zipcode is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    signupMutation.mutate(formData);
    console.log(formData);
  };

  //validate Email
  useEffect(() => {
    if (document.activeElement === ref.current) {
      const validEmail = ValidateEmail(formData.email);
      setIsEmailValid(validEmail);
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  }, [formData.email, isFocus]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-8 block text-2xl font-medium text-[#07074D]">
            Create Account
          </h3>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="username"
          >
            Username*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <br></br>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="password"
          >
            Password*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br></br>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="passwordConfirm"
          >
            Repeat Password*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <br></br>
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
            onChange={handleChange}
          />
          <br></br>
          <h3 className="mb-8 block text-base font-medium text-gray-500">
            * required
          </h3>
          <button
            className="hover:shadow-form rounded-md bg-blue-500 hover:bg-blue-400 py-3 px-8 text-base font-semibold text-white outline-none"
            disabled={signupMutation.status === "pending"}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
