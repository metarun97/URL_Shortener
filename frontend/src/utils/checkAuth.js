/* Imported items */
import { store } from "../store/store"
import { redirect } from "@tanstack/react-router";
import { currentUser } from "../apis/authUser.api";
import { login } from "../store/slice/authSlice";

//* Auth check function for authenticated user:-
export const checkAuth = async ({ context }) => {
  try {
    /* These two values  come from context in main file   */
    const { queryClient, store } = context;

    /* Check if user is presemt in cache give value if not call api & same in cache */
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: currentUser,
      retry: false,
    })

    /* If user not found return else it found save in redux auth state */
    if (!user) return false
    store.dispatch(login(user));

    /* Get isAuthenticated state value from auth slice*/
    const { isAuthenticated } = store.getState().auth;

    /* if not authenticated return false */
    if (!isAuthenticated) return false;
    /* if authenticated return true */
     return true;

  } catch (error) {
    /* If dashboard isn't protected then redirect to login page */
    return redirect({ to: "/login" })
  }
}
