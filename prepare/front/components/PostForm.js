import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useRef, useEffect } from "react";
import { addPostRequestAction, UPLOAD_IMAGE_REQUEST, REMOVE_IMAGE } from "../reducers/posts";
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
    if(!text || !text.trim()) {
      return alert("게시글을 입력하세요")
    }
    const formData = new FormData(); //폼객체 생성
    imagePaths.forEach(i => {        // 이미지 주소를 폼데이터 객체에 저장한다.
          formData.append('image', i)      
    });
    formData.append('content', text) // 작성글을 폼데이터 객체에 저장한다
    dispatch(addPostRequestAction(formData));
  }, [text, imagePaths]); 

  const imageInput = useRef();
  const onClickImageUpload = useCallback(
    (e) => {
      imageInput.current.click();
    },
    [imageInput.current]
  );

  const onChangeImage = useCallback((e) => {
    console.log('image', e.target.files)
    const imageFormData = new FormData(); // FormData객체를 생성한다.
    [].forEach.call(e.target.files, (f)=> { 
      imageFormData.append('image', f); // append(key, value) FormData객체의 고유 api
    })
      dispatch({
        type : UPLOAD_IMAGE_REQUEST,
        data : imageFormData,
     })
    })

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data : index,
    })
  } )

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
        <input type="file" name='image' multiple hidden ref={imageInput} onChange={onChangeImage}/>
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          트윗
        </Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((v, i) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={`http://localhost:3065/${v}`} style={{ width: "200px" }} alt={v} />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </div>
          ))}
      </div>
    </Form>
  );
};

export default PostForm;
