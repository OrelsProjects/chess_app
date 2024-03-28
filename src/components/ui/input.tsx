import * as React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string; // Adding a new prop for the error message
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);

    // Toggle the type of input between text and password
    const toggleInputType = () => {
      setInputType((currentType) =>
        currentType === "password" ? "text" : "password"
      );
    };

    return (
      <div className="relative flex w-full flex-col">
        <input
          type={inputType}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            { 'border-red-500 text-red-900 placeholder-red-700': error } // Change border and text color if there is an error
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 left-3 pr-3 flex items-center text-sm leading-5"
            onClick={toggleInputType}
            aria-label={inputType === "password" ? "Show password" : "Hide password"}
          >
            {inputType === "password" ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        )}
        {error && (
          <div className="mt-1 text-sm text-red-500">{error}</div> // Display error message if it exists
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
