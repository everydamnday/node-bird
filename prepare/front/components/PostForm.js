import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useRef, useEffect } from "react";
import { addPostRequestAction } from "../reducers/posts";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  // const onChangeText = useCallback(
  //   (e) => {
  //     setText(e.target.value);
  //   },
  //   [text]
  // );
  const onSubmit = useCallback(() => {
    dispatch(addPostRequestAction(text));
  }, [text]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(
    (e) => {
      imageInput.current.click();
    },
    [imageInput.current]
  );
  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          트윗
        </Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((v) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
      </div>
    </Form>
  );
};

export default PostForm;
