const Footer = () => {
    return (
      <footer className="font-primary bg-blue-600">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Address Section */}
            <div className="space-y-2">
              <h3 className="font-primary font-semibold text-lg mb-4">Freshnest</h3>
              <address className="not-italic">
                <p>123 Galle Road</p>
                <p>Comombo 3, SriLanka</p>
                <p className="mt-2">email@freshN.com</p>
                <p>(011) 3456678</p>
              </address>
            </div>
  
            {/* Links Section */}
            <div>
              <h4 className="font-secondary  font-semibold text-lg mb-4">Extra links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-600 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-gray-600 transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-gray-600 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-gray-600 transition-colors">Contact</a></li>
              </ul>
            </div>
  
            {/* Branding Section */}
            <div className="flex flex-col items-start md:items-end">
              <span className="font-primary text-secondary text-[100px] font-bold mb-4 pl-10">Freshnest</span>
              <p className="text-sm text-white">Creating cleaner spaces</p>
            </div>
          </div>
  
          {/* Copyright Section */}
          <div className="border-t border-gray-200 pt-6 text-center md:text-left">
            <p className="text-sm text-white">
              © {new Date().getFullYear()} Freshnest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;