import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutRequestAction } from "../reducers/user";

const Userprofile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const OnLogout = useCallback(() => {
    dispatch(logOutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          내 트윗
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="followings">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
            {me.nickname[0]}
          </Avatar>
        }
        title={me.nickname}
      />
      <Button onClick={OnLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default Userprofile;
