import React from 'react'

export default function Footer() {
  return (
    <footer className="footer flex-column flex-md-row border-top d-flex align-items-center justify-content-between px-4 py-2">
      <div>
        Giorgio Grigolo, Julianne Vella
        {' '}
        © 2022
        Gorju Car Rentals.
      </div>
      <div className="ms-md-auto">
        Powered by&nbsp;
        coffee.
      </div>
    </footer>
  )
}
