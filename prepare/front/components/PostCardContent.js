import PropTypes from "prop-types";
import Link from "next/link";

//게시글에서 해시태그와 게시글을 분리하고 해시태그를 추출해서 링크를 입혀주는 컴포넌트

const PostCardContent = ({ postData }) => {
  //게시글이 string으로 들어옴
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};
//게시글이 string으로 들어옴
//정규표현식 규칙을 갖고 배열로 만든 뒤 .map
//정규표현식에 걸렸던 v는 링크 컴포넌트 안에 배치
//안걸린 v는 그냥 return v
export default PostCardContent;

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};
