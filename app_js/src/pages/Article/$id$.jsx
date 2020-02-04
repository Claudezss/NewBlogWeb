import React, {Component} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Row,Col, Divider, Button} from 'antd';
import styles from "./style.less";
import router from 'umi/router';
import "antd/dist/antd.css";
import { connect } from 'dva';


@connect(({ blog, loading }) => ({
  blog,
  loading: loading.models.blog,
}))
class ArticleDetail extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/fetchBlogById',
      payload:{id:this.props.match.params.id}
    });
  }

  render() {
    const blogId = this.props.match.params.id;
    if(!blogId){
      return null;
    }
    const {
      loading,
      blogDetail,
    } = this.props.blog;
    return (
      <PageHeaderWrapper>
        <Card style={{borderRadius:'20px'}}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={22} xl={22}>
              <h2>{blogDetail.title}</h2>
            </Col>
            <Col xs={24} sm={24} md={24} lg={22} xl={2}>
              <Button type="primary" style={{marginBottom:'10px'}}onClick={()=>router.push('/article')} >Back</Button>
            </Col>

          </Row>
          <p>{blogDetail.excerpt}</p>
          <span>Category: {blogDetail.category}<Divider type="vertical" />Views: {blogDetail.views}<Divider type="vertical"/>Created Time: {blogDetail.created_time}
          </span>
          <Divider/>
          <div className={styles.blogbody}>
            <span dangerouslySetInnerHTML={{__html: blogDetail.body}} />
            <Divider/>

          </div>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ArticleDetail
