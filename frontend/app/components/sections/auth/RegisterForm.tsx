import { useFormik } from "formik";
import { register } from "../../../helpers/register";

export function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => await register(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
      <input
        className="border p-1 rounded-md"
        placeholder="Enter email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <input
        className="border p-1 rounded-md"
        placeholder="Enter password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <button
        type="submit"
        className="border p-1 rounded-md bg-blue-500 text-white"
      >
        Register
      </button>
    </form>
  );
}
