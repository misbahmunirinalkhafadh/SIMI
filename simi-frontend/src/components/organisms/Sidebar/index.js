import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';


function Sidebar() {
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState(false);

    const handleToggle = () => {
        setHidden(!hidden);
        // setActive(active)
    };

    return (
        <Nav
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            {/*  Sidebar - Brand */}
            <NavbarBrand
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="index.html"
            >
                <div className="sidebar-brand-text mx-3">SIMI</div>
            </NavbarBrand>

            {/*  Divider */}
            <hr className="sidebar-divider my-0" />

            {/*  Nav Item - Dashboard */}
            <NavItem className="nav-item">
                <NavLink className="nav-link" href='/' >
                    <FontAwesomeIcon icon="tachometer-alt" className="fa-fw" />
                    <span>Dashboard</span>
                </NavLink>
            </NavItem>

            {/*  Divider */}
            <hr className="sidebar-divider" />

            {/*  Heading */}
            <div className="sidebar-heading">Addons</div>

            {/*  Nav Item - Pages Collapse Menu */}
            <NavItem active={active}>
                <NavLink
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapsePages"
                    aria-expanded={true}
                    aria-controls="collapsePages"
                    onClick={handleToggle}
                >
                    <FontAwesomeIcon icon="folder" className="fa-fw" />
                    <span>Pages</span>
                </NavLink>
                <div hidden={hidden}
                    id="collapsePages"
                    className="collapse show"
                    aria-labelledby="headingPages"
                    data-parent="#accordionSidebar"
                >
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Other Pages:</h6>
                        <a className="collapse-item" href="/404">404 Page</a>
                        <a className="collapse-item active" href="blank.html">Blank Page</a>
                    </div>
                </div>
            </NavItem>

            {/*  Divider */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/*  Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
                <Button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
        </Nav>
    )
}

export default Sidebar