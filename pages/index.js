import fetch from 'isomorphic-fetch';
import Layout from '../components/layout';
import Row from '../components/Row';
import Table from '../components/Table';

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
    const rows = this.state.projects.map(project => (
      <Row key={project._id} {...project} />
    ));

    return (
      <Layout>
        <Table>{rows}</Table>
      </Layout>
    );
  }
}

export default Home;
