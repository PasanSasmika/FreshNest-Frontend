const Footer = () => {
    return (
      <footer className="font-primary bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Address Section */}
            <div className="space-y-2">
              <h3 className="font-secondary font-semibold text-lg mb-4">Freshnest</h3>
              <address className="not-italic">
                <p>123 Example Road</p>
                <p>New York, NY 12345</p>
                <p className="mt-2">email@example.com</p>
                <p>(555) 555–5555</p>
              </address>
            </div>
  
            {/* Links Section */}
            <div>
              <h4 className="font-secondary font-semibold text-lg mb-4">Extra links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-600 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-gray-600 transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-gray-600 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-gray-600 transition-colors">Contact</a></li>
              </ul>
            </div>
  
            {/* Branding Section */}
            <div className="flex flex-col items-start md:items-end">
              <span className="font-primary text-[100px] font-bold mb-4 pl-10">Freshnest</span>
              <p className="text-sm text-gray-500">Creating cleaner spaces</p>
            </div>
          </div>
  
          {/* Copyright Section */}
          <div className="border-t border-gray-200 pt-6 text-center md:text-left">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Freshnest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;