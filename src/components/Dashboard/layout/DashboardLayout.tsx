import {useEffect}from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ComponentPanel } from "@/components/dashboard/ComponentPanel";
import { Canvas } from "@/components/dashboard/Canvas";
import { PropertiesPanel } from "@/components/dashboard/PropertiesPanel";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Screen } from "@/types/dashboard";
import Sidebar from "../sidebar/Sidebar";
import {DashboardHeader} from "../header/DashboardHeader"
import "../../../inner_page_style.css" 
import { Outlet } from "react-router-dom";
import { useSidebar } from "../../../context/SidebarContext";
interface DashboardLayoutProps {
  selectedComponent: string | null;
  setSelectedComponent: (id: string | null) => void;
  components: any[];
  setComponents: (components: any[]) => void;
  isPropertiesOpen: boolean;
  setIsPropertiesOpen: (open: boolean) => void;
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor?: string;
  onBackgroundColorChange?: (color: string) => void;
  screens?: Screen[];
  onPaletteChange?: (colors: string[]) => void;
}


 const DashboardLayout2=()=>{
  return(<>
  <div className='mybody'>
  <DashboardLayout2/>
  </div>
  </>)
}
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";


export const DashboardLayout = () => {
 const { collapsed } = useSidebar();
  return (
    <>
    <div className="mybody">
        {/* <div id="preloader" /> */}
    <div id="wrapper" className=" mybody wrapper bg-ash">
      <DashboardHeader />
      <div className="mybody dashboard-page-one" >
        <Sidebar collapsed={collapsed }  />
        <div className="mybody dashboard-content-one" style={{width:collapsed?"w-full ml-16":"ml-64"}}>
          <Outlet />
        </div>
      </div>
    </div>
    </div>
    </>
  );
};



export const Foo = () => (
  <>
    {/* Page Area Start Here */}
    <div className="dashboard-page-one">
      {/* Sidebar Area Start Here */}
      <Sidebar/>
      <h2>Main Page</h2>
      {/* Sidebar Area End Here */}
      <div className="dashboard-content-one">
        <div className="header-section">
          <h2>Drafts</h2>
          <div className="card-buttons">
            <a href="editable-plate-form.html" className="btn btn-sm">
              <i className="fa fa-plus" /> Create New
            </a>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card border">
                  <img
                    src="img/demo.jpg"
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
                    src="img/demo.jpg"
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
                    src="img/demo.jpg"
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
  </>
)


export const Old_DashboardLayout = ({
  selectedComponent,
  setSelectedComponent,
  components,
  setComponents,
  isPropertiesOpen,
  setIsPropertiesOpen,
  canvasWidth,
  canvasHeight,
  backgroundColor,
  onBackgroundColorChange,
  screens,
  onPaletteChange,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-[800px] rounded-lg border bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <ComponentPanel 
            onBackgroundColorChange={onBackgroundColorChange} 
            currentBackgroundColor={backgroundColor}
            // screens={screens}
            onPaletteChange={onPaletteChange}
          />
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={isPropertiesOpen ? 60 : 80}>
          <Canvas
            components={components}
            setComponents={setComponents}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            width={canvasWidth}
            height={canvasHeight}
            backgroundColor={backgroundColor}
          />
        </ResizablePanel>
        
        {isPropertiesOpen && <ResizableHandle />}
        
        {isPropertiesOpen && (
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <div className="flex h-full">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-full border-r"
                onClick={() => setIsPropertiesOpen(false)}
              >
                <PanelRightClose className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <PropertiesPanel
                  selectedComponent={selectedComponent ? components.find(c => c.id === selectedComponent) : null}
                  onUpdateProperties={(properties) => {
                    setComponents(components.map((component) =>
                      component.id === selectedComponent ? { ...component, ...properties } : component
                    ));
                  }}
                  onRemoveComponent={(id) => {
                    setComponents(components.filter(component => component.id !== id));
                    setSelectedComponent(null);
                  }}
                />
              </div>
            </div>
          </ResizablePanel>
        )}
        
        {!isPropertiesOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 border-l bg-background"
            onClick={() => setIsPropertiesOpen(true)}
          >
            <PanelRightOpen className="h-4 w-4" />
          </Button>
        )}
      </ResizablePanelGroup>
    </div>
  );
};


import React, { useState } from 'react';

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('active');

    const showTab = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="dashboard-content-one">
            <div className="header-section">
                <h2>Projects</h2>
                <div className="card-buttons">
                    <a href="editable-plate-form.html" className="btn btn-sm"><i className="fa fa-plus"></i> Create New</a>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    {/* Tabs */}
                    <div className="mb-4">
                        <button className={`tab-button ${activeTab === 'active' ? 'active' : ''}`} onClick={() => showTab('active')}>Active</button>
                        <button className={`tab-button ${activeTab === 'shared' ? 'active' : ''}`} onClick={() => showTab('shared')}>Shared Projects</button>
                        <button className={`tab-button ${activeTab === 'trash' ? 'active' : ''}`} onClick={() => showTab('trash')}>Trash</button>
                    </div>

                    {/* Tab Contents */}
                    <div id="active" className={`tab-content ${activeTab === 'active' ? 'show' : 'd-none'}`}>
                        {/* Active Projects Content */}
                    </div>
                    <div id="shared" className={`tab-content ${activeTab === 'shared' ? 'show' : 'd-none'}`}>
                        {/* Shared Projects Content */}
                    </div>
                    <div id="trash" className={`tab-content ${activeTab === 'trash' ? 'show' : 'd-none'}`}>
                        {/* Trash Content */}
                    </div>
                </div>
            </div>
        </div>
    );
};
