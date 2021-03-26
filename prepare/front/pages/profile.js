import Applayout from "../components/Applayout";
import Head from "next/head";
import Router from "next/router";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird </title>
      </Head>
      <Applayout>
        <NicknameEditForm />
        <FollowList header={"팔로잉"} data={me.Followings} />
        <FollowList header={"팔로워"} data={me.Followers} />
      </Applayout>
    </>
  );
};

export default Profile;
