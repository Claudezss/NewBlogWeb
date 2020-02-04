import React, { createElement } from 'react';
import styles from './index.less';

const EditableLinkGroup = props => {
  const { links} = props;
  return (
    <div className={styles.linkGroup}>
      {links.map(link => (
        <a href={link.href} target="_blank" key={link.title+"linked"}>
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
