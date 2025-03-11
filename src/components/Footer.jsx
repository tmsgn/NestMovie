import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="text-white py-6 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-center m-3">
                    &copy; {new Date().getFullYear()} MovieNest. All rights reserved.
                </p>
                <p className="w-2/3 m-3 mx-auto text-center">
                    Looking for the best place to stream movies? MovieNest is your go-to destination! Watch the latest blockbusters, timeless classics, and trending TV shows in stunning HD quality, all for free. With an easy-to-use interface and an extensive library, MovieNest brings you endless entertainment. Visit MovieNest today and dive into a world of free movies and series!
                </p>
                <div>
                    <h1>Contact us with:</h1>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <a href="https://www.facebook.com" className="text-white hover:text-blue-600 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-3xl" />
                    </a>
                    <a href="https://www.twitter.com" className="text-white hover:text-blue-400 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-3xl" />
                    </a>
                    <a href="https://www.instagram.com" className="text-white hover:text-pink-600 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-3xl" />
                    </a>
                    <a href="https://www.youtube.com" className="text-white hover:text-red-600 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                        <FaYoutube className="text-3xl" />
                    </a>
                    <a href="https://web.telegram.org/a/" className="text-white hover:text-blue-400 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                        <FaTelegram className="text-3xl" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
