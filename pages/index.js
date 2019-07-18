import "../layout.css";
import "flickity/dist/flickity.css";

import Layout from "../components/layout";
import Loading from "../components/public/loading";
import Nav from "../components/public/nav";

const Flickity =
  typeof window !== "undefined"
    ? require("react-flickity-component")
    : () => null;

class Home extends React.Component {
  state = {
    error: null,
    index: 0,
    interval: 375,
    loading: true,
    projects: this.props.data || []
  };

  flickityOptions = {
    autoPlay: false,
    friction: 0.5,
    fullscreen: true,
    imagesLoaded: true,
    pageDots: false,
    selectedAttraction: 0.08,
    setGallerySize: false,
    wrapAround: true
  };

  static async getInitialProps({ req }) {
    const isServer = !!req;

    if (isServer) {
      const collection = req.app.locals.collection;

      const data = await collection
        .find({})
        .toArray()
        .then(response => {
          response.sort((a, b) => +a.order - +b.order);
          return response;
        });

      return { data };
    } else {
      const lastVisited = localStorage.getItem("ads-timestamp");
      const lengthOfTime = 12 * 60 * 60 * 1000; // 12 hours
      const timeAgo = Date.now() - lengthOfTime;

      if (lastVisited > timeAgo) {
        let data = localStorage.getItem("ads-data");
        data = JSON.parse(data);
        return { data };
      }

      const res = await fetch(`/api/projects`, {
        headers: { Accept: "application/json" }
      });
      const resJson = await res.json();
      const data = resJson.projects.sort((a, b) => +a.order - +b.order);

      localStorage.setItem("ads-timestamp", Date.now());
      localStorage.setItem("ads-data", JSON.stringify(data));

      return { data };
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    if (window.innerWidth < 660) {
      this.flickityOptions.autoPlay = 2250;
    }

    if (sessionStorage.getItem("ads-loaded")) {
      this.setState({ loading: false });
      this.setState({ interval: 2250 });
    } else {
      setTimeout(() => {
        this.setState({ loading: false });
        this.setState({ interval: 2250 });
        sessionStorage.setItem("ads-loaded", true);
      }, 3200);
    }
  }

  render() {
    const { error, loading, index, interval, projects } = this.state;

    if (error) console.log(error);

    return (
      <Layout
        darkTheme={true}
        pageClass="portfolio"
        title="home · aagaard design studio."
      >
        <section className="left">
          <Nav page="home" projectTitle={projects[index].title || ""} />
        </section>
        <section className="right">
          {!error && (
            <>
              <div className="img-wrapper">
                <Flickity
                  flickityRef={c => {
                    c.on("change", () =>
                      this.setState({ index: c.selectedIndex })
                    );
                  }}
                  options={this.flickityOptions}
                  static={true}
                >
                  {projects.map((project, i) => (
                    <div
                      className="img-container"
                      key={i}
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  ))}
                </Flickity>
              </div>
            </>
          )}
          {error && (
            <p style={{ color: "#fff" }}>
              An error occurred. Please try again later.
            </p>
          )}
        </section>
        <Loading
          class={loading ? "show" : "hide"}
          interval={interval}
          text="Loading"
        />
      </Layout>
    );
  }
}

export default Home;
