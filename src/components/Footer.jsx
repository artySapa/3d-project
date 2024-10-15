import React from 'react';

export default function Footer(props) {
  return (
    <div className="footer bg-main bottom-0 w-full flex flex-col md:flex-row justify-around p-5">
      <div className="footerEntry flex flex-col md:flex-row items-center justify-center md:justify-end space-y-3 md:space-y-0 md:space-x-10">
        <p className="footerLink flex items-center space-x-2">
          <a
            href="https://www.instagram.com/sapartyom/"
            target="_blank"
            rel="noreferrer"
            className="text-black"
          >
            <i className="fa fa-instagram"></i>
          </a>
          <span className="block md:hidden text-black">Instagram</span>
        </p>
        <p className="footerLink flex items-center space-x-2">
          <a
            href="https://github.com/artySapa"
            target="_blank"
            rel="noreferrer"
            className="text-black"
          >
            <i className="fa fa-github"></i>
          </a>
          <span className="block md:hidden text-black">GitHub</span>
        </p>
        <p className="footerLink flex items-center space-x-2">
          <a
            href="https://www.linkedin.com/in/sapartyom/"
            target="_blank"
            rel="noreferrer"
            className="text-black"
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <span className="block md:hidden text-black">LinkedIn</span>
        </p>
        <p className="footerLink text-black md:mr-20">sapartyom@g.ucla.edu</p>
        <p className="footerLink text-black md:mr-20">(424) 415-2827</p>
      </div>
    </div>
  );
}
