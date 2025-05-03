import React from 'react'
import cloclkpng from "../../assets/imgs/clock.png";
import demojpg from "../../assets/imgs/demo.jpg";
import demo2jpg from "../../assets/imgs/demo2.jpg";
import demo3jpg from "../../assets/imgs/demo3.jpg";
import { Link } from 'react-router-dom';
function Drafts() {
  return (<>
   <Foo/>
   </>)
}

export default Drafts


export const Foo = () => (
    <>
      
      {/* Preloader End Here */}
      {/* <div id="wrapper" className="mybody wrapper bg-ash"> */}
        {/* Header Menu Area Start Here */}
       
        {/* Header Menu Area End Here */}
        {/* Page Area Start Here */}
        <div className="dashboard-page-one">
          {/* Sidebar Area Start Here */}
         
          {/* Sidebar Area End Here */}
          <div className="dashboard-content-one">
            <div className="header-section">
              <h2>Drafts</h2>
              <div className="card-buttons">
                <Link to="/dashboard/projects/1/editor" className="btn btn-sm">
                  <i className="fa fa-plus" /> Create New
                </Link>
              </div>
            </div>
            <div className="card">
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
                            <i className="fa fa-heart" /> 10{" "}
                            <i className="fa fa-comment-o" /> 10
                          </span>
                        </h5>
                        <p className="card-text text-muted mb-1">
                          <i className="fa fa-user" /> Riyasha M
                          <span style={{ float: "right" }}>$12.00</span>
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
                            <i className="fa fa-heart" /> 10{" "}
                            <i className="fa fa-comment-o" /> 10
                          </span>
                        </h5>
                        <p className="card-text text-muted mb-1">
                          <i className="fa fa-user" /> Riyasha M
                          <span style={{ float: "right" }}>Free</span>
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
                            <i className="fa fa-heart" /> 10{" "}
                            <i className="fa fa-comment-o" /> 10
                          </span>
                        </h5>
                        <p className="card-text text-muted mb-1">
                          <i className="fa fa-user" /> Riyasha M
                          <span style={{ float: "right" }}>$15.00</span>
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
        {/* Page Area End Here */}
      {/* </div> */}
      {/* jquery*/}
      {/* Plugins js */}
      {/* Popper js */}
      {/* Bootstrap js */}
      {/* Counterup Js */}
      {/* Moment Js */}
      {/* Waypoints Js */}
      {/* Scroll Up Js */}
      {/* Full Calender Js */}
      {/* Chart Js */}
      {/* Custom Js */}
    </>
  )
  