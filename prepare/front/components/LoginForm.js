import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { logInRequestAction, loadUserRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logInError) {
      alert(logInError)
    }
  }, [logInError])

  const onSubmitForm = useCallback(() => {
    dispatch(logInRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user_email">이메일</label>
        <br />
        <Input
          name="user_email"
          type="email"
          onChange={onChangeEmail}
          value={email}
          required
        ></Input>
      </div>
      <div>
        <label htmlFor="user_password">비밀번호</label>
        <br />
        <Input
          name="user_password"
          type="password"
          onChange={onChangePassword}
          value={password}
          required
        ></Input>
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

// LoginForm.propTypes = {
//   setIsLoggedin: PropTypes.func.isRequired,
// };
