import Applayout from "../components/Applayout";
import Head from "next/head";
import Router from "next/router"
import { Input, Form, Checkbox, Button } from "antd";
import useInput from "../hooks/useInput";
import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [PasswordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, me } = useSelector((state) => state.user);

  // 로그인된 이용자는 회원가입 페이지 접근 불가 (홈페이지 돌아가기?와 차이가 있는 것 아닌가)
  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me && me.id]);

  // 회원가입 후 홈페이지 돌아가기
  useEffect(() => {
    if(signUpDone) {
      Router.replace('/')
      // signUpDone의 상태도 다시 false로 돌아가야 할 듯.(안그러면 다시 회원가입 페이지로 돌아가지 못함)
    }
  }, [signUpDone])

  //비밀번호 확인 관리
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  //약관 동의 관리
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  //제출(약관 동의 및 비밀번호 동일 여부 체크)
  const onSubmit = useCallback(() => {
    if (!term) {
      return setTermError(true);
    }
    if (password !== passwordCheck) {
      return setPasswordCheck(true);
    }
    dispatch({
      type : SIGN_UP_REQUEST, 
      data : { email, nickname, password, term }
    });
    console.log(email, nickname, password, term);
  }, [term, password, passwordCheck]);

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird </title>
      </Head>
      <Applayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user_email">아이디</label>
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
            <label htmlFor="user_nickname">닉네임</label>
            <br />
            <Input
              name="user_nickname"
              onChange={onChangeNickname}
              value={nickname}
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
          <div>
            <label htmlFor="user_passwordCheck">비밀번호체크</label>
            <br />
            <Input
              name="user_passwordCheck"
              type="password"
              onChange={onChangePasswordCheck}
              value={passwordCheck}
              required
            ></Input>
            {PasswordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user_term" checked={term} onChange={onChangeTerm}>
              양한솔의 딜에 동의합니다.
            </Checkbox>
            {termError && <ErrorMessage>조건에 동의해야 합니다.</ErrorMessage>}
          </div>
          <div style={{ marginTop: 10 }}></div>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </Form>
      </Applayout>
    </>
  );
};

export default Signup;
