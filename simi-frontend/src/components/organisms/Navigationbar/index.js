import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as UserAva } from '../../../assets/img/undraw_profile.svg';
import { Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, InputGroup, Nav, Navbar, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';

function NavigationBar({ ...args }) {

  useEffect(() => {
    document.getElementById('alertsDropdown').classList.remove('btn', 'btn-secondary')
    document.getElementById('userDropdown').classList.remove('btn', 'btn-secondary')

  }, [])

  return (
    <Navbar className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
    >
      {/*  Sidebar Toggle (Topbar) */}
      <Button
        id="sidebarToggleTop"
        className="d-md-none rounded-circle mr-3"
        color="link"
      >
        <FontAwesomeIcon icon="bars" />
      </Button>

      {/*  Topbar Search */}
      <Form
        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
      >
        <InputGroup>
          <Input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <Button color="primary">
              <FontAwesomeIcon icon="search" className='fa-sm' />
            </Button>
          </div>
        </InputGroup>
      </Form>

      {/*  Topbar Navbar */}
      <Nav className="navbar-nav ml-auto">
        {/*  Nav Item - Search Dropdown (Visible Only XS) */}
        <NavItem className="nav-item dropdown no-arrow d-sm-none">
          <NavLink
            className="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon="search" className='fa-fw' />
          </NavLink>

          {/*  Dropdown - Messages */}
          <DropdownMenu
            className="dropdown-menu dropdown-menu-right p-3 shadow"
            aria-labelledby="searchDropdown"
          >
            <Form className="form-inline mr-auto w-100 navbar-search">
              <InputGroup>
                <Input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <Button color="primary">
                    <FontAwesomeIcon icon="search" className='fa-sm' />
                  </Button>
                </div>
              </InputGroup>
            </Form>
          </DropdownMenu>
        </NavItem>


        {/*  Nav Item - Alerts */}
        <UncontrolledDropdown className="nav-item dropdown no-arrow mx-1" direction='down'>
          <DropdownToggle
            className="nav-link dropdown-toggle"
            href="#"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup={true}
            aria-expanded={false}
          >
            <FontAwesomeIcon icon="bell" className='fa-fw' />
            {/*  Counter - Alerts */}
            <Badge className="badge-counter" style={{ top: 25 }} color="danger">3+</Badge>
          </DropdownToggle>
          {/*  Dropdown - Alerts */}

          <DropdownMenu
            className="dropdown-list dropdown-menu dropdown-menu-right shadow"
            aria-labelledby="alertsDropdown"
            {...args}
          >
            <DropdownItem header>Alerts Center</DropdownItem>
            <DropdownItem className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                <div className="icon-circle bg-primary">
                  <FontAwesomeIcon icon="file-alt" className='text-white' />
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 12, 2019</div>
                <span className="font-weight-bold"
                >A new monthly report is ready to download!</span>
              </div>
            </DropdownItem>
            <DropdownItem
              className="dropdown-item text-center small text-gray-500"
              href="#"
            >Show All Alerts
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <div className="topbar-divider d-none d-sm-block"></div>

        {/*  Nav Item - User Information */}
        <UncontrolledDropdown className="nav-item dropdown no-arrow" direction='down'>
          <DropdownToggle
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup={true}
            aria-expanded={false}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small"
            >Douglas McGee</span>
            
            <img
              className="img-profile rounded-circle"
              src={UserAva} />
          </DropdownToggle>
          {/*  Dropdown - User Information */}
          <DropdownMenu
            className="dropdown-menu dropdown-menu-right shadow"
            aria-labelledby="userDropdown"
          >
            <DropdownItem className="dropdown-item" href="#">
              <FontAwesomeIcon icon="user" className='fa-sm fa-fw mr-2 text-gray-400' />
              Profile
            </DropdownItem>
            <DropdownItem className="dropdown-item" href="#">
              <FontAwesomeIcon icon="cogs" className='fa-sm fa-fw mr-2 text-gray-400' />
              Settings
            </DropdownItem>
            <DropdownItem className="dropdown-item" href="#">
              <FontAwesomeIcon icon="list" className='fa-sm fa-fw mr-2 text-gray-400' />
              Activity Log
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <FontAwesomeIcon icon="sign-out-alt" className='fa-sm fa-fw mr-2 text-gray-400' />
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
  )
}

export default NavigationBar