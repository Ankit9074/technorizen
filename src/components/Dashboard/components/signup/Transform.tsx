import "../../../../assetss/css/main.css"
import "../../../../assetss/css/bootstrap/css/bootstrap.min.css"
import "../../../../assetss/css/bootstrap-icons/bootstrap-icons.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../../assets_new/imgs/bg1.jpg"
export const Transform = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

 
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("mobile-nav-active", !menuOpen);
  };

  const handleToggle = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navmenu") && !event.target.closest(".mobile-nav-toggle")) {
        setMenuOpen(false);
        document.body.classList.remove("mobile-nav-active");
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

return (<>
{/* <NewLandingPage/> */}
<OldLandingPage/>
</>)
};

export const NewLandingPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

 
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("mobile-nav-active", !menuOpen);
  };

  const handleToggle = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (

    <>
      {/* <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>Alignify</title>
      <link href="assets/imgs/favicon.png" rel="icon" />
      <link href="assets/css/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
      <link href="assets/css/main.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      /> */}
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="index.html" className="logo d-flex align-items-center me-auto">
            <img src="assets/imgs/logo.png" alt="" />
          </a>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="index.html" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="index.html">Features</a>
              </li>
              <li>
                <a href="index.html">FAQ</a>
              </li>
              <li>
                <a href="index.html">Contact Us</a>
              </li>
              <li>
                <a href="login.html">Login</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>
          <a className="btn-getstarted sub__btn" href="signup.html">
            {" "}
            <img src="assets/imgs/mdi_beta.png" style={{ width: 24 }} /> Join Beta
          </a>
        </div>
      </header>
      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="container">
            <div className="row gy-4 justify-content-center">
              <div
                className="col-xxl-12 col-xl-8 col-lg-10 text-center"
                data-aos="fade-up"
              >
                <h1>
                  Bring your data <br />
                  product ideas to life
                </h1>
                <p>
                  Create professional dashboard wireframes using advanced
                  visualizations and customizable templates. Perfect for both
                  freelancers working with clients and organizations aligning
                  multiple teams
                </p>
                <div className="text-center">
                  <a className="btn-getstarted sub__btn" href="signup.html">
                    {" "}
                    <img
                      src="assets/imgs/mdi_beta.png"
                      style={{ width: 24 }}
                    />{" "}
                    Join Beta
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="banner__thumb">
              <img
                src="assets/imgs/topimage.png"
                alt="image not found"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </section>
        {/* /Hero Section */}
        <section className="section">
          {/* Section Title */}
          <div className="container section-title text-center" data-aos="fade-up">
            <h2>
              Why Choose <br /> Alignify?
            </h2>
            <p>
              Save time and resources by getting alignment right the first time
            </p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row gy-4 mt-4">
              <div className="col-md-6 mb-4">
                <div className="card p-5">
                  <div className="icon mb-4">
                    <img src="assets/imgs/icon1.png" />
                  </div>
                  <h4>Interactive Wireframes</h4>
                  <p>
                    Create dynamic wireframes and live previews for quick idea
                    sharing.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card p-5">
                  <div className="icon mb-4">
                    <img src="assets/imgs/icon2.png" />
                  </div>
                  <h4>Real-time Collaboration</h4>
                  <p>
                    Enable multiple users to work seamlessly on designs in
                    real-time.
                  </p>
                </div>
              </div>
              <div className="col-md-12 mb-4">
                <div className="card p-5">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="icon mb-4">
                        <img src="assets/imgs/icon3.png" />
                      </div>
                      <h4>Rapid Iteration</h4>
                      <p>
                        Reduce feedback loops and refine designs quickly with
                        clear communication.
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <img
                        src="assets/imgs/image-code.png"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="text-center bgg-gray">
                  <h1 className="mb-4">
                    Ready to Transform Your Data <br />
                    Collaboration?
                  </h1>
                  <p>
                    Join teams who are saving countless hours and building
                    stronger relationships <br />
                    through better data visualization alignment
                  </p>
                  <a className="sub__btn" href="signup.html">
                    {" "}
                    <img
                      src="assets/imgs/mdi_beta.png"
                      style={{ width: 24 }}
                    />{" "}
                    Join Beta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          {/* Section Title */}
          <div className="container section-title text-center" data-aos="fade-up">
            <div className="row gy-4 justify-content-center">
              <div
                className="col-xxl-12 col-xl-8 col-lg-10 text-center"
                data-aos="fade-up"
              >
                <h2>Have Questions?</h2>
                <p>
                  Our FAQ section covers everything you need to know about Chatty,
                  from setup and customization to troubleshooting and support.
                </p>
              </div>
            </div>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="accordion" id="faqAccordionLeft">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                      >
                        How do I get started with Chatty? <span />
                      </button>
                    </h2>
                    <div
                      id="faq1"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#faqAccordionLeft"
                    >
                      <div className="accordion-body">
                        Simply download the app from Google Play or the App Store,
                        follow the setup guide, and start using Chatty instantly.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                      >
                        Is Chatty available in multiple languages? <span />
                      </button>
                    </h2>
                    <div
                      id="faq2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordionLeft"
                    >
                      <div className="accordion-body">
                        Yes, Chatty supports multiple languages including English,
                        Spanish, French, and more.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                      >
                        Can AI cancel my subscription? <span />
                      </button>
                    </h2>
                    <div
                      id="faq3"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordionLeft"
                    >
                      <div className="accordion-body">
                        No, AI cannot cancel subscriptions. You can manage your
                        subscription in your account settings.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="accordion" id="faqAccordionRight">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq4"
                      >
                        Can I customize Chatty’s responses to fit my needs?{" "}
                        <span />
                      </button>
                    </h2>
                    <div
                      id="faq4"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordionRight"
                    >
                      <div className="accordion-body">
                        Yes, Chatty offers customization options to tailor
                        responses based on your requirements.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq5"
                      >
                        What types of tasks can Chatty assist with? <span />
                      </button>
                    </h2>
                    <div
                      id="faq5"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordionRight"
                    >
                      <div className="accordion-body">
                        Chatty can assist with scheduling, reminders, answering
                        FAQs, and much more.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq6"
                      >
                        What kind of support is available if I encounter issues?{" "}
                        <span />
                      </button>
                    </h2>
                    <div
                      id="faq6"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordionRight"
                    >
                      <div className="accordion-body">
                        You can contact our support team via email or live chat
                        for assistance.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq7"
                      >
                        Can chatty generate images? <span />
                      </button>
                    </h2>
                    <div
                      id="faq7"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordionRight"
                    >
                      <div className="accordion-body">
                        Yes can generate images .
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="footer" className="footer pt-120">
        <div className="container footer-top">
          <div className="row">
            <div className="col-lg-12">
              <h3 style={{ textTransform: "uppercase" }}>Contact</h3>
              <div className="footer-contact pt-3">
                <p>Work inquires: work@vaultflow.com</p>
                <p>PR and speaking: press@vaultflow.com</p>
                <p>New business: newbusiness@vaultflow.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright">
          <div className="row">
            <div className="col-lg-6">
              <p className="mx-2">© 2024 Alignify. All Rights Reserved.</p>
            </div>
            <div className="col-lg-6 text-right">
              <img src="assets/imgs/logo.png" alt="image bnot found" />
            </div>
          </div>
        </div>
      </footer>
      {/* Scroll Top */}
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
      {/* Preloader */}
      <div id="preloader" />
      {/* Vendor JS Files */}
      {/* Main JS File */}
    </>
  )
}
  
  


