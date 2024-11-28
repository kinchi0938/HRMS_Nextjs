import Link from "next/link";

export default function BeforeLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav
        data-testid={"test"}
        className="w-full min-w-[375px] z-30 top-10 py-1 bg-white shadow-lg border-b border-blue-400"
      >
        <div className="w-full min-w-min flex items-center justify-between mt-0 px-6 py-2">
          <div className="flex items-center text-blue-700">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/signup">
              <button className="text-xs md:text-base bg-green-400 text-white mr-4  p-2 rounded  hover:bg-green-300 hover:text-gray-100">
                New Account
              </button>
            </Link>
            <Link href="/login">
              <button className="text-xs md:text-base bg-blue-600 text-white  p-2 rounded  hover:bg-blue-500 hover:text-gray-100">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
}
