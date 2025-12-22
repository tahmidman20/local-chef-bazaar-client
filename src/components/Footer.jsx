import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-gray-300 pt-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Local<span className="text-secondary">Chef</span>Bazaar
          </h2>
          <p className="text-sm leading-relaxed">
            LocalChefBazaar connects local home chefs with food lovers,
            delivering fresh, healthy, and homemade meals straight to your door.
          </p>

          <div className="flex gap-4 mt-5">
            <a className="hover:text-secondary" href="#">
              <FaFacebookF />
            </a>
            <a className="hover:text-secondary" href="#">
              <FaInstagram />
            </a>
            <a className="hover:text-secondary" href="#">
              <FaTwitter />
            </a>
            <a className="hover:text-secondary" href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Dhaka, Bangladesh</li>
            <li>📞 +880 1234 567 890</li>
            <li>✉️ support@localchefbazaar.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Working Hours
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Sunday - Thursday: 9:00 AM – 10:00 PM</li>
            <li>Friday - Saturday: 10:00 AM – 11:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm">
        © {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
