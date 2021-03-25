import Applayout from "../components/Applayout";
import Head from "next/head";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.posts);
  return (
    <>
      <Head>
        <title>홈 | NodeBird </title>
      </Head>
      <Applayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Applayout>
    </>
  );
};

export default Home;
