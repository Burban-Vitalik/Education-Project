import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { CREATE_USER } from "../../../../lib/graphql/mutations";

export const CreateUserForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    await createUser({ variables: { email, password } });
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="border p-1 rounded-md"
            placeholder="Enter email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            className="border p-1 rounded-md"
            placeholder="Enter password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </button>
          {error && <p>{error.message}</p>}
        </form>
      )}
    </Formik>
  );
};
