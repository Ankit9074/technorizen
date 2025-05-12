import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { History } from "lucide-react";
import demojpg from "../../assets/imgs/demo.jpg";
import demo2jpg from "../../assets/imgs/demo2.jpg";
import demo3jpg from "../../assets/imgs/demo3.jpg";
import { supabase } from "@/integrations/supabase/client";

const DashboardLanding = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [projects, setProjects] = useState([]);
  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("projects") // Replace with your actual table name
        .select("*");

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data); // 🟢 Step 2: Store data in state
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="dashboard-content-one">
        <div className="header-section">
          <h2>Projects</h2>
          <div className="card-buttons">
            <Link to="/dashboard/projects/1/editor" className="btn btn-sm">
              <i className="fa fa-plus"></i> Create New
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {/* Tabs */}
            <div className="mb-4">
              <button
                className={`tab-button text-black ${
                  activeTab === "active" ? "active" : ""
                }`}
                onClick={() => showTab("active")}
              >
                Active
              </button>
              <button
                className={`tab-button text-black ${
                  activeTab === "shared" ? "active" : ""
                }`}
                onClick={() => showTab("shared")}
              >
                Shared Projects
              </button>
              <button
                className={`tab-button text-black ${
                  activeTab === "trash" ? "active" : ""
                }`}
                onClick={() => showTab("trash")}
              >
                Trash
              </button>
            </div>

            {/* Tab Contents */}
            <div
              id="active"
              className={`tab-content ${
                activeTab === "active" ? "show" : "d-none"
              }`}
            >
              {projects?.map((project) =>
                project.dashboards?.map((dashboard) =>
                  dashboard.components?.map((component) => (
                    <h1 key={component.id}>{component.properties?.content}</h1>
                  ))
                )
              )}
              <div className="card border">
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="card border">
                        <img
                          src={demojpg}
                          alt="img"
                          style={{ width: "100%", height: 300 }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            Input File{" "}
                            <span style={{ float: "right" }}>
                              <History />
                            </span>
                          </h5>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Riyasha M{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Deleted 5 days Ago{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-edit" /> 2 Editor{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border">
                        <img
                          src={demo2jpg}
                          alt="img"
                          style={{ width: "100%", height: 300 }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            Input File{" "}
                            <span style={{ float: "right" }}>
                              <History />
                            </span>
                          </h5>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Riyasha M{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Deleted 5 days Ago{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-edit" /> 2 Editor{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border">
                        <img
                          src={demo3jpg}
                          alt="img"
                          style={{ width: "100%", height: 300 }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            Input File{" "}
                            <span style={{ float: "right" }}>
                              <History />
                            </span>
                          </h5>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Riyasha M{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Deleted 6 days Ago{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-edit" /> 2 Editor{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <a className="page-link">«</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          ...
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          10
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">»</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div
              id="shared"
              className={`tab-content ${
                activeTab === "shared" ? "show" : "d-none"
              }`}
            >
              {/* Shared Projects Content */}
              <div className="card border">
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="card border">
                        <img
                          src={demojpg}
                          alt="img"
                          style={{ width: "100%", height: 300 }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            Input File{" "}
                            <span style={{ float: "right" }}>
                              <History />
                            </span>
                          </h5>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Riyasha M{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Deleted 5 days Ago{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-edit" /> 2 Editor{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border">
                        <img
                          src={demo2jpg}
                          alt="img"
                          style={{ width: "100%", height: 300 }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            Input File{" "}
                            <span style={{ float: "right" }}>
                              <History />
                            </span>
                          </h5>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Riyasha M{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-user" /> Deleted 5 days Ago{" "}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <i className="fa fa-edit" /> 2 Editor{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <a className="page-link">«</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          ...
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          10
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">»</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div
            id="trash"
            className={`tab-content ${
              activeTab === "trash" ? "show" : "d-none"
            }`}
          >
            {/* Trash Content */}
          </div>
        </div>
      </div>
      {/* <div className="header-section">
      <h2>Projects</h2>
      <div className="card-buttons">
        <a href="/editable-plate-form" className="btn btn-sm"><i className="fa fa-plus"></i> Create New</a>
      </div> */}
      {/* Add cards here */}
      {/* </div> */}
    </>
  );
};

export default DashboardLanding;
