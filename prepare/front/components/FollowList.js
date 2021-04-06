import PropType from "prop-types";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux"

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();
  // 어떤 경우에는 언팔로우, 어떤 경우에는 팔로우 차단. 구분할 필요가 있다.
  const onCancel = (UserId) => () => {
    dispatch({
      type : UNFOLLOW_REQUEST,
      data : UserId
    })
  }
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더보기</Button>
        </div>
      }
      bordered
      dataSource={data} //me.followings or me.followers
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)}/>]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;

FollowList.propTypes = {
  data: PropType.array.isRequired,
  header: PropType.string.isRequired,
};
