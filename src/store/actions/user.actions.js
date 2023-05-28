import { userService } from '../../services/user.service';

export function spendBalance(amount) {
  return async (dispatch) => {
    dispatch({ type: 'SPEND_BALANCE', amount });
  };
}

export function loadUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getUser();
      dispatch({ type: 'SET_USER', user });
      return user;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function login(user) {
  return async (dispatch) => {
    try {
      userService.login(user);
      dispatch({ type: 'SET_USER', user });
      return user;
    } catch (err) {
      console.log('err:', err);
    }
  };
}
