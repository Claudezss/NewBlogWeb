import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import Radar from './components/Radar';
import { ModalState } from './model';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType, Blog, CbcNews } from './data.d';

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

interface HomeProps {
  currentUser?: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  dispatch: Dispatch<any>;
  blog: Blog[];
  cbc: CbcNews[];
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

const PageHeaderContent: React.FC<{ currentUser: CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          Howdy，
          {currentUser.name ? currentUser.name : 'Guest'} !
        </div>
        <div>Welcome to my blog, hope you can have fun -- Claude</div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="Articles" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="Tools" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="Views" value={2223} />
    </div>
  </div>
);

class Home extends Component<HomeProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/clear',
    });
  }

  renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const {
      currentUser,
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
      radarData,
      blog,
      cbc,
    } = this.props;

    if (!currentUser || !currentUser.userid) {
      return null;
    }
    console.log(cbc);
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
      >
        <Card
          className={styles.projectList}
          style={{ marginBottom: 24 }}
          title="CBC NEWS"
          bordered={false}
          extra={<Link to="/">All</Link>}
          loading={projectLoading}
          bodyStyle={{ padding: 0 }}
        >
          {cbc.slice(0, 5).map(item => (
            <Card.Grid className={styles.cbcGrid} key={item.title}>
              <Card
                bodyStyle={{ padding: 0 }}
                bordered={false}
                cover={<img alt="example" src={item.image} style={{ maxHeight: '100px' }} />}
              >
                <Card.Meta
                  style={{ paddingTop: '15px' }}
                  description={
                    <p style={{ color: 'black' }}>
                      <b>{item.title}</b>
                    </p>
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
              style={{ marginBottom: 24 }}
              title="Recent Articles"
              bordered={false}
              extra={<Link to="/">All</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {blog.slice(0, 6).map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar
                            size="small"
                            src="https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png"
                          />
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
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List<ActivitiesType>
                loading={activitiesLoading}
                renderItem={item => this.renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {projectNotice.map(item => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    home: { currentUser, projectNotice, activities, radarData, blog, cbc },
    loading,
  }: {
    home: ModalState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    blog,
    cbc,
    currentUserLoading: loading.effects['home/fetchUserCurrent'],
    projectLoading: loading.effects['home/fetchProjectNotice'],
    activitiesLoading: loading.effects['home/fetchActivitiesList'],
    blogLoading: loading.effects['home/blog'],
    cbcLoading: loading.effects['home/cbc'],
  }),
)(Home);
