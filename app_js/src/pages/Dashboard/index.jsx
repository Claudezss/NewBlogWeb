import { Avatar, Card, Col, List, Skeleton, Row, Statistic, Tooltip } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import Radar from './components/Radar';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import Logo from './../../assets/head.jpg';
import Python from '../../assets/python.png';
import News from '../../assets/news.png';
import router from 'umi/router';

const links = [
  {
    title: 'Next',
    href: 'https://next.claudezhang.ca',
  },
  {
    title: 'API',
    href: 'https://api.claudezhang.ca',
  },
  {
    title: 'Celery',
    href: '#',
  },
  {
    title: 'MY',
    href: 'http://my.claudezhang.ca',
  },
];

const radarOriginData = [
  {
    name: 'Usage',
    ref: 10,
    koubei: 9,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: 'Depth',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: 'Knowledge',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];
const radarData = [];
const radarTitleMap = {
  ref: 'Python',
  koubei: 'React',
  output: 'PHP',
  contribute: 'AWS',
  hot: 'Matlab',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const PageHeaderContent = () => {

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={Logo} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          Howdy，
          {'Guest'}
        </div>
        <div>Welcome to my blog, hope you can have fun -- Claude</div>
      </div>
    </div>
  );
};

const ExtraContent = ({ blog }) => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="Articles" value={blog.length} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="Tools" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="Views" value={2223} />
    </div>
  </div>
);

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/clear',
    });
  }

  classifyLogo = blog => {
    switch (blog.category) {
      case 'Python':
        return Python;

      case 'News':
        return News;

      default:
        return '';
    }
  };

  render() {
    const { blogLoading, blog, cbc, cbcLoading} = this.props;

    return (
      <PageHeaderWrapper
        content={<PageHeaderContent />}
        extraContent={<ExtraContent blog={blog} />}
      >
        <Card
          className={styles.projectList}
          style={{ marginBottom: 24 }}
          title="CBC NEWS"
          bordered={false}
          extra={
            <a href="https://www.cbc.ca/" target="_blank">
              All
            </a>
          }
          loading={cbcLoading}
          bodyStyle={{ padding: 0 }}
        >
          {cbc.slice(0, 5).map(item => (
            <Card.Grid className={styles.cbcGrid} key={item.title}>
              <Card
                bodyStyle={{ padding: 0 }}
                bordered={false}
                onClick={() => {
                  window.open(item.link, '_blank');
                }}
                cover={<img alt="example" src={item.image} style={{ maxHeight: '100px' }} />}
              >
                <Card.Meta
                  style={{ paddingTop: '15px' }}
                  description={
                    <Tooltip title={item.title}>
                      <p style={styles.cbcTitle}>{item.title}</p>
                    </Tooltip>
                  }
                />
              </Card>
            </Card.Grid>
          ))}
        </Card>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="Recent Articles"
              bordered={false}
              extra={<Link to="/article">All</Link>}
              loading={blogLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              {blog.slice(0, 9).map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false} onClick={()=>router.push('/article/'+item.id)}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={this.classifyLogo(item)} />
                          <Link to="">{item.category}</Link>
                        </div>
                      }
                      description={
                        <p style={{ color: 'black' }}>
                          <b>{item.title}</b>
                        </p>
                      }
                    />

                    <div className={styles.projectItemContent}>
                      <Link to="">Date: {item.created_time}</Link>
                      <span>Views: {item.views}</span>
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              bodyStyle={{
                padding: 0,
              }}
            >
              <EditableLinkGroup links={links} linkElement={Link} />
            </Card>
            <Card
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              title="My Skills"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={300} data={radarData} />
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({ blog: { blog, cbc }, loading }) => ({
    blog,
    cbc,
    blogLoading: loading.effects['blog/fetchBlog'],
    cbcLoading: loading.effects['blog/fetchCbc'],
  }),
)(Dashboard);
