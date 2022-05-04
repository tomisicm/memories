import { useUsersContext } from "../stores/user-store/use-user-context-hook";
import authService from "../services/auth/auth.service";
import { decode } from "../services/shared/decode";
import type { DecodedJwt } from "../services/shared/decode";

const Page = (): JSX.Element => {
  const userState = useUsersContext();

  const submitForm = async (e: React.SyntheticEvent) => {
    // const isFormValid = await validateForm(values);
    const isFormValid = true;
    e.preventDefault();

    if (!isFormValid) {
      // prevent submit, display errors
    } else {
      try {
        // set loading true

        const userData = {
          username: "username",
          password: "aqweqwea",
        };

        // request has been made
        const responseData = await authService.signin(userData);

        if (responseData.error) {
          // display error
        } else {
          const decodedJwt: DecodedJwt = decode(
            responseData.accessToken as string
          );

          // process request
          await userState.signIn({
            userId: decodedJwt.id,
            username: decodedJwt.username,
            email: decodedJwt.email,
          });

          // todo: once respData type is fixed remove as string
          await userState.setJwtData(responseData.accessToken as string);
        }
      } catch (e) {
        // handle error
      } finally {
        // set  loading false
      }
    }
  };

  return (
    <div className="my-6 mx-6">
      <div>
        <h3 className="my-6 mx-6">Sign In</h3>

        <form className="mx-3">
          <div className="mx-3">
            <label>Username</label>
            <input
              type="input"
              className="form-control mx-2"
              placeholder="Enter username"
            />
          </div>

          <div className="mx-3 my-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mx-2"
              placeholder="Enter email"
            />
          </div>

          <div className="mx-3 my-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mx-2"
              placeholder="Enter password"
            />
          </div>

          <div className="mx-3 my-3">
            <button onClick={submitForm} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
