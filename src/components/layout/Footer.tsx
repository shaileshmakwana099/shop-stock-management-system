export default function Footer() {
  return (
    <footer className="bg-white shadow-inner py-4 px-6">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between text-gray-600">
          <p className="text-sm">
            © {new Date().getFullYear()} Bhal Infotech. All rights reserved.
          </p>
          <p className="text-sm">
            Developed by Shailesh Makwana
          </p>
        </div>
      </div>
    </footer>
  );
}