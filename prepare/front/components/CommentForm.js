import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addCommentRequestAction,
  ADD_COMMENT_REQUEST,
} from "../reducers/posts";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.posts
  );
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);
  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          댓글달기
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};
