import Applayout from "../components/Applayout";
import Head from "next/head";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import { useSelector } from "react-redux";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
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
