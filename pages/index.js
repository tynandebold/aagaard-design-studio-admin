import fetch from 'isomorphic-fetch';
import Layout from '../components/layout';

import { server } from '../config';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: this.props.projects
    };
  }

  static async getInitialProps() {
    const res = await fetch(`${server}/api/projects`, {
      headers: { Accept: 'application/json' }
    });
    const projects = await res.json();
    return { projects };
  }

  render() {
    console.log(this.state.projects);

    return (
      <Layout>
        {this.state.projects.map(project => {
          return <div key={project._id}>{project.title}</div>;
        })}
      </Layout>
    );
  }
}

export default Home;
