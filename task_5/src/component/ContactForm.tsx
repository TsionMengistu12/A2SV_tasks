import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../css/ContactForm.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    clearErrors,
  } = useForm<FormData>();

  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted: ", data);
    reset();
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  useEffect(() => {
    if (isSubmitSuccessful && showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, showSuccess]);

  return (
    <div className="form-container">
      <h3>Please fill in the form</h3>
      {isSubmitSuccessful && (
        <p className="success-msg">Form submitted successfully! </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Enter your name here"
            {...register("name", { required: "name is requiered" })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email here"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Enter any message here"
            rows={5}
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <span className="error">{errors.message.message}</span>
          )}
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
