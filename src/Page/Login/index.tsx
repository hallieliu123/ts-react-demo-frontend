import { Component } from 'react';
import { Form, Button, Input, message } from 'antd';
import { Navigate } from 'react-router-dom'
import request from '../../request';
import './style.css';
interface Props {}
interface State {
  isLogin: boolean
}
class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }
  async onFinish(values: any) {
    const params = new URLSearchParams();
    params.append('password', values.password);
    const data: responseResult.login = await request.post('/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    if (data) {
      this.setState({isLogin: true});
      return;
    }
    message.error('login failed');
  };
  render () {
    const { isLogin } = this.state;
    return ( isLogin ? 
      <Navigate to='/' /> :
      <div className="login-page">
        <Form
        name="basic"
        onFinish={this.onFinish.bind(this)}
        autoComplete="off">
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
        <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

export default LoginPage;
