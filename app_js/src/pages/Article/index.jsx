import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Col, List, Row, Select, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import AvatarList from './components/AvatarList';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import Book from './../../assets/notes.jpeg'


const FormItem = Form.Item;
const { Paragraph } = Typography;


@connect(({ blog, loading }) => ({
  blog,
  loading: loading.models.blog,
}))

class Article extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/fetchBlog'
    });
  }

  render() {
    const {
      loading,
      blog,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const cardList =  (
      <List
        rowKey="id"
        loading={loading}
        grid={{
          gutter: 24,
          xl: 4,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        dataSource={blog.blog}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              className={styles.card}
              hoverable
              onClick={()=>router.push('/article/'+item.id)}
              cover={<img alt={item.title} src={Book} />}
            >
              <Card.Meta
                title={<a>{item.category}</a>}
                description={
                  <Paragraph
                    className={styles.item}
                    ellipsis={{
                      rows: 2,
                    }}
                  >
                    {item.title}
                  </Paragraph>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.created_time).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="small">

                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
    return (
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title="Categories"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    {blog.categories.map(item=>
                      <TagSelect.Option value={item} key={"cate_"+item}>{item}</TagSelect.Option>
                    )}
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </div>
    );
  }
}

const WarpForm = Form.create({
  onValuesChange({ dispatch }) {
    // 表单项变化时请求数据
    // 模拟查询表单生效
  },
})(Article);
export default WarpForm;
