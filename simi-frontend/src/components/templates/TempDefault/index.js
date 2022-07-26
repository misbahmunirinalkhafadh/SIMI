import React from 'react';
import { NavigationBar, Sidebar, Footer } from '../../organisms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'reactstrap';

const TempDefault = (props) => {
  const { heading } = props.value
  return (
    <div id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">

        {/* Sidebar */}
        <Sidebar />
        {/* End of Sidebar */}

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <NavigationBar />
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <Container fluid >
              {/* Page Heading */}
              <h1 className="h3 mb-4 text-gray-800">{heading}</h1>
              {props.children}
            </Container>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}

          {/* Footer */}
          <Footer />
          {/* End of Footer */}

        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}

      {/* Scroll to Top Button */}
      <a className="scroll-to-top rounded" href="#page-top">
        <FontAwesomeIcon icon="angle-up" />
      </a>

      {/* Logout Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Logout" below if you are ready to end your current session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <a className="btn btn-primary" href="login.html">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempDefault;