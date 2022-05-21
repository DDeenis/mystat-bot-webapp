import MystatAPI from "mystat-api";
import { MYSTAT_TEST_LOGIN, MYSTAT_TEST_PASSWORD } from "src/constants/secrets";

// fix api
export const mystatApi = new MystatAPI({
  username: MYSTAT_TEST_LOGIN,
  password: MYSTAT_TEST_PASSWORD,
});
