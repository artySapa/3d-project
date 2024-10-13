import React from 'react';

export default function Footer(props) {
  return (
    <div className="footer bg-main bottom-0 w-full flex justify-around p-5">
      <div className="footerEntry flex flex-row justify-end">
        <p className="footerLink">
          <a
            href="https://www.instagram.com/sapartyom/"
            target="_blank"
            rel="noreferrer"
            className="text-black mr-10"
          >
            <i className="fa fa-instagram"></i>
          </a>
        </p>
        <p className="footerLink">
          <a
            href="https://github.com/artySapa"
            target="_blank"
            rel="noreferrer"
            className="text-black mr-10"
          >
            <i className="fa fa-github"></i>
          </a>
        </p>
        <p className="footerLink">
          <a
            href="https://www.linkedin.com/in/sapartyom/"
            target="_blank"
            rel="noreferrer"
            className="text-black mr-10"
          >
            <i className="fa fa-linkedin"></i>
          </a>
        </p>
        <p className="footerLink text-black mr-20">sapartyom@g.ucla.edu</p>
        <p className="footerLink text-black mr-20">(424)415-2827</p>
      </div>
    </div>
  );
}
