import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import request from '../../request';
import moment from 'moment';
import './style.css';

interface CourseItem {
  title: string;
  count: number;
}
interface CourseData {
  time: number;
  course: CourseItem[];
}

interface State {
  isLogin: boolean;
  data: CourseData[]
}

interface Course {
  name: string;
  type: string;
  data: number[];
}

class HomePage extends Component {
  state: State = {
    isLogin: true,
    data: []
  }
  async handleCrawData() {
    const data: responseResult.getdata = await request.get('/getdata');
    if (data) {
      return message.success('success');
    }
    return message.error('failed');
  }
  async componentDidMount() {
    const data: responseResult.isloggedin = await request.get('/isloggedin');
    if (data) {
      const courseInfo: responseResult.showdata =  await request.get('/showdata');
      this.setState({isLogin: true, data: courseInfo});
    }
  }
  async handleLogout() {
    const data: responseResult.logout = await request.get('/logout');
    if (data) {
      return this.setState({isLogin: false});
    }
    message.error('logout failed');
  }
  getOption = () => {
    const { data } = this.state;
    const courseNames: string[] = [];
    const timeArray: string[] = [];
    const courseSeries: Course[] = [];
    if (data.length) {
      data[0].course.map(item => {
        courseNames.push(item.title);
      });
      data.map(item => {
        timeArray.push(moment(item.time).format('YY/MM/DD HH:MM'));
        item.course.map(innerItem => {
          const index = courseSeries.findIndex(course => course.name === innerItem.title);
          if (index === -1) {
            courseSeries.push({
              name: innerItem.title,
              type: 'line',
              data: [innerItem.count]
            });
          } else {
            courseSeries[index].data.push(innerItem.count);
          }
        });
      });
    }
    return {
      title: {
        text: '课程在线学习人数'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: courseNames
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeArray,
      },
      yAxis: {
        type: 'value'
      },
      series: courseSeries
    };
  }
  render() {
    const { isLogin } = this.state;
    return (
      isLogin ? 
      <div className="home-page">
        <div className="buttons">
          <Button type="primary" onClick={this.handleCrawData.bind(this)}>爬取数据</Button>
          <Button type="primary" onClick={this.handleLogout.bind(this)}>退出登录</Button>
        </div>
        <ReactECharts option={this.getOption()} />
      </div> : 
      <Navigate to="/login" />
    )
  }
}

export default HomePage;