export const OldLandingPage=()=>{
  const [openFAQ, setOpenFAQ] = useState(null);

 
  const [menuOpen, setMenuOpen] = useState(false);
  const testfaqsLeft = [ 
    {
      id: "faq1",
      question: "How do I get started with Chatty?",
      answer:"Simply download the app from Google Play or the App Store, follow the setup guide, and start using Chatty instantly.",
    },
    {
      id: "faq2",
      question: "Is Chatty available in multiple languages?",
      answer:"Yes, Chatty supports multiple languages including English, Spanish, French, and more.",
    },

    // {
    //   id: "faq1",
    //   question: "How is Alignify different from traditional wireframing tools?",
    //   answer:
    //     "Alignify is specifically designed for data visualization and analytics workflows, offering specialized components and templates that traditional wireframing tools lack.",
    // },
    {
      id: "faq3",
      question: "Can AI cancel my subscription?",
      answer: "No, AI cannot cancel subscriptions. You can manage your subscription in your account settings.",
    }
    
  ];

  const testfaqsRight = [
    {
      id: "faq4",
      question: "Can I customize Chatty’s responses to fit my needs?",
      answer:"Yes, Chatty offers customization options to tailor responses based on your requirements.",
    },
    {
      id: "faq5",
      question: "What types of tasks can Chatty assist with?",
      answer:"Chatty can assist with scheduling, reminders, answering FAQs, and much more.",
    },
    {
      id: "faq6",
      question: "What kind of support is available if I encounter issues?",
      answer:"You can contact our support team via email or live chat for assistance.",
    },
    {
      id: "faq7",
      question: "Can chatty generate images?",
      answer:"Yes can generate images.",
    }
  ];
  const faqsLeft = [ 
    {
      id: "faq1",
      question: "How is Alignify different from traditional wireframing tools?",
      answer:"Alignify is specifically designed for data visualization and analytics workflows, offering specialized components and templates that traditional wireframing tools lack.",
    },
    {
      id: "faq2",
      question: "Can I collaborate with my team in real-time?",
      answer:"Yes, Alignify supports real-time collaboration, allowing team members to work together seamlessly on dashboard mockups.",
    },

    
    // {
    //   id: "faq3",
    //   question: "Can AI cancel my subscription?",
    //   answer: "No, AI cannot cancel subscriptions. You can manage your subscription in your account settings.",
    // }
    
  ];

  const faqsRight = [
    {
      id: "faq4",
      question: "How does Alignify help reduce iteration cycles?",
      answer:"By providing clear visual communication tools and templates, Alignify helps teams align on requirements early, reducing the need for multiple revision rounds.",
    },
    {
      id: "faq5",
      question: "Can I use Alignify as a freelancer working with clients?",
      answer:"Absolutely! Alignify is perfect for freelancers who want to create professional dashboard mockups and collaborate effectively with clients.",
    },
    {
      id: "faq6",
      question: "What kind of templates are available?",
      answer:"We offer a wide range of templates for different analytics use cases, including sales dashboards, marketing analytics, and operational metrics.",
    },
   
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("mobile-nav-active", !menuOpen);
  };

  const handleToggle = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };
  return (
    <>
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <Link to="/" className="logo d-flex align-items-center me-auto">
            <img src="./assets/imgs/logo.png" alt="Logo" />
          </Link>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#features-section">Features</a></li>
              <li><a href="#faq-section">FAQ</a></li>
              <li><a href="#footer">Contact Us</a></li>
              <li><Link to="/auth/signin">Login</Link></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" onClick={toggleMenu} />
          </nav>
          <Link className="btn-getstarted sub__btn" to="/auth/signup">
            <img src="assets/imgs/mdi_beta.png" style={{ width: 24 }} alt="Join Beta" /> Join Beta
          </Link>
        </div>
      </header>
      <main className="main" style={{ background: "#11052b" }}>
        <section id="hero" className="hero section">
          <div className="container">
            <div className="row gy-4 justify-content-center">
              <div
                className="col-xxl-12 col-xl-8 col-lg-10 text-center"
                data-aos="fade-up"
              >
                <h1>
                  Bring your data <br />
                  product ideas to life
                </h1>
                <p>
                  Create professional dashboard wireframes using advanced visualizations and customizable templates. Perfect for both freelancers working with clients and organizations aligning multiple teams.
                </p>
                <div className="text-center">
                  <Link className="btn-getstarted sub__btn" to="/auth/signup">
                    {" "}
                    <img
                      src="assets/imgs/mdi_beta.png"
                      style={{ width: 24 }}
                    />{" "}
                    Join Beta
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="banner__thumb">
              <img
                src="assets/imgs/topimage.png"
                alt="image not found"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </section>
        <section className="section" id="features-section">
          <div className="container section-title text-center" data-aos="fade-up">
            <h2>
              Why Choose <br /> Alignify?
            </h2>
            <p>Save time and resources by getting alignment right the first time</p>
          </div>
          <div className="container">
            <div className="row gy-4 mt-4">
              <div className="col-md-6 mb-4" >
                <div className="card p-5" style={{ background: '#1d1236' }}>
                  <div className="icon mb-4">
                    <img src="assets/imgs/icon1.png" />
                  </div>
                  <h4>Interactive Wireframes</h4>
                  <p>
                    Create dynamic dashboard mockups that bring your data stories to life, replacing traditional whiteboards with analytics-focused tools.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card p-5" style={{ background: '#1d1236' }}>
                  <div className="icon mb-4">
                    <img src="assets/imgs/icon2.png" />
                  </div>
                  <h4>Real-time Collaboration</h4>
                  <p>
                    Enable analysts to focus on deep analysis while business teams easily communicate their desired outcomes.
                  </p>
                </div>
              </div>
              <div className="col-md-12 mb-4">
                <div className="card p-5" style={{ background: '#1d1236' }}>
                  <div className="row" >
                    <div className="col-lg-6" >
                      <div className="icon mb-4">
                        <img src="assets/imgs/icon3.png" />
                      </div>
                      <h4>Rapid Iteration</h4>
                      <p>
                        Eliminate endless feedback loops and reduce misunderstandings with clear visual communication.
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <img
                        src="assets/imgs/image-code.png"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="text-center bgg-gray">
                  <h1 className="mb-4" style={{ fontSize: "35px" }}>
                    Ready to Transform Your Data <br />
                    Collaboration?
                  </h1>
                  <p>
                    Join teams who are saving countless hours and building stronger relationships through better <br />
                    data visualization alignment
                  </p>
                  <Link className="sub__btn" to="/auth/signup">
                    {" "}
                    <img
                      src="assets/imgs/mdi_beta.png"
                      style={{ width: 24 }}
                    />{" "}
                    Join the Beta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section" id="faq-section">
          <div className="container section-title text-center" data-aos="fade-up">
            <div className="row gy-4 justify-content-center">
              <div
                className="col-xxl-12 col-xl-8 col-lg-10 text-center"
                data-aos="fade-up"
              >
                <h2>Have Questions?</h2>
                <p>Everything you need to know about Alignify and how it can help your team</p>
                {/* <p>
                Our FAQ section covers everything you need to know about Chatty, from setup and customization to troubleshooting and support. Find quick, helpful answers to make integrating Chatty into your website seamless and hassle-free.
                </p> */}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="accordion" id="faqAccordionLeft">
                  {faqsLeft.map((faq) => (
                    <div
                      className="accordion-item"
                      key={faq.id}
                      style={{ background: "#1d1236", border: "none" }}
                    >
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${openFAQ === faq.id ? "" : "collapsed"
                            }`}
                          type="button"
                          onClick={() => handleToggle(faq.id)} style={{ background: "#342a4a", color: "white", border: "none", fontSize: "20px" }}
                        >
                          {faq.question}
                          <span />
                        </button>
                      </h2>
                      <div
                        id={faq.id}
                        className={`accordion-collapse  ${openFAQ === faq.id ? "show" : "collapse"
                          }`}
                          style={{
                            maxHeight: openFAQ === faq.id ? "500px" : "0",
                            overflow: "hidden",
                            transition: "max-height 0.4s ease",
                          }}
                      >
                        <p
                          style={{ color: "white", fontSize: "20px", padding: "10px" }}
                          className=""
                        >
                          {faq.answer}
                        </p>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <div className="accordion" id="faqAccordionRight">
                  {faqsRight.map((faq) => (
                    <div
                      className="accordion-item"
                      key={faq.id}
                      style={{ background: "#1d1236", border: "none" }}
                    >
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${openFAQ === faq.id ? "" : "collapsed"
                            }`}
                          type="button"
                          onClick={() => handleToggle(faq.id)} style={{ background: "#342a4a", fontSize: "20px", color: "white", border: "none" }}
                        >
                          {faq.question} <span />
                        </button>
                      </h2>
                      <div
                        id={faq.id}
                        className={`accordion-collapse ${openFAQ === faq.id ? "show" : "collapse"
                          }`}
                      >
                        <div className="accordion-body" style={{ color: "white", padding: "10px", fontSize: "20px" }}>{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="footer" className="footer pt-120" style={{ background: "#11052b" }}>
        <div className="container footer-top">
          <div className="row">
            <div className="col-lg-12">
              <h3 style={{ color: "white", fontSize: "22px" }}>Contact</h3>
              <div className="footer-contact pt-3" style={{ color: "white" }}>
                <p>Work inquires: work@vaultflow.com</p>
                <p>PR and speaking: press@vaultflow.com</p>
                <p>New business: newbusiness@vaultflow.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright footer-top pb-3">
          <div className="row d-flex" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div className="footer-contact w-50 col-lg-6" style={{ color: "#666666" }}>
              <p className="pt-3" style={{ padding: "0px 0px 19px 0px" }}>© 2024 Alignify. All Rights Reserved.</p>
            </div>
            <div className="text-right w-50" style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <img src="assets/imgs/logo.png" alt="image bnot found" />
            </div>
          </div>
        </div>
      </footer>
      {/* <a
        href="#"
        id="scroll-top"
        className="d-flex align-items-center justify-content-center"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Toggle
        <i className="bi bi-arrow-up-short" />
      </a> */}

    </>

  );
}