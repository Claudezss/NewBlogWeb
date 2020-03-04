import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Input, Card, Row, Col, Button } from 'antd'
import {connect} from "dva";


@connect(({ secret, loading }) => ({
  secret,
  loading: loading.models.secret,
}))
class Secret extends Component {

  state={
    url:"",
    name:""

  };

  getUrl=(url)=>{
    this.setState({url:url});
  };
  getName=(name)=>{
    this.setState({name:name});
  };
  submit=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'secret/downloadEhentai',
      payload: {
        url: this.state.url,
        name: this.state.name
      }
    });
  };

  render() {
    const message = this.props.secret.message;
    return (
      <PageHeaderWrapper>
        <Card>
          <Row gutter={16}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Input addonBefore="Url" onChange={(e)=>this.getUrl(e.target.value)}/>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Input addonBefore="Name" onChange={(e)=>this.getName(e.target.value)}/>
            </Col>

          </Row>

          <Row gutter={16} style={{paddingTop:'15px'}}>
            <Button style={{width:"100%"}} onClick={()=>this.submit()}>Submit</Button>
          </Row>
          <Row gutter={16}>
            <p>{message}</p>
          </Row>
        </Card>
      </PageHeaderWrapper>

    );
  }

}

export default Secret
