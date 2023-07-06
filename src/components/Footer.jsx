import React from 'react';

export default function Footer(props) {
  return (
    <div className="footer bg-main bottom-0 w-full flex justify-around mt-5 p-5">
      <div className="footerEntry flex flex-row justify-end">
        <p className="footerLink">
          <a
            href="https://www.instagram.com/sapartyom/"
            target="_blank"
            rel="noreferrer"
            className="text-white-600"
          >
            <i className="fa fa-instagram"></i>
          </a>
        </p>
        <p className="footerLink">
          <a
            href="https://github.com/artySapa"
            target="_blank"
            rel="noreferrer"
            className="text-red-600"
          >
            <i className="fa fa-github"></i>
          </a>
        </p>
        <p className="footerLink">
          <a
            href="https://www.linkedin.com/in/sapartyom/"
            target="_blank"
            rel="noreferrer"
            className="text-red-600"
          >
            <i className="fa fa-linkedin"></i>
          </a>
        </p>
        <p className="footerLink text-black mr-20">sapartyom@g.ucla.edu</p>
        <p className="footerLink text-black mr-20">(424)415-2827</p>
        <a
          className="footerLink text-black"
          href="./artycv.pdf"
          download="Arty artycv.pdf"
        >
          Resume
        </a>
      </div>
    </div>
  );
}
