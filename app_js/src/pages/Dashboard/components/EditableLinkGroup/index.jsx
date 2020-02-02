import React, { createElement } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './index.less';

const EditableLinkGroup = props => {
  const { links, linkElement, onAdd } = props;
  return (
    <div className={styles.linkGroup}>
      {links.map(link => (
        <a href={link.href} target="_blank">
          {link.title}
        </a>
      ))}
    </div>
  );
};

EditableLinkGroup.defaultProps = {
  links: [],
  onAdd: () => {},
  linkElement: 'a',
};
export default EditableLinkGroup;
