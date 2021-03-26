import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const { me, followLoading, unFollowLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id); // 있으면 해당 팔로워 반환, 없으면 null.
  const onClickButton = useCallback(() => {
    // 팔로우가 없는 경우
    if (!isFollowing) {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
    // 팔로우 중인 경우
    else {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unFollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

export default FollowButton;

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

// 카드에 있는 팔로우 버튼을 누르면 유저 db에 팔로잉이 1개 추가
// 1 - 유저 db 불러오기
// 2 - 버튼 클릭 이벤트에 팔로잉 액션을 디스패치
// 3 - 액션을 디스패치 할 때, 해당 포스트를 쓴 유저의 id를 data로 넘겨줌.
