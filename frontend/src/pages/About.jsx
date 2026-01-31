import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SubscribeBox from "../components/SubscribeBox";
import Title from "../components/Title";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="mb-5"
        style={{
          backgroundImage:
            " url('https://img.freepik.com/free-photo/computer-mouse-paper-bags-blue-background-top-view_169016-43523.jpg?semt=ais_hybrid&w=740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Title text1="About" text2="OneCart" />

        <p className="spaced-text fw-bold text-black">
          SMART • SIMPLE • SECURE SHOPPING
        </p>
      </div>

      {/* About OneCart */}
      <div className="container about-section">
        <h2 className="mb-3">What is OneCart?</h2>

        <p>
          <strong>OneCart</strong> is a modern, fast, and user-friendly
          eCommerce platform designed to deliver a smooth and reliable online
          shopping experience. It focuses on clean UI, performance optimization,
          and responsive design to meet the expectations of today’s users.
        </p>

        <p>
          The platform offers essential eCommerce features such as product
          browsing, size-based cart management, and an intuitive user flow that
          makes shopping simple and efficient.
        </p>

        <p>
          OneCart is built using modern web technologies with scalability in
          mind, ensuring consistent performance across desktops, tablets, and
          mobile devices.
        </p>

        <p>
          This project represents real-world development practices and serves as
          a strong foundation for building full-scale, production-ready
          eCommerce applications.
        </p>
      </div>

      {/* About Me Section */}
      <section className="about-me">
        <div className="about-container2">
          {/* Left: Image & Links */}
          <div className="about-image text-center">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocK0962wQqX82-lxDhv3desQwMNFrHOQ03F-S-3BZSwcmlwmAnqd=s288-c-no"
              alt="Anupam Jana"
            />

            <div className="photo-links d-flex gap-3 justify-content-center mt-5">
              <a
                href="https://github.com/anupam6684"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon /> GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/anupam-jana/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon /> LinkedIn
              </a>

              <a href="mailto:anupamjana6684@gmail.com">
                <MailIcon /> Email
              </a>
            </div>
          </div>

          {/* Right: Content */}
          <div className="about-content2">
            <span className="about-role">
              Anupam Jana — MERN Stack Developer
            </span>

            <h2>
              Crafting scalable & modern <br /> web applications with React
            </h2>

            <p>
              I’m Anupam Jana, a passionate MERN Stack Developer specializing in
              building full-stack web applications using MongoDB, Express.js,
              React, and Node.js. I enjoy creating clean, responsive, and
              user-focused interfaces backed by efficient backend logic.
            </p>

            <p>
              OneCart is a full-stack eCommerce project developed to demonstrate
              real-world application architecture, RESTful APIs, cart logic,
              authentication, and modern UI practices. I continuously focus on
              improving performance, security, and maintainability by following
              industry best practices.
            </p>
          </div>
        </div>
      </section>
      <SubscribeBox />
    </>
  );
}
