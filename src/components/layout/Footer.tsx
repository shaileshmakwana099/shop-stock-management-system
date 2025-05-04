export default function Footer() {
  return (
    <footer className="bg-white shadow-inner py-4 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between text-gray-600 space-y-2 sm:space-y-0">
          <p className="text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Bhal Infotech. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-center sm:text-left">
            Developed by Shailesh Makwana
          </p>
        </div>
      </div>
    </footer>
  );
}