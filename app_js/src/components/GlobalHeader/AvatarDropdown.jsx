import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { router } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import Head from './../../assets/head.jpg'
import { connect } from 'dva';


@connect(({ login, loading }) => ({
  login,
  loading: loading.models.blog,
}))
class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

    }
    else if(key === 'login'){
      router.push(`/user/login`);
    }


  };

  render() {
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {localStorage.getItem("login")==="true"?
          <Menu.Item key="logout">
            <Icon type="logout" />
            <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
          </Menu.Item>:
          <Menu.Item key="login">
            <Icon type="login" />
            <FormattedMessage id="menu.account.login" defaultMessage="login" />
          </Menu.Item>
        }
      </Menu>
    );
    return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={localStorage.getItem("name")?Head:null} alt="avatar" />
          <span className={styles.name}>{localStorage.getItem("name")?localStorage.getItem("name"):"Guest"}</span>
        </span>
      </HeaderDropdown>
    )
  }
}

export default AvatarDropdown;
