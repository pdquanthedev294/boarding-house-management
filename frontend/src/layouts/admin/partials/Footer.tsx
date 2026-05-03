import { Heart, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-slate-900">BoardingHouse</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Hệ thống quản lý nhà trọ hiện đại, giúp bạn dễ dàng quản lý phòng trọ,
              khách hàng và các giao dịch một cách hiệu quả.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-violet-600 transition-colors"
                aria-label="Twitter"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-violet-600 transition-colors"
                aria-label="GitHub"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@boardinghouse.com"
                className="text-slate-400 hover:text-violet-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-violet-600 text-sm transition-colors">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-violet-600 text-sm transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-violet-600 text-sm transition-colors">
                  Dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-violet-600 text-sm transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Hỗ trợ
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-violet-600 text-sm transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-violet-600 text-sm transition-colors">
                  Tài liệu API
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-violet-600 text-sm transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-violet-600 text-sm transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-sm text-slate-600 mb-4 md:mb-0">
              <span>© {currentYear} BoardingHouse. Tất cả quyền được bảo lưu.</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <span className="flex items-center">
                Được phát triển với <Heart className="h-4 w-4 text-red-500 mx-1" /> tại Việt Nam
              </span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
