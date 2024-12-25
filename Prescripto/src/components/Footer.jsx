import React from "react";

const Footer = () => {
  return (
    <footer className=" text-black py-8 px-6 sm:px-12 shadow-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold mb-4">HealthCare</h1>
          <p className="text-sm opacity-80">
            Your trusted platform to connect with the best doctors and book appointments effortlessly.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300">About Us</a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-300">Services</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:support@healthcare.com" className="hover:text-gray-300">support@healthcare.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-gray-300">+1 234 567 890</a></li>
            <li>Address: 123 Health St, Care City</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} HealthCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
